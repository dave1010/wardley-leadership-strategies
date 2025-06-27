import os
import re
import csv
import sys
from script_utils import find_markdown_files, get_file_slug, extract_links_from_section, normalize_path
from typing import List, Set, Dict, Tuple

# Constants
STRATEGIES_DIR = os.path.join('docs', 'strategies')
CLIMATIC_PATTERNS_DIR = os.path.join('docs', 'climatic-patterns')
DOCS_BASE_DIR = 'docs'
STRATEGY_DOC_FILENAME = 'index.md' # Specific filename for strategies
CLIMATIC_PATTERN_SECTION_HEADING_REGEX = r"^## ⛅ \*\*Relevant Climatic Patterns\*\*"
STRATEGY_SECTION_HEADING_IN_PATTERN_REGEX = r"^## 🔀 \*\*Related Strategies\*\*"

def find_strategies_missing_climatic_patterns_section() -> List[str]:
    """
    Finds strategies that are missing the 'Relevant Climatic Patterns' section.
    """
    missing_section_slugs: List[str] = []
    strategy_files = find_markdown_files(STRATEGIES_DIR, filename_pattern=STRATEGY_DOC_FILENAME)

    for filepath in strategy_files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if not re.search(CLIMATIC_PATTERN_SECTION_HEADING_REGEX, content, re.MULTILINE):
                slug = get_file_slug(filepath, DOCS_BASE_DIR)
                missing_section_slugs.append(slug)
        except FileNotFoundError:
            # This shouldn't happen if find_markdown_files is correct
            print(f"Warning: File not found {filepath}, skipping.", file=sys.stderr)
    return missing_section_slugs

def collect_strategy_to_pattern_links() -> Dict[str, Set[str]]:
    """
    Collects links from Strategies to Climatic Patterns from the specific section.
    """
    s_to_p_links: Dict[str, Set[str]] = {}
    strategy_files = find_markdown_files(STRATEGIES_DIR, filename_pattern=STRATEGY_DOC_FILENAME)

    for filepath in strategy_files:
        strategy_slug = get_file_slug(filepath, DOCS_BASE_DIR)
        # extract_links_from_section handles file reading and normalization
        extracted_pattern_links = extract_links_from_section(
            filepath,
            CLIMATIC_PATTERN_SECTION_HEADING_REGEX,
            '/climatic-patterns'
        )
        s_to_p_links[strategy_slug] = extracted_pattern_links
    return s_to_p_links

def collect_pattern_to_strategy_links() -> Dict[str, Set[str]]:
    """
    Collects links from Climatic Patterns to Strategies from the specific section.
    """
    p_to_s_links: Dict[str, Set[str]] = {}
    # Climatic pattern files can have various names, so '*.md'
    pattern_files = find_markdown_files(CLIMATIC_PATTERNS_DIR, filename_pattern='*.md')

    for filepath in pattern_files:
        pattern_slug = get_file_slug(filepath, DOCS_BASE_DIR)
        # extract_links_from_section handles file reading and normalization
        extracted_strategy_links = extract_links_from_section(
            filepath,
            STRATEGY_SECTION_HEADING_IN_PATTERN_REGEX,
            '/strategies'
        )
        p_to_s_links[pattern_slug] = extracted_strategy_links
    return p_to_s_links

def find_asymmetric_links(
    s_to_p_links: Dict[str, Set[str]],
    p_to_s_links: Dict[str, Set[str]]
) -> List[Tuple[str, str, str]]:
    """
    Finds asymmetric links between strategies and climatic patterns.
    """
    asymmetries: List[Tuple[str, str, str]] = []

    # Check links from Strategies to Patterns
    for strategy_slug, linked_pattern_slugs in s_to_p_links.items():
        for pattern_slug in linked_pattern_slugs:
            # Ensure pattern_slug is normalized (should be by extract_links_from_section)
            # Ensure strategy_slug is normalized (should be by get_file_slug)
            if normalize_path(strategy_slug) not in p_to_s_links.get(normalize_path(pattern_slug), set()):
                asymmetries.append((
                    normalize_path(strategy_slug),
                    normalize_path(pattern_slug),
                    "Pattern does not link back to Strategy"
                ))

    # Check links from Patterns to Strategies
    for pattern_slug, linked_strategy_slugs in p_to_s_links.items():
        for strategy_slug in linked_strategy_slugs:
            # Ensure strategy_slug is normalized (should be by extract_links_from_section)
            # Ensure pattern_slug is normalized (should be by get_file_slug)
            if normalize_path(pattern_slug) not in s_to_p_links.get(normalize_path(strategy_slug), set()):
                asymmetries.append((
                    normalize_path(pattern_slug),
                    normalize_path(strategy_slug),
                    "Strategy does not link back to Pattern"
                ))

    return asymmetries

def main():
    # Part 1: Find strategies missing the 'Relevant Climatic Patterns' section
    missing_section_strategies = find_strategies_missing_climatic_patterns_section()
    print("Strategies missing 'Relevant Climatic Patterns' section:")
    if missing_section_strategies:
        for slug in missing_section_strategies:
            print(f"- {slug}")
    else:
        print("None found.")
    print(f"Found {len(missing_section_strategies)} strategies missing the 'Relevant Climatic Patterns' section.", file=sys.stderr)

    print("\n" + "="*80 + "\n") # Separator

    # Part 2: Find asymmetric links
    s_to_p = collect_strategy_to_pattern_links()
    p_to_s = collect_pattern_to_strategy_links()
    asymmetric_found = find_asymmetric_links(s_to_p, p_to_s)

    print("Asymmetric links between Strategies and Climatic Patterns:")
    if asymmetric_found:
        writer = csv.writer(sys.stdout)
        writer.writerow(['Source Document', 'Target Document', 'Issue Type']) # Updated headers
        for source, target, issue in asymmetric_found:
            writer.writerow([source, target, issue])
    else:
        print("No asymmetric links found.")
    print(f"Found {len(asymmetric_found)} asymmetric links.", file=sys.stderr)

if __name__ == '__main__':
    main()
