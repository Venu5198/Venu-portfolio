# Venu K — Founding Engineer Portfolio

> Interactive, Awwwards-style personal portfolio engineered with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide Icons.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Smooth_Physics-purple?style=flat&logo=framer)](https://www.framer.com/motion/)

---

## ⚡ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router with Server Components & Turbopack)
- **Language**: TypeScript 5.9 (Strict type safety, zero `any`)
- **Styling**: Tailwind CSS v4 + Custom glassmorphism, hairline dividers, and radial spotlight glow
- **Motion Design**: Framer Motion with cinematic easing (`cubic-bezier([0.22, 1, 0.36, 1])`) and auto-cycling interactive pipeline topology
- **Icons**: Lucide React + custom SVG brand icons

### Modular Architecture
```
src/
├── app/                  # Next.js App Router (layout, page, metadata)
├── features/             # Domain feature modules
│   ├── hero/             # Editorial display hero, telemetry strip, headshot
│   ├── projects/         # Flagship bento showcase & deep-dive case study modals
│   ├── architecture/     # Interactive webhook bridge & agent execution topology
│   ├── arsenal/          # Filterable competency matrix & skill categories
│   ├── certifications/   # Verified Credly badges & honors
│   ├── contact/          # Terminal interface & direct transmission channels
│   └── navigation/       # Floating glass navigation dock
└── shared/               # Reusable primitives, types, and verified data models
    ├── components/       # SpotlightCard, Modal, SectionHeading, etc.
    ├── data/             # Strongly typed project, skill, and certification records
    └── types/            # TypeScript interface contracts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (Verified on Node.js v26)
- npm 10+

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/Venu5198/Venu-portfolio.git
cd Venu-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
# Verify TypeScript
npx tsc --noEmit

# Compile production bundle
npm run build

# Start production server
npm run start
```

---

## 👤 Profile Links

- **GitHub**: [@Venu5198](https://github.com/Venu5198)
- **LinkedIn**: [Venu K](https://www.linkedin.com/in/venu-k-2a4460383)
- **Live Projects**: [SyncRivo](https://syncrivo.ai/en/) · [OCNORA](https://ocnora.ai/)
