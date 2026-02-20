"use client";

import Link from "next/link";
import type { Quiz } from "@/data/quizzes";

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Link href={quiz.href}>
      <article
        className={`bg-gradient-to-br ${quiz.color} cursor-pointer rounded-2xl p-6 text-white shadow-lg transition duration-300 hover:scale-105`}
      >
        <div className="mb-3 text-4xl">{quiz.emoji}</div>
        <h3 className="mb-2 text-xl font-bold">{quiz.title}</h3>
        <p className="opacity-90">{quiz.description}</p>
      </article>
    </Link>
  );
}
