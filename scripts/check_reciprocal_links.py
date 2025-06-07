import os
import re
import csv
import sys

STRATEGY_DIR = os.path.join('docs', 'strategies')

link_pattern = re.compile(r'\[[^\]]+\]\((/strategies[^)\s#]+)')

def normalize(slug: str) -> str:
    slug = slug.split('#')[0]
    return slug.rstrip('/')

def collect_docs():
    docs = {}
    for root, dirs, files in os.walk(STRATEGY_DIR):
        if 'index.md' in files and root.count(os.sep) >= 3:
            path = os.path.join(root, 'index.md')
            slug = '/' + os.path.relpath(root, 'docs')
            slug = normalize(slug)
            with open(path, 'r', encoding='utf-8') as f:
                text = f.read()
            links = {normalize(m) for m in link_pattern.findall(text)}
            links.discard(slug)
            docs[slug] = links
    return docs

def main():
    docs = collect_docs()
    issues = []
    for src, targets in docs.items():
        for tgt in targets:
            if tgt in docs and src not in docs[tgt]:
                issues.append((src, tgt))
    writer = csv.writer(sys.stdout)
    writer.writerow(['source', 'target'])
    for src, tgt in issues:
        writer.writerow([src, tgt])
    print(len(issues), file=sys.stderr)

if __name__ == '__main__':
    main()
