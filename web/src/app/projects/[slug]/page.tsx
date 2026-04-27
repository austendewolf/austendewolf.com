import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent, listSlugs } from "@/lib/content";
import { Mdx } from "@/components/mdx";

export async function generateStaticParams() {
  const slugs = await listSlugs("projects");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getContent("projects", slug);
  if (!project) return {};
  return {
    title: `${project.frontmatter.title} — Austen DeWolf`,
    description: project.frontmatter.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getContent("projects", slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
      >
        <ArrowLeft size={12} />
        all projects
      </Link>
      <header className="mt-6">
        <h1 className="text-4xl font-bold tracking-tight">
          {project.frontmatter.title}
        </h1>
        {project.frontmatter.description && (
          <p className="mt-2 text-muted-foreground">
            {project.frontmatter.description}
          </p>
        )}
      </header>
      <div className="mt-10">
        <Mdx source={project.body} />
      </div>
    </div>
  );
}
