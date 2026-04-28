import { NextResponse } from "next/server";
import { db } from "@/db";
import { messages } from "@/db/schema";

export const runtime = "nodejs";

const MAX_LEN = { name: 120, email: 320, body: 4000 } as const;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const body = String(data.body ?? "").trim();

  if (!name || !email || !body) {
    return NextResponse.json(
      { error: "name, email and body are required" },
      { status: 400 },
    );
  }
  if (
    name.length > MAX_LEN.name ||
    email.length > MAX_LEN.email ||
    body.length > MAX_LEN.body
  ) {
    return NextResponse.json({ error: "field too long" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  await db.insert(messages).values({ name, email, body });

  return NextResponse.json({ ok: true });
}
