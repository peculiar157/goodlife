"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm({
  variant = "default",
}: {
  variant?: "default" | "compact" | "inline";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're in. Check your inbox.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Try again in a moment.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again in a moment.");
    }
  }

  const isCompact = variant === "compact";
  const isInline = variant === "inline";

  return (
    <form
      onSubmit={handleSubmit}
      className={isInline ? "flex flex-col sm:flex-row gap-3" : "flex flex-col gap-3"}
    >
      <label htmlFor={`email-${variant}`} className="sr-only">
        Email address
      </label>
      <div className={isInline ? "flex-1" : ""}>
        <input
          id={`email-${variant}`}
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className={`w-full rounded-full border border-clay-200 bg-white px-5 ${
            isCompact ? "py-2.5 text-sm" : "py-3"
          } text-ink-700 placeholder:text-ink-400 focus:border-clay-400 focus:outline-none disabled:opacity-60`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className={`rounded-full bg-clay-500 font-semibold text-white hover:bg-clay-600 transition-colors disabled:opacity-60 ${
          isCompact ? "px-5 py-2.5 text-sm" : "px-6 py-3"
        }`}
      >
        {status === "loading" ? "Joining..." : status === "success" ? "You're in!" : "Send it to me"}
      </button>

      {message && (
        <p
          className={`text-sm ${
            status === "error" ? "text-clay-600" : "text-sage-600"
          } ${isInline ? "sm:basis-full" : ""}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
