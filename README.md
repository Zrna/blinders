# Blinders website

Landing page for [Blinders](../blinders), the macOS app that blurs or covers parts of your screen. Next.js (App Router) + Tailwind CSS 4. Light "paper" palette; Bricolage Grotesque (headings), Hanken Grotesk (text), IBM Plex Mono (labels).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static build
```

## Structure

| Path | What |
|---|---|
| `src/app/page.tsx` | The landing page: hero, why, features, tagline, how it works, FAQ (with FAQ schema), final CTA |
| `src/app/privacy`, `not-found.tsx`, `opengraph-image.tsx` | Privacy page, branded 404, social image |
| `src/components/mock/` | The screen mockups, built in HTML/CSS (no screenshots). `scenes.tsx` are static, `interactive.tsx` are clickable |
| `src/lib/site.ts` | Domain, download URL, requirements |
| `public/` | Favicons and logo, copied from `../blinders/branding/web` |

Design rules (type styles, spacing, radius, motion) come from the `landing-page-design` skill; the text styles are defined as utilities in `src/app/globals.css` (`heading-1`, `body-3`, `caption-2`…).

## Before launch

- Set `site.url` to the final domain and `site.downloadUrl` to the notarized .dmg in `src/lib/site.ts`.
