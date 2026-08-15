"use client";

import { useEffect, useRef, useState } from "react";

const MAX_FILES = 10;

export default function PhotoUpload({ guestName, maxFiles = MAX_FILES, onUploaded }) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    return () => files.forEach((f) => URL.revokeObjectURL(f.url));
  }, [files]);

  async function uploadFile(entry) {
    const formData = new FormData();
    formData.append("file", entry.file);
    formData.append("name", guestName?.trim() || "Anonymous");

    try {
      const res = await fetch("/api/guest-uploads", { method: "POST", body: formData });
      if (!res.ok) throw new Error("upload failed");
      const saved = await res.json();
      setFiles((prev) => prev.map((f) => (f.url === entry.url ? { ...f, status: "done" } : f)));
      onUploaded?.(saved);
    } catch {
      setFiles((prev) => prev.map((f) => (f.url === entry.url ? { ...f, status: "error" } : f)));
    }
  }

  function handleChange(e) {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;

    const room = Math.max(maxFiles - files.length, 0);
    const accepted = picked.slice(0, room);
    const credit = guestName?.trim() || "Anonymous";

    const newEntries = accepted.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isVideo: file.type.startsWith("video/"),
      uploadedBy: credit,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...newEntries]);
    newEntries.forEach(uploadFile);
    e.target.value = "";
  }

  function removeFile(url) {
    setFiles((prev) => prev.filter((f) => f.url !== url));
  }

  const atLimit = files.length >= maxFiles;

  return (
    <div className="photo-upload">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleChange}
        className="photo-upload-input"
        disabled={atLimit}
      />
      <button
        type="button"
        className="filled-btn"
        onClick={() => inputRef.current?.click()}
        disabled={atLimit}
      >
        UPLOAD YOUR PHOTOS
      </button>

      {atLimit && (
        <p className="photo-upload-limit">You&apos;ve reached the {maxFiles}-photo limit for this gallery.</p>
      )}

      {files.length > 0 && (
        <div className="photo-upload-grid">
          {files.map((f) => (
            <div className="photo-upload-item" key={f.url}>
              {f.isVideo ? (
                <video src={f.url} muted />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.url} alt={f.file.name} />
              )}
              {f.status === "uploading" && <span className="photo-upload-status">Uploading…</span>}
              {f.status === "error" && <span className="photo-upload-status error">Failed to upload</span>}
              <span className="photo-upload-credit">{f.uploadedBy}</span>
              <button
                type="button"
                className="photo-upload-remove"
                aria-label={`Remove ${f.file.name}`}
                onClick={() => removeFile(f.url)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
