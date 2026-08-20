"use client";

import { useState } from "react";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("Joyfully accepts");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please tell us your name.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending, guests, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "failed");
      }
      setSent(true);
    } catch (err) {
      setError(err.message === "failed" ? "Something went wrong — please try again." : err.message);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rsvp-form rsvp-sent">
        <p>
          Thank you, {name.split(" ")[0]}! Your RSVP has been received.
          {attending === "Joyfully accepts"
            ? " We can't wait to celebrate with you."
            : " You'll be missed — thank you for letting us know."}
        </p>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      <div>
        <label>Full name</label>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError("");
          }}
          required
        />
      </div>
      <div>
        <label>Will you be attending?</label>
        <select value={attending} onChange={(e) => setAttending(e.target.value)}>
          <option>Joyfully accepts</option>
          <option>Regretfully declines</option>
        </select>
      </div>
      <div>
        <label>Number of guests</label>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>
      <div>
        <label>Message (optional)</label>
        <textarea
          rows={3}
          placeholder="Leave a note for the couple"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      {error && <div className="rsvp-form-error">{error}</div>}
      <button type="submit" disabled={sending}>
        {sending ? "SENDING…" : "SUBMIT RSVP"}
      </button>
    </form>
  );
}
