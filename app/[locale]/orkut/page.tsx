import type { Locale } from "@/i18n/config";
import OrkutQuiz from "@/components/quiz/orkut/OrkutQuiz";

export default async function OrkutQuizPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;

    return (
        <main className="min-h-screen bg-[#e5ecf9] px-4 py-10 text-gray-900">

            <div className="mx-auto mb-6 w-full max-w-2xl">

                <h1 className="text-3xl font-bold">
                    Como seria seu perfil no Orkut?
                </h1>

                <p className="mt-2 text-gray-600">
                    Responda as perguntas para gerar seu perfil na internet raiz.
                </p>

            </div>

            <div className="mx-auto w-full max-w-2xl">
                <OrkutQuiz locale={locale} />
            </div>

        </main>
    );
}