import re
from pathlib import Path

import pytest

BOOKS_DIR = Path("docs/books")


def get_book_files():
    return [path for path in BOOKS_DIR.glob("*.md") if path.name != "index.md"]


def parse_front_matter(text: str):
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
    if not match:
        return {}

    front_matter_content = match.group(1)
    data = {}
    for line in front_matter_content.splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if ":" not in stripped:
            continue
        key, value = stripped.split(":", 1)
        key = key.strip()
        value = value.strip().strip('"')
        data[key] = value
    return data


def test_all_books_have_isbns():
    missing_isbn = []
    for book_file in get_book_files():
        content = book_file.read_text(encoding="utf-8")
        front_matter = parse_front_matter(content)
        isbn = front_matter.get("isbn13") or front_matter.get("isbn10")
        if not isbn or not isbn.strip():
            missing_isbn.append(book_file)

    assert not missing_isbn, (
        "Books missing ISBN front matter: " + ", ".join(str(path) for path in missing_isbn)
    )

