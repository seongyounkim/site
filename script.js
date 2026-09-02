(() => {
  "use strict";

  const data = window.SITE_DATA;
  if (!data) {
    console.error("SITE_DATA is missing. Check that site-data.js loads before script.js.");
    return;
  }

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };

  const setText = (selector, value) => {
    const node = qs(selector);
    if (node && value !== undefined && value !== null) node.textContent = value;
  };

  const isEnabled = (item) => item && item.enabled !== false && Boolean(item.url);

  const iconFor = (name) => {
    const icons = {
      mail: "↗",
      file: "↓",
      external: "↗"
    };
    return icons[name] || "↗";
  };

  function populateMeta() {
    document.title = data.site.pageTitle || data.site.name;
    const meta = qs('meta[name="description"]');
    if (meta) meta.content = data.site.description || "";

    setText("#wordmark-mark", data.site.shortName);
    setText("#profile-monogram", data.site.shortName);
    setText("#wordmark-name", data.site.name);
    setText("#hero-title", data.site.name);
    setText("#hero-position", `${data.profile.position} · ${data.profile.affiliation}`);
    setText("#hero-headline", data.profile.headline);
    setText("#profile-position", data.profile.position);
    setText("#profile-affiliation", data.profile.affiliation);
    setText("#profile-location", data.profile.location);
    setText("#footer-name", data.site.name);
    setText("#footer-note", data.footer.note);
    setText("#last-updated", data.site.lastUpdated);
    setText("#current-year", new Date().getFullYear());

    const contact = qs("#contact-email");
    if (contact) {
      contact.textContent = data.profile.email;
      contact.href = `mailto:${data.profile.email}`;
    }

    const photo = qs("#profile-photo");
    const monogram = qs("#profile-monogram");
    if (data.profile.photo) {
      photo.src = data.profile.photo;
      photo.alt = data.profile.photoAlt || `Portrait of ${data.site.name}`;
      photo.hidden = false;
      monogram.hidden = true;
    }
  }

  function renderHeroLinks() {
    const root = qs("#hero-links");
    if (!root) return;

    data.links.filter(isEnabled).forEach((link) => {
      const anchor = el("a", `button-link${link.primary ? " primary" : ""}`);
      const href = link.url === "email" ? `mailto:${data.profile.email}` : link.url;
      anchor.href = href;
      anchor.textContent = link.label;
      if (!href.startsWith("mailto:") && !href.startsWith("#")) {
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
      }
      const icon = el("span", "link-icon", iconFor(link.icon));
      icon.setAttribute("aria-hidden", "true");
      anchor.append(icon);
      root.append(anchor);
    });
  }

  function renderBio() {
    const root = qs("#bio-copy");
    if (!root) return;
    data.profile.bio.forEach((paragraph) => root.append(el("p", "", paragraph)));
  }

  function renderResearch() {
    const root = qs("#research-grid");
    if (!root) return;

    data.researchThemes.forEach((theme) => {
      const card = el("article", "research-card reveal");
      card.append(el("span", "card-number", theme.number));
      card.append(el("h3", "", theme.title));
      card.append(el("p", "", theme.text));
      root.append(card);
    });
  }

  function renderNews() {
    const section = qs("#news");
    const root = qs("#news-list");
    const shouldShow = data.news && data.news.show && data.news.items?.length;
    if (!section || !root || !shouldShow) {
      if (section) section.hidden = true;
      return;
    }

    data.news.items.forEach((item) => {
      const row = el("article", "news-item reveal");
      row.append(el("time", "news-date", item.date));
      row.append(el("div", "news-text", item.text));
      if (item.url) {
        const link = el("a", "news-arrow", "↗");
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.setAttribute("aria-label", `Read more: ${item.text}`);
        row.append(link);
      }
      root.append(row);
    });
  }

  function renderPublications() {
    const root = qs("#publication-list");
    if (!root) return;

    data.publications.forEach((publication, index) => {
      const article = el("article", "publication-card reveal");

      const meta = el("div", "publication-meta");
      meta.append(el("span", "publication-year", publication.year));
      meta.append(el("span", "publication-type", publication.type));
      if (publication.featured) meta.append(el("span", "featured-badge", "Featured"));

      const content = el("div", "publication-content");
      const title = el("h3");
      const primaryUrl = publication.links?.[0]?.url || "";
      if (primaryUrl) {
        const titleLink = el("a", "", publication.title);
        titleLink.href = primaryUrl;
        titleLink.target = "_blank";
        titleLink.rel = "noreferrer";
        title.append(titleLink);
      } else {
        title.textContent = publication.title;
      }
      content.append(title);
      content.append(el("p", "publication-authors", publication.authors));
      content.append(el("p", "publication-venue", publication.venue));
      if (publication.summary) content.append(el("p", "publication-summary", publication.summary));

      const actions = el("div", "publication-actions");
      (publication.links || []).forEach((link) => {
        if (!link.url) return;
        const anchor = el("a", "text-link", link.label);
        anchor.href = link.url;
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
        actions.append(anchor);
      });

      let bibtexPanel = null;
      if (publication.bibtex) {
        const panelId = `bibtex-${index}`;
        const toggle = el("button", "bibtex-button", "BibTeX");
        toggle.type = "button";
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", panelId);
        actions.append(toggle);

        bibtexPanel = el("div", "bibtex-panel");
        bibtexPanel.id = panelId;
        const pre = el("pre");
        const code = el("code", "", publication.bibtex);
        const copy = el("button", "copy-bibtex", "Copy");
        copy.type = "button";
        copy.addEventListener("click", () => copyText(publication.bibtex));
        pre.append(code, copy);
        bibtexPanel.append(pre);

        toggle.addEventListener("click", () => {
          const isOpen = bibtexPanel.classList.toggle("open");
          toggle.setAttribute("aria-expanded", String(isOpen));
        });
      }

      content.append(actions);
      if (bibtexPanel) content.append(bibtexPanel);
      article.append(meta, content);
      root.append(article);
    });
  }

  function renderTalks() {
    const section = qs("#talks");
    const root = qs("#talks-list");
    const navLinks = qsa('[data-optional-nav="talks"]');
    const shouldShow = data.talks && data.talks.show && data.talks.items?.length;

    if (!shouldShow) {
      if (section) section.hidden = true;
      navLinks.forEach((link) => (link.hidden = true));
      return;
    }

    data.talks.items.forEach((talk) => {
      const item = el("article", "timeline-item reveal");
      item.append(el("time", "timeline-date", talk.date));
      const body = el("div");
      body.append(el("h3", "", talk.title));
      body.append(el("p", "", [talk.event, talk.location].filter(Boolean).join(" · ")));
      item.append(body);
      root.append(item);
    });
  }

  function renderTeaching() {
    const section = qs("#teaching");
    const root = qs("#teaching-list");
    const navLinks = qsa('[data-optional-nav="teaching"]');
    const shouldShow = data.teaching && data.teaching.show && data.teaching.items?.length;

    if (!shouldShow) {
      if (section) section.hidden = true;
      navLinks.forEach((link) => (link.hidden = true));
      return;
    }

    data.teaching.items.forEach((course) => {
      const item = el("article", "teaching-item reveal");
      item.append(el("div", "teaching-term", course.term));
      const courseBlock = el("div");
      const title = course.url ? el("a", "teaching-course", course.course) : el("span", "teaching-course", course.course);
      if (course.url) title.href = course.url;
      courseBlock.append(title, el("div", "publication-venue", course.institution));
      item.append(courseBlock, el("div", "teaching-role", course.role));
      root.append(item);
    });
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.append(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    showToast("BibTeX copied");
  }

  let toastTimeout;
  function showToast(message) {
    const toast = qs("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function initTheme() {
    const toggle = qs("#theme-toggle");
    if (!toggle) return;

    let saved = null;
    try {
      saved = localStorage.getItem("theme");
    } catch {
      // Some local or embedded previews block storage; the site still works without it.
    }
    const systemDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = saved || (systemDark ? "dark" : "light");
    document.documentElement.dataset.theme = initial;

    const syncLabel = () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", `Switch to ${next} theme`);
    };
    syncLabel();

    toggle.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Ignore storage errors in restricted preview environments.
      }
      syncLabel();
    });
  }

  function initMenu() {
    const button = qs("#menu-toggle");
    const nav = qs("#mobile-nav");
    if (!button || !nav) return;

    const close = () => {
      document.body.classList.remove("menu-open");
      button.setAttribute("aria-expanded", "false");
    };

    button.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("menu-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });

    qsa("a", nav).forEach((link) => link.addEventListener("click", close));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 940) close();
    });
  }

  function initHeader() {
    const header = qs(".site-header");
    const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initReveal() {
    const nodes = qsa(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.11, rootMargin: "0px 0px -40px" }
    );
    nodes.forEach((node) => observer.observe(node));
  }

  function initActiveNav() {
    const sections = qsa("main section[id]:not([hidden])");
    const navLinks = qsa('.desktop-nav a[href^="#"]');
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      { rootMargin: "-30% 0px -60%", threshold: [0.01, 0.25, 0.6] }
    );
    sections.forEach((section) => observer.observe(section));
  }

  populateMeta();
  renderHeroLinks();
  renderBio();
  renderResearch();
  renderNews();
  renderPublications();
  renderTalks();
  renderTeaching();
  initTheme();
  initMenu();
  initHeader();
  initReveal();
  initActiveNav();
})();
