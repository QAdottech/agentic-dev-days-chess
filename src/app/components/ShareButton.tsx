"use client";

import { useState } from "react";
import { buildShareUrl } from "../lib/sharing";
import { useTheme } from "./ThemeProvider";

interface ShareButtonProps {
  opening: string;
  moveIndex: number;
}

export default function ShareButton({ opening, moveIndex }: ShareButtonProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (typeof window === "undefined") return;
    const url = buildShareUrl(window.location.origin, window.location.pathname, {
      opening,
      moveIndex,
    });
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable (insecure context, permissions).
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
      style={{
        backgroundColor: theme.surfaceRaised,
        color: theme.textPrimary,
        border: `1px solid ${theme.border}`,
      }}
    >
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
