/* ==========================================================
   ✏️  EDIT YOUR CLINIC DETAILS HERE.
   Every page reads from this file.
   ========================================================== */

export const clinic = {
  name: "TARA Heart Care",
  doctor: {
    name: "Dr. (Prof.) Ranjan Shetty",
    shortName: "Dr. Shetty",
    quals: "MBBS · MD · DM (Cardiology) · FACC · FESC · FSCAI · MBA",
    role: "Lead Consultant · Interventional Cardiologist",
    reg: "[Medical Council Reg. No.]",
    years: 20,
    photo: "/images/doctor.jpg" as string | null,
    bio: [
      "Dr. (Prof.) Ranjan Shetty is a highly regarded interventional cardiologist with more than two decades of experience diagnosing and treating complex heart disease using catheter-based techniques. He trained at Kasturba Medical College, AIIMS New Delhi and PGIMER Chandigarh, and became India's youngest Professor of Cardiology in 2013.",
      "He is known as a pioneer of left atrial appendage (LAA) closure in Southeast Asia and has performed the highest number of LAA closures in India. His practice covers complex coronary interventions, structural heart disease, TAVI, congenital heart defect closures and pacemaker implantation. Alongside clinical work he leads clinical research, has published more than 50 papers, and trains the next generation of cardiologists.",
    ],
    training: [
      { year: "2002", degree: "MBBS", inst: "Kasturba Medical College" },
      { year: "2005", degree: "MD, General Medicine", inst: "AIIMS, New Delhi" },
      { year: "2007", degree: "DM, Cardiology", inst: "PGIMER, Chandigarh" },
      { year: "2013", degree: "Professor of Cardiology", inst: "Youngest in the specialty" },
    ],
    expertise: [
      "Complex coronary interventions",
      "Chronic total occlusions (CTO)",
      "Left main & bifurcation lesions",
      "Rotablation",
      "TAVI",
      "Left atrial appendage (LAA) closure",
      "Structural heart interventions",
      "ASD · PDA · VSD device closure",
      "Paravalvular leak closure",
      "Pacemaker & device implantation",
      "Aortic dissection stenting",
      "Takayasu arteritis interventions",
      "Peripheral interventions",
    ],
    memberships: [
      "Fellow, American College of Cardiology (FACC)",
      "Fellow, European Society of Cardiology (FESC)",
      "Fellow, Society for Cardiovascular Angiography & Interventions (FSCAI)",
      "Member, Cardiological Society of India",
    ],
    highlights: [
      { value: "20+", label: "Years in interventional cardiology" },
      { value: "50+", label: "Research publications" },
      { value: "#1", label: "Most LAA closures in India" },
      { value: "2013", label: "India's youngest Professor of Cardiology" },
    ],
    achievements: [
      "Pioneer of left atrial appendage closure in Southeast Asia",
      "Highest number of LAA closure procedures performed in India",
      "Youngest Professor of Cardiology (since 2013)",
      "Smt Kirpaul Kaur Medal for Best House Physician (2002), presented by Dr. A. P. J. Abdul Kalam",
      "Author / co-author of 50+ scientific publications",
      "Trains DM and DNB cardiology fellows; has guided numerous theses and research projects",
    ],
    books: [
      { title: "Diabetes and Heart", detail: "2010 · with Dr. N. R. Rau" },
      { title: "Emerging and Re-emerging Infections", detail: "2007 · with Dr. Rita Sood" },
      { title: "Healthy Heart", detail: "Manipal University Press" },
    ],
    trials: [
      { name: "SCORED Trial", role: "Principal Investigator", sponsor: "Sanofi" },
      { name: "LEADER Trial", role: "Co-Principal Investigator", sponsor: "Novo Nordisk" },
      { name: "TUXEDO Trial", role: "Principal Investigator", sponsor: "Boston Scientific" },
      { name: "SUPERIA Trial", role: "Principal Investigator", sponsor: "Superia" },
      { name: "ASSIST Project: Rheumatic fever & RHD", role: "Investigator", sponsor: "European Union" },
      { name: "School Health Study", role: "Principal Investigator", sponsor: "Philips" },
      { name: "Neonatal Heart Disease Screening", role: "Principal Investigator", sponsor: "Philips" },
      { name: "Wireless mobile ECG system", role: "Co-Principal Investigator", sponsor: "Intel" },
      { name: "Portable echo: user requirements", role: "Investigator", sponsor: "Philips" },
      { name: "Ultrasound usability testing", role: "Investigator", sponsor: "Philips" },
      { name: "Stroke evaluation study", role: "Investigator", sponsor: "Xerox" },
    ],
    languages: ["English", "Kannada", "Hindi", "Tulu", "Malayalam"],
  },
  // ⚠️ SAMPLE CARE TEAM. Replace names, qualifications, photos and OPD days
  // with your real consultants before going live (or delete entries you don't need).
  // days: 0 = Sunday … 6 = Saturday.
  team: [
    {
      name: "[Doctor name]",
      role: "Consultant Cardiologist",
      specialty: "Cardiac imaging & echocardiography",
      quals: "MBBS · MD · DM (Cardiology)",
      years: 12,
      photo: null as string | null,
      focus: ["2D Echo & stress echo", "Valve disease", "Heart failure clinic"],
      days: [1, 2, 4, 6],
      languages: ["English", "Kannada", "Hindi"],
    },
    {
      name: "[Doctor name]",
      role: "Consultant Cardiologist",
      specialty: "Preventive cardiology & hypertension",
      quals: "MBBS · MD · DNB (Cardiology)",
      years: 9,
      photo: null as string | null,
      focus: ["Hypertension clinic", "Cholesterol & diabetes risk", "Executive heart checks"],
      days: [1, 3, 5, 6],
      languages: ["English", "Kannada", "Tulu"],
    },
    {
      name: "[Doctor name]",
      role: "Cardiac Anaesthesiologist",
      specialty: "Cath lab & critical care",
      quals: "MBBS · MD (Anaesthesia) · PDF (Cardiac Anaesthesia)",
      years: 10,
      photo: null as string | null,
      focus: ["Procedural sedation", "Cardiac ICU", "24×7 emergency cover"],
      days: [0, 1, 2, 3, 4, 5, 6],
      languages: ["English", "Hindi", "Malayalam"],
    },
  ],
  phones: {
    emergency: "+91 92433 50978",
    appointments: "+91 92433 50978",
  },
  whatsapp: "919243350978", // digits only, with country code
  email: "info@taraheartcare.com",
  address: {
    line1: "[Street Address], [Area]",
    line2: "[City] – [PIN]",
  },
  mapQuery: "TARA Heart Care",

  /** OPD sessions in clinic local time (IST). 0 = Sunday … 6 = Saturday. */
  sessions: {
    0: [["10:00", "13:00"]],
    1: [["09:00", "13:00"], ["17:00", "21:00"]],
    2: [["09:00", "13:00"], ["17:00", "21:00"]],
    3: [["09:00", "13:00"], ["17:00", "21:00"]],
    4: [["09:00", "13:00"], ["17:00", "21:00"]],
    5: [["09:00", "13:00"], ["17:00", "21:00"]],
    6: [["09:00", "13:00"], ["17:00", "21:00"]],
  } as Record<number, [string, string][]>,

  hoursShort: "Mon–Sat 9–1 & 5–9 · Sun 10–1",
  hoursDisplay: [
    { day: "Mon – Sat", time: "9:00 AM – 1:00 PM · 5:00 – 9:00 PM" },
    { day: "Sunday", time: "10:00 AM – 1:00 PM" },
    { day: "Emergency & Cath Lab", time: "24 × 7 × 365", emphasis: true },
  ],


  // ⚠️ SAMPLE REVIEWS. Replace with genuine patient reviews (e.g. from Google) before going live.
  testimonials: [
    { quote: "My father had a heart attack at midnight. Within the hour he was in the Cath Lab. The team was calm, fast and kind to all of us.", name: "[Patient name]", detail: "Primary angioplasty" },
    { quote: "Doctor took time to explain my angiography report and gave me honest options. No pressure, no unnecessary procedures.", name: "[Patient name]", detail: "Coronary angiography" },
    { quote: "ECG, Echo and TMT in one morning, with reports explained the same day. Very organised and very clean.", name: "[Patient name]", detail: "Heart checkup package" },
    { quote: "My BP was uncontrolled for years. Six months later it's normal and I finally understand why.", name: "[Patient name]", detail: "Hypertension clinic" },
  ],

  // ⚠️ Update with your actual empanelled insurers / TPAs.
  insurers: ["Star Health", "HDFC ERGO", "ICICI Lombard", "Niva Bupa", "Care Health", "New India Assurance", "United India", "Medi Assist TPA", "MD India TPA", "Ayushman Bharat"],

  social: { instagram: "#", facebook: "#", youtube: "#", linkedin: "#" },
};

export const tel = (n: string) => "tel:" + n.replace(/[^\d+]/g, "");
export const waLink = (text?: string) =>
  `https://wa.me/${clinic.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(clinic.mapQuery)}&output=embed`;
