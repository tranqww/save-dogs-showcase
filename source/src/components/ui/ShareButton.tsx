"use client";

import { useState } from "react";

export function ShareButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareData = {
      title: "Home",
      text: "If even those without a home are capable of care — why is it sometimes missing in those who have one?",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled — fall through to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button type="button" onClick={handleShare} className={`btn-ghost ${className}`}>
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
