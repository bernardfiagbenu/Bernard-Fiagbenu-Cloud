# Production SEO Launch Checklist & Authority Plan

This checklist outlines the exact manual steps to index and establish authority for **BERNARD FIAGBENU** on the live URL `https://bernardfiagbenu.vercel.app/`.

---

## 1. Google Search Console Setup (URL-Prefix Property)
Because `*.vercel.app` subdomains do not have root DNS access, use the **URL-prefix** method:

1. Open [Google Search Console](https://search.google.com/search-console).
2. Choose **URL prefix** and enter: `https://bernardfiagbenu.vercel.app/`
3. Expand the **HTML tag** verification option. Copy the `content="..."` value (e.g. `google-site-verification-xyz123`).
4. In your Vercel Dashboard project settings:
   - Go to **Settings** &rarr; **Environment Variables**.
   - Add `GOOGLE_SITE_VERIFICATION` with your copied value.
   - Trigger a Redeploy.
5. In Search Console, click **Verify**.
6. Submit your sitemap:
   - In Search Console, navigate to **Sitemaps**.
   - Enter `sitemap.xml` and submit.
7. Use the **URL Inspection** tool on `https://bernardfiagbenu.vercel.app/`, `/research`, and each paper URL (`/research/ai-computing`, etc.) and click **Request Indexing**.

---

## 2. Bing Webmaster Tools & IndexNow
1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Select **Import from Google Search Console** (fastest, verifies instantly).
3. If using manual verification, obtain the `msvalidate.01` value and set it in Vercel as `BING_SITE_VERIFICATION`.
4. Trigger IndexNow after deploying updates:
   ```bash
   node scripts/indexnow.mjs
   ```

---

## 3. High-Authority Entity & Profile Linking (Priority Order)

### 1. GitHub Profile (Domain Authority 98)
- Edit your GitHub profile at `github.com/bernardfiagbenu`:
  - Set the **Website** field to: `https://bernardfiagbenu.vercel.app/`
  - In your profile README (`bernardfiagbenu/bernardfiagbenu`), add a link to your academic portfolio.
  - In your repository `Bernard-Fiagbenu-Cloud`, click the gear icon in the **About** section and set the website URL to `https://bernardfiagbenu.vercel.app/`.

### 2. LinkedIn (Domain Authority 98)
- Update your headline to include "Computer Scientist".
- Under **Contact info**, add `https://bernardfiagbenu.vercel.app/` as your personal website.
- Add a link to the portfolio in your **Featured** section.

### 3. Academic Profile Aggregators
- **ORCID**: Register at [orcid.org](https://orcid.org), add your working papers, and list your portfolio URL under Websites.
- **Google Scholar**: Create a Google Scholar profile. Once papers are indexed, link them to your Scholar profile.
- **Zenodo**: Mint a DOI for each working paper (free, backed by CERN). Upload the PDFs from `public/papers/`.
- **ResearchGate & Academia.edu**: Upload preprint copies of the five working papers linking back to the canonical web versions.
- **Semantic Scholar**: Claim your author profile.

### 4. Project Cross-Linking
- On China Xpress (`https://shipingtracker.vercel.app/`), include a footer attribution link:
  `Built by <a href="https://bernardfiagbenu.vercel.app/">BERNARD FIAGBENU</a>`

### 5. Institutional Affiliation
- If applicable, request that your department or research laboratory at GCTU add your profile or paper links to a university student/research directory page.

---

## 4. Entity Consolidation & Consistency Rules
To assist Google in assembling a cohesive Knowledge Graph entity:
- **Consistent Name**: Always use "Bernard Fiagbenu" across all platforms.
- **Consistent Title**: Always use "Computer Scientist".
- **Consistent Bio**: Use the core description: *"Computer scientist based in Ghana working on artificial intelligence, telecommunications, educational technology, supply chain, and renewable energy."*

---

## 5. Zero-Loss Custom Domain Migration Plan
When you decide to purchase a custom domain (such as `bernardfiagbenu.com` or `bernardfiagbenu.ai`):
1. In Vercel, add the custom domain and set it as the **Primary Domain**.
2. Vercel automatically issues a 301/308 redirect from `bernardfiagbenu.vercel.app` to your custom domain.
3. In Vercel Environment Variables, update `NEXT_PUBLIC_SITE_URL` to `https://bernardfiagbenu.com`.
4. In Google Search Console, add the new domain and use the **Change of Address** tool.
5. Submit `https://bernardfiagbenu.com/sitemap.xml` to Search Console and Bing.
