// ZikZak AI Landing Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Language Management
  const langButtons = document.querySelectorAll(".lang-btn");
  const elementsWithTranslation =
    document.querySelectorAll("[data-en][data-tr]");

  let currentLanguage = localStorage.getItem("zikzak-language") || "tr";

  // Initialize language
  setLanguage(currentLanguage);

  // Language button click handlers
  langButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedLang = this.getAttribute("data-lang");
      setLanguage(selectedLang);
      localStorage.setItem("zikzak-language", selectedLang);
    });
  });

  function setLanguage(lang) {
    currentLanguage = lang;

    // Update active button
    langButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
      }
    });

    // Update text content
    elementsWithTranslation.forEach((element) => {
      const text = element.getAttribute(`data-${lang}`);
      if (text) {
        element.textContent = text;
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang === "tr" ? "tr" : "en";

    // Update page title
    const titles = {
      en: "ZikZak AI - Smart Price Comparison",
      tr: "ZikZak AI - Akıllı Fiyat Karşılaştırma",
    };
    document.title = titles[lang];

    // Update meta description
    const descriptions = {
      en: "Find the best deals with AI-powered price comparison. Chat with ZikZak AI, scan barcodes, and discover amazing savings instantly.",
      tr: "AI destekli fiyat karşılaştırması ile en iyi fırsatları bulun. ZikZak AI ile sohbet edin, barkodları tarayın ve anında tasarruf keşfedin.",
    };
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", descriptions[lang]);
    }
  }

  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  mobileMenuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    this.classList.toggle("active");

    // Toggle hamburger/close icon
    const icon = this.querySelector("i");
    if (this.classList.contains("active")) {
      icon.className = "fas fa-times";
    } else {
      icon.className = "fas fa-bars";
    }
  });

  // Close mobile menu when clicking on links
  const navLinkItems = document.querySelectorAll(".nav-links a");
  navLinkItems.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      const icon = mobileMenuToggle.querySelector("i");
      icon.className = "fas fa-bars";
    });
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar background opacity on scroll
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });

  // Floating download button visibility
  const floatingDownload = document.querySelector(".floating-download");
  const downloadSection = document.querySelector("#download");

  window.addEventListener("scroll", function () {
    if (window.innerWidth <= 768) {
      const downloadSectionTop = downloadSection.getBoundingClientRect().top;
      if (downloadSectionTop > window.innerHeight) {
        floatingDownload.style.display = "block";
      } else {
        floatingDownload.style.display = "none";
      }
    }
  });

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Elements to animate
  const animateElements = document.querySelectorAll(
    ".feature-card, .step, .download-btn-large",
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Download button analytics tracking
  const downloadButtons = document.querySelectorAll(
    ".download-btn, .download-btn-large, .footer-download-btn, .floating-download-btn",
  );

  downloadButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Determine platform
      const platform =
        this.classList.contains("ios") || this.href.includes("apple")
          ? "iOS"
          : "Android";
      const location = this.closest(".hero")
        ? "Hero"
        : this.closest(".download-section")
          ? "Download Section"
          : this.closest(".footer")
            ? "Footer"
            : this.classList.contains("floating-download-btn")
              ? "Floating Button"
              : "Unknown";

      // Track download attempt
      if (typeof gtag !== "undefined") {
        gtag("event", "download_click", {
          platform: platform,
          location: location,
          language: currentLanguage,
        });
      }

      // For demo purposes, show alert instead of actual download
      e.preventDefault();
      const messages = {
        en: `Download for ${platform} will be available soon! Stay tuned.`,
        tr: `${platform} için indirme yakında kullanılabilir olacak! Takipte kalın.`,
      };
      alert(messages[currentLanguage]);
    });
  });

  // Phone mockup interaction
  const phoneMockup = document.querySelector(".phone-mockup");
  if (phoneMockup) {
    phoneMockup.addEventListener("mouseenter", function () {
      this.style.transform = "rotate(0deg) scale(1.02)";
    });

    phoneMockup.addEventListener("mouseleave", function () {
      this.style.transform = "rotate(5deg) scale(1)";
    });
  }

  // Chat simulation in phone mockup
  function simulateChat() {
    const chatMessages = document.querySelector(".chat-messages");
    if (!chatMessages) return;

    const messages = [
      {
        type: "user",
        en: "Find me the best iPhone deals",
        tr: "En iyi iPhone fırsatlarını bul",
      },
      {
        type: "ai",
        en: "Found 12 amazing deals for you!",
        tr: "Sizin için 12 harika fırsat buldum!",
      },
      { type: "user", en: "Show cheapest", tr: "En ucuzunu göster" },
      {
        type: "ai",
        en: "₺24,999 - 15% OFF at TechStore",
        tr: "₺24,999 - TechStore'da %15 İndirim",
      },
    ];

    let currentMessageIndex = 0;

    function addMessage() {
      if (currentMessageIndex >= messages.length) {
        currentMessageIndex = 0;
        setTimeout(() => {
          chatMessages.innerHTML = `
                        <div class="message ai">
                            <span data-en="I found 5 amazing deals for iPhone 15!" data-tr="iPhone 15 için 5 harika fırsat buldum!">
                                ${currentLanguage === "tr" ? "iPhone 15 için 5 harika fırsat buldum!" : "I found 5 amazing deals for iPhone 15!"}
                            </span>
                        </div>
                        <div class="message user">
                            <span data-en="Show me the cheapest" data-tr="En ucuzunu göster">
                                ${currentLanguage === "tr" ? "En ucuzunu göster" : "Show me the cheapest"}
                            </span>
                        </div>
                        <div class="message ai">
                            <div class="deal-card">
                                <span class="price">₺24,999</span>
                                <span class="discount">15% OFF</span>
                            </div>
                        </div>
                    `;
          setTimeout(addMessage, 3000);
        }, 1000);
        return;
      }

      const message = messages[currentMessageIndex];
      const messageEl = document.createElement("div");
      messageEl.className = `message ${message.type}`;
      messageEl.innerHTML = `<span>${message[currentLanguage]}</span>`;

      chatMessages.appendChild(messageEl);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      currentMessageIndex++;
      setTimeout(addMessage, 2000);
    }

    // Start simulation after a delay
    setTimeout(addMessage, 5000);
  }

  // Start chat simulation if on desktop
  if (window.innerWidth > 768) {
    simulateChat();
  }

  // Keyboard navigation support
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
        const icon = mobileMenuToggle.querySelector("i");
        icon.className = "fas fa-bars";
      }
    }
  });

  // Preload images for better performance
  const imagesToPreload = ["/og-image.png", "/favicon.ico"];

  imagesToPreload.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // Error handling for download links
  window.addEventListener("error", function (e) {
    console.error("Landing page error:", e.error);

    // Track errors if analytics is available
    if (typeof gtag !== "undefined") {
      gtag("event", "exception", {
        description: e.error?.message || "Unknown error",
        fatal: false,
      });
    }
  });

  // Performance monitoring
  window.addEventListener("load", function () {
    if (typeof gtag !== "undefined") {
      gtag("event", "page_load_time", {
        value: Math.round(performance.now()),
      });
    }
  });

  // Resize handler for responsive adjustments
  window.addEventListener("resize", function () {
    // Hide floating download on desktop
    if (window.innerWidth > 768) {
      floatingDownload.style.display = "none";
    }

    // Reset phone mockup transform on mobile
    if (window.innerWidth <= 768 && phoneMockup) {
      phoneMockup.style.transform = "none";
    }
  });

  // Initialize tooltips or additional interactive elements
  function initializeInteractivity() {
    // Add hover effects to statistics
    const stats = document.querySelectorAll(".stat");
    stats.forEach((stat) => {
      stat.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1)";
      });

      stat.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
      });
    });

    // Add click animation to feature cards
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card) => {
      card.addEventListener("click", function () {
        this.style.transform = "scale(0.98)";
        setTimeout(() => {
          this.style.transform = "translateY(-5px)";
        }, 150);
      });
    });
  }

  // Initialize all interactive features
  initializeInteractivity();

  // Console branding
  console.log(`
    🔥 ZikZak AI Landing Page
    ⚡ Smart Price Comparison
    🛍️ Built with modern web technologies

    Interested in joining our team?
    Contact us: careers@zik-zak.zuzu.dev
    `);
});

// Service Worker registration for PWA features (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("SW registered: ", registration);
      })
      .catch(function (registrationError) {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Smart Download Detection
function initSmartDownload() {
  const floatingBtn = document.querySelector(".floating-download-btn");
  const downloadBtns = document.querySelectorAll(
    ".download-btn, .download-btn-large",
  );

  if (!floatingBtn) return;

  // Detect user's device
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  // App store URLs
  const iosUrl = "https://apps.apple.com/tr/app/zik-zak/id1563425450";
  const androidUrl =
    "https://play.google.com/store/apps/details?id=dev.zuzu.zingo";

  // Update floating button based on device
  if (isAndroid) {
    floatingBtn.href = androidUrl;
    floatingBtn.innerHTML = `
      <i class="fab fa-google-play"></i>
      <span data-en="Get on Play Store" data-tr="Play Store'dan İndir">Play Store'dan İndir</span>
    `;
  } else {
    // Default to iOS (including desktop users)
    floatingBtn.href = iosUrl;
    floatingBtn.innerHTML = `
      <i class="fab fa-apple"></i>
      <span data-en="Get on App Store" data-tr="App Store'dan İndir">App Store'dan İndir</span>
    `;
  }

  // Apply language to new content
  const currentLanguage = localStorage.getItem("zikzak-language") || "tr";
  const newSpan = floatingBtn.querySelector("span");
  if (newSpan) {
    const text = newSpan.getAttribute(`data-${currentLanguage}`);
    if (text) {
      newSpan.textContent = text;
    }
  }
}

// Download Analytics Tracking
function trackDownload(platform, location) {
  // Track download events for analytics
  console.log(`Download tracked: ${platform} from ${location}`);

  // Google Analytics 4 (if implemented)
  if (typeof gtag !== "undefined") {
    gtag("event", "download_app", {
      platform: platform,
      location: location,
      app_name: "ZikZak AI",
    });
  }

  // Alternative analytics (Plausible, etc.)
  if (typeof plausible !== "undefined") {
    plausible("Download", {
      props: {
        platform: platform,
        location: location,
      },
    });
  }
}

// Add download tracking to all download buttons
function initDownloadTracking() {
  // Track main download buttons
  document
    .querySelectorAll(".download-btn.ios, .download-btn-large.ios")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        trackDownload("iOS", "main-buttons");
      });
    });

  document
    .querySelectorAll(".download-btn.android, .download-btn-large.android")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        trackDownload("Android", "main-buttons");
      });
    });

  // Track footer download buttons
  document.querySelectorAll(".footer-download-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const platform = btn.href.includes("apple.com") ? "iOS" : "Android";
      trackDownload(platform, "footer");
    });
  });

  // Track floating download button
  const floatingBtn = document.querySelector(".floating-download-btn");
  if (floatingBtn) {
    floatingBtn.addEventListener("click", () => {
      const platform = floatingBtn.href.includes("apple.com")
        ? "iOS"
        : "Android";
      trackDownload(platform, "floating-button");
    });
  }
}

// Initialize smart download when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initSmartDownload();
  initDownloadTracking();
});

// Export functions for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    setLanguage,
    simulateChat,
    initSmartDownload,
  };
}
