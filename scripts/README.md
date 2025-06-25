# Scripts

This folder contains a few utilities for keeping the strategy markdown files consistent.
They help maintain the "Related Strategies" sections so readers can easily navigate between documents.
Run them from the repository root so relative paths resolve correctly.

## Workflow

1. `check_related_links.py` – ensure every internal link appears in the page's **Related Strategies** section.
2. `check_reciprocal_links.py` – verify that each relation is referenced from both pages.
3. `add_related_links.py` – automatically insert any missing links.
4. `check_unexplained_relations.py` – list related links that lack explanatory text.
5. Manually update the markdown files to add explanations for the items flagged in step&nbsp;4.

## `check_related_links.py`
Checks that every internal link to another strategy is also present in the page's **Related Strategies** section.
Outputs `source,target` CSV rows for any missing entries and prints the count of issues to stderr.

```bash
python3 scripts/check_related_links.py > missing_links.csv
```

## `check_reciprocal_links.py`
Reports where a strategy links to another strategy without a reciprocal link back.
The script emits a CSV of problematic `source,target` pairs and prints the number of issues on stderr.

```bash
python3 scripts/check_reciprocal_links.py > reciprocal_issues.csv
```

## `add_related_links.py`
Automatically inserts missing links into the **Related Strategies** sections based on links found elsewhere in the document.
It updates the markdown files in place and prints a CSV of added `source,target` pairs along with a count on stderr.

```bash
python3 scripts/add_related_links.py > added.csv
```

## `check_unexplained_relations.py`
Looks at the **Related Strategies** sections and flags bullet points that have no explanatory text after the link.
Outputs the list as `source,target` CSV rows and prints the count on stderr.

```bash
python3 scripts/check_unexplained_relations.py > unexplained.csv
```

**Note:** This script modifies the markdown files. Review changes with `git diff` before committing.
