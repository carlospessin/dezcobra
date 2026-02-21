import type { Locale } from "@/i18n/config";
import WorthQuizWizard from "@/components/quiz/worth/WorthQuizWizard";

export default async function WorthQuizPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900">

      <div className="mx-auto mb-6 w-full max-w-2xl">

        <h1 className="text-3xl font-bold">
          How much are you worth?
        </h1>

        <p className="mt-2 text-gray-600">
          Responda as perguntas para calcular seu valor estimado.
        </p>

      </div>

      <WorthQuizWizard locale={locale} />

    </main>
  );
}