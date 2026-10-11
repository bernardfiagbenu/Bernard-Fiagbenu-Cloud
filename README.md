# Bernard Fiagbenu — Personal Portfolio & Research

A minimalist, monochrome personal portfolio website and research paper for Bernard Fiagbenu, Computer Scientist based in Ghana.

Built strictly with Next.js (App Router), TypeScript, and Tailwind CSS. Static, zero-backend, zero-database, zero-tracking, with a single narrow column (max 680px), full light/dark mode support, and an academic research paper accessible online and as a downloadable PDF.

---

## Structure

```
├── public/
│   ├── Profile_Pic.jpg           # Untouched original source portrait
│   ├── profile.webp              # Grayscale 3:4 passport-style portrait (480x640, ~11 KB)
│   ├── profile.jpg               # JPG fallback (480x640, ~21 KB)
│   ├── research-paper.pdf        # Downloadable academic paper (24.6 KB)
│   ├── favicon.ico               # Browser tab icon (16, 32, 48)
│   ├── icon.png                  # Web app icon (192x192)
│   ├── icon-192.png              # PNG icon (192x192)
│   ├── icon-512.png              # PNG icon (512x512)
│   ├── favicon-16.png            # 16x16 icon
│   ├── favicon-32.png            # 32x32 icon
│   ├── favicon-48.png            # 48x48 icon
│   └── apple-touch-icon.png      # iOS touch icon (180x180)
├── scripts/
│   ├── process-images.js         # Passport crop (3:4) & grayscale conversion
│   └── generate-pdf.js           # PDF generation script for the research paper
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout, metadata, theme script, favicons
│   │   ├── globals.css           # Strict monochrome CSS variables & typography
│   │   ├── page.tsx              # Single-page home (About, Research, Projects, Contact)
│   │   ├── research/
│   │   │   └── page.tsx          # Full academic paper page (online reader)
│   │   ├── sitemap.ts            # Dynamic sitemap (/, /research)
│   │   ├── robots.ts             # Robots.txt directives
│   │   ├── manifest.ts           # Web app manifest
│   │   ├── not-found.tsx         # Monochrome 404 handler
│   │   ├── error.tsx             # Error boundary
│   │   └── loading.tsx           # Route loading fallback
│   └── components/
│       └── ThemeToggle.tsx       # Text toggle ('light / dark') with localStorage
```

---

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Run linter:**
   ```bash
   npm run lint
   ```

4. **Run production build:**
   ```bash
   npm run build
   ```

---

## Deploy to Vercel

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: minimalist monochrome portfolio"
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. In the [Vercel Dashboard](https://vercel.com/):
   - Click **Add New** &rarr; **Project**.
   - Import your GitHub repository.
   - Framework preset will automatically detect **Next.js**.
   - Build command: `npm run build`
   - Output directory: `.next`
   - Click **Deploy**.

No environment variables, API keys, or database connections are required.

---

## Adding More Projects

Projects are stored as a plain array in `src/app/page.tsx`:

```ts
const projects: Project[] = [
  {
    title: 'China Xpress',
    subtitle: 'Shipment Tracking Web Application',
    liveUrl: 'https://shipingtracker.vercel.app/',
    description: '...',
    bulletPoints: ['...'],
    tags: ['...'],
  },
  // Add new projects here
];
```
Each entry automatically renders as a plain text entry without thumbnails or cards.

---

## Regenerating Assets

- To re-process the profile photo and favicons:
  ```bash
  node scripts/process-images.js
  ```
- To regenerate the research paper PDF:
  ```bash
  node scripts/generate-pdf.js
  ```
