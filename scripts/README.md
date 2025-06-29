# Scripts

Utilities for keeping the strategy markdown files consistent.

Most of the old "check_*" scripts have been replaced by Python tests.
Run `pytest` from the repository root to check for content issues such as:

- reciprocal strategy links
- missing "Relevant Climatic Patterns" sections
- unexplained related links
- required headings in strategy documents

Only one helper script remains:

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
