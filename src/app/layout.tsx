import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://venu-portfolio.vercel.app"),
  title: {
    default: "Venu K — Founding Engineer (Full Stack, DevOps & AI)",
    template: "%s | Venu K",
  },
  description:
    "Founding Engineer & Systems Architect specializing in Python, Full Stack, Cloud/DevOps, and Autonomous AI Fleets. Sole creator of SyncRivo (5-platform enterprise messaging bridge) and OCNORA (AI workflow automation platform).",
  keywords: [
    "Venu K",
    "Founding Engineer",
    "Systems Architect",
    "DevOps Engineer",
    "FastAPI",
    "Python",
    "Kubernetes CKA",
    "AWS Certified DevOps Professional",
    "Terraform Associate",
    "SyncRivo",
    "OCNORA",
    "Google Cloud Run",
    "GKE",
    "GitOps",
    "Autonomous AI Agents",
  ],
  authors: [{ name: "Venu K", url: "https://github.com/Venu5198" }],
  creator: "Venu K",
  openGraph: {
    title: "Venu K — Founding Engineer (Full Stack, DevOps & AI)",
    description:
      "Cross-platform messaging bridge & AI workflow automation architecture. 3.6+ years operating 20+ microservices with 99.98% production SLA.",
    url: "https://venu-portfolio.vercel.app",
    siteName: "Venu K — Systems Architect Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/venu-profile.jpg",
        width: 800,
        height: 800,
        alt: "Venu K — Founding Engineer Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Venu K — Founding Engineer (Full Stack, DevOps & AI)",
    description:
      "Founding Engineer & Systems Architect specializing in Python, Full Stack, Cloud/DevOps, and Autonomous AI Fleets. Sole creator of SyncRivo and OCNORA.",
    creator: "@Venu5198",
    images: ["/images/venu-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#09090B] text-[#F4F4F5] antialiased font-sans selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
