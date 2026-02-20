"use client";

import { useState } from "react";

export default function ShareResultButton({ shareUrl }: { shareUrl: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meu resultado no Dezcobra",
          text: "Veja meu resultado no quiz How much are you worth?",
          url: shareUrl,
        });
        return;
      } catch {
        return;
      }
    }

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="mt-6 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
    >
      {copied ? "Link copiado!" : "Compartilhar resultado"}
    </button>
  );
}
