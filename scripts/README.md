# Scripts

This folder contains a few utilities for keeping the strategy markdown files consistent.
They help maintain the "Related Strategies" sections so readers can easily navigate between documents.
Run them from the repository root so relative paths resolve correctly.

## Workflow

1. `check_related_links.py` – ensure every internal link appears in the page's **Related Strategies** section.
2. `check_reciprocal_links.py` – verify that each relation is referenced from both pages (Strategy to Strategy).
3. `check_climatic_pattern_links.py` – check for missing "Relevant Climatic Patterns" sections in Strategies and verify reciprocal links between Strategies and Climatic Patterns.
4. `add_related_links.py` – automatically insert any missing links (Strategy to Strategy).
5. `check_unexplained_relations.py` – list related links that lack explanatory text.
6. `check_strategy_headings.py` – check each strategy markdown file for required headings.
7. Manually update the markdown files to add explanations for the items flagged in step&nbsp;5 and add any missing headings identified in step&nbsp;6.

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

## `check_climatic_pattern_links.py`
Checks for consistency in links between Strategy documents and Climatic Pattern documents.

This script performs two main checks:
1.  Identifies Strategy documents (`docs/strategies/**/index.md`) that are missing the "## ⛅ **Relevant Climatic Patterns**" section.
2.  Reports asymmetric links between Strategies and Climatic Patterns. An asymmetric link occurs if:
    *   A Strategy links to a Climatic Pattern under its "Relevant Climatic Patterns" section, but the Climatic Pattern does not link back to that Strategy in its "## 🔀 **Related Strategies**" section.
    *   A Climatic Pattern links to a Strategy under its "Related Strategies" section, but the Strategy does not link back to that Climatic Pattern in its "Relevant Climatic Patterns" section.

The script prints a list of strategies missing the required section directly to the console, with a summary count to stderr.
Asymmetric links are output in CSV format to stdout, with columns: `Source Document,Target Document,Issue Type`. A summary count of asymmetric links is printed to stderr.

**Usage:**
```bash
python3 scripts/check_climatic_pattern_links.py > climatic_pattern_link_issues.csv
```
This will save the asymmetric links to `climatic_pattern_link_issues.csv`. Strategies missing sections will be printed to the console.

## `add_related_links.py`
Automatically inserts missing links into the **Related Strategies** sections based on links found elsewhere in the document.
It updates the markdown files in place and prints a CSV of added `source,target` pairs along with a count on stderr.

```bash
python3 scripts/add_related_links.py > added.csv
```
**Note:** This script modifies the markdown files. Review changes with `git diff` before committing.

## `check_unexplained_relations.py`
Looks at the **Related Strategies** sections and flags bullet points that have no explanatory text after the link.
Outputs the list as `source,target` CSV rows and prints the count on stderr.

```bash
python3 scripts/check_unexplained_relations.py > unexplained.csv
```

**Note:** This script modifies the markdown files. Review changes with `git diff` before committing.

## `check_strategy_headings.py`
Checks that every strategy markdown file (`docs/strategies/**/index.md`) contains all the required headings as specified in `CONTRIBUTING.md`.
The script prints a list of missing headings for each file and exits with a status code of 1 if any issues are found. If all files are compliant, it exits with 0.

**Usage:**
```bash
python3 scripts/check_strategy_headings.py
```
This will print the report to the console.
