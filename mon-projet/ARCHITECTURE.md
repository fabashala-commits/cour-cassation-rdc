# Mon-Projet — Architecture Overview

This document describes a suggested high-performance architecture for the Cour de Cassation platform while keeping the work already present in the repo (Next.js app in `app/`, existing Prisma setup).

Folder tree (recommended additions)

```
mon-projet/
├── app/                     # existing Next.js App Router frontend (keep)
├── prisma/                  # existing Prisma schema and seed (keep)
├── src/
│   ├── server/              # NestJS backend (API, modular)
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── jurisprudence/
│   │   ├── institution/
│   │   ├── actualites/
│   │   └── espace-perso/
│   └── services/
│       └── ai/
│           ├── pseudonymize.ts
│           └── vector-search.ts
├── docker-compose.yml       # postgres + elasticsearch for local dev
├── package.fullstack.json   # suggested merged deps for fullstack
└── ARCHITECTURE.md          # this file
```

Key choices
- Frontend: Next.js (App Router, TypeScript), Tailwind CSS, DSFR components integrated into the UI layer.
- Backend: NestJS for modular server-side API, running separately on port 4000 (example).
- DB: PostgreSQL (Postgres 15) for relational store.
- Search: Elasticsearch 8.x with dense_vector indices for semantic search.
- AI: An `/src/services/ai` area with small utilities:
  - `pseudonymize.ts` — heuristic pseudonymisation of JSON decisions.
  - `vector-search.ts` — Elasticsearch vector search skeleton (index management, indexing, semantic search).

Notes on keeping existing work
- The Next.js app (in `app/`) and current `prisma/` schema are kept. Consider migrating `prisma/schema.prisma` datasource `provider` from `mysql` to `postgresql` when moving to Postgres.
- The `package.fullstack.json` file shows a suggested merged dependency set — do not overwrite the existing `package.json` until you validate the upgrade locally.

Local dev
1. Start services:
   ```bash
   cd mon-projet
   docker compose up -d
   ```
2. Adjust `.env`:
   - `DATABASE_URL=postgresql://cassation:cassation@localhost:5432/cassation`
   - `ELASTICSEARCH_URL=http://localhost:9200`

3. Install deps and run:
   - Frontend: `npm run dev` (in `mon-projet`) — keeps using the Next.js app already present.
   - API (optional): `npm run server:dev` (if you adopt the suggested merged dependencies and scripts).

Security & production notes
- Do not run Elasticsearch with `xpack.security.enabled=false` in production. Use secure credentials and TLS.
- Pseudonymisation must use a robust NER model for legally compliant masking.
