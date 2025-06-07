import os
import re
import csv
import sys

STRATEGY_DIR = os.path.join('docs', 'strategies')
link_pattern = re.compile(r'\[[^\]]+\]\((/strategies[^)\s#]+)\)')

def normalize(slug: str) -> str:
    slug = slug.split('#')[0]
    return slug.rstrip('/')


def parse_related(path: str):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    slug = '/' + os.path.relpath(os.path.dirname(path), 'docs')
    slug = normalize(slug)
    issues = []
    start = None
    for idx, line in enumerate(lines):
        if 'Related Strategies' in line:
            start = idx + 1
            break
    if start is None:
        return issues
    for i in range(start, len(lines)):
        line = lines[i]
        if line.startswith('#'):
            break
        for m in link_pattern.finditer(line):
            rest = line[m.end():].strip()
            if rest == '' or rest in {'-', '–', '—'}:
                issues.append((slug, normalize(m.group(1))))
    return issues


def main():
    issues = []
    for root, dirs, files in os.walk(STRATEGY_DIR):
        if 'index.md' in files and root.count(os.sep) >= 3:
            path = os.path.join(root, 'index.md')
            issues.extend(parse_related(path))
    writer = csv.writer(sys.stdout)
    writer.writerow(['source', 'target'])
    for src, tgt in issues:
        writer.writerow([src, tgt])
    print(len(issues), file=sys.stderr)


if __name__ == '__main__':
    main()
