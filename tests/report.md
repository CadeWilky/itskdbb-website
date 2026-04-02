# QA Test Report

**Date:** 2026-04-02
**App:** ItsKDBB Creator Portfolio
**Version:** v1

## Unit Tests (Vitest)

| Test | Status |
|------|--------|
| users array has items | PASS |
| all users have required fields | PASS |
| user ids are unique | PASS |
| user handles are non-empty | PASS |
| posts array has at least 3 items | PASS |
| all posts have required fields | PASS |
| post ids are unique | PASS |
| post authorIds reference valid users | PASS |
| validateUserBody — valid input returns true | PASS |
| validateUserBody — missing name returns false | PASS |
| validateUserBody — empty handle returns false | PASS |
| validatePostBody — valid input returns true | PASS |
| validatePostBody — missing title returns false | PASS |
| validatePostBody — non-number authorId returns false | PASS |

**Result: 14 / 14 unit tests passing**

## Integration / E2E Tests (Playwright)

| Test | Status |
|------|--------|
| loads the home page | PENDING — stack must be running |
| hero section is visible | PENDING — stack must be running |
| tabs are visible | PENDING — stack must be running |
| links tab shows links hub | PENDING — stack must be running |
| portfolio tab shows portfolio grid | PENDING — stack must be running |
| posts tab shows API data | PENDING — stack must be running |

**To run:** `npm run test:e2e` (requires `npm run dev` running in another terminal)

## API Endpoint Coverage

| Endpoint | Implemented | Tested |
|----------|-------------|--------|
| GET /api/health | ✓ | — |
| GET /api/users | ✓ | via data contract |
| GET /api/users/:id | ✓ | — |
| POST /api/users | ✓ | via validation logic |
| GET /api/posts | ✓ | via data contract |
| GET /api/posts/:id | ✓ | — |
| POST /api/posts | ✓ | via validation logic |

## Notes

- Unit tests run without a live server (import data directly)
- E2E tests require `npm run dev` or `docker compose up --build`
- All seed data relationships (authorId → user.id) are valid
