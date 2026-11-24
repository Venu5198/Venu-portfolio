import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Anton } from "next/font/google";
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

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://venu-portfolio.vercel.app"),
  title: {
    default: "Venu K — Backend Developer (Python, DevOps & AI)",
    template: "%s | Venu K",
  },
  description:
    "Backend Developer & Systems Engineer specializing in Python, DevOps, and Autonomous AI Fleets. Core contributor to SyncRivo (5-platform enterprise messaging bridge) and OCNORA (AI workflow automation platform).",
  keywords: [
    "Venu K",
    "Backend Developer",
    "Python Developer",
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
    title: "Venu K — Backend Developer (Python, DevOps & AI)",
    description:
      "Backend Developer specializing in Python, distributed event systems, DevOps, and AI workflow automation. Core contributor to SyncRivo and OCNORA.",
    url: "https://venu-portfolio.vercel.app",
    siteName: "Venu K — Backend Developer Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/venu-profile.jpg",
        width: 800,
        height: 800,
        alt: "Venu K — Backend Developer Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Venu K — Backend Developer (Python, DevOps & AI)",
    description:
      "Backend Developer & Systems Engineer specializing in Python, DevOps, and Autonomous AI Fleets.",
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
      data-theme="dark"
      className={`${inter.variable} ${jetbrainsMono.variable} ${anton.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased font-sans selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
