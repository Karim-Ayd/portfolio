document.documentElement.classList.remove("no-js");

// Theme (dark/light) + persist
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

function setTheme(theme) {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    if (toggle) toggle.innerHTML = "<span aria-hidden='true'>☼</span>";
  } else {
    root.removeAttribute("data-theme");
    if (toggle) toggle.innerHTML = "<span aria-hidden='true'>☾</span>";
  }
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
}

// Load saved theme if available
try {
  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved);
} catch (e) {}

// Toggle theme
toggle?.addEventListener("click", () => {
  const isLight = root.getAttribute("data-theme") === "light";
  setTheme(isLight ? "dark" : "light");
});

// Mobile Nav
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");

burger?.addEventListener("click", () => {
  mobileNav?.classList.toggle("show");
  const expanded = mobileNav?.classList.contains("show");
  mobileNav?.setAttribute("aria-hidden", expanded ? "false" : "true");
});

mobileNav?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileNav.classList.remove("show");
    mobileNav.setAttribute("aria-hidden", "true");
  });
});

// Reveal animations
const reveals = document.querySelectorAll(".reveal");

if (reveals.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => io.observe(el));
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Contact form -> mailto (no backend needed)
function sendMessage(e) {
  e.preventDefault();

  const name = document.getElementById("name")?.value.trim() || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const msg = document.getElementById("message")?.value.trim() || "";

  const subject = encodeURIComponent("Hello Karim");
  const body = encodeURIComponent(
    `Hi Karim,\n\nMy name is ${name} (${email}).\n\n${msg}\n\nBest regards,\n${name}`
  );


  window.location.href = `mailto:ayada.karim2@gmail.com?subject=${subject}&body=${body}`;
  return false;
}

window.sendMessage = sendMessage;

// Debug
console.log("script.js loaded ✅");
