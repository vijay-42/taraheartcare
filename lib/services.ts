export type ServiceItem = {
  id: string;
  title: string;
  summary: string;
  points: string[];
  meta: string[];
  urgent?: boolean;
};

export type Service = {
  slug: string;
  index: string;
  title: string;
  titleItalic: string;
  short: string;
  intro: string;
  bullets: string[];
  items: ServiceItem[];
  faqs: { q: string; a: string }[];
  bookingService: string;
};

export const services: Service[] = [
  {
    slug: "preventive-cardiology",
    index: "01",
    title: "Preventive &",
    titleItalic: "General Cardiology",
    short: "Find the risk early and control it, long before it becomes an emergency.",
    intro:
      "Most heart attacks give years of quiet warning through blood pressure, cholesterol, sugar and lifestyle. We read those signals early and build a plan you can actually live with.",
    bullets: ["Hypertension & cholesterol", "Heart failure clinic", "Preventive checkup packages"],
    bookingService: "Preventive Heart Checkup",
    items: [
      {
        id: "hypertension",
        title: "Hypertension & Cholesterol Management",
        summary:
          "High BP and cholesterol are silent: no symptoms until they damage the heart, brain or kidneys. We confirm the real numbers, then treat with the fewest medicines that work.",
        points: [
          "24-hour ambulatory BP to rule out “white-coat” readings",
          "Lipid profile with 10-year cardiovascular risk score",
          "Personalised medication with minimal side effects",
          "Diet, exercise and weight plans for Indian lifestyles",
          "Diabetes and thyroid co-management",
        ],
        meta: ["OPD consultation", "Ongoing care"],
      },
      {
        id: "heart-failure",
        title: "Heart Failure Clinic",
        summary:
          "Heart failure means the heart isn't pumping as strongly as it should. With structured care, most patients breathe easier, stay out of hospital and live longer.",
        points: [
          "Echo-guided assessment of ejection fraction",
          "Guideline-directed therapy, optimised step by step",
          "Fluid, salt and daily weight monitoring",
          "Evaluation for CRT / ICD devices",
          "Education for patients and families",
        ],
        meta: ["Regular follow-up", "Device evaluation"],
      },
      {
        id: "checkup",
        title: "Preventive Heart Checkup Packages",
        summary:
          "Recommended for everyone above 35, or earlier with diabetes, high BP, smoking or a family history of heart disease. One morning, all reports explained.",
        points: [],
        meta: ["Same-day reports", "Fasting required"],
      },
    ],
    faqs: [
      { q: "At what age should I get my first heart checkup?", a: "From 35 for most people, or from 25–30 if you have diabetes, high BP, smoke, are overweight, or a close relative had heart disease at a young age." },
      { q: "Do I need to fast before the checkup?", a: "Yes: 10–12 hours of fasting for blood tests. Plain water is fine. Continue your regular BP or heart medicines unless told otherwise." },
      { q: "Can high BP be controlled without lifelong medicine?", a: "Sometimes. Early or mild hypertension can respond well to salt reduction, weight loss and exercise. We will tell you honestly whether medicine is needed." },
    ],
  },
  {
    slug: "diagnostics",
    index: "02",
    title: "Non-Invasive",
    titleItalic: "Diagnostics",
    short: "Painless, precise tests that show exactly how your heart is working.",
    intro:
      "No needles, no radiation for most tests, and most reports ready the same day. Each one is reviewed and explained by the cardiologist, not just handed over.",
    bullets: ["ECG & 2D Echo", "Treadmill stress test", "Holter & ABPM"],
    bookingService: "Diagnostic Test",
    items: [
      {
        id: "ecg-echo",
        title: "ECG & 2D Echocardiography",
        summary:
          "An ECG reads your heart's electrical rhythm in under five minutes. A colour Doppler Echo is an ultrasound that shows pumping strength, valves and heart size in real time.",
        points: [
          "Evaluates chest pain, breathlessness, palpitations and murmurs",
          "Essential before surgery and in heart-failure follow-up",
          "Adult and paediatric Echo",
        ],
        meta: ["ECG · 5 min", "Echo · 20–30 min", "Same-day report"],
      },
      {
        id: "tmt",
        title: "Treadmill Test (TMT) / Stress Test",
        summary:
          "You walk on a treadmill that gets gradually faster and steeper while we watch your ECG, heart rate and BP. It shows whether the heart gets enough blood under strain, which is a key screen for blocked arteries.",
        points: [
          "Screening for coronary artery disease",
          "Measures exercise capacity and fitness",
          "Supervised throughout, with full emergency backup",
        ],
        meta: ["30–45 min", "Wear walking shoes"],
      },
      {
        id: "holter",
        title: "Holter Monitoring & Ambulatory BP (ABPM)",
        summary:
          "A small device worn for 24–48 hours records every heartbeat or BP reading through your normal day and night. It catches what a five-minute test can miss.",
        points: [
          "Irregular heartbeats, palpitations, unexplained fainting",
          "Confirms true hypertension and fine-tunes medication",
          "Lightweight, so you carry on with your normal routine",
        ],
        meta: ["24–48 hours", "Return next day"],
      },
    ],
    faqs: [
      { q: "Is a 2D Echo safe?", a: "Completely. It uses ultrasound, the same technology used in pregnancy scans, with no radiation and no needles." },
      { q: "Can a normal ECG rule out heart disease?", a: "Not always. A resting ECG can be normal even with blocked arteries. That's why a TMT, Echo or further tests may be advised based on your symptoms." },
      { q: "Can I bathe while wearing a Holter?", a: "No, the device must stay dry. Please bathe before your appointment and wear loose clothing." },
    ],
  },
  {
    slug: "interventional-cardiology",
    index: "03",
    title: "Interventional",
    titleItalic: "Cardiology",
    short: "Our Cath Lab is ready day and night to open blocked arteries and save heart muscle.",
    intro:
      "Image-guided procedures through a pinhole in the wrist or groin, with no open surgery. For a heart attack, this is the fastest way to restore blood flow, and our team is on call 24 × 7 × 365.",
    bullets: ["Coronary angiography", "Angioplasty & stenting", "Primary angioplasty · Pacemakers"],
    bookingService: "Angiography / Angioplasty Opinion",
    items: [
      {
        id: "angiography",
        title: "Coronary Angiography (Radial / Femoral)",
        summary:
          "The gold-standard test for blockages. A fine catheter travels from the wrist (radial) or groin (femoral) to the heart, and contrast dye maps every artery on X-ray.",
        points: [
          "Local anaesthesia, so you stay awake and comfortable",
          "Wrist approach: walk within hours, less bleeding",
          "Findings explained to you and family right after",
        ],
        meta: ["20–30 min", "Often same-day discharge"],
      },
      {
        id: "angioplasty",
        title: "Angioplasty & Stenting (PTCA)",
        summary:
          "A tiny balloon opens the narrowed artery and a drug-eluting stent holds it open, restoring blood flow without open-heart surgery.",
        points: [
          "Latest-generation drug-eluting stents",
          "Intravascular imaging for complex cases [if available]",
          "Most patients are back to routine within a week",
        ],
        meta: ["1–2 day stay", "Cashless insurance"],
      },
      {
        id: "primary-angioplasty",
        title: "Primary Angioplasty: Heart Attack Care",
        summary:
          "In a heart attack an artery is suddenly blocked and muscle begins to die within minutes. Primary angioplasty opens it immediately. It is the most effective treatment there is, and every minute saved matters.",
        points: [
          "Cath Lab team on call 24 × 7 × 365",
          "Call ahead: we pre-alert the team before you arrive",
          "Guideline target: artery open within 90 minutes of arrival",
        ],
        meta: ["Emergency", "Round the clock"],
        urgent: true,
      },
      {
        id: "pacemaker",
        title: "Pacemaker & Device Implantation",
        summary:
          "When the heart beats too slowly or dangerously fast, a small device under the skin keeps the rhythm safe.",
        points: [
          "Single & dual-chamber pacemakers (MRI-compatible options)",
          "ICD: protection from sudden cardiac arrest",
          "CRT: better pumping in advanced heart failure",
          "Device follow-up and programming clinic",
        ],
        meta: ["Local anaesthesia", "2–3 day stay"],
      },
    ],
    faqs: [
      { q: "Is angiography painful?", a: "No. Only a small area of the wrist or groin is numbed. Most patients feel a brief warmth when the dye is injected, nothing more." },
      { q: "Will I need a stent after angiography?", a: "Only if there's a significant blockage that is best treated that way. Many patients need medicines alone. We'll discuss the findings with you before any decision." },
      { q: "What should I do if I think I'm having a heart attack?", a: "Call our emergency line immediately, chew one 300 mg aspirin if you're not allergic, and don't drive yourself. Every minute counts." },
    ],
  },
];

export const packages = [
  { name: "Essential", price: "₹ [Price]", tests: ["Cardiologist consultation", "ECG", "Fasting blood sugar", "Lipid profile", "BP & BMI assessment"] },
  { name: "Comprehensive", price: "₹ [Price]", featured: true, tests: ["Everything in Essential", "2D Echocardiography", "Treadmill test (TMT)", "HbA1c, kidney & thyroid", "Diet consultation"] },
  { name: "Executive", price: "₹ [Price]", tests: ["Everything in Comprehensive", "24-hr Holter monitoring", "hs-CRP & Lipoprotein(a)", "Chest X-ray", "Follow-up review"] },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
