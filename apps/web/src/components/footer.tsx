import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  NpmIcon,
} from "@/components/social-icons";

const SOCIALS = [
  { href: "https://github.com/austendewolf", label: "GitHub", Icon: GitHubIcon },
  {
    href: "https://www.linkedin.com/in/austendewolf/",
    label: "LinkedIn",
    Icon: LinkedInIcon,
  },
  {
    href: "https://www.instagram.com/austendewolf",
    label: "Instagram",
    Icon: InstagramIcon,
  },
  { href: "https://www.npmjs.com/~deausten", label: "npm", Icon: NpmIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-24">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} austendewolf.com
        </p>
        <ul className="flex gap-4">
          {SOCIALS.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground hover:text-accent transition-colors inline-block hover:scale-110"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
