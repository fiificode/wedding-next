"use client";

import { useEffect, useRef, useState } from "react";

export default function PhotoUpload() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    return () => files.forEach((f) => URL.revokeObjectURL(f.url));
  }, [files]);

  function handleChange(e) {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;
    setFiles((prev) => [
      ...prev,
      ...picked.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        isVideo: file.type.startsWith("video/"),
      })),
    ]);
    e.target.value = "";
  }

  function removeFile(url) {
    setFiles((prev) => prev.filter((f) => f.url !== url));
  }

  return (
    <div className="photo-upload">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleChange}
        className="photo-upload-input"
      />
      <button type="button" className="filled-btn" onClick={() => inputRef.current?.click()}>
        UPLOAD YOUR PHOTOS
      </button>

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
