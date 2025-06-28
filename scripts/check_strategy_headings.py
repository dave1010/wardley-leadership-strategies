#!/usr/bin/env python3

import os
import sys
from script_utils import find_markdown_files, extract_headings_from_file

# Define the required headings
REQUIRED_HEADINGS = [
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

STRATEGIES_DIR = "docs/strategies"

def main():
    """
    Checks all strategy markdown files for the required headings and reports missing ones.
    """
    strategy_files = find_markdown_files(STRATEGIES_DIR, filename_pattern='index.md')
    missing_headings_report = {}
    total_issues = 0

    for filepath in strategy_files:
        # Calculate depth relative to STRATEGIES_DIR
        # e.g., docs/strategies/category/strategy/index.md
        # relative_path = category/strategy/index.md
        # parts = ["category", "strategy", "index.md"] -> length 3
        relative_path = os.path.relpath(filepath, STRATEGIES_DIR)
        path_parts = relative_path.split(os.sep)

        # We are interested in files like "category/strategy/index.md" (depth 3)
        # Category indexes like "category/index.md" (depth 2) should be skipped.
        # The main strategies index "index.md" (depth 1) should be skipped.
        if len(path_parts) < 3:
            continue

        headings_in_file = extract_headings_from_file(filepath)

        missing_for_file = []
        for req_heading in REQUIRED_HEADINGS:
            if req_heading not in headings_in_file:
                missing_for_file.append(req_heading)

        if missing_for_file:
            missing_headings_report[filepath] = missing_for_file
            total_issues += len(missing_for_file)

    if missing_headings_report:
        print("Missing headings found:")
        for filepath, missing in missing_headings_report.items():
            print(f"\n--- {filepath} ---")
            for heading in missing:
                print(f"  - {heading}")
        print(f"\nFound {total_issues} missing heading(s) in {len(missing_headings_report)} file(s).")
        sys.exit(1)
    else:
        print("All strategy files have the required headings. ✨")
        sys.exit(0)

if __name__ == "__main__":
    main()
