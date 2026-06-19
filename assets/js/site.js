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
    target.innerHTML = `
      <div>
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div>
        <p class="project-kicker">${project.category}</p>
        <h1>${project.title}</h1>
        <dl class="project-meta">
          ${project.timeframe ? `<div><dt>Date</dt><dd>${project.timeframe}</dd></div>` : ""}
          ${project.context ? `<div><dt>Context</dt><dd>${project.context}</dd></div>` : ""}
          ${project.role ? `<div><dt>Role</dt><dd>${project.role}</dd></div>` : ""}
        </dl>
        <p>${project.summary}</p>
        <p>${project.details}</p>
      </div>
    `;

    const pagination = document.getElementById("project-pagination");
    if (!pagination) return;

    const previous = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];
    pagination.innerHTML = `
      <a href="${projectUrl(previous.slug)}">Previous: ${previous.title}</a>
      <a href="${projectUrl(next.slug)}">Next: ${next.title}</a>
    `;
  }

  renderGrid();
  renderProject();
})();
