"""Build the Blogs tab from Markdown sources.

    python tools/build_blog.py

Reads   blog-src/<slug>/meta.json, zh.md, en.md, images/
Writes  blogs.html                      (index, newest first)
        blog/<slug>.html                (one bilingual page per post)
        assets/blog/<slug>/*            (WebP copies of PNG/JPG, GIFs as-is, cover.jpg for link previews)

Markdown is plain Python-Markdown plus three fenced blocks:

    ::: note            highlighted remark
    ::: card            bordered summary card
    ::: prompt <label>  a prompt typed to the AI, with a small label

An image paragraph  ![alt](images/x.png "caption")  becomes a <figure> with that caption.
"""
import html
import json
import re
import shutil
from datetime import date
from pathlib import Path

import markdown
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "blog-src"
OUT_POSTS = ROOT / "blog"
OUT_ASSETS = ROOT / "assets" / "blog"
SITE_URL = "https://chenminghe0126.github.io"
LANGS = ("zh", "en")
HTML_LANG = {"zh": "zh-CN", "en": "en"}
WEBP_QUALITY = 88

UI = {
    "all_posts": {"zh": "← 全部文章", "en": "← All posts"},
    "contents": {"zh": "目录", "en": "Contents"},
    "read": {"zh": "阅读全文", "en": "Read"},
    "min": {"zh": "{n} 分钟阅读", "en": "{n} min read"},
    "part": {"zh": "第 {n} 篇", "en": "Part {n}"},
    "prev": {"zh": "上一篇", "en": "Previous"},
    "next": {"zh": "下一篇", "en": "Next"},
    "blogs_intro": {
        "zh": "每期视频的图文版：AI、编程与设计工具的真实使用记录。",
        "en": "Written versions of my videos: hands-on notes on AI, coding and design tools.",
    },
    "also_on": {"zh": "同步发布于", "en": "Also published on"},
    "video": {"zh": "观看视频", "en": "Watch the video"},
    "links": {"wechat": {"zh": "微信公众号", "en": "WeChat"}, "bilibili": {"zh": "B站视频", "en": "Bilibili"}, "youtube": {"zh": "YouTube", "en": "YouTube"}},
}

NAV = [
    ("index.html", "Projects", None),
    ("demos.html", "Demos", None),
    ("blogs.html", "Blogs", "blogs"),
    ("publications.html", "Publications", None),
    ("cv.html", "CV", None),
    ("https://www.food4rhino.com/en/app/deadfish", "DeadFish", None),
    ("contact.html", "Contact", None),
]

# Social icons are copied from demos.html so every page keeps the same links.
SOCIAL = re.search(r'<nav class="social-nav"[^>]*>(.*?)\n\s*</nav>',
                   (ROOT / "demos.html").read_text(encoding="utf-8"), re.S).group(1)

# Runs in <head> before first paint so the page never flashes the wrong language.
LANG_BOOT = """<script>
(function () {
  var q = new URLSearchParams(location.search).get("lang"), s = null;
  try { s = localStorage.getItem("blog-lang"); } catch (e) {}
  var l = q === "zh" || q === "en" ? q : s === "zh" || s === "en" ? s : (navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en";
  document.documentElement.setAttribute("data-lang", l);
  document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
})();
</script>"""

ESC = html.escape


def both(d, tag="span", cls=""):
    """Markup that shows d['zh'] or d['en'] depending on the active language."""
    c = f' class="{cls}"' if cls else ""
    return "".join(f'<{tag}{c} data-lang="{l}" lang="{HTML_LANG[l]}">{d[l]}</{tag}>' for l in LANGS)


def header(prefix, active):
    links = []
    for href, label, key in NAV:
        ext = href.startswith("http")
        url = href if ext else prefix + href
        extra = ' target="_blank" rel="noreferrer"' if ext else ""
        cur = ' aria-current="page"' if key == active else ""
        links.append(f'        <a href="{url}"{extra}{cur}>{label}</a>')
    return f"""    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="site-header-inner">
      <a class="site-title" href="{prefix}index.html">Chenming He</a>
      <nav class="site-nav" aria-label="Primary navigation">
{chr(10).join(links)}
      </nav>
      <nav class="social-nav" aria-label="Social links">{SOCIAL}
      </nav>
      </div>
    </header>"""


def lang_switch():
    return """<div class="lang-switch" role="group" aria-label="Language">
          <button type="button" data-set-lang="zh" lang="zh-CN">中文</button>
          <button type="button" data-set-lang="en" lang="en">EN</button>
        </div>"""


# ---------------------------------------------------------------- images

def convert_images(slug, src_dir):
    """Return {source filename: (published filename, width, height)}."""
    out_dir = OUT_ASSETS / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    table = {}
    for f in sorted(src_dir.iterdir()):
        if f.suffix.lower() not in (".png", ".jpg", ".jpeg", ".gif", ".webp"):
            continue
        name = f.name if f.suffix.lower() in (".gif", ".webp") else f.stem + ".webp"
        dst = out_dir / name
        if not dst.exists() or dst.stat().st_mtime < f.stat().st_mtime:
            if name == f.name:
                shutil.copy2(f, dst)
            else:
                with Image.open(f) as im:
                    im = im.convert("RGBA") if im.mode in ("P", "LA") else im
                    im.save(dst, "WEBP", quality=WEBP_QUALITY, method=6)
        with Image.open(dst) as im:
            table[f.name] = (name, im.width, im.height)
    return table


def cover_jpg(slug, src):
    """JPEG copy of the cover for og:image (some link previewers skip WebP)."""
    dst = OUT_ASSETS / slug / "cover.jpg"
    if not dst.exists() or dst.stat().st_mtime < src.stat().st_mtime:
        with Image.open(src) as im:
            im.convert("RGB").save(dst, "JPEG", quality=86, optimize=True, progressive=True)
    return f"{SITE_URL}/assets/blog/{slug}/cover.jpg"


# ---------------------------------------------------------------- markdown

BLOCK_RE = re.compile(r"^::: *(note|card|prompt)(?:[ \t]+([^\n]*))?\n(.*?)\n:::[ \t]*$", re.M | re.S)
FIG_RE = re.compile(r'<p><img alt="([^"]*)" src="images/([^"]+)"(?: title="([^"]*)")? ?/?></p>')
H2_RE = re.compile(r"<h2>(.*?)</h2>")


def md_to_html(text):
    return markdown.markdown(text, extensions=["sane_lists"], output_format="html")


def render_body(md_text, lang, slug, images):
    """Markdown -> (body html, toc entries, text length for read time)."""
    blocks = {}

    def stash(m):
        kind, label, inner = m.group(1), (m.group(2) or "").strip(), m.group(3)
        inner_html = md_to_html(inner)
        if kind == "note":
            out = f'<aside class="post-note">{inner_html}</aside>'
        elif kind == "card":
            out = f'<div class="post-card">{inner_html}</div>'
        else:
            out = (f'<div class="post-prompt"><div class="post-prompt-label">{ESC(label)}</div>'
                   f'<div class="post-prompt-body">{inner_html}</div></div>')
        key = f"BLOCKSTASH{len(blocks)}X"
        blocks[key] = out
        return f"\n\n{key}\n\n"

    body = md_to_html(BLOCK_RE.sub(stash, md_text))
    for key, out in blocks.items():
        body = body.replace(f"<p>{key}</p>", out)

    def figure(m):
        alt, name, cap = m.group(1), m.group(2), m.group(3) or ""
        if name not in images:
            raise SystemExit(f"{slug}/{lang}.md: image not found: images/{name}")
        pub, w, h = images[name]
        return (f'<figure class="post-figure"><img src="../assets/blog/{slug}/{pub}" alt="{alt}" '
                f'width="{w}" height="{h}" loading="lazy" decoding="async">'
                + (f"<figcaption>{cap}</figcaption>" if cap else "") + "</figure>")

    body = FIG_RE.sub(figure, body)
    if "<img" in body.replace('<img src="../assets/blog/', ""):
        raise SystemExit(f"{slug}/{lang}.md: an image was not turned into a figure (put it on its own line)")

    toc = []

    def heading(m):
        inner = m.group(1)
        anchor = f"{lang}-s{len(toc) + 1}"
        plain = re.sub(r"<[^>]+>", "", inner)
        num = re.match(r"^(\d{2})\s+(.*)$", inner, re.S)
        if num:
            inner = f'<span class="sec-num">{num.group(1)}</span>{num.group(2)}'
            plain = re.sub(r"<[^>]+>", "", num.group(2))
        toc.append((anchor, html.unescape(plain)))
        return f'<h2 id="{anchor}">{inner}</h2>'

    body = H2_RE.sub(heading, body)
    body = re.sub(r'<a href="(https?://[^"]+)">', r'<a href="\1" target="_blank" rel="noopener">', body)

    plain = re.sub(r"<[^>]+>", " ", body)
    if lang == "zh":
        minutes = len(re.findall(r"[一-鿿]", plain)) / 400
    else:
        minutes = len(re.findall(r"[A-Za-z0-9']+", plain)) / 220
    return body, toc, max(1, round(minutes))


# ---------------------------------------------------------------- pages

def page(title, description, prefix, active, main, extra_head="", body_attrs=""):
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{title}</title>
    <meta name="description" content="{description}">
    <link rel="stylesheet" href="{prefix}assets/css/site.css">
    <link rel="stylesheet" href="{prefix}assets/css/blog.css">
{extra_head}    {LANG_BOOT}
  </head>
  <body data-page="blogs"{body_attrs}>
{header(prefix, active)}

{main}
    <script src="{prefix}assets/js/blog.js"></script>
  </body>
</html>
"""


def fmt_date(d, lang):
    y, m, dd = (int(x) for x in d.split("-"))
    return f"{y} 年 {m} 月 {dd} 日" if lang == "zh" else f"{date(y, m, dd):%B} {dd}, {y}"


def skeleton(md_text):
    """The parts zh.md and en.md must share: headings, ::: blocks, images and link targets, in order."""
    return {
        "headings": re.findall(r"^(#{2,3}) ", md_text, re.M),
        "blocks": re.findall(r"^::: *(note|card|prompt)\b", md_text, re.M),
        "images": re.findall(r"!\[[^\]]*\]\((images/[^ )]+)", md_text),
        "links": re.findall(r"(?<!!)\[[^\]]*\]\((https?://[^)\s]+)\)", md_text),
    }


def check_parallel(slug, md):
    a, b = skeleton(md["zh"]), skeleton(md["en"])
    bad = [k for k in a if a[k] != b[k]]
    if bad:
        detail = "; ".join(f"{k}: zh {len(a[k])} vs en {len(b[k])}" for k in bad)
        raise SystemExit(f"{slug}: zh.md and en.md differ in structure ({detail})")


def load_posts():
    posts = []
    for meta_file in sorted(SRC.glob("*/meta.json")):
        d = meta_file.parent
        meta = json.loads(meta_file.read_text(encoding="utf-8"))
        meta["slug"] = d.name
        meta["dir"] = d
        meta["md"] = {l: (d / f"{l}.md").read_text(encoding="utf-8") for l in LANGS if (d / f"{l}.md").exists()}
        if set(meta["md"]) != set(LANGS):
            raise SystemExit(f"{d.name}: needs both zh.md and en.md (found {sorted(meta['md'])})")
        check_parallel(d.name, meta["md"])
        posts.append(meta)
    # newest first; parts of the same series and day in reading order
    posts.sort(key=lambda p: (p["date"], -p.get("part", 0)), reverse=True)
    return posts


def series_neighbours(post, posts):
    sid = post.get("series_id")
    if not sid:
        return None, None
    same = sorted((p for p in posts if p.get("series_id") == sid), key=lambda p: p.get("part", 0))
    i = same.index(post)
    return (same[i - 1] if i > 0 else None), (same[i + 1] if i + 1 < len(same) else None)


def build_post(post, posts):
    slug = post["slug"]
    images = convert_images(slug, post["dir"] / "images")
    cover_name = Path(post["cover"]).name
    cover_pub, cw, ch = images[cover_name]
    og_image = cover_jpg(slug, post["dir"] / "images" / cover_name)

    bodies, tocs, mins = {}, {}, {}
    for l in LANGS:
        bodies[l], tocs[l], mins[l] = render_body(post["md"][l], l, slug, images)

    t, s = post["title"], post["summary"]
    kicker = {l: ESC(post["series"][l]) + (" · " + UI["part"][l].format(n=post["part"]) if post.get("part") else "") for l in LANGS}
    meta_line = {l: f'{fmt_date(post["date"], l)} · {UI["min"][l].format(n=mins[l])}' for l in LANGS}

    link_btns = []
    for key in ("bilibili", "youtube", "wechat"):
        url = (post.get("links") or {}).get(key)
        if url:
            link_btns.append(f'<a class="post-link-btn" href="{ESC(url)}" target="_blank" rel="noopener">{both(UI["links"][key])}</a>')
    links_html = f'            <p class="post-links">{"".join(link_btns)}</p>' if link_btns else ""

    toc_html = "".join(
        f'<ol data-lang="{l}" lang="{HTML_LANG[l]}">' + "".join(f'<li><a href="#{a}">{ESC(x)}</a></li>' for a, x in tocs[l]) + "</ol>"
        for l in LANGS)

    prev_p, next_p = series_neighbours(post, posts)
    nav_items = []
    if prev_p:
        nav_items.append(f'<a class="post-series-prev" href="{prev_p["slug"]}.html"><small>{both(UI["prev"])}</small>{both({l: ESC(prev_p["title"][l]) for l in LANGS})}</a>')
    if next_p:
        nav_items.append(f'<a class="post-series-next" href="{next_p["slug"]}.html"><small>{both(UI["next"])}</small>{both({l: ESC(next_p["title"][l]) for l in LANGS})}</a>')
    series_nav = f'            <nav class="post-series" aria-label="Series">{"".join(nav_items)}</nav>' if nav_items else ""

    main = f"""    <main id="main" class="page-shell blog-shell">
      <div class="post-topbar">
        <a class="back-link" href="../blogs.html">{both(UI["all_posts"])}</a>
        {lang_switch()}
      </div>
      <article class="post">
        <header class="post-hero">
          <figure class="post-cover"><img src="../assets/blog/{slug}/{cover_pub}" alt="" width="{cw}" height="{ch}"></figure>
          <div class="post-hero-text">
            <p class="post-kicker">{both(kicker)}</p>
            <h1>{both({l: ESC(t[l]) for l in LANGS})}</h1>
            <p class="post-dek">{both({l: ESC(s[l]) for l in LANGS})}</p>
            <p class="post-meta">{both(meta_line)}</p>
{links_html}
          </div>
        </header>
        <div class="post-layout">
          <nav class="post-toc" aria-label="Contents"><p class="post-toc-title">{both(UI["contents"])}</p>{toc_html}</nav>
          <div class="post-main">
            <div class="post-body" data-lang="zh" lang="zh-CN">
{bodies["zh"]}
            </div>
            <div class="post-body" data-lang="en" lang="en">
{bodies["en"]}
            </div>
{series_nav}
          </div>
        </div>
      </article>
    </main>"""

    url = f"{SITE_URL}/blog/{slug}.html"
    head = f"""    <link rel="canonical" href="{url}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="{ESC(t['en'])} | {ESC(t['zh'])}">
    <meta property="og:description" content="{ESC(s['en'])}">
    <meta property="og:image" content="{og_image}">
    <meta property="og:url" content="{url}">
    <meta name="twitter:card" content="summary_large_image">
"""
    title = f"{ESC(t['zh'])} · {ESC(t['en'])} - Chenming He"
    attrs = f' data-title-zh="{ESC(t["zh"])} - Chenming He" data-title-en="{ESC(t["en"])} - Chenming He"'
    OUT_POSTS.mkdir(exist_ok=True)
    (OUT_POSTS / f"{slug}.html").write_text(page(title, ESC(s["en"]), "../", "blogs", main, head, attrs), encoding="utf-8", newline="\n")
    post["_cover"] = (cover_pub, cw, ch)
    post["_mins"] = mins
    return slug


def build_index(posts):
    cards = []
    for p in posts:
        pub, w, h = p["_cover"]
        kicker = {l: ESC(p["series"][l]) + (" · " + UI["part"][l].format(n=p["part"]) if p.get("part") else "") for l in LANGS}
        meta_line = {l: f'{fmt_date(p["date"], l)} · {UI["min"][l].format(n=p["_mins"][l])}' for l in LANGS}
        cards.append(f"""        <a class="blog-card" href="blog/{p['slug']}.html">
          <div class="blog-card-cover"><img src="assets/blog/{p['slug']}/{pub}" alt="" width="{w}" height="{h}" loading="lazy"></div>
          <div class="blog-card-text">
            <p class="post-kicker">{both(kicker)}</p>
            <h2>{both({l: ESC(p['title'][l]) for l in LANGS})}</h2>
            <p class="blog-card-dek">{both({l: ESC(p['summary'][l]) for l in LANGS})}</p>
            <p class="post-meta">{both(meta_line)}</p>
          </div>
        </a>""")
    main = f"""    <main id="main" class="page-shell blog-shell">
      <section class="blog-intro">
        <div>
          <h1>Blogs</h1>
          <p>{both(UI["blogs_intro"])}</p>
        </div>
        {lang_switch()}
      </section>
      <section class="blog-list" aria-label="Posts">
{chr(10).join(cards)}
      </section>
    </main>"""
    head = f'    <link rel="canonical" href="{SITE_URL}/blogs.html">\n'
    (ROOT / "blogs.html").write_text(
        page("Blogs - Chenming He", "Blog posts by Chenming He on AI, coding and design tools, in Chinese and English.", "", "blogs", main, head),
        encoding="utf-8", newline="\n")


def main():
    posts = load_posts()
    for p in posts:
        print("built blog/" + build_post(p, posts) + ".html")
    build_index(posts)
    print(f"built blogs.html ({len(posts)} posts)")


if __name__ == "__main__":
    main()
