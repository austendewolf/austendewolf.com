"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";

export function ContactDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [pending, startTransition] = useTransition();

  function submit(formData: FormData) {
    startTransition(async () => {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          body: String(formData.get("body") ?? ""),
        }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "failed" }));
        toast.error(`Couldn't send: ${error}`);
        return;
      }
      toast.success("Message sent. I'll get back to you.");
      setName("");
      setEmail("");
      setBody("");
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground"
          />
        }
      >
        <MessageSquare className="size-4" />
        Contact
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get in Contact</DialogTitle>
          <DialogDescription>
            Fill out the information below to get started.
          </DialogDescription>
        </DialogHeader>
        <form action={submit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="body">Message</Label>
            <Textarea
              id="body"
              name="body"
              required
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              Don&apos;t like forms?{" "}
              <a
                href="mailto:hello@austendewolf.com"
                className="text-accent hover:underline"
              >
                hello@austendewolf.com
              </a>
            </p>
            <Button
              type="submit"
              disabled={pending || !name || !email || !body}
            >
              {pending ? "Sending..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
