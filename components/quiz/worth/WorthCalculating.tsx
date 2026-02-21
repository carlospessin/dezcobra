"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FakeProgressLoader from "@/components/ui/FakeProgressLoader";

import {
  buildWorthResult,
  type WorthAnswers,
} from "@/services/worth/worthQuiz";

function decodeBase64Url(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding =
    base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4));

  const binary = atob(base64 + padding);

  const percent = Array.from(binary)
    .map(
      (char) =>
        `%${char.charCodeAt(0)
          .toString(16)
          .padStart(2, "0")}`
    )
    .join("");

  return decodeURIComponent(percent);
}

function encodeBase64Url(input: string): string {
  const utf8 = encodeURIComponent(input).replace(
    /%([0-9A-F]{2})/g,
    (_, p1: string) =>
      String.fromCharCode(parseInt(p1, 16))
  );

  return btoa(utf8)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export default function WorthCalculating({
  locale,
}: {
  locale: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const answers = useMemo(() => {
    const raw = searchParams.get("payload");

    if (!raw) return null;

    try {
      return JSON.parse(
        decodeBase64Url(raw)
      ) as WorthAnswers;
    } catch {
      return null;
    }
  }, [searchParams]);

  if (!answers) {
    router.replace(`/${locale}/worth`);
    return null;
  }

  return (
    <FakeProgressLoader
      title="Calculando seu valor"
      progressLabel="analisando dados"
      steps={[
        "analisando perfil comportamental...",
        "cruzando com base global...",
        "identificando padrões...",
        "calculando valor...",
        "validando resultado...",
      ]}
      onComplete={() => {
        const result =
          buildWorthResult(answers);

        const encoded =
          encodeBase64Url(
            JSON.stringify(result)
          );

        router.replace(
          `/${locale}/worth/result/${encoded}`
        );
      }}
    />
  );
}