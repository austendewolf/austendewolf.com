import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Sign in — Austen DeWolf",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Continue with GitHub. Used for things like leaving a comment or saving
        progress on a demo.
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
