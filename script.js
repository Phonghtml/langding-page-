document.addEventListener("DOMContentLoaded", () => {
  // Current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Scroll reveal animation
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));

  // Back to top button
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 400);
  });
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Contact form validation
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  const fields = {
    name: {
      el: document.getElementById("name"),
      err: document.getElementById("nameError"),
      validate: (v) => (v.trim().length >= 2 ? "" : "ກະລຸນາໃສ່ຊື່ຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ"),
    },
    email: {
      el: document.getElementById("email"),
      err: document.getElementById("emailError"),
      validate: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "ອີເມວບໍ່ຖືກຕ້ອງ",
    },
    message: {
      el: document.getElementById("message"),
      err: document.getElementById("messageError"),
      validate: (v) => (v.trim().length >= 10 ? "" : "ຂໍ້ຄວາມຕ້ອງມີຢ່າງໜ້ອຍ 10 ຕົວອັກສອນ"),
    },
  };

  const checkField = (key) => {
    const { el, err, validate } = fields[key];
    const msg = validate(el.value);
    err.textContent = msg;
    el.classList.toggle("invalid", Boolean(msg));
    return !msg;
  };

  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener("input", () => checkField(key));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isValid = Object.keys(fields).map(checkField).every(Boolean);

    if (!isValid) {
      status.textContent = "";
      status.className = "status";
      return;
    }

    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "ກຳລັງສົ່ງ...";
    status.textContent = "";
    status.className = "status";

    // Simulated send (replace with real API call)
    setTimeout(() => {
      status.textContent = "ຂອບໃຈ! ຂໍ້ຄວາມຂອງທ່ານຖືກສົ່ງແລ້ວ.";
      status.className = "status success";
      form.reset();
      button.disabled = false;
      button.textContent = "ສົ່ງຂໍ້ຄວາມ";
      Object.keys(fields).forEach((key) => {
        fields[key].el.classList.remove("invalid");
        fields[key].err.textContent = "";
      });
    }, 1200);
  });
});
