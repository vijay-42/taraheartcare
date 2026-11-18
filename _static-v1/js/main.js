/* ==========================================================
   TARA Heart Care — site script
   ----------------------------------------------------------
   ✏️  EDIT YOUR CLINIC DETAILS HERE. Every page reads from this
   block, so you only have to change them once.
   ========================================================== */
const CLINIC = {
  name: "TARA Heart Care",
  tagline: "Advanced Cardiac Care",
  doctor: "Dr. [Cardiologist Name]",
  doctorQuals: "MBBS, MD (Medicine), DM (Cardiology)",
  emergencyPhone: "+91 00000 00000",   // 24/7 emergency line
  appointmentPhone: "+91 00000 00000", // OPD / appointments
  whatsapp: "910000000000",            // digits only, with country code
  email: "info@taraheartcare.com",
  address: "[Street Address], [Area], [City] – [PIN]",
  mapQuery: "TARA Heart Care",         // what Google Maps should search for
  hours: [
    ["Monday – Saturday", "9:00 AM – 1:00 PM"],
    ["", "5:00 PM – 9:00 PM"],
    ["Sunday", "10:00 AM – 1:00 PM"],
    ["Emergency & Cath Lab", "24 × 7"],
  ],
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    linkedin: "#",
  },
};

/* ---------- Icons ---------- */
const I = {
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/><polyline points="3.5 12 8 12 10 9 13 15 15 12 20.5 12"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 2.2 12C2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2A11.8 11.8 0 0 0 12 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.7c1.7.9 3.7 1.4 5.7 1.4 6.5 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6c0-.9.6-1 1-1h3V1h-4c-4 0-5 3-5 5v2H6v4h3v11h5V12h3.5l.5-4z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.5 3.6 12 3.6 12 3.6s-4.5 0-7.8.3c-.5.1-1.5.1-2.3 1C1.2 5.6 1 7.2 1 7.2S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.5 0 7.8-.3c.5-.1 1.5-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 14.9V8.4l6.1 3.3-6.1 3.2z"/></svg>',
  li: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg>',
};

const tel = (n) => "tel:" + n.replace(/[^\d+]/g, "");

/* ---------- Header ---------- */
function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  el.outerHTML = `
  <div class="emergency-bar" role="region" aria-label="Emergency helpline">
    <div class="container">
      <span class="pulse-dot" aria-hidden="true"></span>
      <span><span class="hide-sm">Chest pain or heart attack symptoms? </span>24/7 Emergency Helpline:</span>
      <a href="${tel(CLINIC.emergencyPhone)}">${CLINIC.emergencyPhone}</a>
    </div>
  </div>
  <header class="site-header">
    <div class="container nav">
      <a href="index.html" class="logo" aria-label="${CLINIC.name} home">
        <span class="logo-mark">${I.heart}</span>
        <span><span class="tara">TARA</span> Heart Care<small>${CLINIC.tagline}</small></span>
      </a>
      <nav aria-label="Main">
        <ul class="nav-menu" id="nav-menu">
          <li><button class="nav-close" aria-label="Close menu">${I.close}</button></li>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li class="has-dropdown">
            <button aria-expanded="false" aria-haspopup="true">Services ${I.chev}</button>
            <ul class="dropdown">
              <li><a href="services.html">All Services<small>Overview of our cardiac care</small></a></li>
              <li><a href="preventive-cardiology.html">Preventive &amp; General Cardiology<small>BP, cholesterol, heart failure, checkups</small></a></li>
              <li><a href="diagnostics.html">Non-Invasive Diagnostics<small>ECG, Echo, TMT, Holter, ABPM</small></a></li>
              <li><a href="interventional-cardiology.html">Interventional Cardiology<small>Cath Lab, angioplasty, pacemakers</small></a></li>
            </ul>
          </li>
          <li><a href="resources.html">Patient Resources</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </nav>
      <div class="nav-cta">
        <a href="${tel(CLINIC.appointmentPhone)}" class="btn btn-ghost">${I.phone} Call</a>
        <a href="contact.html#book" class="btn btn-primary">${I.calendar} Book Appointment</a>
        <button class="nav-toggle" aria-label="Open menu" aria-controls="nav-menu" aria-expanded="false">${I.menu}</button>
      </div>
    </div>
  </header>
  <div class="nav-overlay"></div>`;

  // Highlight active page
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach((a) => {
    if (a.getAttribute("href") === page) {
      a.classList.add("active");
      const dd = a.closest(".has-dropdown");
      if (dd) dd.querySelector("button").classList.add("active");
    }
  });
}

/* ---------- Footer ---------- */
function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  const hours = CLINIC.hours
    .map(([d, t]) => `<li>${d ? `<strong style="color:#fff">${d}</strong><br>` : ""}${t}</li>`)
    .join("");
  el.outerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="index.html" class="logo">
            <span class="logo-mark">${I.heart}</span>
            <span><span class="tara" style="color:#ff8a95">TARA</span> Heart Care<small>${CLINIC.tagline}</small></span>
          </a>
          <p>Comprehensive heart care, from prevention and diagnosis to emergency angioplasty, under one roof. Led by ${CLINIC.doctor}, ${CLINIC.doctorQuals}.</p>
          <div class="socials">
            <a href="${CLINIC.social.facebook}" aria-label="Facebook">${I.fb}</a>
            <a href="${CLINIC.social.instagram}" aria-label="Instagram">${I.ig}</a>
            <a href="${CLINIC.social.youtube}" aria-label="YouTube">${I.yt}</a>
            <a href="${CLINIC.social.linkedin}" aria-label="LinkedIn">${I.li}</a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Our Services</a></li>
            <li><a href="resources.html#expect">What to Expect</a></li>
            <li><a href="resources.html#insurance">Insurance &amp; TPA</a></li>
            <li><a href="resources.html#blog">Heart Health Blog</a></li>
            <li><a href="contact.html#book">Book Appointment</a></li>
          </ul>
        </div>
        <div>
          <h4>Working Hours</h4>
          <ul>${hours}</ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <ul class="f-contact">
            <li>${I.pin}<span>${CLINIC.address}</span></li>
            <li>${I.phone}<span>Emergency: <a href="${tel(CLINIC.emergencyPhone)}">${CLINIC.emergencyPhone}</a><br>Appointments: <a href="${tel(CLINIC.appointmentPhone)}">${CLINIC.appointmentPhone}</a></span></li>
            <li>${I.mail}<a href="mailto:${CLINIC.email}">${CLINIC.email}</a></li>
          </ul>
        </div>
      </div>
      <p class="disclaimer">The information on this website is for general awareness only and is not a substitute for professional medical advice. In a medical emergency, call our helpline or your nearest emergency service (108) immediately.</p>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${CLINIC.name}. All rights reserved.</span>
        <span>Reg. No: [Medical Council Reg. No.]</span>
      </div>
    </div>
  </footer>
  <div class="float-actions">
    <a href="https://wa.me/${CLINIC.whatsapp}" class="fa-whatsapp" aria-label="Chat on WhatsApp" target="_blank" rel="noopener">${I.whatsapp}</a>
    <a href="${tel(CLINIC.emergencyPhone)}" class="fa-call" aria-label="Call emergency">${I.phone}</a>
  </div>
  <nav class="mobile-bar" aria-label="Quick actions">
    <a href="contact.html#book">${I.calendar}Book</a>
    <a href="https://wa.me/${CLINIC.whatsapp}" class="mb-wa" target="_blank" rel="noopener">${I.whatsapp}WhatsApp</a>
    <a href="${tel(CLINIC.emergencyPhone)}" class="mb-call">${I.phone}Emergency</a>
  </nav>`;
}

/* ---------- Fill [data-clinic] placeholders in page content ---------- */
function fillClinicData() {
  document.querySelectorAll("[data-clinic]").forEach((el) => {
    const key = el.dataset.clinic;
    if (CLINIC[key] !== undefined) el.textContent = CLINIC[key];
  });
  document.querySelectorAll("[data-tel]").forEach((el) => {
    el.href = tel(CLINIC[el.dataset.tel]);
  });
  document.querySelectorAll("[data-hours]").forEach((tbl) => {
    tbl.innerHTML = CLINIC.hours
      .map(([d, t], i) => `<tr class="${i === CLINIC.hours.length - 1 ? "em" : ""}"><td>${d}</td><td>${t}</td></tr>`)
      .join("");
  });
  const map = document.getElementById("clinic-map");
  if (map) map.src = "https://www.google.com/maps?q=" + encodeURIComponent(CLINIC.mapQuery) + "&output=embed";
  const dir = document.getElementById("directions-link");
  if (dir) dir.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CLINIC.mapQuery);
  const email = document.getElementById("email-link");
  if (email) email.href = "mailto:" + CLINIC.email;
}

/* ---------- Mobile nav ---------- */
function initNav() {
  const menu = document.getElementById("nav-menu");
  const toggle = document.querySelector(".nav-toggle");
  const overlay = document.querySelector(".nav-overlay");
  const closeBtn = document.querySelector(".nav-close");
  if (!menu || !toggle) return;
  const set = (open) => {
    menu.classList.toggle("open", open);
    overlay.classList.toggle("show", open);
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => set(true));
  closeBtn.addEventListener("click", () => set(false));
  overlay.addEventListener("click", () => set(false));
  document.querySelectorAll(".has-dropdown > button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const li = btn.parentElement;
      const open = li.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  });
}

/* ---------- Hero slider ---------- */
function initSlider() {
  const slides = document.querySelectorAll(".hero .slide");
  const dotsWrap = document.querySelector(".slide-dots");
  if (slides.length < 2 || !dotsWrap) return;
  let i = 0, timer;
  slides.forEach((_, n) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Show slide ${n + 1}`);
    b.addEventListener("click", () => { go(n); restart(); });
    dotsWrap.appendChild(b);
  });
  const dots = dotsWrap.querySelectorAll("button");
  const go = (n) => {
    slides[i].classList.remove("active"); dots[i].classList.remove("active");
    i = n;
    slides[i].classList.add("active"); dots[i].classList.add("active");
  };
  const restart = () => { clearInterval(timer); timer = setInterval(() => go((i + 1) % slides.length), 6000); };
  go(0); restart();
}

/* ---------- Accordion ---------- */
function initAccordion() {
  document.querySelectorAll(".acc-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const panel = item.querySelector(".acc-panel");
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : 0;
    });
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}

/* ---------- Appointment form → WhatsApp ---------- */
function initBookingForm() {
  const form = document.getElementById("booking-form");
  if (!form) return;
  const date = form.querySelector("#date");
  if (date) date.min = new Date().toISOString().split("T")[0];

  // Pre-select a service if passed in the URL (?service=...)
  const svc = new URLSearchParams(location.search).get("service");
  if (svc) { const s = form.querySelector("#service"); if (s) s.value = svc; }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = Object.fromEntries(new FormData(form));
    const msg =
      `*New Appointment Request – ${CLINIC.name}*\n\n` +
      `Name: ${d.name}\nPhone: ${d.phone}\nAge: ${d.age || "-"}\n` +
      `Service: ${d.service}\nPreferred Date: ${d.date}\nPreferred Slot: ${d.slot}\n` +
      `Message: ${d.message || "-"}`;
    window.open(`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    document.getElementById("form-success").classList.add("show");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  fillClinicData();
  initNav();
  initSlider();
  initAccordion();
  initReveal();
  initBookingForm();
});
