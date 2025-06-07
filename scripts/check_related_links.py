import os
import re
import csv
import sys

STRATEGY_DIR = os.path.join('docs', 'strategies')

link_pattern = re.compile(r'\[[^\]]+\]\((/strategies[^)\s#]+)')


def normalize(slug: str) -> str:
    slug = slug.split('#')[0]
    return slug.rstrip('/')


def parse_doc(path: str):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    text = ''.join(lines)
    links = {normalize(m) for m in link_pattern.findall(text)}
    slug = '/' + os.path.relpath(os.path.dirname(path), 'docs')
    slug = normalize(slug)
    links.discard(slug)
    # find related section
    related = set()
    found = False
    for idx, line in enumerate(lines):
        if 'Related Strategies' in line:
            found = True
            for j in range(idx + 1, len(lines)):
                l = lines[j]
                if l.startswith('#'):
                    break
                for m in link_pattern.findall(l):
                    related.add(normalize(m))
            break
    return slug, links, related, found


def collect_docs():
    docs = {}
    related_map = {}
    section_map = {}
    for root, dirs, files in os.walk(STRATEGY_DIR):
        if 'index.md' in files and root.count(os.sep) >= 3:
            path = os.path.join(root, 'index.md')
            slug, links, related, found = parse_doc(path)
            docs[slug] = links
            related_map[slug] = related
            section_map[slug] = found
    return docs, related_map, section_map


def main():
    docs, related_map, section_map = collect_docs()
    issues = []
    for src, targets in docs.items():
        for tgt in targets:
            if tgt in docs:
                if not section_map[src] or tgt not in related_map[src]:
                    issues.append((src, tgt))
    writer = csv.writer(sys.stdout)
    writer.writerow(['source', 'target'])
    for src, tgt in issues:
        writer.writerow([src, tgt])
    print(len(issues), file=sys.stderr)


if __name__ == '__main__':
    main()
