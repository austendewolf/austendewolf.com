import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ContentType = "posts" | "projects";

export interface Frontmatter {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  cover?: string;
  link?: string;
  draft?: boolean;
}

export interface ContentItem {
  slug: string;
  frontmatter: Frontmatter;
  body: string;
}

export async function listSlugs(type: ContentType): Promise<string[]> {
  const dir = path.join(CONTENT_ROOT, type);
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getContent(
  type: ContentType,
  slug: string,
): Promise<ContentItem | null> {
  const filePath = path.join(CONTENT_ROOT, type, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      frontmatter: data as Frontmatter,
      body: content,
    };
  } catch {
    return null;
  }
}

export async function listContent(type: ContentType): Promise<ContentItem[]> {
  const slugs = await listSlugs(type);
  const items = await Promise.all(slugs.map((slug) => getContent(type, slug)));
  return items
    .filter((item): item is ContentItem => item !== null)
    .filter((item) => !item.frontmatter.draft)
    .sort((a, b) => {
      const da = a.frontmatter.date ?? "";
      const db = b.frontmatter.date ?? "";
      return db.localeCompare(da);
    });
}
