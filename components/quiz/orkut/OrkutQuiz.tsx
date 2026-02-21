"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { encodeOrkutPayload } from "./orkutCodec";

const questions = [
  {
    id: "name",
    label: "1. Qual seu nome?",
    type: "text",
  },
  {
    id: "vibe",
    label: "2. Qual sua vibe?",
    options: ["misteriosa", "emo", "engraçada"],
  },
  {
    id: "weekend",
    label: "3. O que faz no fim de semana?",
    options: ["ouvir música", "jogar", "dormir"],
  },
] as const;

type Answers = {
  name: string;
  vibe: string;
  weekend: string;
};

export default function OrkutQuiz({
  locale,
}: {
  locale: string;
}) {

  // ✅ CORRETO: hook dentro do componente
  const router = useRouter();

  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState<Answers>({
    name: "",
    vibe: "",
    weekend: "",
  });

  const question = questions[step];
  const isLast = step === questions.length - 1;

  const canContinue = useMemo(() => {
    if (question.id === "name") {
      return answers.name.trim().length > 0;
    }
    return Boolean(
      answers[question.id as keyof Answers]
    );
  }, [answers, question]);

  function rand(min: number, max: number) {
    return Math.floor(
      Math.random() * (max - min) + min
    );
  }

  function next() {

    if (isLast) {

      const payload = {
        name: answers.name,
        vibe: answers.vibe,
        weekend: answers.weekend,
        friends: rand(50, 500),
        fans: rand(10, 200),
        visits: rand(200, 5000),
      };

      const encoded =
        encodeOrkutPayload(payload);

      router.push(
        `/${locale}/orkut/calculating?payload=${encoded}`
      );

      return;
    }

    setStep(step + 1);
  }

  function back() {
    setStep(
      (prev) => Math.max(0, prev - 1)
    );
  }

  return (
    <section className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <p className="mb-2 text-sm text-gray-500">
        Pergunta {step + 1} de {questions.length}
      </p>

      <h2 className="mb-6 text-2xl font-semibold">
        {question.label}
      </h2>

      {/* INPUT */}
      {question.type === "text" && (
        <input
          value={answers.name}
          onChange={(e) =>
            setAnswers({
              ...answers,
              name: e.target.value,
            })
          }
          className="w-full rounded-xl border px-4 py-3"
        />
      )}

      {/* OPTIONS */}
      {question.options && (
        <div className="grid gap-3">
          {question.options.map(
            (option) => {

              const active =
                answers[
                question.id as keyof Answers
                ] === option;

              return (
                <button
                  key={option}
                  onClick={() =>
                    setAnswers({
                      ...answers,
                      [question.id]: option,
                    })
                  }
                  className={`rounded-xl border px-4 py-3 text-left ${active
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                    }`}
                >
                  {option}
                </button>
              );
            }
          )}
        </div>
      )}

      {/* NAV */}
      <div className="mt-8 flex justify-between">

        <button
          onClick={back}
          disabled={step === 0}
          className="rounded-xl border px-4 py-2"
        >
          Voltar
        </button>

        <button
          onClick={next}
          disabled={!canContinue}
          className="rounded-xl bg-gray-900 px-5 py-2 text-white"
        >
          {isLast
            ? "Ver perfil Orkut"
            : "Próxima"}
        </button>

      </div>

    </section>
  );
}