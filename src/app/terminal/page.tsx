import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal Mode — Venu K",
  description:
    "Interactive Neovim developer terminal & real-time code wall portfolio for Venu K — Backend Developer (Python, DevOps & AI).",
};

export default function TerminalPage() {
  return (
    <main className="fixed inset-0 w-screen h-screen bg-[#0b0b0a] z-50 overflow-hidden m-0 p-0">
      <iframe
        src="/terminal/index.html"
        className="w-full h-full border-0 block"
        title="Venu K — Terminal Mode Portfolio"
        allow="fullscreen"
      />
    </main>
  );
}
