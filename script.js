// ZikZak AI Landing Page JavaScript
// Contract: language toggle (data-en/data-tr), mobile menu, scroll reveals,
// smart floating download, lightweight download tracking.

document.addEventListener("DOMContentLoaded", function () {
  // ---------- Language management ----------
  const langButtons = document.querySelectorAll(".lang-btn");
  const elementsWithTranslation = document.querySelectorAll("[data-en][data-tr]");

  const urlLang = new URLSearchParams(window.location.search).get("lang");
  const storedLang = localStorage.getItem("zikzak-language");
  const browserLang =
    (navigator.language || "tr").toLowerCase().indexOf("tr") === 0
      ? "tr"
      : "en";
  let currentLanguage =
    urlLang === "en" || urlLang === "tr"
      ? urlLang
      : storedLang === "en" || storedLang === "tr"
        ? storedLang
        : browserLang;
  if (urlLang === "en" || urlLang === "tr") {
    localStorage.setItem("zikzak-language", urlLang);
  }

  setLanguage(currentLanguage);

  langButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedLang = this.getAttribute("data-lang");
      setLanguage(selectedLang);
      localStorage.setItem("zikzak-language", selectedLang);
    });
  });

  function setLanguage(lang) {
    currentLanguage = lang;

    langButtons.forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-lang") === lang,
      );
    });

    elementsWithTranslation.forEach((element) => {
      const text = element.getAttribute(`data-${lang}`);
      if (text) {
        element.textContent = text;
      }
    });

    document.documentElement.lang = lang;

    const titles = {
      en: "ZikZak AI - Smart Price Comparison",
      tr: "ZikZak AI - Akıllı Fiyat Karşılaştırma",
    };
    document.title = titles[lang];

    const descriptions = {
      en: "Find the best deals with AI-powered price comparison. Chat with ZikZak AI, scan barcodes, and discover amazing savings instantly.",
      tr: "AI destekli fiyat karşılaştırması ile en iyi fırsatları bulun. ZikZak AI ile sohbet edin, barkodları tarayın ve anında tasarruf keşfedin.",
    };
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", descriptions[lang]);
    }
  }

  // ---------- Mobile menu ----------
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  function closeMobileMenu() {
    navLinks.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
    const icon = mobileMenuToggle.querySelector("i");
    if (icon) icon.className = "fas fa-bars";
  }

  mobileMenuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    this.classList.toggle("active");
    const icon = this.querySelector("i");
    icon.className = this.classList.contains("active")
      ? "fas fa-times"
      : "fas fa-bars";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  // ---------- Smooth scrolling for anchors ----------
  document
    .querySelectorAll('a[href^="#"]:not(.download-btn):not(.download-btn-large)')
    .forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#") return;
        e.preventDefault();
        const targetElement = document.getElementById(href.substring(1));
        if (!targetElement) return;
        const headerOffset = 84;
        const offsetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      });
    });

  // ---------- Navbar scrolled state ----------
  const navbar = document.querySelector(".navbar");
  function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  // ---------- Floating download button (mobile only) ----------
  const floatingDownload = document.querySelector(".floating-download");
  const downloadSection = document.querySelector("#download");

  function updateFloatingDownload() {
    if (window.innerWidth > 768) return;
    const sectionTop = downloadSection.getBoundingClientRect().top;
    floatingDownload.classList.toggle(
      "visible",
      sectionTop > window.innerHeight,
    );
  }
  window.addEventListener("scroll", updateFloatingDownload, { passive: true });
  window.addEventListener("resize", updateFloatingDownload);
  updateFloatingDownload();

  // Smart OS detection for the floating button
  const floatingBtn = document.querySelector(".floating-download-btn");
  if (floatingBtn) {
    const isAndroid = /Android/.test(navigator.userAgent);
    floatingBtn.href = isAndroid
      ? "https://play.google.com/store/apps/details?id=dev.zuzu.zingo"
      : "https://apps.apple.com/app/zik-zak/id1563425450";
  }

  // ---------- Reveal on scroll ----------
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  // ---------- Download tracking (non-blocking) ----------
  function trackDownload(platform, location) {
    if (typeof gtag !== "undefined") {
      gtag("event", "download_click", {
        platform: platform,
        location: location,
      });
    }
    if (typeof plausible !== "undefined") {
      plausible("Download", {
        props: { platform: platform, location: location },
      });
    }
  }

  document
    .querySelectorAll(
      ".download-btn, .download-btn-large, .floating-download-btn",
    )
    .forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          const platform = btn.href.includes("apple.com") ? "iOS" : "Android";
          const location = btn.classList.contains("floating-download-btn")
            ? "floating"
            : btn.closest(".download-section")
              ? "download-section"
              : btn.closest(".hero")
                ? "hero"
                : "unknown";
          trackDownload(platform, location);
        },
        { passive: true },
      );
    });

  // ---------- Console branding ----------
  console.log(
    "%cZikZak AI%c zuzu.dev — never overpay again.",
    "background:#ff5722;color:#fff;padding:4px 10px;border-radius:4px;font-weight:bold",
    "color:#ff5722;padding:4px 6px",
  );
});
