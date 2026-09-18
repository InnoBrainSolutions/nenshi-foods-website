# Nenshi Foods · Traditional Indian Sweets & Luxury Gift Boxes

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Oxlint](https://img.shields.io/badge/Oxlint-Passing-10B981?logo=oxc&logoColor=white)](https://oxc.rs/)
[![License](https://img.shields.io/badge/License-Proprietary-C59A45)]()

> **Live Website**: [https://nenshifoods.in](https://nenshifoods.in)  
> Handcrafted traditional Indian sweets (mithai) made slow, made right. Est. 1968.

---

## ✦ Brand Story & Experience

Nenshi Foods is an artisanal Indian confectionery brand rooted in pure cow ghee, slow-reduced whole milk, whole Goan cashews, and time-tested recipes.

### Key Features
* **Pinned Scrollytelling Showcase**: Immersive stage exploring signature sweets (Kaju Katli, Milk Cake, Mawa Peda, Besan Laddoo) with real-time wheel and touch progression.
* **The Unboxing Ritual**: Interactive 3D perspective packaging demonstration showcasing hermetically sealed luxury gift boxes.
* **Sensory Tasting Modal**: In-depth tasting notes, aroma profile, texture scores, ingredients breakdown, and dietary badges.
* **Slide-in Cart Drawer**: Seamless shopping bag supporting dual-currency toggles (`INR / USD`) and custom gifting messages.
* **E-E-A-T & Food Safety Compliance**: Licensed under Govt. Food Safety Authority (**FSSAI Lic. No: `21426990001615`**) with verified physical workshop in Kukshi, MP.

---

## 🛠 Tech Stack & Architecture

* **Frontend**: React 19, Vite 8 (Rolldown engine)
* **Styling**: Modular Vanilla CSS (`src/styles/`) with responsive viewports, CSS custom properties, and micro-interactions
* **Icons**: `lucide-react`
* **Linting**: `oxlint` (sub-50ms lint cycles)
* **Hosting & CDN**: Vercel Edge Network with 1-year immutable asset caching and HTTP security headers
* **Assets**: 100% WebP next-gen image compression (< 3.5 MB total catalog weight)

---

## 🚀 Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* `npm` or `pnpm`

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/InnoBrainSolutions/nenshi-foods-website.git

# Navigate into the project
cd nenshi-foods-website

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Production Build & Linting
```bash
# Run ultra-fast linter
npm run lint

# Compile production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```text
nenshi-foods-website/
├── public/
│   ├── images/         # Optimized WebP product and branding photography
│   ├── favicon.svg     # Royal emblem favicon
│   ├── robots.txt      # Crawl directives pointing to sitemap
│   └── sitemap.xml     # Search engine XML sitemap
├── src/
│   ├── components/     # Header, Showcase, Collection, Unboxing, Cart, Footer
│   ├── data/           # Product specifications, ingredients & tasting notes
│   ├── hooks/          # Custom hooks (useScrollReveal, useParallax)
│   ├── styles/         # 12 Modular component stylesheets
│   ├── App.jsx         # Root application orchestrator
│   ├── App.css         # Master stylesheet import hub
│   └── main.jsx        # Application bootstrap
├── vercel.json         # Tiered edge caching & HTTP security headers
├── .vercelignore       # Excludes non-production files from Vercel deployments
└── vite.config.js      # Vite configuration
```

---

## 🛡 License & Commercial Rights

© 2026 **Nenshi Foods Private Limited**. Handcrafted for **InnoBrainSolutions**. All rights reserved.
