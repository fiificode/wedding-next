import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "guest-uploads");
const MANIFEST_PATH = path.join(process.cwd(), "data", "guest-uploads.json");
const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25MB

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
  const formData = await request.formData();
  const file = formData.get("file");
  const rawName = formData.get("name");
  const name = (typeof rawName === "string" && rawName.trim().slice(0, 60)) || "Anonymous";

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const isVideo = file.type.startsWith("video/");
  if (!file.type.startsWith("image/") && !isVideo) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File is too large (25MB max)" }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = path.extname(file.name || "") || (isVideo ? ".mp4" : ".jpg");
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`.replace(/[^a-zA-Z0-9.-]/g, "");
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const entry = {
    id: filename,
    src: `/guest-uploads/${filename}`,
    isVideo,
    uploadedBy: name,
    uploadedAt: new Date().toISOString(),
  };

  const entries = await readManifest();
  entries.push(entry);
  await writeManifest(entries);

  return NextResponse.json(entry, { status: 201 });
}
