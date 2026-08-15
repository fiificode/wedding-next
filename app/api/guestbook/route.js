import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

const MANIFEST_PATH = path.join(process.cwd(), "data", "guestbook.json");
const MAX_NAME_LEN = 60;
const MAX_MESSAGE_LEN = 500;

async function readManifest() {
  try {
    const raw = await readFile(MANIFEST_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeManifest(entries) {
  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(entries, null, 2));
}

export async function GET() {
  const entries = await readManifest();
  return NextResponse.json(entries.slice().reverse());
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (typeof body.name === "string" && body.name.trim().slice(0, MAX_NAME_LEN)) || "Anonymous";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE_LEN) : "";

  if (!message) {
    return NextResponse.json({ error: "Message can't be empty" }, { status: 400 });
  }

  const entry = {
    id: randomUUID(),
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  const entries = await readManifest();
  entries.push(entry);
  await writeManifest(entries);

  return NextResponse.json(entry, { status: 201 });
}
