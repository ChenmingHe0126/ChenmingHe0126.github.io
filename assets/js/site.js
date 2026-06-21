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

  function renderBlocks(slug, blocks) {
    let titleSeen = false;
    let subtitleSlot = false;
    return blocks.map((block) => {
      if (block.t === "img") {
        subtitleSlot = false;
        return `<figure class="cs-figure"><img src="assets/img/projects/${slug}/${block.f}" alt="" loading="lazy"></figure>`;
      }

      const isHeading = ["h2", "h3", "h4"].includes(block.g);
      const text = block.x;

      // Project title (first heading): accent-color the part before " | "
      if (block.g === "h2" && !titleSeen) {
        titleSeen = true;
        subtitleSlot = true;
        const parts = text.split(" | ");
        const head = esc(parts.shift());
        const rest = parts.length ? " | " + esc(parts.join(" | ")) : "";
        return `<h2><span class="cs-accent">${head}</span>${rest}</h2>`;
      }

      // Bracketed metadata lines: bold the [Label]
      const m = !isHeading && /^\s*(\[[^\]]+\])([\s\S]*)$/.exec(text);
      if (m) {
        subtitleSlot = false;
        const short = m[2].trim().length < 80;
        return `<p class="${short ? "cs-meta" : ""}"><strong>${esc(m[1])}</strong>${esc(m[2])}</p>`;
      }

      // Context line directly after the title: bold italic
      if (!isHeading && subtitleSlot) {
        subtitleSlot = false;
        return `<p class="cs-subtitle">${esc(text)}</p>`;
      }

      subtitleSlot = false;
      const tag = isHeading || block.g === "blockquote" ? block.g : "p";
      return `<${tag}>${esc(text)}</${tag}>`;
    }).join("");
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
    const content = (window.PROJECT_CONTENT || {})[slug] || [];
    const meta = [
      project.timeframe ? `<div><dt>Date</dt><dd>${esc(project.timeframe)}</dd></div>` : "",
      project.context ? `<div><dt>Context</dt><dd>${esc(project.context)}</dd></div>` : "",
      project.role ? `<div><dt>Role</dt><dd>${esc(project.role)}</dd></div>` : "",
    ].join("");

    const body = content.length
      ? renderBlocks(slug, content)
      : `<p>${esc(project.summary || "")}</p><p>${esc(project.details || "")}</p>`;

    target.innerHTML = `
      <header class="cs-head">
        ${project.category ? `<p class="project-kicker">${esc(project.category)}</p>` : ""}
        <h1>${esc(project.title)}</h1>
        ${meta ? `<dl class="project-meta">${meta}</dl>` : ""}
      </header>
      <div class="case-study">
        ${body}
      </div>
    `;

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
