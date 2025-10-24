import type { Metadata } from "next";
import "@mantine/core/styles.css";       // ✅ Mantine v7 global styles
import "./globals.css";                  // ✅ Your Tailwind styles

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Manrope } from "next/font/google";
import Providers from "@/lib/PrivyProvider"; // ✅ Your Wagmi/Privy/OnchainKit wrapper

// ✅ Load font
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

// ✅ SEO / metadata (must stay in a Server Component)
export const metadata: Metadata = {
  title: "Fundio | Smart Investments and Funding Solutions",
  description:
    "Discover Fundio for innovative funding options, investment opportunities, and financial growth. Connect with experts for personalized financial advice and secure your future.",
  openGraph: {
    title: "Fundio | Smart Investments and Funding Solutions",
    description:
      "Discover Fundio for innovative funding options, investment opportunities, and financial growth. Connect with experts for personalized financial advice and secure your future.",
    type: "website",
    siteName: "Fundio",
    images: [
      {
        url: "https://fundio-zeta.vercel.app/logo.png",
        width: 200,
        height: 200,
        alt: "Fundio",
      },
    ],
  },
  twitter: {
    title: "Fundio | Smart Investments and Funding Solutions",
    description:
      "Discover Fundio for innovative funding options, investment opportunities, and financial growth. Connect with experts for personalized financial advice and secure your future.",
    card: "summary_large_image",
    images: [
      {
        url: "https://fundio-zeta.vercel.app/logo.png",
        width: 200,
        height: 200,
        alt: "Fundio",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "Investments",
    "Funding",
    "Financial Solutions",
    "Loans",
    "Capital",
    "Finance",
    "Investment Opportunities",
    "Personal Finance",
    "Business Funding",
    "Wealth Management",
    "Startups",
    "Entrepreneurship",
    "Economic Growth",
    "Financial Planning",
    "Secure Investments",
  ],
  themeColor: "#ffffff",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://fundio-zeta.vercel.app/",
  },
  metadataBase: new URL("https://fundio-zeta.vercel.app"),
};

// ✅ Root layout is a Server Component — no "use client"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mantine-color-scheme="dark">
      <head>
        {/* Mantine color scheme fix for SSR hydration */}
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body
        className={`${manrope.className} antialiased text-white font-manrope bg-[#0F1115]`}
      >
        {/* MantineProvider wraps first */}
        <MantineProvider defaultColorScheme="dark">
          {/* Then your Wagmi/Privy/OnchainKit context providers */}
          <Providers>{children}</Providers>
        </MantineProvider>
      </body>
    </html>
  );
}
