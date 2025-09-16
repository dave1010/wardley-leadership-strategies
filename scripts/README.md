# Scripts

Utilities for keeping the strategy markdown files consistent.

Most of the old "check_*" scripts have been replaced by Python tests.
Run `pytest` from the repository root to check for content issues such as:

- reciprocal strategy links
- missing "Relevant Climatic Patterns" sections
- unexplained related links
- required headings in strategy documents

Helper scripts:

## `generate-strategy-navigator.js`
Reads the Strategy Navigator front matter fields (e.g. `stages`, `goals`,
`pressures`, etc.) from every strategy and regenerates
`src/data/strategyNavigator.ts`. Run this after updating the navigator metadata
or the `description` summary in any strategy:

```bash
npm run generate:strategy-navigator
```

## `add_related_links.py`
Automatically inserts missing links into the **Related Strategies** sections
based on links found elsewhere in a document. It updates the markdown files
in place and prints a CSV of added `source,target` pairs along with a count
on stderr.

```bash
python3 scripts/add_related_links.py > added.csv
```

**Note:** This script modifies the markdown files. Review changes with `git diff`
before committing.
