import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent, listSlugs } from "@/lib/content";
import { Mdx } from "@/components/mdx";

export async function generateStaticParams() {
  const slugs = await listSlugs("posts");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getContent("posts", slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} — Austen DeWolf`,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getContent("posts", slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
      >
        <ArrowLeft size={12} />
        all posts
      </Link>
      <header className="mt-6 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.date && (
          <p className="font-mono text-xs text-muted-foreground">
            {post.frontmatter.date}
          </p>
        )}
      </header>
      <div className="mt-10">
        <Mdx source={post.body} />
      </div>
    </div>
  );
}
