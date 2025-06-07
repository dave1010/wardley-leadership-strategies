# AGENTS

- Website about Wardley Mapping with comprehensive deep dives on the 60+ strategies.
- Repo is a Docusaurus site; Markdown lives in `./docs` (URLs don't include it, e.g. `/strategies`).
- Strategies sit under `./docs/strategies/<category>/<strategy>`.
- Terms are in `./docs/terms/<term>.md`.
- `README.md` is <100 lines. Read it in one go for dev setup and testing.
- `CONTRIBUTING.md` is <150 lines. Read it all before editing Markdown or if you need to understand content structure.
- Install deps with `npm install` and run tests with `npm test`.
- `./site-data` appears only after `npm run build`; check its `.txt` files for tags or strategy paths if listing or searching isn't possible. Otherwise exploring `./docs` is faster.
