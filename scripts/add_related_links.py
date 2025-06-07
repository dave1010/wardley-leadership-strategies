import os
import re
import csv
import sys

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


def add_links():
    docs, related_map, section_map = collect_docs()
    writer = csv.writer(sys.stdout)
    writer.writerow(['source', 'target'])
    count = 0
    for src, targets in docs.items():
        missing = [t for t in targets if t in docs and t not in related_map[src]]
        if not missing:
            continue
        path = slug_to_path(src)
        with open(path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        if section_map[src]:
            idx = next(i for i, l in enumerate(lines) if 'Related Strategies' in l)
            insert_idx = idx + 1
            while insert_idx < len(lines) and not lines[insert_idx].startswith('#'):
                insert_idx += 1
            new_lines = [f"- [{get_title(t)}]({t})\n" for t in missing]
            lines[insert_idx:insert_idx] = new_lines
        else:
            header = "## 🔀 **Related Strategies**\n"
            new_lines = [header] + [f"- [{get_title(t)}]({t})\n" for t in missing] + ["\n"]
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
        for t in missing:
            writer.writerow([src, t])
            count += 1
    print(count, file=sys.stderr)


if __name__ == '__main__':
    add_links()
