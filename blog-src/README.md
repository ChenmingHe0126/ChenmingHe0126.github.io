# Blog sources

Every post on the **Blogs** tab is one folder here. Edit the Markdown here; don't edit `blogs.html` or `blog/*.html`, because the build overwrites them.

```
blog-src/<slug>/
  meta.json   title / summary / series in zh + en, date, part, links
  zh.md       Chinese body
  en.md       English body
  images/     original screenshots (PNG/JPG/GIF) + cover.png
```

## Add a new post (one per video)

1. Make the folder and copy the images and the wide cover in as `images/cover.png`:

   ```bash
   mkdir -p blog-src/<slug>/images
   ```

2. If the article already exists as a WeChat package (`微信公众号正文.html`), convert it:

   ```bash
   python tools/wechat_to_md.py "<path>/微信公众号正文.html" blog-src/<slug>/zh.md
   ```

3. Write `en.md` (a translation of `zh.md`). Keep the structure identical: same headings, the same `:::` blocks, and the same image paths.
4. Fill in `meta.json`. Copy an existing one and change the fields. `series_id` + `part` link posts of one series with Previous/Next. Put the Bilibili / YouTube / WeChat URLs in `links` once they exist (empty strings are hidden).
5. Build and preview:

   ```bash
   python tools/build_blog.py
   python -m http.server 8765
   ```

   Open http://127.0.0.1:8765/blogs.html, then commit and push.

## Markdown extras

| Write | Get |
|---|---|
| `![alt](images/x.png "caption")` on its own line | figure with caption (click to zoom) |
| `## 01 Heading` | section heading; a leading two-digit number is styled as a section number and listed in the contents sidebar |
| `::: note` … `:::` | highlighted remark |
| `::: card` … `:::` | bordered summary card |
| `::: prompt The prompt I used` … `:::` | the prompt typed to the AI, with its label |

The build converts PNG/JPG to WebP in `assets/blog/<slug>/` (GIFs are copied unchanged), adds `cover.jpg` for link previews, and fails loudly if an image path is wrong.

Language: the 中文 / EN switch remembers the reader's choice. A link can force a language with `?lang=zh` or `?lang=en`. Otherwise the browser language decides.
