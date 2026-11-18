import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { MotionConfig } from "motion/react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileDock from "@/components/MobileDock";
import RevealObserver from "@/components/RevealObserver";
import ScrollTop from "@/components/ScrollTop";
import SmoothScroll from "@/components/SmoothScroll";
import { clinic } from "@/lib/clinic";
import "./globals.css";

// Display: Fraunces, a sturdy modern serif that keeps the logo's classic feel but reads clearly at every size.
// Body/UI: Plus Jakarta Sans, warm and highly legible for patients.
const serif = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-display" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", preload: false });

export const metadata: Metadata = {
  title: {
    default: "TARA Heart Care | Cardiologist, Cath Lab & 24/7 Heart Emergency",
    template: "%s | TARA Heart Care",
  },
  description:
    "Expert cardiology at TARA Heart Care: preventive heart checkups, ECG, 2D Echo, TMT, Holter, coronary angiography, angioplasty and 24/7 emergency heart attack care.",
};

export const viewport: Viewport = { themeColor: "#f5efe3" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: clinic.name,
  medicalSpecialty: "Cardiovascular",
  telephone: clinic.phones.appointments,
  email: clinic.email,
  address: { "@type": "PostalAddress", streetAddress: clinic.address.line1, addressLocality: clinic.address.line2 },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint, so scroll-reveal styles only apply when they can run. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-screen bg-bone">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <RevealObserver />
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileDock />
          <ScrollTop />
        </MotionConfig>
      </body>
    </html>
  );
}
