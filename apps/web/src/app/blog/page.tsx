import Link from "next/link";
import { listContent } from "@/lib/content";

export const metadata = {
  title: "Blog — Austen DeWolf",
};

export default async function BlogPage() {
  const posts = await listContent("posts");

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Notes on what I&apos;m building and learning.
      </p>

      <ul className="mt-10 divide-y divide-border/40">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group flex items-baseline justify-between gap-4 py-4 hover:text-accent transition-colors"
            >
              <span className="text-base text-foreground group-hover:text-accent">
                {p.frontmatter.title}
              </span>
              {p.frontmatter.date && (
                <span className="font-mono text-xs text-muted-foreground shrink-0">
                  {p.frontmatter.date}
                </span>
              )}
            </Link>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="text-muted-foreground text-sm py-4">No posts yet.</li>
        )}
      </ul>
    </div>
  );
}
