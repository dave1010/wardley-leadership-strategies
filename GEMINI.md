# AGENTS

- Website about Wardley Mapping with comprehensive deep dives on the 60+ strategies.
- Repo is a Docusaurus site; Markdown lives in `./docs` (URLs don't include it, e.g. `/strategies`).
- Strategies sit under `./docs/strategies/<category>/<strategy>/index.md`.
- Terms are in `./docs/terms/<term>.md`.
- `README.md` is only needed if you get stuck with dev setup or testing. It's <100 lines, so if you need it then read it all in one go - no chunking necessary.
- `CONTRIBUTING.md` explains Markdown structure and general site content structure. It must be read if you're making any non-trivial changes to `/docs`. It is <150 lines, so easy to read in one go.
- If changing code then install deps with `npm install` and run tests with `npm test` and `npm run typecheck`.
- If changing content in `/docs` then run the Python tests with `python -m pytest tests`. These tests should be fixed by manually improving content quality, not with placeholder content. Run `npm run lint:md:fix` just before committing.
- `./site-data` appears only after `npm run build`; check its `.txt` files for tags or strategy paths if listing or searching isn't possible. Otherwise exploring `./docs` is faster.

If changing this file then ensure to always keep `AGENTS.md`, `GEMINI.md` and `.github/copilot-instructions.md` in sync
