# Recipe Browser – Ocean Professional

This Next.js app implements a modern recipe browser with:
- Ocean Professional theme (primary #2563EB, secondary/success #F59E0B, error #EF4444, text #111827, bg #f9fafb, surface #ffffff).
- Listing page with search and category filter.
- Detail page with ingredients and steps.
- Accessible semantics and focus styles.
- Mock data fallback; optional API when NEXT_PUBLIC_API_BASE is reachable.

Environment variables (optional):
- NEXT_PUBLIC_API_BASE: Base URL of an API exposing /recipes and /recipes/:id.
  If not present or unreachable, mock data is used automatically.

Run:
- npm run dev
- visit http://localhost:3000
