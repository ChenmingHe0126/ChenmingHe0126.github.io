(function () {
  const projects = window.PROJECTS || [];

  function projectUrl(slug) {
    return `project.html?slug=${encodeURIComponent(slug)}`;
  }

  function renderGrid() {
    const grid = document.getElementById("project-grid");
    if (!grid) return;

    grid.innerHTML = projects.map((project) => `
      <a class="project-card" href="${projectUrl(project.slug)}">
        <img src="${project.image}" alt="${project.title}">
        <span>${project.title}</span>
      </a>
    `).join("");
  }

  function esc(value) {
    return String(value).replace(/[&<>"]/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
    }[c]));
  }

  function imgTag(slug, block) {
    return `<img src="assets/img/projects/${slug}/${block.f}" alt="" loading="lazy">`;
  }

  function isHeadingTag(g) {
    return g === "h2" || g === "h3" || g === "h4";
  }

  function titleHtml(text) {
    const parts = text.split(" | ");
    const head = esc(parts.shift());
    const rest = parts.length ? " | " + esc(parts.join(" | ")) : "";
    return `<h2 class="cs-title"><span class="cs-accent">${head}</span>${rest}</h2>`;
  }

  // Short intro line: bold the [Label] for bracket metadata, else bold-italic subtitle
  function introLine(text) {
    const m = /^\s*(\[[^\]]+\])([\s\S]*)$/.exec(text);
    if (m) return `<p class="cs-meta"><strong>${esc(m[1])}</strong>${esc(m[2])}</p>`;
    return `<p class="cs-subtitle">${esc(text)}</p>`;
  }

  // Paragraph (abstract / body): bold the [Label] if present
  function para(text) {
    const m = /^\s*(\[[^\]]+\])([\s\S]*)$/.exec(text);
    if (m) return `<p><strong>${esc(m[1])}</strong>${esc(m[2])}</p>`;
    return `<p>${esc(text)}</p>`;
  }

  function bodyHtml(slug, blocks) {
    const out = [];
    let i = 0;
    while (i < blocks.length) {
      const b = blocks[i];
      if (b.t === "img") {
        const run = [];
        while (i < blocks.length && blocks[i].t === "img") { run.push(blocks[i]); i++; }
        if (run.length === 1) {
          out.push(`<figure class="cs-figure">${imgTag(slug, run[0])}</figure>`);
        } else {
          out.push(`<div class="cs-gallery">${run.map((r) => `<figure>${imgTag(slug, r)}</figure>`).join("")}</div>`);
        }
      } else {
        if (isHeadingTag(b.g)) out.push(`<${b.g}>${esc(b.x)}</${b.g}>`);
        else if (b.g === "blockquote") out.push(`<blockquote>${esc(b.x)}</blockquote>`);
        else out.push(para(b.x));
        i++;
      }
    }
    return out.join("");
  }

  function renderProject() {
    const target = document.getElementById("project-detail");
    if (!target) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug") || projects[0]?.slug;
    const index = projects.findIndex((item) => item.slug === slug);
    const project = projects[index];

    if (!project) {
      target.innerHTML = `
        <div class="missing-state">
          <h1>Project not found</h1>
          <p>This local rebuild does not have that project entry yet.</p>
          <a class="text-link" href="index.html">Return to Projects</a>
        </div>
      `;
      return;
    }

    document.title = `${project.title} - Chenming He`;
    const blocks = (window.PROJECT_CONTENT || {})[slug] || [];

    // Leading images -> banner
    let i = 0;
    const banner = [];
    while (i < blocks.length && blocks[i].t === "img") { banner.push(blocks[i]); i++; }

    // Two-column intro: left = title + subtitle + metadata, right = abstract
    const left = [];
    const right = [];
    if (blocks[i] && blocks[i].g === "h2") {
      left.push(titleHtml(blocks[i].x));
      i++;
      while (i < blocks.length) {
        const b = blocks[i];
        if (b.t === "img" || isHeadingTag(b.g)) break;
        const t = b.x.trim();
        if (/^\[abstract/i.test(t)) break;             // marked abstract -> right column
        if (t[0] !== "[" && t.length >= 120) break;    // unmarked long paragraph -> abstract
        left.push(introLine(t));
        i++;
      }
      while (i < blocks.length) {
        const b = blocks[i];
        if (b.t === "img" || isHeadingTag(b.g)) break;
        right.push(para(b.x));
        i++;
      }
    } else {
      left.push(`<h2 class="cs-title"><span class="cs-accent">${esc(project.title)}</span></h2>`);
    }

    const bodyBlocks = banner.slice(1).concat(blocks.slice(i));

    let html = "";
    if (banner.length) html += `<figure class="cs-banner">${imgTag(slug, banner[0])}</figure>`;
    html += `<div class="cs-intro"><div class="cs-intro-main">${left.join("")}</div>`;
    if (right.length) html += `<aside class="cs-intro-aside">${right.join("")}</aside>`;
    html += `</div>`;
    if (bodyBlocks.length) html += `<div class="cs-body">${bodyHtml(slug, bodyBlocks)}</div>`;

    target.innerHTML = html;

    const pagination = document.getElementById("project-pagination");
    if (!pagination) return;

    const previous = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];
    pagination.innerHTML = `
      <a href="${projectUrl(previous.slug)}">Previous: ${esc(previous.title)}</a>
      <a href="${projectUrl(next.slug)}">Next: ${esc(next.title)}</a>
    `;
  }

  renderGrid();
  renderProject();
})();
