import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_NAME_LEN = 80;
const MAX_MESSAGE_LEN = 500;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, MAX_NAME_LEN) : "";
  const attending = body.attending === "Regretfully declines" ? "Regretfully declines" : "Joyfully accepts";
  const guests = Math.min(Math.max(parseInt(body.guests, 10) || 1, 1), 20);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE_LEN) : "";

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    console.error("GOOGLE_SCRIPT_URL is not set");
    return NextResponse.json({ error: "RSVP is not configured yet" }, { status: 500 });
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, attending, guests, message }),
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`Sheet responded ${res.status}`);
  } catch (err) {
    console.error("Failed to forward RSVP to Google Sheets:", err);
    return NextResponse.json({ error: "Couldn't save your RSVP — please try again" }, { status: 502 });
  }

  return NextResponse.json({ status: "ok" }, { status: 201 });
}
