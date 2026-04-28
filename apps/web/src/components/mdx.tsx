import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { ComponentProps } from "react";
import Link from "next/link";

function Embed({ src, title }: { src: string; title: string }) {
  return (
    <div className="my-6 overflow-hidden rounded border border-zinc-800">
      <iframe
        src={src}
        title={title}
        className="h-[480px] w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}

function Demo({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded border border-zinc-800 bg-zinc-950/50 p-4">
      {children}
    </div>
  );
}

function MdxLink(props: ComponentProps<"a">) {
  const href = props.href ?? "";
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} className="text-[var(--accent)] hover:underline">
        {props.children}
      </Link>
    );
  }
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--accent)] hover:underline"
    />
  );
}

const components = {
  a: MdxLink,
  Embed,
  Demo,
};

export function Mdx({ source }: { source: string }) {
  return (
    <article className="prose prose-invert prose-zinc max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypePrettyCode,
                { theme: "github-dark-dimmed", keepBackground: false },
              ],
            ],
          },
        }}
      />
    </article>
  );
}
