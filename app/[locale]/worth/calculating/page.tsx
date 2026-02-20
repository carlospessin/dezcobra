import { Suspense } from "react";
import type { Locale } from "@/i18n/config";
import WorthCalculating from "@/components/worth/WorthCalculating";

export default async function WorthCalculatingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900">
      <Suspense fallback={<p className="text-center text-gray-600">Carregando...</p>}>
        <WorthCalculating locale={locale} />
      </Suspense>
    </main>
  );
}
