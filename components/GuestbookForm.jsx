"use client";

import { useState } from "react";

export default function GuestbookForm({ onPosted }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Write a little something for the couple first.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) throw new Error("failed");
      const saved = await res.json();
      onPosted?.(saved);
      setName("");
      setMessage("");
      setOpen(false);
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSending(false);
    }
  }

  if (!open) {
    return (
      <div className="guestbook-cta">
        <button type="button" className="filled-btn" onClick={() => setOpen(true)}>
          + LEAVE A MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form className="guestbook-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="guest-input"
        maxLength={60}
      />
      <textarea
        placeholder="Write your message for the couple..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          if (error) setError("");
        }}
        className="guest-input"
        rows={4}
        maxLength={500}
      />
      {error && <div className="guest-gate-error">{error}</div>}
      <div className="guestbook-form-actions">
        <button
          type="button"
          className="guestbook-cancel"
          onClick={() => {
            setOpen(false);
            setError("");
          }}
        >
          CANCEL
        </button>
        <button type="submit" className="guest-enter-btn" disabled={sending}>
          {sending ? "POSTING…" : "POST MESSAGE"}
        </button>
      </div>
    </form>
  );
}
