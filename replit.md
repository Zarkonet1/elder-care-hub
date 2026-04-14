# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### ClearPath Elder Guide (`artifacts/clearpath`)
- **Type**: React + Vite frontend-only (no backend)
- **Preview path**: `/`
- **Description**: Full MVP eldercare education and expert referral platform for NJ/tri-state families
- **Design palette**: Navy (#1B2A4A), Cream (#FAF7F2), Gold (#C9922A), Sage Green (#7A9E7E)
- **Fonts**: Playfair Display (headings), Source Serif 4 (body) via Google Fonts

### Pages
- `/` — Homepage with hero, scenario cards, trust strip, email capture
- `/start` — 5-step diagnostic quiz with personalized results
- `/resources` — Tabbed resource sections for all 6 eldercare scenarios
- `/resources/:id` — Individual scenario detail pages
- `/experts` — Filterable expert directory (12 sample experts)
- `/experts/:id` — Individual expert profile pages
- `/about` — Founder story, mission, team

### Key Components
- `StickyNav` — sticky top nav with mobile hamburger drawer
- `Layout` — page wrapper with footer
- `FloatingHelp` — fixed "Need Help Now?" bottom-right button
- `ScenarioCard` — used on homepage and resource cards
- `ExpertCard` — used in expert directory
- `EmailCapture` — email capture with success state
- `StepDiagnostic` — multi-step form (embedded in Start page)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
