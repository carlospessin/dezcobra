"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { WorthAnswers } from "@/services/worth/worthQuiz";

type ChoiceQuestion = {
  kind: "choice";
  id: keyof Omit<WorthAnswers, "name">;
  label: string;
  options: string[];
};

type NameQuestion = {
  kind: "name";
  id: "name";
  label: string;
};

type Question = NameQuestion | ChoiceQuestion;

const questions: Question[] = [
  { kind: "name", id: "name", label: "1. Nome" },
  {
    kind: "choice",
    id: "ageIndex",
    label: "2. Idade",
    options: ["<18", "18-24", "25-34", "35-44", "45+"],
  },
  {
    kind: "choice",
    id: "incomeIndex",
    label: "3. Quanto voce ganha por mes?",
    options: [
      "menos de R$2k",
      "R$2k-5k",
      "R$5k-10k",
      "R$10k-20k",
      "R$20k+",
    ],
  },
  {
    kind: "choice",
    id: "wakesEarlyIndex",
    label: "4. Voce acorda antes das 8h?",
    options: ["sim", "nao"],
  },
  {
    kind: "choice",
    id: "phoneIndex",
    label: "5. Quantas horas voce usa o celular por dia?",
    options: ["0-2", "3-5", "6-8", "8+"],
  },
  {
    kind: "choice",
    id: "trainingIndex",
    label: "6. Voce treina?",
    options: ["nunca", "as vezes", "frequentemente", "todo dia"],
  },
  {
    kind: "choice",
    id: "ambitionIndex",
    label: "7. Qual seu nivel de ambicao?",
    options: ["baixo", "medio", "alto", "obsessivo"],
  },
  {
    kind: "choice",
    id: "riskIndex",
    label: "8. Voce gosta de assumir riscos?",
    options: ["nao", "as vezes", "sim"],
  },
  {
    kind: "choice",
    id: "preferenceIndex",
    label: "9. Voce prefere:",
    options: ["estabilidade", "liberdade", "dinheiro", "proposito"],
  },
  {
    kind: "choice",
    id: "disciplineIndex",
    label: "10. Voce se considera disciplinado?",
    options: ["nao", "medio", "sim", "extremamente"],
  },
];

function encodeBase64Url(input: string): string {
  const utf8 = encodeURIComponent(input).replace(
    /%([0-9A-F]{2})/g,
    (_, p1: string) => String.fromCharCode(parseInt(p1, 16))
  );
  return btoa(utf8).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export default function WorthQuizWizard({ locale }: { locale: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<WorthAnswers>>({});

  const question = questions[step];
  const isLast = step === questions.length - 1;

  const canContinue = useMemo(() => {
    if (question.kind === "name") {
      return Boolean(answers.name?.trim());
    }
    return typeof answers[question.id] === "number";
  }, [answers, question]);

  function updateChoice(id: keyof Omit<WorthAnswers, "name">, value: number) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function onSubmit() {
    const payload: WorthAnswers = {
      name: answers.name?.trim() || "",
      ageIndex: answers.ageIndex ?? 0,
      incomeIndex: answers.incomeIndex ?? 0,
      wakesEarlyIndex: answers.wakesEarlyIndex ?? 0,
      phoneIndex: answers.phoneIndex ?? 0,
      trainingIndex: answers.trainingIndex ?? 0,
      ambitionIndex: answers.ambitionIndex ?? 0,
      riskIndex: answers.riskIndex ?? 0,
      preferenceIndex: answers.preferenceIndex ?? 0,
      disciplineIndex: answers.disciplineIndex ?? 0,
    };

    const encoded = encodeBase64Url(JSON.stringify(payload));
    router.push(`/${locale}/worth/calculating?payload=${encoded}`);
  }

  return (
    <section className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="mb-2 text-sm text-gray-500">
        Pergunta {step + 1} de {questions.length}
      </p>
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">{question.label}</h2>

      {question.kind === "name" ? (
        <input
          type="text"
          value={answers.name ?? ""}
          onChange={(event) =>
            setAnswers((prev) => ({ ...prev, name: event.target.value }))
          }
          placeholder="Digite seu nome"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none ring-0 focus:border-green-500"
        />
      ) : (
        <div className="grid gap-3">
          {question.options.map((option, index) => {
            const active = answers[question.id] === index;
            return (
              <button
                key={option}
                type="button"
                onClick={() => updateChoice(question.id, index)}
                className={`rounded-xl border px-4 py-3 text-left transition ${active
                    ? "border-green-500 bg-green-50 text-green-800"
                    : "border-gray-300 bg-white text-gray-800 hover:border-gray-400"
                  }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Voltar
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canContinue}
            className="rounded-xl bg-green-600 px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Enviar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={!canContinue}
            className="rounded-xl bg-gray-900 px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Proxima
          </button>
        )}
      </div>
    </section>
  );
}
