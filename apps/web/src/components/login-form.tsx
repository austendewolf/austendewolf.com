"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/social-icons";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [pending, startTransition] = useTransition();

  function signInWithGithub() {
    startTransition(async () => {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback`;
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo },
      });
    });
  }

  return (
    <Button
      onClick={signInWithGithub}
      disabled={pending}
      className="w-full"
      variant="outline"
    >
      <GitHubIcon className="size-4" />
      {pending ? "Redirecting..." : "Continue with GitHub"}
    </Button>
  );
}
