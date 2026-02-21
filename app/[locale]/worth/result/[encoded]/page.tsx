import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import ShareResultButton from "@/components/ShareResultButton";
import WorthRadialChart from "@/components/charts/WorthRadialChart";
import WorthClassBadge from "@/components/quiz/worth/WorthClassBadge";
import { getDictionary } from "@/i18n/getDictionary";
import WorthRankingBadge from "@/components/quiz/worth/WorthRankingBadge";
import ShareButton from "@/components/ShareResultButton";

type WorthResultPayload = {
  score: number;
  name: string;
  classKey: "SS" | "S" | "A" | "B" | "C";
  classLabel: string;
  growth: number;
  rarity: number;
  rankingTopPercent: number;
};

type Dictionary = {
  quizzes: {
    worth: {
      title: string;
    };
  };
};

function decodePayload(
  encoded: string
): WorthResultPayload | null {
  try {
    const json = Buffer.from(
      encoded,
      "base64url"
    ).toString("utf8");

    const parsed =
      JSON.parse(json) as WorthResultPayload;

    if (
      typeof parsed.score !== "number" ||
      typeof parsed.name !== "string" ||
      typeof parsed.classKey !== "string" ||
      typeof parsed.classLabel !== "string" ||
      typeof parsed.growth !== "number" ||
      typeof parsed.rarity !== "number" ||
      typeof parsed.rankingTopPercent !== "number"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function WorthResultPage({
  params,
}: {
  params: Promise<{ locale: Locale; encoded: string }>;
}) {
  const { locale, encoded } = await params;
  const data = decodePayload(encoded);

  const dict =
    (await getDictionary(locale)) as Dictionary;

  if (!data) {
    notFound();
  }

  const shareUrl = `https://dezcobra.app/${locale}/worth/result/${encoded}`;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900">
      <section className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold flex justify-center">{dict.quizzes.worth.title}</h1>
        <p className="mt-3 text-gray-700 flex justify-center gap-1">
          <strong>Nome:</strong> {data.name}
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

          {/* ESQUERDA — CHART */}
          <div className="flex justify-center">
            <WorthRadialChart
              score={data.score}
              rankingTopPercent={data.rankingTopPercent}
            />
          </div>

          {/* DIREITA — CLASSE + RANKING */}
          <div className="flex flex-col items-center md:items-start gap-4">

            {/* classe */}
            <div>

              <WorthClassBadge
                classKey={data.classKey}
                label={data.classLabel}
              />

            </div>

            {/* ranking global */}
            <WorthRankingBadge
              rankingTopPercent={data.rankingTopPercent}
            />

          </div>

        </div>

        <div className="mt-6 grid gap-3">
          <p className="rounded-xl bg-gray-100 px-4 py-3">
            <strong>Potencial de crescimento:</strong> {data.growth}%
          </p>
          <p className="rounded-xl bg-gray-100 px-4 py-3">
            <strong>Raridade:</strong> {data.rarity} / 10
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <ShareButton url={shareUrl} />
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            href={`/${locale}/worth`}
            className="inline-block rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700"
          >
            Refazer quiz
          </Link>
        </div>
      </section>
    </main>
  );
}
