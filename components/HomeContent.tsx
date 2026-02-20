"use client";

import { useMemo, useState } from "react";
import CategoryTabs from "@/components/CategoryTabs";
import QuizCard from "@/components/QuizCard";
import type { Quiz, QuizCategory } from "@/data/quizzes";

type CategoryKey = "all" | QuizCategory;

type Dictionary = {
  categories: {
    all: string;
    personality: string;
    fun: string;
    future: string;
    relationship: string;
  };
};

type CategoryOption = {
  key: CategoryKey;
  label: string;
};

export default function HomeContent({
  dict,
  quizzes,
}: {
  dict: Dictionary;
  quizzes: Quiz[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");

  const options = useMemo<CategoryOption[]>(
    () => [
      { key: "all", label: dict.categories.all },
      { key: "personality", label: dict.categories.personality },
      { key: "fun", label: dict.categories.fun },
      { key: "future", label: dict.categories.future },
      { key: "relationship", label: dict.categories.relationship },
    ],
    [dict]
  );

  const visibleQuizzes = useMemo(
    () =>
      selectedCategory === "all"
        ? quizzes
        : quizzes.filter((quiz) => quiz.category === selectedCategory),
    [selectedCategory, quizzes]
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16">
      <CategoryTabs
        options={options}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleQuizzes.map((quiz) => (
          <QuizCard key={quiz.href} quiz={quiz} />
        ))}
      </div>
    </section>
  );
}
