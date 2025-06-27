import os
import csv
import sys
from script_utils import normalize_path, find_markdown_files, extract_links_from_file, get_file_slug

STRATEGY_DIR = os.path.join('docs', 'strategies')

# link_pattern and normalize function are removed as their functionality
# is replaced by script_utils functions.

def collect_strategy_links(): # Renamed and refactored
    docs = {}
    # Find all 'index.md' files in the strategy directory
    strategy_files = find_markdown_files(STRATEGY_DIR, filename_pattern='index.md')

    for path in strategy_files:
        # Generate slug from filepath
        slug = get_file_slug(path, 'docs')

        # Extract links starting with '/strategies'
        # extract_links_from_file already normalizes paths
        links = extract_links_from_file(path, '/strategies')

        # Remove self-references
        links.discard(slug)

        docs[slug] = links
    return docs

def main():
    docs = collect_strategy_links() # Use the new function
    issues = []
    for src, targets in docs.items():
        for tgt in targets:
            # Ensure target exists in our collected docs and also links back to source
            if tgt in docs:
                # normalize_path might not be strictly needed here if slugs/links are already normalized
                # but using it defensively for keys from docs.items() and items in docs[tgt]
                # However, get_file_slug and extract_links_from_file should be providing normalized forms.
                if normalize_path(src) not in docs[tgt]:
                    issues.append((normalize_path(src), normalize_path(tgt)))
            else:
                # This case could mean a broken link to a strategy that doesn't exist (not part of this script's core check)
                # For now, we only care about reciprocal links among existing, parsed strategies.
                pass

    writer = csv.writer(sys.stdout)
    writer.writerow(['source', 'target'])
    for src, tgt in issues:
        writer.writerow([src, tgt])
    print(len(issues), file=sys.stderr)

if __name__ == '__main__':
    main()
