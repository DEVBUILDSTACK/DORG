import type { Metadata, Viewport } from "next";
import "@mantine/core/styles.css";       // ✅ Mantine v7 global styles
import "./globals.css";                  // ✅ Your Tailwind styles

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Manrope } from "next/font/google";
import Providers from "@/lib/Providers"; // ✅ Your Wagmi/Privy/OnchainKit wrapper

// ✅ Load font
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

// ✅ SEO / metadata (must stay in a Server Component)
export const metadata: Metadata = {
  title: "Learn2Launch | L2Launchpad — Fintech For All",
  description:
    "Our developer iMPACT team introduces the adult 18yr+ L2Launchpad as a builder and project accelerant community demonstrating a multi-chain Solana synthetic “DATproxy” Vault allocation solution. As the founding builder bundle team, L2Launchpad is innovating to monetize and successfully launch as a pre-formation and pre-revenue builder marketplace for learning-2-launch. #learn2launch is a “Fintech For All” builder initiative that curates instructive Python-based curriculum for learners 12yr+ to explore debt, equity, yield, and interest using everyday math through hands-on Python projects. The 2025 CypherPunk Hackathon helped evangelize synthetic proxy allocation for SME treasury reserves and supports DevMentors as a non-custodial Digital Asset Treasury alternative.",
  openGraph: {
    title: "Learn2Launch | L2Launchpad — Fintech For All",
    description:
      "L2Launchpad is a builder and project accelerant community showcasing multi-chain Solana synthetic “DATproxy” Vault allocation. Learn, build, and experiment with Python-based Fintech curriculum for ages 12yr+—a ‘Fintech For All’ initiative.",
    type: "website",
    siteName: "Learn2Launch",
    images: [
      {
        url: "https://f4a.vercel.app/",
        width: 200,
        height: 200,
        alt: "Learn2Launch",
      },
    ],
  },
  twitter: {
    title: "Learn2Launch | L2Launchpad — Fintech For All",
    description:
      "L2Launchpad: a multi-chain Solana synthetic DATproxy builder community and Python-based Fintech curriculum for learners and treasury builders. #learn2launch #L2L #DATDevCommunity",
    card: "summary_large_image",
    images: [
      {
        url: "https://fundio-zeta.vercel.app/logo.png",
        width: 200,
        height: 200,
        alt: "Learn2Launch",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "Learn2Launch",
    "L2Launchpad",
    "DATproxy",
    "Fintech For All",
    "developer community",
    "Python curriculum",
    "digital asset treasury",
    "synthetic allocation",
    "Solana",
    "multi-chain",
    "treasury",
    "education",
    "hackathon",
    "cypherpunk 2025",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://f4a.vercel.app",
  },
  metadataBase: new URL("https://f4a.vercel.app"),
};

// ✅ Viewport configuration (moved from metadata)
export const viewport: Viewport = {
  themeColor: "#ffffff",
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
          <Providers>
            {children}
          </Providers>
        </MantineProvider>
      </body>
    </html>
  );
}
