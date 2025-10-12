declare module '@generated/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json' {
  interface BlogSidebarItem {
    title: string;
    permalink: string;
    unlisted?: boolean;
    date?: string;
  }

  interface BlogSidebar {
    title: string;
    items: BlogSidebarItem[];
  }

  const value: BlogSidebar;
  export default value;
}
