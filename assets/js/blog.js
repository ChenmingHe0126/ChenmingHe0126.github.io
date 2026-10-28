(function () {
  const root = document.documentElement;

  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    root.lang = lang === "zh" ? "zh-CN" : "en";
    try { localStorage.setItem("blog-lang", lang); } catch (e) {}
    const title = document.body.getAttribute(`data-title-${lang}`);
    if (title) document.title = title;
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    }
    updateToc();
  }

  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-set-lang")));
  });

  // Highlight the section currently being read in the sticky contents list.
  let headings = [];
  let tocLinks = [];

  function updateToc() {
    const lang = root.getAttribute("data-lang");
    headings = Array.from(document.querySelectorAll(`.post-body[data-lang="${lang}"] h2[id]`));
    tocLinks = Array.from(document.querySelectorAll(`.post-toc ol[data-lang="${lang}"] a`));
    onScroll();
  }

  function onScroll() {
    if (!tocLinks.length) return;
    let current = 0;
    headings.forEach((h, i) => {
      if (h.getBoundingClientRect().top < window.innerHeight * 0.3) current = i;
    });
    tocLinks.forEach((a, i) => a.classList.toggle("is-active", i === current));
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  if (root.getAttribute("data-lang")) document.title = document.body.getAttribute(`data-title-${root.getAttribute("data-lang")}`) || document.title;
  updateToc();

  // Click a figure to see it full size.
  document.querySelectorAll(".post-figure img").forEach((img) => {
    img.addEventListener("click", () => {
      const box = document.createElement("div");
      box.className = "blog-lightbox";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-label", img.alt || "Image");
      const big = document.createElement("img");
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      box.appendChild(big);
      const close = () => {
        box.remove();
        document.removeEventListener("keydown", onKey);
      };
      const onKey = (e) => { if (e.key === "Escape") close(); };
      box.addEventListener("click", close);
      document.addEventListener("keydown", onKey);
      document.body.appendChild(box);
    });
  });
})();
