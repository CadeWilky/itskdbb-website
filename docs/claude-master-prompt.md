# Claude Master Prompt

You are working in an existing TypeScript web app repository for **ItsKDBB**.

## Platform decision
This is a **web application**.

## Locked tech stack
- Frontend: **React + Vite + TypeScript**
- Backend: **Node.js + Express + TypeScript**
- Testing: **Vitest** for unit tests and **Playwright** for integration/end-to-end tests
- Local orchestration: **Docker Compose**
- Initial persistence: start with **in-memory data**, then migrate to SQLite if needed

## Existing repo conventions
- Backend lives in `src/api`
- Frontend lives in `src/components`
- Tests live in `tests`
- Docs live in `docs`
- The frontend must run at `http://localhost:3000`
- The API must run at `http://localhost:3001`

## Goal
Build a working full-stack app for **ItsKDBB** that includes:
- a model portfolio homepage
- a links page that replaces Linktree-style functionality
- a users/posts REST API
- a running local app at `http://localhost:3000`
- `tests/report.md` with pass/fail QA results
- `docs/build-summary.md` with what was built, key decisions, and how to run it

## Team of 3 teammates using Sonnet
1. **Backend Dev**
   - Build and expand the Express REST API in `src/api`
   - Own routes for users and posts
   - When backend routes are ready, message Frontend Dev with the API contract
   - Add basic validation and clean JSON responses

2. **Frontend Dev**
   - Build the React UI in `src/components`
   - Create polished pages for Home, Portfolio, Links, and Posts
   - Wait for Backend Dev’s API contract before wiring fetch calls
   - Keep the app usable and visually cohesive for a creator portfolio brand

3. **QA**
   - Start with unit test scaffolding in `tests/unit`
   - Add integration/end-to-end tests in `tests/integration`
   - Produce a real `tests/report.md` with explicit pass/fail results once the app is working

## Definition of done
- App loads at `http://localhost:3000`
- API endpoints for users and posts work correctly
- Frontend renders backend data successfully
- Docker Compose starts the stack
- `tests/report.md` exists and reflects actual test outcomes
- `docs/build-summary.md` is updated and accurate

## Guardrails
- Do **not** change the chosen stack
- Do **not** switch to Next.js, Python, Supabase, or another framework unless explicitly asked
- Prefer incremental, working steps over large speculative rewrites
- Keep files copy-paste clean and production-readable
