import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { GrainOverlay } from "@/components/GrainOverlay";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { ProfilePopup } from "@/components/ProfilePopup";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nayab Aslam — Full Stack Developer & Marketing Manager",
  description:
    "Full Stack Developer and Marketing Manager building modern digital experiences and helping businesses grow through technology and marketing.",
  keywords: [
    "full stack developer",
    "marketing manager",
    "Next.js developer",
    "web development",
    "digital marketing",
    "Nayab Aslam",
  ],
  authors: [{ name: "Nayab Aslam" }],
  openGraph: {
    title: "Nayab Aslam — Full Stack Developer & Marketing Manager",
    description:
      "Full Stack Developer and Marketing Manager building modern digital experiences and helping businesses grow through technology and marketing.",
    url: "https://nayabaslam.com",
    siteName: "Nayab Aslam",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nayab Aslam",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nayab Aslam — Full Stack Developer & Marketing Manager",
    description:
      "Full Stack Developer and Marketing Manager building modern digital experiences and helping businesses grow through technology and marketing.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#030604] text-[#F1F1EA] overflow-x-hidden">
        <Preloader />
        <ProfilePopup />
        <SmoothScroll>
          <GrainOverlay />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
