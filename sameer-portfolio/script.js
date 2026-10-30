// Mobile menu toggle
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".desktop-nav");
if (toggle && nav) {
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }));
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open") && !nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  });
}

// Sticky header elevation on scroll
const header = document.querySelector(".site-header");
if (header) {
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// Reveal animation on scroll with subtle stagger
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, (index % 4) * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("is-visible"));
}

// Interactive subtle 3D card tilt for desktop devices
if (window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const cards = document.querySelectorAll(".project-card, .card-box");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// Animated counter for fact numbers on scroll
const factNumbers = document.querySelectorAll(".fact-number");
if (factNumbers.length && "IntersectionObserver" in window) {
  const factObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        factNumbers.forEach(el => {
          const text = el.textContent.trim();
          if (text === "03") {
            let count = 0;
            const timer = setInterval(() => {
              count++;
              el.textContent = count < 10 ? `0${count}` : `${count}`;
              if (count >= 3) clearInterval(timer);
            }, 120);
          } else if (text === "2028") {
            let year = 2024;
            const timer = setInterval(() => {
              year++;
              el.textContent = `${year}`;
              if (year >= 2028) clearInterval(timer);
            }, 60);
          }
        });
        factObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const factRow = document.querySelector(".fact-row");
  if (factRow) factObserver.observe(factRow);
}

// Contact form handling if present
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const alertBox = document.querySelector(".form-alert");
    const submitBtn = contactForm.querySelector(".form-submit");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }
    setTimeout(() => {
      if (alertBox) {
        alertBox.style.display = "block";
        alertBox.textContent = "Thank you! Your message has been received. I will get back to you shortly.";
      }
      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send message <span>↗</span>';
      }
    }, 700);
  });
}
