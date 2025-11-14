# Eetu Purhonen – Portfolio

Modern, bilingual developer portfolio built with React, TypeScript, Vite, and Tailwind CSS. The site highlights hands-on full-stack projects, internships, and contact options with motion-driven UI polish.

## ✨ Key Features

- **Hero narrative with stats** – animated headline, readiness badge, and live availability including thesis search info.
- **Responsive portrait showcase** – dark, gradient-framed image column with subtle motion.
- **Projects grid** – four in-depth case cards (Taskon, Portfolio 2025, Flutter demo, Next.js mini) with highlights, tech, and repo links.
- **Experience timeline** – two internship cards with responsibilities, stacks, readiness labels, and employer quotes.
- **Contact section** – phone/mail CTAs, copy-to-clipboard support, and social links.
- **Localization (fi/en)** – all copy (hero, projects, experience, contact, nav) toggled via shared state.
- **Theme toggle** – remembers light/dark preference in `localStorage`.
- **Smooth motion** – Framer Motion animations for hero typography, stat cards, project reveals, etc.

## 🧱 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 7
- **Styling**: Tailwind CSS 3, custom gradients, and backdrop blur
- **Animation**: Framer Motion 12
- **Tooling**: ESLint, TypeScript project refs (`tsconfig.app.json` / `tsconfig.node.json`)

## 📁 Project Structure

```
eetu-portfolio/
├─ backend/              # Reserved for future API experiments (currently empty)
├─ frontend/
│  ├─ public/
│  └─ src/
│     ├─ App.tsx        # Centralized copy + locale/theme state
│     ├─ components/    # Hero, ProjectsSection, ExperienceSection, ContactSection, Navbar, cards
│     ├─ assets/        # Portrait image + other media
│     └─ styles         # Tailwind entrypoints
└─ README.md            # (this file)
```

Everything user-facing lives under `frontend/`. The backend folder is a placeholder for future experiments and can be ignored for now.

## 🚀 Getting Started

### Prerequisites

- Node.js **18+** (Vite + TypeScript target modern runtimes)
- npm (bundled with Node) or an alternative package manager

### Installation

```powershell
cd frontend
npm install
```

### Available Scripts

```powershell
npm run dev      # Start Vite dev server (with React Fast Refresh)
npm run build    # Type-check via tsc -b, then build production bundle
npm run preview  # Serve the optimized build locally
npm run lint     # Run ESLint across the src directory
```

`npm run build` outputs static assets into `frontend/dist/`. Deploy that folder to any static host (Vercel, Netlify, Azure Static Web Apps, etc.).

## 🌐 Localization & Content

- All copy is defined in the `copy` object inside `frontend/src/App.tsx`.
- Each locale (`fi` and `en`) contains navigation links, hero text, project data, experience entries, and contact methods.
- Update the relevant arrays/objects to change wording or add new case studies.
- Projects are rendered in the order they appear in `projectData[locale]`, so rearrange the array to reorder cards.

## 🧪 Quality Checklist

- `npm run lint` – ESLint (React hooks + React Refresh plugins)
- `npm run build` – type-check + production build

## 📄 License

No explicit license has been provided yet. Assume all rights reserved by the repository owner until a license is added.

---

Questions or improvements? Open an issue or reach out via the contact section of the portfolio itself.
