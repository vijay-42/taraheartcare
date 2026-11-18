import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileDock from "@/components/MobileDock";
import SmoothScroll from "@/components/SmoothScroll";
import { clinic } from "@/lib/clinic";
import "./globals.css";

// Classical serif to echo the "TARA" wordmark in the logo.
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-instrument" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

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
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-bone">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileDock />
        </MotionConfig>
      </body>
    </html>
  );
}
