import os
import re
import glob
from typing import List, Set

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

    # Remove trailing slashes that might have resulted from removing 'index'
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

def extract_links_from_file(filepath: str, content_prefix: str) -> Set[str]:
    """
    Extracts and normalizes markdown links from a file that start with a specific prefix.
    """
    links: Set[str] = set()
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Regex to find markdown links: [text](link)
        # It captures the link part: ([^)\s#]+) - this part ensures we don't capture spaces, closing parenthesis, or hash fragments within the main link URL
        # [^)]* at the end handles optional title attributes like [text](link "title")
        matches = re.findall(r'\[[^\]]+\]\(([^)\s#]+)[^)]*\)', content)
        for link in matches:
            if link.startswith(content_prefix):
                links.add(normalize_path(link))
    except FileNotFoundError:
        # Depending on desired behavior, could log this or raise
        pass
    return links

def extract_links_from_section(filepath: str, section_heading_pattern: str, content_prefix: str) -> Set[str]:
    """
    Extracts and normalizes markdown links from a specific section of a file.
    """
    links: Set[str] = set()
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        section_match = re.search(section_heading_pattern, content, re.MULTILINE)
        if not section_match:
            return links

        section_start_index = section_match.end()

        # Determine the level of the found heading (e.g., ## is level 2, ### is level 3)
        heading_level = section_match.group(0).count('#')

        # Regex to find the next heading of the same or higher level, or end of file
        # This looks for lines starting with 1 up to `heading_level` hash symbols, followed by a space
        next_heading_pattern = r"\n^#{1," + str(heading_level) + r"} .*"
        next_heading_match = re.search(next_heading_pattern, content[section_start_index:], re.MULTILINE)

        if next_heading_match:
            section_content = content[section_start_index : section_start_index + next_heading_match.start()]
        else:
            section_content = content[section_start_index:]

        # Regex to find markdown links: [text](link)
        matches = re.findall(r'\[[^\]]+\]\(([^)\s#]+)[^)]*\)', section_content)
        for link in matches:
            if link.startswith(content_prefix):
                links.add(normalize_path(link))

    except FileNotFoundError:
        # Depending on desired behavior, could log this or raise
        pass
    return links
