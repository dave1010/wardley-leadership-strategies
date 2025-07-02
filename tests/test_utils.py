import os
import re
import glob
from typing import List, Set, Optional
from functools import cached_property

class Strategy:
    """A class to represent a strategy document."""
    def __init__(self, filepath: str, base_dir: str = 'docs'):
        self.filepath = filepath
        self.base_dir = base_dir

    @cached_property
    def slug(self) -> str:
        return get_file_slug(self.filepath, self.base_dir)

    @cached_property
    def content(self) -> str:
        with open(self.filepath, 'r', encoding='utf-8') as f:
            return f.read()

    @cached_property
    def headings(self) -> List[str]:
        return [h.strip() for h in extract_headings_from_file(self.filepath)]

    @cached_property
    def h2_headings(self) -> List[str]:
        return [h for h in self.headings if h.startswith('## ')]

def normalize_path(path_str: str) -> str:
    """
    Removes the fragment identifier (part after '#') and any trailing slashes.
    """
    path_str = path_str.split('#')[0]
    while path_str.endswith('/'):
        path_str = path_str[:-1]
    return path_str

def get_file_slug(filepath: str, base_dir: str) -> str:
    """
    Calculates a URL-like slug from a filepath.
    """
    relative_path = os.path.relpath(filepath, base_dir)
    slug = os.path.splitext(relative_path)[0]
    if slug.endswith('index'):
        slug = slug[:-len('index')]

    while slug.endswith(os.path.sep):
        slug = slug[:-len(os.path.sep)]

    slug = slug.replace(os.path.sep, '/')

    if not slug.startswith('/'):
        slug = '/' + slug
    return slug

def find_markdown_files(directory_path: str, filename_pattern: str = '*.md') -> List[str]:
    """
    Finds all files matching the pattern within the directory and its subdirectories.
    """
    search_path = os.path.join(directory_path, '**', filename_pattern)
    return glob.glob(search_path, recursive=True)

def get_strategy_files() -> List[str]:
    """
    Returns a list of file paths for all strategy documents, excluding category indexes.
    """
    strategy_dir = os.path.join('docs', 'strategies')
    all_files = find_markdown_files(strategy_dir, filename_pattern='index.md')
    strategy_files = []
    for filepath in all_files:
        relative_path = os.path.relpath(filepath, strategy_dir)
        if len(os.path.normpath(relative_path).split(os.sep)) >= 3:
            strategy_files.append(filepath)
    return strategy_files

def extract_links_from_content(content: str, content_prefix: str) -> Set[str]:
    """
    Extracts and normalizes markdown links from a string that start with a specific prefix.
    """
    links: Set[str] = set()
    matches = re.findall(r'\[[^\]]+\]\(([^)\s#]+)[^)]*\)', content)
    for link in matches:
        if link.startswith(content_prefix):
            links.add(normalize_path(link))
    return links

def extract_headings_from_file(filepath: str) -> List[str]:
    """
    Extracts all markdown headings (lines starting with #) from a file.
    """
    headings: List[str] = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                stripped_line = line.strip()
                if stripped_line.startswith('#'):
                    headings.append(stripped_line)
    except FileNotFoundError:
        pass
    return headings

def get_section_content(content: str, section_heading: str) -> Optional[str]:
    """
    Extracts content from a specific section, defined by a heading.
    The section runs from the given heading to the next heading of the same or higher level.
    """
    # The heading is passed as a literal string, so escape it for regex
    heading_pattern = re.escape(section_heading)
    # The regex needs to match the start of a line
    section_heading_regex = f"^{heading_pattern}"

    section_match = re.search(section_heading_regex, content, re.MULTILINE)
    if not section_match:
        return None

    section_start_index = section_match.end()
    heading_level = section_match.group(0).count('#')

    # Regex to find the next heading of the same or higher level
    next_heading_pattern = r"\n^#{1," + str(heading_level) + r"} .*"
    next_heading_match = re.search(next_heading_pattern, content[section_start_index:], re.MULTILINE)

    if next_heading_match:
        section_content = content[section_start_index : section_start_index + next_heading_match.start()]
    else:
        section_content = content[section_start_index:]

    return section_content.strip()