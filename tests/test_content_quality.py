import pytest
import re
import os
import glob
from test_utils import (
    Strategy,
    get_strategy_files,
    get_section_content,
    extract_links_from_content,
    normalize_path,
)

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

def get_leadership_skills_links() -> set[str]:
    leadership_skills_dir = os.path.join('docs', 'leadership-skills')
    markdown_files = glob.glob(os.path.join(leadership_skills_dir, '*.md'))
    links = {normalize_path('/leadership-skills')}
    for filepath in markdown_files:
        slug = os.path.splitext(os.path.basename(filepath))[0]
        if slug == 'index':
            continue
        links.add(normalize_path(f"/leadership-skills/{slug}"))
    return links

def extract_leadership_skills_section(content: str) -> str | None:
    leadership_section = get_section_content(content, "## 🎯 **Leadership**")
    if not leadership_section:
        return None

    section_lines = leadership_section.splitlines()
    start_index = None
    for index, line in enumerate(section_lines):
        if line.startswith("### ") and "leadership skills" in line.lower():
            start_index = index + 1
            break

    if start_index is None:
        return None

    collected_lines = []
    for line in section_lines[start_index:]:
        if line.startswith("### ") or line.startswith("## "):
            break
        collected_lines.append(line)

    return "\n".join(collected_lines).strip()

def test_leadership_skills_are_linked(strategies):
    missing_links = []
    leadership_skill_links = get_leadership_skills_links()

    for strategy in strategies:
        leadership_skills = extract_leadership_skills_section(strategy.content)
        if not leadership_skills:
            missing_links.append(
                f"Strategy '{strategy.slug}' is missing a leadership skills section."
            )
            continue

        bullet_lines = [
            line for line in leadership_skills.splitlines()
            if line.strip().startswith(('- ', '* '))
        ]

        if not bullet_lines:
            missing_links.append(
                f"Strategy '{strategy.slug}' has no bullet list in the leadership skills section."
            )
            continue

        for line in bullet_lines:
            links = extract_links_from_content(line, "/leadership-skills")
            if not links:
                missing_links.append(
                    f"Strategy '{strategy.slug}' has a leadership skill without a link: '{line.strip()}'."
                )
                continue

            invalid_links = sorted(link for link in links if link not in leadership_skill_links)
            if invalid_links:
                missing_links.append(
                    f"Strategy '{strategy.slug}' links to unknown leadership skills: {', '.join(invalid_links)}."
                )

    assert not missing_links, \
        "Leadership skills must link to leadership skills pages:\n" + "\n".join(missing_links)
