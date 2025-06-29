import os
import pytest
import re
from test_utils import normalize_path, find_markdown_files, extract_links_from_file, get_file_slug, extract_links_from_section, extract_headings_from_file

STRATEGY_DIR = os.path.join('docs', 'strategies')

def collect_strategy_links():
    """
    Collects all unique outgoing links from each strategy document.
    Links are slugs (e.g., /strategies/category/strategy-name).
    Self-references are excluded.
    """
    docs = {}
    strategy_files = find_markdown_files(STRATEGY_DIR, filename_pattern='index.md')

    for path in strategy_files:
        # Skip the main index and category index pages
        relative_path = os.path.relpath(path, STRATEGY_DIR)
        if len(os.path.normpath(relative_path).split(os.sep)) < 3:
            continue

        slug = get_file_slug(path, 'docs')

        # Extract links that are specifically strategy links
        links = extract_links_from_file(path, content_prefix='/strategies')

        # Remove self-references
        # Ensure comparison is between normalized paths if necessary,
        # though get_file_slug and extract_links_from_file should provide normalized forms.
        normalized_slug = normalize_path(slug)
        normalized_links = {normalize_path(link) for link in links}
        # Ignore links that point to category index pages
        normalized_links = {
            link
            for link in normalized_links
            if len([part for part in link.split('/') if part]) > 2
        }

        if normalized_slug in normalized_links:
            normalized_links.remove(normalized_slug)

        docs[normalized_slug] = normalized_links
    return docs

def test_reciprocal_strategy_links():
    """
    Tests that all links between strategy documents are reciprocal.
    If Strategy A links to Strategy B, Strategy B must link back to Strategy A.
    """
    all_strategy_links = collect_strategy_links()
    non_reciprocal_links = []

    for source_slug, target_slugs in all_strategy_links.items():
        for target_slug in target_slugs:
            # Check if the target_slug exists as a document
            if target_slug not in all_strategy_links:
                # This could be a broken link, but this test focuses on reciprocity.
                # Consider adding a separate test for broken links if needed.
                # For now, we assume target_slug should be a valid strategy document.
                # If it's not, it cannot link back, which is an issue but not strictly non-reciprocal.
                # However, if A links to B, and B doesn't exist, B can't link back to A.
                # We'll flag this as a specific type of non-reciprocal issue.
                non_reciprocal_links.append(
                    f"Link from '{source_slug}' to non-existent strategy '{target_slug}'."
                )
                continue

            # Check if the target document links back to the source document
            if source_slug not in all_strategy_links.get(target_slug, set()):
                non_reciprocal_links.append(
                    f"'{source_slug}' links to '{target_slug}', but '{target_slug}' does not link back to '{source_slug}'."
                )

    assert not non_reciprocal_links, "Found non-reciprocal strategy links:\n" + "\n".join(non_reciprocal_links)


CLIMATIC_PATTERN_SECTION_HEADING = "## ⛅ **Relevant Climatic Patterns**"

def test_strategy_has_climatic_pattern_section():
    """
    Tests that each strategy document has a 'Relevant Climatic Patterns' section.
    """
    strategy_files = find_markdown_files(STRATEGY_DIR, filename_pattern='index.md')
    missing_section_files = []

    for filepath in strategy_files:
        relative_path = os.path.relpath(filepath, STRATEGY_DIR)
        # An actual strategy doc will have a path like "category/name/index.md"
        # which means 3 components when split by os.sep.
        # STRATEGY_DIR/index.md -> "index.md" (1 component)
        # STRATEGY_DIR/category/index.md -> "category/index.md" (2 components)
        if len(os.path.normpath(relative_path).split(os.sep)) < 3:
            continue

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if CLIMATIC_PATTERN_SECTION_HEADING not in content:
                missing_section_files.append(get_file_slug(filepath, 'docs'))
        except FileNotFoundError:
            # This should not happen if find_markdown_files is correct
            missing_section_files.append(f"File not found: {get_file_slug(filepath, 'docs')}")

    assert not missing_section_files, \
        f"Strategies missing '{CLIMATIC_PATTERN_SECTION_HEADING}' section:\n" + "\n".join(missing_section_files)


CLIMATIC_PATTERNS_DIR = os.path.join('docs', 'climatic-patterns')
STRATEGY_SECTION_HEADING_IN_PATTERN = r"^## 🔀 \*\*Related Strategies\*\*" # Raw string for regex
CLIMATIC_PATTERN_SECTION_HEADING_REGEX = r"^## ⛅ \*\*Relevant Climatic Patterns\*\*" # Raw string for regex

def collect_strategy_to_pattern_links() -> dict[str, set[str]]:
    """
    Collects links from Strategies to Climatic Patterns from the specific section.
    """
    s_to_p_links: dict[str, set[str]] = {}
    strategy_files = find_markdown_files(STRATEGY_DIR, filename_pattern='index.md')

    for filepath in strategy_files:
        # Skip category index files and main strategies index
        relative_path = os.path.relpath(filepath, STRATEGY_DIR)
        if len(os.path.normpath(relative_path).split(os.sep)) < 3:
            continue

        strategy_slug = get_file_slug(filepath, 'docs')
        extracted_pattern_links = extract_links_from_section(
            filepath,
            CLIMATIC_PATTERN_SECTION_HEADING_REGEX, # Use the regex version
            '/climatic-patterns'
        )
        s_to_p_links[strategy_slug] = extracted_pattern_links
    return s_to_p_links

def collect_pattern_to_strategy_links() -> dict[str, set[str]]:
    """
    Collects links from Climatic Patterns to Strategies from the specific section.
    """
    p_to_s_links: dict[str, set[str]] = {}
    pattern_files = find_markdown_files(CLIMATIC_PATTERNS_DIR, filename_pattern='*.md')

    for filepath in pattern_files:
        # Skip the main climatic-patterns index file if it exists and is not a pattern itself
        if os.path.basename(filepath) == 'index.md' and len(os.path.normpath(os.path.relpath(filepath, CLIMATIC_PATTERNS_DIR)).split(os.sep)) == 1:
            # This check is to ensure we're not processing docs/climatic-patterns/index.md as a pattern doc
             if get_file_slug(filepath, 'docs') == '/climatic-patterns': # Extra check for safety
                continue

        pattern_slug = get_file_slug(filepath, 'docs')
        extracted_strategy_links = extract_links_from_section(
            filepath,
            STRATEGY_SECTION_HEADING_IN_PATTERN, # Use the regex version
            '/strategies'
        )
        p_to_s_links[pattern_slug] = extracted_strategy_links
    return p_to_s_links

@pytest.mark.skip(reason="Temporarily disabled")
def test_reciprocal_climatic_pattern_links():
    """
    Tests that links between Strategies and Climatic Patterns are reciprocal.
    - If Strategy A links to Pattern X, Pattern X must link back to Strategy A.
    - If Pattern Y links to Strategy B, Strategy B must link back to Pattern Y.
    """
    s_to_p_links = collect_strategy_to_pattern_links()
    p_to_s_links = collect_pattern_to_strategy_links()
    asymmetric_links = []

    # Check links from Strategies to Patterns
    for strategy_slug, linked_pattern_slugs in s_to_p_links.items():
        for pattern_slug in linked_pattern_slugs:
            if strategy_slug not in p_to_s_links.get(pattern_slug, set()):
                asymmetric_links.append(
                    f"Strategy '{strategy_slug}' links to Climatic Pattern '{pattern_slug}', but the pattern does not link back."
                )
            # Also check if the linked pattern actually exists (i.e., was collected)
            elif pattern_slug not in p_to_s_links:
                 asymmetric_links.append(
                    f"Strategy '{strategy_slug}' links to non-existent or unparsed Climatic Pattern '{pattern_slug}'."
                )


    # Check links from Patterns to Strategies
    for pattern_slug, linked_strategy_slugs in p_to_s_links.items():
        for strategy_slug in linked_strategy_slugs:
            if pattern_slug not in s_to_p_links.get(strategy_slug, set()):
                asymmetric_links.append(
                    f"Climatic Pattern '{pattern_slug}' links to Strategy '{strategy_slug}', but the strategy does not link back."
                )
            # Also check if the linked strategy actually exists (i.e., was collected)
            elif strategy_slug not in s_to_p_links:
                asymmetric_links.append(
                    f"Climatic Pattern '{pattern_slug}' links to non-existent or unparsed Strategy '{strategy_slug}'."
                )

    assert not asymmetric_links, \
        "Found asymmetric links between Strategies and Climatic Patterns:\n" + "\n".join(asymmetric_links)


def test_all_strategies_have_at_least_one_climatic_pattern():
    """
    Tests that every strategy document links to at least one climatic pattern
    in its 'Relevant Climatic Patterns' section.
    It also implicitly checks if the section exists, but
    `test_strategy_has_climatic_pattern_section` is more direct for that.
    """
    strategy_files = find_markdown_files(STRATEGY_DIR, filename_pattern='index.md')
    strategies_without_patterns = []

    for filepath in strategy_files:
        # Skip category index files and main strategies index
        relative_path = os.path.relpath(filepath, STRATEGY_DIR)
        if len(os.path.normpath(relative_path).split(os.sep)) < 3:
            continue

        strategy_slug = get_file_slug(filepath, 'docs')

        # First, check if the section exists, otherwise extract_links_from_section will return empty anyway
        # but this makes the error more specific if the section is missing altogether.
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            # Use re.search for the regex pattern
            if not re.search(CLIMATIC_PATTERN_SECTION_HEADING_REGEX, content, re.MULTILINE):
                 # This case is primarily caught by test_strategy_has_climatic_pattern_section
                 # but helps in context here too.
                strategies_without_patterns.append(
                    f"Strategy '{strategy_slug}' is missing the section matching regex '{CLIMATIC_PATTERN_SECTION_HEADING_REGEX}'."
                )
                continue
        except FileNotFoundError:
            strategies_without_patterns.append(f"File not found for strategy: {strategy_slug}")
            continue

        linked_patterns = extract_links_from_section(
            filepath,
            CLIMATIC_PATTERN_SECTION_HEADING_REGEX, # regex
            '/climatic-patterns'
        )

        if not linked_patterns:
            strategies_without_patterns.append(
                f"Strategy '{strategy_slug}' has no links in its '{CLIMATIC_PATTERN_SECTION_HEADING}' section."
            )

    assert not strategies_without_patterns, \
        "Found strategies without any linked climatic patterns:\n" + "\n".join(strategies_without_patterns)


RELATED_STRATEGIES_SECTION_HEADING_REGEX = r"^## 🔀 \*\*Related Strategies\*\*"

def test_related_strategy_links_are_explained():
    """
    Tests that each link in the 'Related Strategies' section of a strategy document
    has explanatory text following the link.
    Example of an unexplained link: `- [Strategy B](/strategies/foo/bar)`
    Example of an explained link:   `- [Strategy B](/strategies/foo/bar) - This is an explanation.`
    """
    strategy_files = find_markdown_files(STRATEGY_DIR, filename_pattern='index.md')
    unexplained_links_found = []

    # Regex to find a markdown link: [text](link)
    # We'll then check the text immediately following it.
    link_line_pattern = re.compile(r"^\s*-\s*\[[^\]]+\]\((/strategies/[^)\s#]+)[^)]*\)(.*)")

    for filepath in strategy_files:
        relative_path = os.path.relpath(filepath, STRATEGY_DIR)
        if len(os.path.normpath(relative_path).split(os.sep)) < 3: # Skip category/main indexes
            continue

        strategy_slug = get_file_slug(filepath, 'docs')

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except FileNotFoundError:
            unexplained_links_found.append(f"File not found for strategy: {strategy_slug}")
            continue

        section_match = re.search(RELATED_STRATEGIES_SECTION_HEADING_REGEX, content, re.MULTILINE)
        if not section_match:
            # If the section doesn't exist, this test doesn't apply.
            # Another test could check for section existence if required by CONTRIBUTING.md for all strategies.
            # (CONTRIBUTING.md implies it's required)
            continue

        section_start_index = section_match.end()

        # Determine the level of the found heading (e.g., ## is level 2)
        heading_level = section_match.group(0).count('#')
        next_heading_pattern_str = r"\n^#{1," + str(heading_level) + r"} .*"
        next_heading_match = re.search(next_heading_pattern_str, content[section_start_index:], re.MULTILINE)

        if next_heading_match:
            section_content = content[section_start_index : section_start_index + next_heading_match.start()]
        else:
            section_content = content[section_start_index:]

        for line in section_content.splitlines():
            line_match = link_line_pattern.match(line)
            if line_match:
                target_link_slug = normalize_path(line_match.group(1))
                explanation = line_match.group(2).strip()
                # Explanation must exist and not just be a hyphen or em-dash (common placeholders)
                if not explanation or explanation in ['-', '–', '—']:
                    unexplained_links_found.append(
                        f"Strategy '{strategy_slug}' has an unexplained link to '{target_link_slug}'."
                    )

    assert not unexplained_links_found, \
        "Found unexplained links in 'Related Strategies' sections:\n" + "\n".join(unexplained_links_found)


# Based on CONTRIBUTING.md
REQUIRED_STRATEGY_HEADINGS = [
    "## 🤔 **Explanation**",
    "## 🗺️ **Real-World Examples**",
    "## 🚦 **When to Use / When to Avoid**",
    "## 🎯 **Leadership**",
    "## 📋 **How to Execute**",
    "## 📈 **Measuring Success**",
    "## ⚠️ **Common Pitfalls and Warning Signs**",
    "## 🧠 **Strategic Insights**",
    "## ❓ **Key Questions to Ask**",
    "## 🔀 **Related Strategies**",
    "## ⛅ **Relevant Climatic Patterns**",
    "## 📚 **Further Reading & References**",
]

def test_strategy_has_required_headings():
    """
    Tests that each strategy document (not category indexes) contains all required H2 headings
    as specified in CONTRIBUTING.md.
    """
    strategy_files = find_markdown_files(STRATEGY_DIR, filename_pattern='index.md')
    all_missing_headings_reports = [] # Stores strings describing missing headings for each file

    for filepath in strategy_files:
        relative_path = os.path.relpath(filepath, STRATEGY_DIR)
        # Filter for actual strategy documents (e.g., docs/strategies/category/name/index.md)
        # These have 3 path components relative to STRATEGY_DIR (category, name, index.md)
        if len(os.path.normpath(relative_path).split(os.sep)) < 3:
            continue

        strategy_slug = get_file_slug(filepath, 'docs')

        try:
            # extract_headings_from_file is already in script_utils
            headings_in_file = extract_headings_from_file(filepath)
        except FileNotFoundError:
            all_missing_headings_reports.append(f"File not found for strategy: {strategy_slug}")
            continue

        # Normalize headings from file for comparison (e.g. handle extra spaces)
        normalized_headings_in_file = {h.strip() for h in headings_in_file}

        missing_for_this_file = []
        for req_heading in REQUIRED_STRATEGY_HEADINGS:
            if req_heading not in normalized_headings_in_file:
                missing_for_this_file.append(req_heading)

        if missing_for_this_file:
            report_str = f"Strategy '{strategy_slug}' is missing headings:\n" + \
                         "\n".join([f"  - {h}" for h in missing_for_this_file])
            all_missing_headings_reports.append(report_str)

    assert not all_missing_headings_reports, \
        "Found strategies with missing required headings:\n\n" + "\n\n".join(all_missing_headings_reports)


def test_strategy_headings_in_order():
    """Tests that required H2 headings appear in the correct order."""
    strategy_files = find_markdown_files(STRATEGY_DIR, filename_pattern='index.md')
    out_of_order = []

    for filepath in strategy_files:
        relative_path = os.path.relpath(filepath, STRATEGY_DIR)
        if len(os.path.normpath(relative_path).split(os.sep)) < 3:
            continue

        slug = get_file_slug(filepath, 'docs')
        headings_in_file = [h.strip() for h in extract_headings_from_file(filepath)]

        # Keep only the required headings in the order they appear
        extracted_required = [h for h in headings_in_file if h in REQUIRED_STRATEGY_HEADINGS]

        if extracted_required != REQUIRED_STRATEGY_HEADINGS:
            out_of_order.append(slug)

    assert not out_of_order, (
        "Found strategies with required headings out of order:\n" + "\n".join(out_of_order)
    )


def test_internal_links_are_in_related_strategies():
    """
    Tests that every internal link to another strategy within a strategy document's content
    is also listed in its 'Related Strategies' section.
    """
    strategy_files = find_markdown_files(STRATEGY_DIR, filename_pattern='index.md')
    issues_found = [] # Stores strings describing missing related links

    for filepath in strategy_files:
        relative_path = os.path.relpath(filepath, STRATEGY_DIR)
        if len(os.path.normpath(relative_path).split(os.sep)) < 3: # Skip category/main indexes
            continue

        source_slug = get_file_slug(filepath, 'docs')

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except FileNotFoundError:
            issues_found.append(f"File not found for strategy: {source_slug}")
            continue

        # Extract all strategy links from the entire document content
        # extract_links_from_file (from script_utils) already normalizes paths and filters by prefix
        all_internal_strategy_links = extract_links_from_file(filepath, content_prefix='/strategies')
        # Remove self-references if any (though get_file_slug and extract_links should handle normalization)
        all_internal_strategy_links.discard(source_slug)


        # Extract links specifically from the 'Related Strategies' section
        links_in_related_section = extract_links_from_section(
            filepath,
            RELATED_STRATEGIES_SECTION_HEADING_REGEX,
            '/strategies'
        )

        # Check if the 'Related Strategies' section exists. If not, all internal links are considered missing from it.
        # However, CONTRIBUTING.md requires this section, so another test (`test_strategy_has_required_headings`)
        # should catch the absence of the section itself.
        # Here, we focus on whether links found in content appear in that section *if it exists*.
        # If `extract_links_from_section` returns an empty set because the section is missing,
        # then any `all_internal_strategy_links` will be flagged, which is correct.

        missing_from_related_section = []
        for internal_link in all_internal_strategy_links:
            if internal_link not in links_in_related_section:
                # Additionally, ensure the target link is an actual strategy document, not a category index
                # This requires knowing all valid strategy slugs.
                # For now, we assume any link starting with /strategies/ and not pointing to self
                # is a potential candidate that should be in related if it's a valid strategy.
                # This check might need refinement if there's a robust way to distinguish strategy slugs from category slugs.
                # The current script_utils.get_file_slug for a category index (e.g. /docs/strategies/attacking/index.md)
                # would result in /strategies/attacking.
                # A specific strategy (e.g. /docs/strategies/attacking/fools-mate/index.md) -> /strategies/attacking/fools-mate
                # So, we can check the depth of the target link slug.

                # Simple check: if it's a link to a category page, it might not need to be in "Related Strategies"
                # A category slug like '/strategies/attacking' has 2 parts after splitting by '/' and removing empty ones.
                # A strategy slug like '/strategies/attacking/fools-mate' has 3 parts.
                # This is a heuristic.
                if len([part for part in internal_link.split('/') if part]) > 2 : # If it's likely a specific strategy
                     missing_from_related_section.append(internal_link)


        if missing_from_related_section:
            report_str = f"Strategy '{source_slug}' has internal links not listed in 'Related Strategies':\n" + \
                         "\n".join([f"  - {link}" for link in missing_from_related_section])
            issues_found.append(report_str)

    assert not issues_found, \
        "Found internal strategy links not listed in 'Related Strategies' sections:\n\n" + "\n\n".join(issues_found)
