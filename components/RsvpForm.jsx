"use client";

export default function RsvpForm() {
  function handleSubmit(e) {
    e.preventDefault();
    alert("This is a template — connect this form to your own backend or a service like Formspree/Google Forms.");
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      <div>
        <label>Full name</label>
        <input type="text" placeholder="Your name" required />
      </div>
      <div>
        <label>Will you be attending?</label>
        <select defaultValue="Joyfully accepts">
          <option>Joyfully accepts</option>
          <option>Regretfully declines</option>
        </select>
      </div>
      <div>
        <label>Number of guests</label>
        <input type="number" min="1" defaultValue={1} />
      </div>
      <div>
        <label>Message (optional)</label>
        <textarea rows={3} placeholder="Leave a note for the couple" />
      </div>
      <button type="submit">SUBMIT RSVP</button>
    </form>
  );
}
