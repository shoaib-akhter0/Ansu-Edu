/* Ansu Edu Support Hub: frontend behaviour */

// ---- Contact details: replace these with the real ones ----
const CONTACT = {
  email: "info@ansuedu.pk",
};

// ---- Services (from the official profile) ----
// tags: apply | academic | career | skills | care
const SERVICES = [
  { letter: "A", title: "University Admission Services", tags: ["apply", "academic"], items: [
    "Admission form submission for all Pakistani universities",
    "University admission guidance",
    "Online application support",
    "Document uploading assistance",
  ]},
  { letter: "B", title: "Scholarship Services", tags: ["apply", "academic"], items: [
    "Scholarship form submission",
    "Scholarship application guidance",
    "Required document assistance",
    "Online scholarship application support",
  ]},
  { letter: "C", title: "Job & Internship Application Services", tags: ["apply", "career"], items: [
    "Government job applications",
    "Private job applications",
    "Online job form filling",
    "National & international internship form submission",
    "Application submission guidance",
  ]},
  { letter: "D", title: "CV, Resume & Cover Letter Services", tags: ["career"], items: [
    "CV writing",
    "Resume writing",
    "ATS-friendly resume support",
    "Professional cover letters",
  ]},
  { letter: "E", title: "Assignment & Academic Writing Services", tags: ["academic"], items: [
    "Soft (typed) assignment writing",
    "Handwritten assignment writing",
    "Academic writing support",
    "Assignment formatting assistance",
  ]},
  { letter: "F", title: "Presentation Designing Services", tags: ["academic", "career"], items: [
    "PowerPoint presentation design",
    "Academic presentations",
    "Business presentations",
    "Professional presentation support",
  ]},
  { letter: "G", title: "Online Course Services", tags: ["apply", "skills"], items: [
    "National online course registration",
    "International online course registration",
    "Online course access support",
    "Course application guidance",
  ]},
  { letter: "H", title: "Internship Services", tags: ["apply", "career"], items: [
    "National internship applications",
    "International internship applications",
    "Internship form submission",
    "Internship application guidance",
  ]},
  { letter: "I", title: "Professional Digital Services", tags: ["career", "skills"], items: [
    "Professional email setup",
    "LinkedIn support",
    "Professional networking guidance",
    "Social media marketing",
  ]},
  { letter: "J", title: "Research Assistance", tags: ["academic"], items: [
    "Research assistance",
    "Academic project support",
    "Research tools guidance",
    "Research-related assistance",
  ]},
  { letter: "K", title: "Technology & Digital Skills Services", tags: ["skills"], items: [
    "UI/UX design",
    "Web development",
    "AI engineering",
    "Python & SQL support",
    "Online computer skills classes",
  ]},
  { letter: "L", title: "Individual Mentorship & Computer Courses", tags: ["skills", "care"], items: [
    "One-to-one mentorship around your schedule",
    "Computer course classes for KIU & UOB students",
    "Online computer skills classes",
  ]},
  { letter: "M", title: "Home Tuition Services", tags: ["academic", "care"], items: [
    "Home tuition service",
    "Finding a suitable teacher",
    "Subject-based learning support",
    "Individual learning assistance",
  ]},
  { letter: "N", title: "Disability Student Support", tags: ["care", "apply"], items: [
    "Disability student support",
    "Educational guidance",
    "Online application assistance",
    "Digital learning support",
  ]},
];

// ---- Team (excluding the founder, who is featured separately) ----
const TEAM = [
  ["Lalah Rukh", "Social Media Marketing"],
  ["Dua Ali", "Scholarship & Online Course Form Submission"],
  ["Karrar Hussain", "Web Developer (Frontend & Backend)"],
  ["Kashif Hussain", "Web Developer (Frontend & Backend)"],
  ["Faiyaz Ahmed", "UI/UX Designer"],
  ["Kainat Fatima", "CV, Resume & Cover Letter Services"],
  ["Lala Naseeb", "Disability Student Support"],
  ["Masooma Zehra", "Handwritten Assignment Writer"],
  ["Syed Aizaz Hassan", "Python & SQL"],
  ["Muhammad Taqi", "Admission, Job & Internship Form Submission"],
  ["Misbah Jabeen", "PowerPoint Presentation Designer"],
  ["Muhammad Nazeem", "Research Assistant"],
  ["Shoaib Akhtar", "AI Engineer"],
  ["Sania Zehra", "Soft Assignment Writer"],
];

// Muted, earthy avatar colours so the team list doesn't look like a template
const AVATAR_COLOURS = ["#1f4d3a", "#8a5a1f", "#3d5a73", "#6b3f4f", "#4f6b3a", "#5a4a7a", "#7a4a2a"];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const revealObserver = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" })
  : null;

function observeReveals(elements) {
  if (!revealObserver) return;
  elements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${index % 4 * 65}ms`);
    revealObserver.observe(element);
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function highlight(text, query) {
  const safe = escapeHtml(text);
  if (!query) return safe;
  const pattern = new RegExp("(" + query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
  return safe.replace(pattern, "<mark>$1</mark>");
}

function initials(name) {
  const parts = name.split(" ").filter(Boolean);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/* ---------- Mobile nav ---------- */
const toggle = $(".nav-toggle");
const nav = $("#site-nav");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
});
$$("a", nav).forEach(a => a.addEventListener("click", () => {
  toggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
}));

/* ---------- Services ---------- */
const grid = $("#services-grid");
const searchInput = $("#service-search");
const noResults = $("#no-results");
let activeFilter = "all";

function renderServices() {
  const q = searchInput.value.trim();
  const ql = q.toLowerCase();

  const visible = SERVICES.filter(s => {
    const matchesFilter = activeFilter === "all" || s.tags.includes(activeFilter);
    const haystack = (s.title + " " + s.items.join(" ")).toLowerCase();
    return matchesFilter && (!ql || haystack.includes(ql));
  });

  grid.innerHTML = visible.map(s => `
    <article class="service">
      <div class="service-top">
        <span class="service-letter" aria-hidden="true">${s.letter}</span>
        <h3>${highlight(s.title, q)}</h3>
      </div>
      <ul>${s.items.map(i => `<li>${highlight(i, q)}</li>`).join("")}</ul>
      <button type="button" class="service-link" data-service="${escapeHtml(s.title)}">Request this service</button>
    </article>
  `).join("");

  noResults.hidden = visible.length > 0;
  observeReveals($$(".service", grid));
}

searchInput.addEventListener("input", renderServices);

$$(".chip").forEach(chip => chip.addEventListener("click", () => {
  $$(".chip").forEach(c => c.classList.remove("is-active"));
  chip.classList.add("is-active");
  activeFilter = chip.dataset.filter;
  renderServices();
}));

renderServices();

/* ---------- Team ---------- */
$("#team-grid").innerHTML = TEAM.map(([name, role], i) => `
  <li class="member">
    <span class="avatar" style="background:${AVATAR_COLOURS[i % AVATAR_COLOURS.length]}" aria-hidden="true">${initials(name)}</span>
    <div>
      <h3>${escapeHtml(name)}</h3>
      <p>${escapeHtml(role)}</p>
    </div>
  </li>
`).join("");

observeReveals($$(".section-head, .facts-grid > div, .purpose-list li, .step, .who-grid article, .founder, .member, .commitment, .contact-grid > *"));

/* ---------- Contact details ---------- */
$$('[data-contact="email"]').forEach(a => { a.href = "mailto:" + CONTACT.email; a.textContent = CONTACT.email; });

/* ---------- Request form ---------- */
const form = $("#request-form");
const serviceSelect = $("#f-service");
const status = $("#form-status");

SERVICES.forEach(s => serviceSelect.add(new Option(s.title, s.title)));
serviceSelect.add(new Option("Something else / not sure", "Other"));

function preselectService(name) {
  serviceSelect.value = name;
  const field = serviceSelect.closest(".field");
  field.classList.remove("has-error");
  serviceSelect.classList.remove("flash");
  void serviceSelect.offsetWidth; // restart animation
  serviceSelect.classList.add("flash");
}

// "Request this service" buttons and hero quick links
document.addEventListener("click", e => {
  const trigger = e.target.closest("[data-service]");
  if (!trigger || trigger.tagName === "OPTION") return;
  e.preventDefault();
  preselectService(trigger.dataset.service);
  $("#contact").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => $("#f-name").focus({ preventScroll: true }), 500);
});

function setError(input, message) {
  const field = input.closest(".field");
  let err = $(".error", field);
  if (message) {
    field.classList.add("has-error");
    if (!err) { err = document.createElement("span"); err.className = "error"; field.appendChild(err); }
    err.textContent = message;
    input.setAttribute("aria-invalid", "true");
  } else {
    field.classList.remove("has-error");
    if (err) err.remove();
    input.removeAttribute("aria-invalid");
  }
}

function validate() {
  let firstBad = null;
  const checks = [
    [form.name, v => v.length >= 2 || "Please enter your name."],
    [form.phone, v => /^[+\d][\d\s-]{9,}$/.test(v) || "Please enter a valid phone number."],
    [form.email, v => !v || /^\S+@\S+\.\S+$/.test(v) || "That email doesn't look right."],
    [form.service, v => !!v || "Please choose a service."],
    [form.message, v => v.length >= 10 || "Please tell us a little more (at least 10 characters)."],
  ];
  checks.forEach(([input, rule]) => {
    const result = rule(input.value.trim());
    setError(input, result === true ? "" : result);
    if (result !== true && !firstBad) firstBad = input;
  });
  if (firstBad) firstBad.focus();
  return !firstBad;
}

$$("input, select, textarea", form).forEach(el =>
  el.addEventListener("input", () => { if (el.closest(".has-error")) setError(el, ""); })
);

form.addEventListener("submit", e => {
  e.preventDefault();
  status.textContent = "";
  status.className = "form-status";
  if (!validate()) return;

  const data = Object.fromEntries(new FormData(form));
  const text =
    `Assalam o Alaikum, I'd like support from Ansu Edu Support Hub.\n\n` +
    `Name: ${data.name}\nPhone: ${data.phone}\n` +
    (data.email ? `Email: ${data.email}\n` : "") +
    `Service: ${data.service}\n\n${data.message}`;

  const subject = `Ansu support request: ${data.service}`;
  window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

  status.textContent = `Thank you, ${data.name.split(" ")[0]}. Your request is ready in your email app. Send the draft to complete your request.`;
  status.classList.add("ok");
  form.reset();
});

$("#year").textContent = new Date().getFullYear();
