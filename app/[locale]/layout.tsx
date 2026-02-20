import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;

    return (
        <>

            <Header locale={locale} />

            <main>
                {children}
            </main>

            <Footer />

        </>
    );
}