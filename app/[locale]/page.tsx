import Image from "next/image";
import HomeContent from "@/components/HomeContent";
import { quizCatalog, type Quiz } from "@/data/quizzes";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type Dictionary = {
  site: {
    title: string;
    subtitle: string;
  };
  categories: {
    all: string;
    personality: string;
    fun: string;
    future: string;
    relationship: string;
  };
  quizzes: Record<
    (typeof quizCatalog)[number]["id"],
    {
      title: string;
      description: string;
    }
  >;
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = (await getDictionary(locale)) as Dictionary;
  const localizedQuizzes: Quiz[] = quizCatalog.map((quiz) => ({
    ...quiz,
    href: `/${locale}${quiz.href}`,
    ...dict.quizzes[quiz.id],
  }));

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="px-4 py-16 text-center">
        <Image
          src="/dezcobra.png"
          alt="Dezcobra"
          width={140}
          height={140}
          className="mx-auto mb-4"
        />
        <h1 className="mb-2 text-5xl font-bold">{dict.site.title}</h1>
        <p className="text-gray-600">{dict.site.subtitle}</p>
      </section>

      <HomeContent dict={dict} quizzes={localizedQuizzes} />
    </main>
  );
}
