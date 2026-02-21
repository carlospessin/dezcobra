"use client";

import { useState } from "react";

type ShareButtonProps = {
  url: string;
  title?: string;
  text?: string;
  className?: string;
};

export default function ShareButton({
  url,
  title = "Meu resultado no Dezcobra",
  text = "Veja meu resultado!",
  className = "",
}: ShareButtonProps) {

  const [copied, setCopied] = useState(false);

  async function handleShare() {

    // mobile native share
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      } catch {
        // fallback below
      }
    }

    // fallback copy
    await navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`
        rounded-xl
        bg-gray-900
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        hover:bg-black
        transition
        ${className}
      `}
    >
      {copied ? "Link copiado!" : "Compartilhar"}
    </button>
  );
}