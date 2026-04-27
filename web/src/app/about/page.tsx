export const metadata = {
  title: "About — Austen DeWolf",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">About</h1>
      <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          I&apos;m Austen — engineer, founder, and builder. I design and ship
          digital products and the occasional company.
        </p>
        <p>
          This site is the home for what I&apos;m working on, what I&apos;ve
          shipped, and the things I write about along the way.
        </p>
      </div>
    </div>
  );
}
