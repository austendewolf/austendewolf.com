import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { listContent } from "@/lib/content";

export const metadata = {
  title: "Projects — Austen DeWolf",
};

export default async function ProjectsPage() {
  const projects = await listContent("projects");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
      <p className="mt-2 text-muted-foreground">
        Things I&apos;m building or have built.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => {
          const href = p.frontmatter.link ?? `/projects/${p.slug}`;
          const external = href.startsWith("http");
          return (
            <li key={p.slug}>
              <Link
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group block h-full rounded-sm border border-border/60 bg-card/40 p-5 transition-all hover:border-accent/50 hover:bg-card hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-base text-foreground">
                    {p.frontmatter.title}
                  </span>
                  {external && (
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground group-hover:text-accent transition-colors"
                    />
                  )}
                </div>
                {p.frontmatter.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {p.frontmatter.description}
                  </p>
                )}
                {p.frontmatter.tags && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider text-accent/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          );
        })}
        {projects.length === 0 && (
          <li className="text-muted-foreground text-sm">No projects yet.</li>
        )}
      </ul>
    </div>
  );
}
