// ---------- Mobile menu ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- Navbar background + active link ----------
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  let current = "home";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 160) current = s.id;
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + current)
  );
});

// ---------- Typing effect (edit the roles here) ----------
const roles = ["full-stack web apps", "AI-powered tools", "clean, responsive UIs"];
const typedEl = document.getElementById("typed");
let r = 0, c = 0, deleting = false;
function type() {
  const word = roles[r];
  typedEl.textContent = word.substring(0, c);
  if (!deleting && c < word.length) c++;
  else if (deleting && c > 0) c--;
  else if (!deleting) { deleting = true; return setTimeout(type, 1400); }
  else { deleting = false; r = (r + 1) % roles.length; }
  setTimeout(type, deleting ? 40 : 80);
}
type();

// ---------- Count-up numbers ----------
function countUp(el) {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || "";
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const timer = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(timer); }
    el.textContent = n + suffix;
  }, 40);
}

// ---------- Scroll reveal ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("show");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      observer.unobserve(e.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---------- Contact form ----------
// 1) Create a form at formspree.io and paste your ID below (the part after /f/).
// 2) Until you do, the form falls back to opening the visitor's email app.
const FORM_ID = "mqpqpkdv";
const MY_EMAIL = "mariyajoseph412@gmail.com";

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (FORM_ID === "YOUR_FORM_ID") {
    const name = document.getElementById("cName").value;
    const email = document.getElementById("cEmail").value;
    const msg = document.getElementById("cMsg").value;
    const body = encodeURIComponent(`${msg}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:${MY_EMAIL}?subject=Portfolio%20Message&body=${body}`;
    return;
  }

  statusEl.textContent = "Sending...";
  try {
    const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    if (res.ok) {
      statusEl.textContent = "Thanks! Your message has been sent.";
      form.reset();
    } else {
      const data = await res.json();
      statusEl.textContent = data.errors
        ? data.errors.map((err) => err.message).join(", ")
        : "Something went wrong. Please email me directly.";
    }
  } catch {
    statusEl.textContent = "Network error. Please try again.";
  }
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
// ---------- Skill tabs ----------
const tabs = document.querySelectorAll(".tab");
const tiles = document.querySelectorAll(".tile");
tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const f = tab.dataset.filter;
    tiles.forEach((t) => t.classList.toggle("hide", f !== "all" && t.dataset.cat !== f));
  })
);