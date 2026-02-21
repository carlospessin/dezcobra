export class ValueCalculator {
  static calculate({
    ageIndex,
    incomeIndex,
    disciplineIndex,
    ambitionIndex,
    riskIndex,
    trainingIndex,
  }: {
    ageIndex: number;
    incomeIndex: number;
    disciplineIndex: number;
    ambitionIndex: number;
    riskIndex: number;
    trainingIndex: number;
  }): number {
    let value = 50000;

    value += ageIndex * 120000;
    value += incomeIndex * 300000;
    value += disciplineIndex * 180000;
    value += ambitionIndex * 250000;
    value += riskIndex * 150000;
    value += trainingIndex * 100000;

    value += Math.floor(Math.random() * 500000);

    return value;
  }
}
