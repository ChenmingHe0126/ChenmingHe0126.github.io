"""Convert a WeChat article package (微信公众号正文.html) into blog Markdown.

Usage:
    python tools/wechat_to_md.py <微信公众号正文.html> <out.md>

The article body is the <section id="article-body"> element. Each block
style used by the WeChat build maps to one Markdown construct:

    body paragraph            -> paragraph (<br> -> hard break, <br><br> -> new paragraph)
    <h2>                      -> ## heading
    figure section            -> ![alt](images/x.png "caption")
    blue note box             -> ::: note ... :::
    grey prompt box           -> ::: prompt <label> ... :::
    model summary card        -> ::: card ... :::
    reference list            -> ### <label> + bullet links
    HeliumSpace footer        -> dropped (the site has its own footer)
"""
import re
import sys
from html.parser import HTMLParser

VOID = {"br", "img", "hr", "meta", "link", "input"}


class Node:
    def __init__(self, tag, attrs, parent=None):
        self.tag = tag
        self.attrs = dict(attrs)
        self.children = []
        self.parent = parent

    @property
    def style(self):
        return self.attrs.get("style", "")


class TreeBuilder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#root", [])
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs, self.cur)
        self.cur.children.append(node)
        if tag not in VOID:
            self.cur = node

    def handle_startendtag(self, tag, attrs):
        self.cur.children.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.children.append(data)


def find(node, pred):
    if isinstance(node, Node):
        if pred(node):
            return node
        for c in node.children:
            r = find(c, pred)
            if r is not None:
                return r
    return None


def text_of(node):
    if isinstance(node, str):
        return node
    if node.tag == "br":
        return "\n"
    return "".join(text_of(c) for c in node.children)


def escape(text):
    text = text.replace("\\", "\\\\")
    for ch in "*_`[]<":
        text = text.replace(ch, "\\" + ch)
    return text


def inline(node):
    """Inline Markdown for a node's children; <br> becomes '\n'."""
    out = []
    for c in node.children:
        if isinstance(c, str):
            out.append(escape(c))
        elif c.tag == "br":
            out.append("\n")
        elif c.tag in ("strong", "b"):
            inner = inline(c)
            out.append(f"**{inner}**" if inner.strip() else inner)
        elif c.tag in ("em", "i"):
            inner = inline(c)
            out.append(f"*{inner}*" if inner.strip() else inner)
        elif c.tag == "a":
            out.append(f"[{inline(c)}]({c.attrs.get('href', '')})")
        else:
            out.append(inline(c))
    return "".join(out)


def guard_line_start(line):
    # Keep a literal leading '#', '>', '-', '+' or '1.' from becoming syntax.
    if re.match(r"^(#|>|[-+] |\d+\. )", line):
        return "\\" + line
    return line


def paragraph(node):
    """A body <p> -> list of Markdown paragraphs."""
    raw = inline(node)
    paras = []
    for chunk in re.split(r"\n\s*\n", raw):
        lines = [guard_line_start(l.strip()) for l in chunk.split("\n")]
        lines = [l for l in lines if l]
        if lines:
            paras.append("  \n".join(lines))
    return paras


def block(node):
    """One child of #article-body -> list of Markdown blocks."""
    if isinstance(node, str):
        return [node.strip()] if node.strip() else []
    st = node.style
    if node.tag == "h2":
        return ["## " + inline(node).strip()]
    if node.tag == "h3":
        return ["### " + inline(node).strip()]
    if node.tag == "p":
        if "border-top" in st and "margin:35px" in st:
            return []  # HeliumSpace footer
        return paragraph(node)
    if node.tag == "section":
        img = find(node, lambda n: n.tag == "img")
        if img is not None and st.startswith("margin:22px"):
            cap_node = find(node, lambda n: n.tag == "p")
            caption = text_of(cap_node).strip() if cap_node else ""
            alt = img.attrs.get("alt", "").replace("]", "\\]")
            cap = caption.replace('"', "&quot;")
            return [f'![{alt}]({img.attrs.get("src", "")} "{cap}")']
        if "background:#f0f8fe" in st:
            inner = [b for c in node.children for b in block(c)]
            return ["::: note\n" + "\n\n".join(inner) + "\n:::"]
        if "background:#f5f7f9" in st:
            ps = [c for c in node.children if isinstance(c, Node) and c.tag == "p"]
            label = text_of(ps[0]).strip() if ps else ""
            body = "\n".join(text_of(p) for p in ps[1:]).strip("\n")
            lines = [guard_line_start(escape(l.strip())) for l in body.split("\n")]
            return [f"::: prompt {label}\n" + "  \n".join(l for l in lines if l) + "\n:::"]
        if "background:#f5f8fb" in st:
            inner = [b for c in node.children for b in block(c)]
            return ["::: card\n" + "\n\n".join(inner) + "\n:::"]
        if "margin-top:30px" in st and "border-top" in st:
            label = ""
            links = []
            for c in node.children:
                if isinstance(c, str) and c.strip() and not label:
                    label = c.strip()
                elif isinstance(c, Node) and c.tag == "a":
                    links.append(f"- [{inline(c)}]({c.attrs.get('href', '')})")
            return [f"### {label}\n\n" + "\n".join(links)]
        return [b for c in node.children for b in block(c)]
    return paragraph(node)


def convert(html):
    tb = TreeBuilder()
    tb.feed(html)
    body = find(tb.root, lambda n: n.attrs.get("id") == "article-body")
    if body is None:
        raise SystemExit("no <section id=\"article-body\"> found")
    blocks = [b for c in body.children for b in block(c)]
    return "\n\n".join(blocks).strip() + "\n"


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    src, out = sys.argv[1], sys.argv[2]
    md = convert(open(src, encoding="utf-8").read())
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write(md)
    print(f"wrote {out}: {len(md)} chars")
