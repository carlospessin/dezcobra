import { ValueCalculator } from "@/services/valueCalculator";

export type WorthAnswers = {
  name: string;
  ageIndex: number;
  incomeIndex: number;
  wakesEarlyIndex: number;
  phoneIndex: number;
  trainingIndex: number;
  ambitionIndex: number;
  riskIndex: number;
  preferenceIndex: number;
  disciplineIndex: number;
};

export type WorthClassKey =
  | "SS"
  | "S"
  | "A"
  | "B"
  | "C";

export type WorthResult = {
  score: number;
  name: string;

  classKey: WorthClassKey;
  classLabel: string;

  growth: number;
  rarity: number;
  rankingTopPercent: number;
};

function clamp(
  min: number,
  value: number,
  max: number
): number {
  return Math.max(min, Math.min(value, max));
}

function getClass(
  score: number
): {
  key: WorthClassKey;
  label: string;
} {
  if (score >= 4200000) {
    return {
      key: "SS",
      label: "Lenda estratégica",
    };
  }

  if (score >= 3200000) {
    return {
      key: "S",
      label: "Elite funcional",
    };
  }

  if (score >= 2200000) {
    return {
      key: "A",
      label: "Alta performance",
    };
  }

  if (score >= 1300000) {
    return {
      key: "B",
      label: "Potencial sólido",
    };
  }

  return {
    key: "C",
    label: "Em evolução",
  };
}

export function buildWorthResult(
  answers: WorthAnswers
): WorthResult {
  const score =
    ValueCalculator.calculate({
      ageIndex: answers.ageIndex,
      incomeIndex: answers.incomeIndex,
      disciplineIndex:
        answers.disciplineIndex,
      ambitionIndex:
        answers.ambitionIndex,
      riskIndex: answers.riskIndex,
      trainingIndex:
        answers.trainingIndex,
    });

  const classData = getClass(score);

  const growth = Math.round(
    clamp(
      40,
      58 +
        answers.ambitionIndex * 9 +
        answers.disciplineIndex * 7 +
        answers.trainingIndex * 4 -
        answers.phoneIndex * 2,
      99
    )
  );

  const rarity = Number(
    clamp(
      4.5,
      5.1 +
        answers.incomeIndex * 0.85 +
        answers.disciplineIndex *
          0.45 +
        answers.ambitionIndex *
          0.4 +
        Math.random() * 1.4,
      9.9
    ).toFixed(1)
  );

  const rankingTopPercent =
    Math.round(
      clamp(
        1,
        28 -
          answers.incomeIndex * 4 -
          answers.disciplineIndex *
            2 -
          answers.ambitionIndex * 2,
        35
      )
    );

  return {
    score,

    name:
      answers.name.trim() ||
      "Pessoa",

    classKey: classData.key,

    classLabel:
      classData.label,

    growth,

    rarity,

    rankingTopPercent,
  };
}