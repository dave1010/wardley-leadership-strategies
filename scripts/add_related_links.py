import os
import re
import csv
import sys
from typing import List, Dict

STRATEGY_DIR = os.path.join('docs', 'strategies')
link_pattern = re.compile(r'\[[^\]]+\]\((/strategies[^)\s#]+)')
title_pattern = re.compile(r'^title:\s*(.+)$', re.MULTILINE)


def normalize(slug: str) -> str:
    slug = slug.split('#')[0]
    return slug.rstrip('/')


def slug_to_path(slug: str) -> str:
    return os.path.join('docs', slug.lstrip('/'), 'index.md')


def get_title(slug: str) -> str:
    path = slug_to_path(slug)
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    m = title_pattern.search(text)
    if m:
        return m.group(1).strip('"')
    return slug.rsplit('/', 1)[-1]


def parse_doc(path: str):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    text = ''.join(lines)
    links = {normalize(m) for m in link_pattern.findall(text)}
    slug = '/' + os.path.relpath(os.path.dirname(path), 'docs')
    slug = normalize(slug)
    links.discard(slug)
    related = set()
    section_idx = None
    for idx, line in enumerate(lines):
        if 'Related Strategies' in line:
            section_idx = idx
            for j in range(idx + 1, len(lines)):
                l = lines[j]
                if l.startswith('#'):
                    break
                for m in link_pattern.findall(l):
                    related.add(normalize(m))
            break
    return slug, links, related, section_idx is not None


def collect_docs():
    docs = {}
    related_map = {}
    section_map = {}
    for root, dirs, files in os.walk(STRATEGY_DIR):
        if 'index.md' in files and root.count(os.sep) >= 3:
            path = os.path.join(root, 'index.md')
            slug, links, rel, has_sec = parse_doc(path)
            docs[slug] = links
            related_map[slug] = rel
            section_map[slug] = has_sec
    return docs, related_map, section_map


def insert_into_related(slug: str, targets: List[str], section_map: Dict[str, bool]):
    path = slug_to_path(slug)
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    if section_map.get(slug):
        idx = next(i for i, l in enumerate(lines) if 'Related Strategies' in l)
        insert_idx = idx + 1
        while insert_idx < len(lines) and not lines[insert_idx].startswith('#'):
            insert_idx += 1
        new_lines = [f"- [{get_title(t)}]({t})\n" for t in targets]
        lines[insert_idx:insert_idx] = new_lines
    else:
        header = "## 🔀 **Related Strategies**\n"
        new_lines = [header] + [f"- [{get_title(t)}]({t})\n" for t in targets] + ["\n"]
        insert_idx = None
        for i, l in enumerate(lines):
            if 'Further Reading & References' in l:
                insert_idx = i
                break
        if insert_idx is None:
            lines.extend(['\n'] + new_lines)
        else:
            lines[insert_idx:insert_idx] = new_lines

    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(lines)


def add_links():
    docs, related_map, section_map = collect_docs()
    writer = csv.writer(sys.stdout)
    writer.writerow(['source', 'target'])
    count = 0

    # Ensure links found in the document appear in its Related Strategies section
    for src, targets in docs.items():
        missing = [t for t in targets if t in docs and t not in related_map[src]]
        if missing:
            insert_into_related(src, missing, section_map)
            for t in missing:
                writer.writerow([src, t])
                count += 1

    # Re-collect after modifications
    docs, related_map, section_map = collect_docs()

    # Add reciprocal links where target does not link back
    reciprocal_map: Dict[str, List[str]] = {}
    for src, targets in docs.items():
        for tgt in targets:
            if tgt in docs and src not in docs[tgt]:
                reciprocal_map.setdefault(tgt, []).append(src)

    for tgt, srcs in reciprocal_map.items():
        insert_into_related(tgt, srcs, section_map)
        for s in srcs:
            writer.writerow([tgt, s])
            count += 1

    print(count, file=sys.stderr)


if __name__ == '__main__':
    add_links()
