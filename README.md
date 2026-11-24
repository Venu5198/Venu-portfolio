# Venu K — Backend Developer (Python, DevOps & AI) Portfolio

> Production-grade, interactive personal portfolio website engineered with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide Icons.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Smooth_Physics-purple?style=flat&logo=framer)](https://www.framer.com/motion/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_QA-green?style=flat&logo=playwright)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Overview

This repository houses the source code for the personal engineering portfolio of **Venu K**, a Backend Developer specializing in Python, DevOps, and Autonomous AI Systems. 

Built with an Awwwards-inspired aesthetic and strict systems-engineering principles, the site showcases high-throughput distributed systems including the **SyncRivo** multi-platform webhook bridge (Slack, Teams, Google Chat, Zoom Team Chat, Webex) and the **OCNORA** autonomous agent orchestration engine. It features interactive 5-stage systems architecture flows, an instant-search competency arsenal, verified cloud/DevOps credentials, and cinematic motion design.

### 🔗 Quick Links
- **Live Deployment**: [https://venu-k.vercel.app](https://venu-k.vercel.app) *(or custom domain)*
- **GitHub**: [@Venu5198](https://github.com/Venu5198)
- **LinkedIn**: [Venu K](https://www.linkedin.com/in/venu-k-2a4460383)
- **Direct Contact**: [venukrishnaya@gmail.com](mailto:venukrishnaya@gmail.com)

---

## ✨ Key Highlights & Interactive Sections

1. **Hero Telemetry & Ambient Portrait (`src/features/hero/`)**:
   - High typographic display scale (`VENU K`) with high-contrast editorial hierarchy.
   - Ambient breathing radial glow framing the headshot (`public/images/venu-profile.jpg`).
   - Borderless telemetry strip displaying verified engineering outcomes (99.98% SLA, 20–25% cloud cost reduction, 20+ microservices deployed, 35% faster MTTR).
   - Interactive terminal command badge (`npx venu-k`) with one-click clipboard copying.

2. **Flagship Systems Showcase (`src/features/projects/`)**:
   - Narrative editorial spreads for **SyncRivo** (cross-platform enterprise messaging bridge supporting 5 platforms) and **OCNORA** (1,000+ app connectors, token/USD budget circuit breakers, git worktree PR runner).
   - Dynamic case-study deep dive modal (`ProjectModal.tsx`) with architectural breakdowns, technical challenges, and live external links.

3. **Systems Architecture Flow Inspector (`src/features/architecture/`)**:
   - Interactive 5-stage topology diagram with dual mode switcher:
     - **SyncRivo Bridge**: Webhook Ingress & Sig Verify → Redis Loop & Echo Guard → Auth & Identity Resolution → Payload Translation Engine → Downstream Delivery & Sender Attribution.
     - **OCNORA Engine**: Connect & Define → Validate & Budget Guards → Stateful Graph Execution → Audit & Telemetry → Autonomous Git Worktree Runner.
   - Continuous traveling data-packet pulse along the horizontal bus.
   - 4-second auto-cycle animation loop that steps through stages automatically and gracefully pauses on user hover or click.

4. **Filterable Engineering Arsenal (`src/features/arsenal/`)**:
   - Competency matrix grouped into Distributed Systems, Cloud & Infrastructure, AI & Automation, and Frontend & Security.
   - Real-time text search filter with live category pill highlighting.

5. **Verified Credentials & Honors (`src/features/certifications/`)**:
   - Plaque highlight for the **Reliability Champion Award** (99.98% uptime SLA recognition).
   - Verified credential cards linking to official Credly verifications (AWS DevOps Engineer – Professional, CKA, HashiCorp Terraform Associate).

6. **`IDENTITY_SPEC.json` Contact Terminal (`src/features/contact/`)**:
   - Syntax-highlighted JSON terminal spec representing real-time availability and technical disciplines.
   - Quick copy triggers for email and phone with celebratory `canvas-confetti` micro-interactions.

---

## 🛠️ Tech Stack & Dependencies

The project is built on the latest modern React and Next.js ecosystem, compiled with Turbopack for sub-second hot module reloading.

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `16.4.6` | App Router, Server Components, Turbopack, static page generation |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5.0.0` | Strict type safety, explicit interface contracts |
| **Core UI** | [React](https://react.dev/) / [React DOM](https://react.dev/) | `19.3.0` | Modern React 19 architecture |
| **Motion Physics** | [Framer Motion](https://www.framer.com/motion/) | `^14.14.0` | Smooth cubic-bezier transitions (`[0.22, 1, 0.36, 1]`) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `4.3.3` | Tailwind v4 utility-first styling + `@tailwindcss/turbopack` |
| **Iconography** | [Lucide React](https://lucide.dev/) | `^1.79.0` | Clean, accessible vector UI icons |
| **Effects & UI** | [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) | `^1.9.4` | Micro-interaction celebrations on contact triggers |
| **Class Utilities** | `clsx` & `tailwind-merge` | `^2.1.1` / `^3.7.1` | Conflict-free conditional Tailwind classes (`cn` utility) |
| **Testing & Visual QA**| [Playwright](https://playwright.dev/) | `^1.65.1` | Headless visual test runner & video walkthrough recorder |

---

## 🏗️ Project Architecture (Feature-Driven)

The codebase strictly adheres to a domain-driven, feature-based modular architecture under `src/`:

```
src/
├── app/                                # Next.js App Router root
│   ├── favicon.ico                     # Site favicon
│   ├── globals.css                     # Tailwind v4 theme, fonts, custom glow utilities
│   ├── layout.tsx                      # Root layout, HTML metadata, SEO, and viewport
│   └── page.tsx                        # Home page composition aggregating feature sections
│
├── features/                           # Self-contained domain modules
│   ├── architecture/
│   │   └── ArchitectureSection.tsx     # 5-stage interactive pipeline flow & mode switcher
│   ├── arsenal/
│   │   └── ArsenalSection.tsx          # Filterable tech competency matrix
│   ├── certifications/
│   │   └── CertificationsSection.tsx   # Verified badges and Reliability Champion Award
│   ├── contact/
│   │   └── ContactSection.tsx          # IDENTITY_SPEC terminal & direct channels
│   ├── hero/
│   │   └── HeroSection.tsx             # Editorial title, portrait, and telemetry strip
│   └── projects/
│       ├── ProjectModal.tsx            # Deep-dive project case study modal dialog
│       └── ProjectsSection.tsx         # Flagship systems narrative showcase
│
└── shared/                             # Reusable core primitives and contracts
    ├── components/                     # Stateless UI primitives
    │   ├── GlassCard.tsx               # Translucent card with hairline borders
    │   ├── GridBackground.tsx          # Subtle architectural grid backdrop
    │   ├── Magnetic.tsx                # Physics-based magnetic cursor button wrapper
    │   ├── Navbar.tsx                  # Floating glass dock navigation with anchor links
    │   ├── SpotlightCard.tsx           # Mouse-following radial gradient card
    │   └── TelemetryBadge.tsx          # Monospaced status pill with ping indicator
    ├── data/                           # Centralized data stores (Single Source of Truth)
    │   ├── certifications.ts           # Certified credentials and honors data
    │   ├── profile.ts                  # Bio, contact, metrics, and philosophy
    │   ├── projects.ts                 # Flagship & secondary system specifications
    │   └── skills.ts                   # Categorized skills and proficiency levels
    ├── types/                          # Strict TypeScript interface contracts
    │   ├── certification.ts            # Certification & Award schemas
    │   ├── profile.ts                  # Profile & Telemetry metric schemas
    │   ├── project.ts                  # Project, Case Study & Architecture stage schemas
    │   └── skill.ts                    # Skill category & item schemas
    └── utils/
        └── cn.ts                       # Class merging utility (clsx + tailwind-merge)
```

---

## 🚦 Getting Started & Scripts

### 1. Prerequisites
- **Node.js**: `v20.0.0` or higher (tested on `v26.7.0`)
- **npm**: `v10.0.0` or higher (tested on `v11.19.0`)

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/Venu5198/Venu-portfolio.git
cd Venu-portfolio

# Install dependencies
npm install
```

### 3. Development Server

```bash
# Start local development server with Turbopack on http://localhost:3000
npm run dev
```

### 4. Quality Gates & Build Verification

```bash
# Run strict TypeScript typecheck (zero errors)
npx tsc --noEmit

# Run Next.js production build and page prerendering
npm run build

# Preview production build locally
npm run start
```

### 5. Automated Screenshots & Video Walkthrough (Playwright)

The repository includes pre-configured automation scripts in `scripts/`:

```bash
# Capture full suite of 9 desktop and mobile screenshots (into portfolio-screenshots/)
node scripts/capture-screenshots.mjs

# Or run via PowerShell wrapper (starts Next dev, waits for port 3000, runs capture, and shuts down)
powershell -ExecutionPolicy Bypass -File scripts/run-and-capture.ps1

# Record a 1440x900 desktop walkthrough video (saved to portfolio-videos/portfolio-walkthrough.webm)
node scripts/record-demo.mjs

# Or run recording via PowerShell wrapper
powershell -ExecutionPolicy Bypass -File scripts/run-and-record.ps1
```

---

## 🎨 Customization Guide

All personal branding, metrics, project case studies, and skills are decoupled from the presentation components:

1. **Profile & Telemetry**:
   - Edit [`src/shared/data/profile.ts`](src/shared/data/profile.ts) to update your name, title, bio, contact coordinates, social handles, or telemetry metrics.
2. **Project Showcases**:
   - Edit [`src/shared/data/projects.ts`](src/shared/data/projects.ts) to modify project titles, descriptions, metrics, tags, or detailed case-study modal content.
3. **Architecture Pipeline**:
   - Edit `src/features/architecture/ArchitectureSection.tsx` or stage definitions in [`src/shared/types/project.ts`](src/shared/types/project.ts) to customize the 5-stage interactive flow for your own backend pipelines.
4. **Skills Arsenal**:
   - Edit [`src/shared/data/skills.ts`](src/shared/data/skills.ts) to adjust skill categories, badges, and competencies.
5. **Certifications & Awards**:
   - Edit [`src/shared/data/certifications.ts`](src/shared/data/certifications.ts) to add credentials and Credly verification links.
6. **Profile Photo**:
   - Replace [`public/images/venu-profile.jpg`](public/images/venu-profile.jpg) with your own portrait (retaining the path or updating it in `profile.ts`).

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

**Crafted by [Venu K](https://github.com/Venu5198)** · Backend Developer (Python, DevOps & AI)
