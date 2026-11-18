/* ==========================================================
   ✏️  HOMEPAGE CONTENT
   Every `image: null` is an image slot. Drop a file into
   /public/images/ and put its path here, e.g. "/images/slide-cathlab.jpg".
   Until then a branded placeholder is shown.
   ========================================================== */

export type Slide = {
  eyebrow: string;
  title: string;
  titleItalic: string;
  text: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Wide banner photo, ideally 1920 × 900. */
  image: string | null;
  /** Optional portrait cut-out shown on the right (used for the doctor slide). */
  portrait?: string | null;
  tone: "wine" | "cream" | "maroon";
};

export const slides: Slide[] = [
  {
    eyebrow: "24 × 7 Cath Lab",
    title: "Every minute",
    titleItalic: "saves heart muscle.",
    text: "Heart attack care around the clock: primary angioplasty, ICCU and a cardiac team on call day and night.",
    cta: { label: "Emergency helpline", href: "tel" },
    secondary: { label: "Interventional cardiology", href: "/services/interventional-cardiology" },
    image: "/images/slide-cathlab.jpg",
    tone: "wine",
  },
  {
    eyebrow: "Led by Dr. (Prof.) Ranjan Shetty",
    title: "20+ years of",
    titleItalic: "interventional cardiology.",
    text: "Complex angioplasty, TAVI, LAA closure and structural heart care from one of India's most experienced cardiologists.",
    cta: { label: "Book a consultation", href: "/contact#book" },
    secondary: { label: "Meet our doctors", href: "/doctors" },
    image: "/images/slide-clinic.jpg",
    portrait: "/images/doctor.jpg",
    tone: "cream",
  },
  {
    eyebrow: "Preventive heart checkups",
    title: "Know your heart",
    titleItalic: "before it warns you.",
    text: "ECG, Echo, TMT and blood work in one morning, with every report explained by a cardiologist the same day.",
    cta: { label: "View packages", href: "#packages" },
    secondary: { label: "Book a checkup", href: "/contact?service=Preventive%20Heart%20Checkup#book" },
    image: "/images/slide-checkup.jpg",
    tone: "maroon",
  },
  {
    eyebrow: "Non-invasive diagnostics",
    title: "Precise tests,",
    titleItalic: "same-day reports.",
    text: "Digital ECG, colour Doppler 2D Echo, computerised TMT, Holter and 24-hour BP monitoring under one roof.",
    cta: { label: "Explore diagnostics", href: "/services/diagnostics" },
    secondary: { label: "Pre-test instructions", href: "/resources#prep" },
    image: "/images/slide-diagnostics.jpg",
    tone: "wine",
  },
];

export const promo = {
  text: "Free BP & ECG screening every Sunday, 10 AM – 1 PM",
  link: { label: "Reserve a slot", href: "/contact#book" },
};

/* Icon keys map to components/home/HomeIcons.tsx */
export const specialities = [
  { name: "Preventive Cardiology", icon: "shield", href: "/services/preventive-cardiology" },
  { name: "Interventional Cardiology", icon: "catheter", href: "/services/interventional-cardiology#angioplasty" },
  { name: "Primary Angioplasty", icon: "bolt", href: "/services/interventional-cardiology#primary-angioplasty" },
  { name: "Coronary Angiography", icon: "vessel", href: "/services/interventional-cardiology#angiography" },
  { name: "Structural Heart & TAVI", icon: "valve", href: "/services/interventional-cardiology" },
  { name: "Pacemaker & Devices", icon: "pacemaker", href: "/services/interventional-cardiology#pacemaker" },
  { name: "Heart Failure Clinic", icon: "heart", href: "/services/preventive-cardiology#heart-failure" },
  { name: "Hypertension Clinic", icon: "gauge", href: "/services/preventive-cardiology#hypertension" },
  { name: "ECG & 2D Echo", icon: "ecg", href: "/services/diagnostics#ecg-echo" },
  { name: "Treadmill Test (TMT)", icon: "run", href: "/services/diagnostics#tmt" },
  { name: "Holter & ABPM", icon: "watch", href: "/services/diagnostics#holter" },
  { name: "Peripheral Vascular", icon: "leg", href: "/services/interventional-cardiology" },
] as const;

export const centres = [
  {
    name: "Cardiac Emergency & Cath Lab",
    text: "Primary angioplasty for heart attacks, 24 × 7 × 365, with a monitored cardiac care unit.",
    href: "/services/interventional-cardiology",
    image: "/images/centre-emergency.jpg" as string | null,
  },
  {
    name: "Heart Diagnostics Centre",
    text: "ECG, colour Doppler Echo, TMT, Holter and ABPM with reports explained the same day.",
    href: "/services/diagnostics",
    image: "/images/centre-diagnostics.jpg" as string | null,
  },
  {
    name: "Preventive Heart Clinic",
    text: "Blood pressure, cholesterol, diabetes and lifestyle risk, managed long before an emergency.",
    href: "/services/preventive-cardiology",
    image: "/images/centre-preventive.jpg" as string | null,
  },
];

export const facilities = [
  { name: "24 × 7 Cardiac Emergency", icon: "siren" },
  { name: "Advanced Cath Lab", icon: "catheter" },
  { name: "Cardiac Care Unit (ICCU)", icon: "bed" },
  { name: "Ambulance Coordination", icon: "ambulance" },
  { name: "Echo & TMT Lab", icon: "ecg" },
  { name: "In-house Laboratory", icon: "flask" },
  { name: "Pharmacy", icon: "pill" },
  { name: "Cashless Insurance & TPA", icon: "card" },
] as const;

// ⚠️ Replace these with your real numbers before going live.
export const stats = [
  { value: 20, suffix: "+", label: "Years of cardiac expertise" },
  { value: 10000, suffix: "+", label: "Patients cared for" },
  { value: 24, suffix: "×7", label: "Cath Lab & emergency" },
];

// ⚠️ SAMPLE ARTICLES. Replace with real posts (title, image, link) when your blog is ready.
export const articles = [
  { tag: "Emergency", title: "Heart attack or acidity? Signs you should never ignore", excerpt: "Chest discomfort that spreads to the arm, jaw or back, with sweating or breathlessness, needs an ECG within minutes.", image: "/images/article-chest-pain.jpg" as string | null, href: "/resources#symptoms", author: "TARA Cardiology Team" },
  { tag: "Prevention", title: "At what age should you get your first heart checkup?", excerpt: "For most people from 35, and earlier with diabetes, high BP, smoking or a family history of heart disease.", image: "/images/article-first-checkup.jpg" as string | null, href: "/services/preventive-cardiology", author: "TARA Cardiology Team" },
  { tag: "Diagnostics", title: "ECG, Echo or TMT: which test does your heart need?", excerpt: "Each test answers a different question. Here is how cardiologists decide which one to order, and why.", image: "/images/article-ecg.jpg" as string | null, href: "/services/diagnostics", author: "TARA Cardiology Team" },
];

// ⚠️ Paste YouTube video IDs of genuine patient stories (the part after "watch?v=").
export const stories = [
  { youtubeId: null as string | null, title: "Back home five days after a midnight heart attack", detail: "Primary angioplasty" },
  { youtubeId: null as string | null, title: "Living fully again after LAA closure", detail: "Structural heart" },
  { youtubeId: null as string | null, title: "How we finally got my BP under control", detail: "Hypertension clinic" },
];

export const whyUs = [
  { title: "Cath Lab ready, day and night", text: "A 24 × 7 team for primary angioplasty, so a heart attack is treated in minutes, not hours." },
  { title: "Senior cardiologist, every visit", text: "You are examined and counselled by an experienced cardiologist, not passed along." },
  { title: "Honest, evidence-based advice", text: "We test only what matters and recommend procedures only when they will genuinely help." },
  { title: "Everything under one roof", text: "Consultation, diagnostics, Cath Lab, ICCU and pharmacy in a single, easy-to-reach clinic." },
];
