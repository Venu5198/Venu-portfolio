import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Venu K — Founding Engineer & Cloud/AI Systems Architect",
  description:
    "Founding engineer who single-handedly designed, built, and operates SyncRivo (real-time messaging bridge syncing Slack, Teams, Google Chat, Zoom, and Webex) and OCNORA (AI workflow automation platform competing with n8n). Specializing in Python/FastAPI, Kubernetes, AWS, GCP, GitOps, and platform engineering.",
  keywords: [
    "Venu K",
    "Founding Engineer",
    "DevOps Engineer",
    "Kubernetes CKA",
    "AWS Certified DevOps Professional",
    "FastAPI",
    "SyncRivo",
    "OCNORA",
    "GitOps",
    "Cloud Run",
    "Python",
  ],
  authors: [{ name: "Venu K" }],
  openGraph: {
    title: "Venu K — Founding Engineer (Full Stack, DevOps & AI)",
    description:
      "Cross-platform messaging bridge & AI workflow automation architecture. 3.6+ years operating 20+ microservices with 99.9% availability.",
    type: "website",
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
