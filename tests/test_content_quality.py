import pytest
import re
from test_utils import Strategy, get_strategy_files, get_section_content, extract_links_from_content

# Based on CONTRIBUTING.md
EXPECTED_H2_HEADINGS = [
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

@pytest.fixture(scope="module")
def strategies():
    """Fixture to load all strategy documents."""
    strategy_files = get_strategy_files()
    return [Strategy(filepath) for filepath in strategy_files]

def test_strategy_has_required_headings(strategies):
    """Tests that each strategy document contains all required H2 headings."""
    all_missing_headings_reports = []
    for strategy in strategies:
        missing_for_this_file = [h for h in EXPECTED_H2_HEADINGS if h not in strategy.h2_headings]
        if missing_for_this_file:
            report = f"Strategy '{strategy.slug}' is missing headings:\n" + \
                     "\n".join([f"  - {h}" for h in missing_for_this_file])
            all_missing_headings_reports.append(report)

    assert not all_missing_headings_reports, \
        "Found strategies with missing required headings:\n\n" + "\n\n".join(all_missing_headings_reports)

def test_strategy_headings_are_in_order(strategies):
    """Tests that the required H2 headings in each strategy document appear in the expected order."""
    out_of_order_strategies = []
    for strategy in strategies:
        present_headings = [h for h in strategy.h2_headings if h in EXPECTED_H2_HEADINGS]
        expected_order = [h for h in EXPECTED_H2_HEADINGS if h in present_headings]
        if present_headings != expected_order:
            out_of_order_strategies.append(strategy.slug)

    assert not out_of_order_strategies, \
        "Found strategies with required headings out of order:\n" + "\n".join(out_of_order_strategies)

def test_no_empty_sections(strategies):
    """Tests that no required section in a strategy document is empty."""
    empty_sections_reports = []
    for strategy in strategies:
        for heading in EXPECTED_H2_HEADINGS:
            if heading in strategy.h2_headings:
                section_content = get_section_content(strategy.content, heading)
                if not section_content or section_content.strip() == "":
                    report = f"Strategy '{strategy.slug}' has an empty section: '{heading}'"
                    empty_sections_reports.append(report)

    assert not empty_sections_reports, \
        "Found strategies with empty sections:\n" + "\n".join(empty_sections_reports)

def test_no_extra_sections(strategies):
    """Tests that there are no unexpected H2 headings in strategy documents."""
    extra_sections_reports = []
    expected_set = set(EXPECTED_H2_HEADINGS)
    for strategy in strategies:
        extra_headings = [h for h in strategy.h2_headings if h not in expected_set]
        if extra_headings:
            report = f"Strategy '{strategy.slug}' has extra H2 headings:\n" + \
                     "\n".join([f"  - {h}" for h in extra_headings])
            extra_sections_reports.append(report)

    assert not extra_sections_reports, \
        "Found strategies with extra H2 headings:\n\n" + "\n\n".join(extra_sections_reports)

def test_strategy_has_quote_or_unmentioned_note(strategies):
    """Ensure each strategy either quotes Simon Wardley or states it isn't explicitly mentioned."""
    missing_info = []
    for strategy in strategies:
        has_quote = re.search(r'^>.*Simon Wardley', strategy.content, re.MULTILINE)
        has_unmentioned = "isn't explicitly mentioned" in strategy.content
        if not (has_quote or has_unmentioned):
            missing_info.append(strategy.slug)

    assert not missing_info, \
        "Strategies missing a Wardley quote or 'isn\'t explicitly mentioned\' note:\n" + "\n".join(missing_info)

def test_related_strategy_links_are_explained(strategies):
    """Tests that each link in the 'Related Strategies' section has explanatory text."""
    unexplained_links_found = []
    link_line_pattern = re.compile(r"^\s*-\s*\[[^\]]+\]\((/strategies/[^)\s#]+)[^)]*\)\s*(.*)")

    for strategy in strategies:
        section_content = get_section_content(strategy.content, "## 🔀 **Related Strategies**")
        if not section_content:
            continue

        for line in section_content.splitlines():
            match = link_line_pattern.match(line)
            if match:
                explanation = match.group(2).strip()
                if not explanation or explanation in ['-', '–', '—']:
                    unexplained_links_found.append(
                        f"Strategy '{strategy.slug}' has an unexplained link to '{match.group(1)}'."
                    )

    assert not unexplained_links_found, \
        "Found unexplained links in 'Related Strategies' sections:\n" + "\n".join(unexplained_links_found)
