import re
import sys
import os

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
REQUIRED_STRATEGY_HEADINGS_SET = set(REQUIRED_STRATEGY_HEADINGS)

# Generic H2 pattern (ensures it starts a line, allows leading spaces)
GENERIC_H2_PATTERN = re.compile(r"(?:^|\n)(\s*##\s+[^#\n][^\n]*?)(?=\n|$)", re.MULTILINE)


def reorder_sections_in_file_v5(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: File not found: {filepath}")
        return

    sections = {}
    non_standard_sections = {}
    ordered_headings_in_file = [] # Will store (stripped_heading, original_text_of_heading, content_for_heading)

    markers = [] # List of (position, stripped_heading_text, original_heading_text)

    # 1. Find all REQUIRED headings by exact string match
    for req_heading in REQUIRED_STRATEGY_HEADINGS:
        start_index = 0
        while True:
            pos = content.find(req_heading, start_index)
            if pos == -1:
                break
            # Ensure this found heading isn't part of a larger, non-standard heading
            # e.g. prevent matching "## Foo" inside "## Foo Bar" if "## Foo Bar" is also a generic H2 marker
            # This is complex; for now, assume direct matches are primary.
            markers.append((pos, req_heading, req_heading)) # pos, canonical, original
            start_index = pos + len(req_heading)

    # 2. Find all generic H2 headings that start a line
    for match in GENERIC_H2_PATTERN.finditer(content):
        pos = match.start(1) # Start of the heading text itself (group 1)
        original_heading = match.group(1) # Includes leading spaces
        stripped_heading = original_heading.strip()

        # Avoid adding if it's a required heading already found by exact match at nearly the same position
        # (exact match for required headings is preferred)
        is_already_marked_as_required = False
        for m_pos, m_canon, _ in markers:
            if m_canon == stripped_heading and abs(m_pos - pos) < len(original_heading) : # If same heading text and nearby
                is_already_marked_as_required = True
                break
        if not is_already_marked_as_required and stripped_heading not in REQUIRED_STRATEGY_HEADINGS_SET:
            markers.append((pos, stripped_heading, original_heading))

    # Sort markers by position, then by length of original heading descending (to prioritize longer matches if overlapping)
    markers.sort(key=lambda x: (x[0], -len(x[2])))

    # Filter overlapping/duplicate markers: if two markers start at same pos, keep the one that's a required heading,
    # or the longer one if neither/both are.
    # A simpler filter: keep unique positions, prioritizing required ones.
    unique_pos_markers = {}
    for pos, stripped_h, original_h in markers:
        if pos not in unique_pos_markers:
            unique_pos_markers[pos] = (pos, stripped_h, original_h)
        else:
            # Preference: if current is required and stored isn't, replace.
            # Or if current is longer. (This logic can be refined if needed)
            is_current_req = stripped_h in REQUIRED_STRATEGY_HEADINGS_SET
            is_stored_req = unique_pos_markers[pos][1] in REQUIRED_STRATEGY_HEADINGS_SET
            if is_current_req and not is_stored_req:
                unique_pos_markers[pos] = (pos, stripped_h, original_h)
            elif not is_current_req and not is_stored_req and len(original_h) > len(unique_pos_markers[pos][2]):
                 unique_pos_markers[pos] = (pos, stripped_h, original_h)
            # If both required, or current is not req and stored is, keep stored.

    sorted_markers = sorted(list(unique_pos_markers.values()), key=lambda x: x[0])

    # 3. Extract sections based on sorted markers
    preamble = ""
    if not sorted_markers:
        preamble = content
    else:
        preamble = content[:sorted_markers[0][0]] # Content before the first marker's original start

        for i, (pos, stripped_h, original_h) in enumerate(sorted_markers):
            content_start_pos = pos + len(original_h) # Content starts after the original heading text
            content_end_pos = sorted_markers[i+1][0] if (i + 1) < len(sorted_markers) else len(content)
            section_content = content[content_start_pos:content_end_pos]

            if stripped_h in REQUIRED_STRATEGY_HEADINGS_SET:
                sections[stripped_h] = section_content # Use canonical form as key
            elif stripped_h.startswith("## "): # Must be a non-standard one
                if stripped_h not in non_standard_sections: # Keep first encountered
                    non_standard_sections[stripped_h] = section_content
                    ordered_headings_in_file.append(stripped_h) # This list is for non-standard ones

    # 4. Reconstruct the document
    new_content_parts = [preamble.rstrip() + ('\n' if preamble.strip() else '')] # Ensure preamble ends with one newline if not empty

    for req_heading in REQUIRED_STRATEGY_HEADINGS:
        if req_heading in sections:
            # Ensure there's a blank line before the new heading if content exists already
            if new_content_parts and new_content_parts[-1].strip():
                 if not new_content_parts[-1].endswith('\n\n'):
                    new_content_parts[-1] = new_content_parts[-1].rstrip() + '\n\n'

            new_content_parts.append(req_heading + "\n") # Canonical heading on its own line
            # Content should also start on a new line, and be trimmed
            section_body = sections[req_heading].strip()
            if section_body: # Only add content if it's not just whitespace
                new_content_parts.append(section_body + "\n")

    if non_standard_sections:
        if new_content_parts and new_content_parts[-1].strip() and not new_content_parts[-1].endswith('\n\n'):
            new_content_parts[-1] = new_content_parts[-1].rstrip() + '\n\n'

        for heading in ordered_headings_in_file: # This list contains non-standard headings
            if heading in non_standard_sections:
                new_content_parts.append(heading + "\n")
                section_body = non_standard_sections[heading].strip()
                if section_body:
                    new_content_parts.append(section_body + "\n")


    final_content = "".join(new_content_parts)
    # Final normalization: strip trailing spaces from all lines, ensure single trailing newline for the whole file
    final_content_lines = [l.rstrip() for l in final_content.splitlines()]
    final_content = "\n".join(final_content_lines)

    if final_content.strip(): # If there's any actual content
        final_content = final_content.strip() + "\n"
    else: # If all content was whitespace or empty
        final_content = ""


    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(final_content)
    except IOError:
        print(f"Error: Could not write to file: {filepath}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python reorder_markdown_sections.py <path_to_markdown_file_or_keyword>")
        sys.exit(1)

    current_failing_slugs = [
        "/strategies/markets/harvesting", "/strategies/markets/buyer-supplier-power",
        "/strategies/markets/signal-distortion", "/strategies/competitor/circling-and-probing",
        "/strategies/dealing-with-toxicity/refactoring", "/strategies/dealing-with-toxicity/disposal-of-liability",
        "/strategies/dealing-with-toxicity/pig-in-a-poke",
    ]
    initial_failing_slugs = [
            "/strategies/poison/designed-to-fail", "/strategies/poison/licensing", "/strategies/poison/insertion",
            "/strategies/ecosystem/alliances", "/strategies/positional/weak-signal-horizon",
            "/strategies/attacking/press-release-process", "/strategies/markets/harvesting",
            "/strategies/markets/buyer-supplier-power", "/strategies/markets/signal-distortion",
            "/strategies/markets/standards-game", "/strategies/accelerators/exploiting-network-effects",
            "/strategies/accelerators/cooperation", "/strategies/accelerators/industrial-policy",
            "/strategies/user-perception/brand-and-marketing", "/strategies/user-perception/artificial-competition",
            "/strategies/competitor/circling-and-probing", "/strategies/competitor/ambush",
            "/strategies/competitor/tech-drops", "/strategies/competitor/misdirection",
            "/strategies/competitor/restriction-of-movement", "/strategies/competitor/sapping",
            "/strategies/competitor/talent-raid", "/strategies/competitor/reinforcing-competitor-inertia",
            "/strategies/competitor/fragmentation", "/strategies/dealing-with-toxicity/refactoring",
            "/strategies/dealing-with-toxicity/disposal-of-liability", "/strategies/dealing-with-toxicity/sweat-and-dump",
            "/strategies/dealing-with-toxicity/pig-in-a-poke",
        ]

    base_dir = "docs"
    files_to_process_paths = []
    args = sys.argv[1:]

    slugs_for_processing = []
    if "ALL_FAILING" in args:
        slugs_for_processing = current_failing_slugs
        args = [arg for arg in args if arg != "ALL_FAILING"]
    elif "PREVIOUS_ALL_FAILING" in args:
        slugs_for_processing = initial_failing_slugs
        args = [arg for arg in args if arg != "PREVIOUS_ALL_FAILING"]

    if slugs_for_processing:
        files_to_process_paths.extend(f"{base_dir}{slug}/index.md" for slug in slugs_for_processing)

    for arg in args:
        # A bit more robust check for file paths
        path_candidate = arg
        if not os.path.isabs(path_candidate) and not path_candidate.startswith(base_dir) and arg.startswith("/strategies"):
             path_candidate = f"{base_dir}{arg}/index.md" # Convert slug-like arg to full path

        if os.path.exists(path_candidate) and path_candidate.endswith(".md"):
            files_to_process_paths.append(path_candidate)
        elif arg.endswith(".md"): # Allow adding .md files even if not initially existing (e.g. if script creates them)
             files_to_process_paths.append(path_candidate)


    files_to_process_paths = sorted(list(set(files_to_process_paths)))

    if not files_to_process_paths:
        print("No files specified or matched by keywords for reordering.")
        sys.exit(0)

    for md_file in files_to_process_paths:
        print(f"Reordering {md_file} with V5 script...")
        reorder_sections_in_file_v5(md_file)

    print(f"Done reordering {len(files_to_process_paths)} file(s) with V5 script.")
