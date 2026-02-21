import { Suspense } from "react";
import type { Locale } from "@/i18n/config";
import OrkutCalculating from "@/components/quiz/orkut/OrkutCalculating";

export default async function Page({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;

    return (
        <main className="min-h-screen bg-[#e5ecf9] px-4 py-10">

            <Suspense
                fallback={
                    <p className="text-center">
                        Gerando perfil...
                    </p>
                }
            >
                <OrkutCalculating locale={locale} />
            </Suspense>

        </main>
    );
}