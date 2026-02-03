# Field Alpha - Project Memory

## Project Overview
"발로 뛴 투자 인사이트" — Industrial Field Research Archive & Investment Intelligence Platform.
전국 산업단지·신도시·기업 현장 답사 기록을 체계화한 투자 리서치 아카이브.

## Tech Stack
- **Framework**: Next.js 14 (App Router, Static Export `output: 'export'`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (dark mode default, class-based)
- **Map**: Leaflet + dynamic import (no SSR)
- **Charts**: Recharts
- **Search**: Fuse.js (client-side fuzzy search)
- **Icons**: lucide-react
- **Deployment**: GitHub Pages (static export)

## Key Architecture Decisions
- Static export only — no server actions, no API routes, no middleware
- All dynamic routes use `generateStaticParams()` for pre-rendering
- Leaflet loaded via `next/dynamic` with `{ ssr: false }` to avoid window errors
- Images use `unoptimized: true` since next/image optimization unavailable in static export
- Dark mode is always-on (class="dark" on html element)
- Data stored as JSON files in `src/data/` — no database
- Korean language primary

## Directory Structure
```
src/
├── app/              # Pages (App Router)
│   ├── page.tsx      # Home dashboard
│   ├── map/          # Full map view
│   ├── visits/       # Visit records list + [id] detail
│   ├── clusters/     # Cluster analysis list + [id] detail
│   ├── companies/    # Company profiles list + [id] detail
│   ├── sectors/      # Sector filter [sector]
│   ├── insights/     # Insights archive
│   ├── search/       # Fuse.js search
│   └── about/        # About + methodology
├── components/
│   ├── layout/       # Header, Footer
│   ├── map/          # DynamicMap, MapView
│   ├── visit/        # VisitCard, ObservationSection, InsightSection
│   ├── chart/        # SectorChart
│   ├── gallery/      # PhotoGallery
│   └── common/       # SectorBadge, StatCard
├── data/             # JSON data files
│   ├── visits.json
│   ├── clusters.json
│   ├── companies.json
│   └── sectors.json
├── lib/              # Utilities
│   ├── data.ts       # Data access functions
│   ├── search.ts     # Fuse.js search
│   └── utils.ts      # Helpers (cn, formatDate, getSectorColor, etc)
└── types/            # TypeScript interfaces
    └── index.ts
```

## Data Schema
- Visit: id, title, date, location, sectors, companies, observations, insights
- Cluster: id, name, region, sectors, companies, keyMetrics
- Company: id, name, stockCode, sector, cluster, visits
- Sector: code, name, color, icon

## Adding New Content
1. Add visit entry to `src/data/visits.json`
2. If new company, add to `src/data/companies.json`
3. If new cluster, add to `src/data/clusters.json`
4. Rebuild: `npm run build`

## Design Guidelines
- Colors: Slate 950 bg, Emerald 500 accent, sector-specific colors
- Fonts: Pretendard (Korean), Inter (fallback)
- Observation sections: blue-tinted background with blue left border
- Insight sections: green-tinted background with green left border + disclaimer
- All investment insights MUST have disclaimer notice
- Professional, restrained design — securities research report feel

## Build & Deploy
```bash
npm run build    # Static export to out/
npm run dev      # Development server
```

## Dependencies (key)
- react-leaflet, leaflet: Map
- recharts: Charts
- fuse.js: Search
- lucide-react: Icons
- clsx, tailwind-merge: Utility
- Use --legacy-peer-deps for npm install (react-leaflet peer dep conflict)
