import { describe, expect, it } from "vitest";
import {
  areas,
  healthCheckQuestions,
  MAX_POINTS,
  questionsIn,
  rate,
  ratingRanges,
  scoreHealthCheck,
} from "./health-check";
import type { Answers } from "./journey";

function answerAll(pick: (index: number) => number): Answers {
  return Object.fromEntries(healthCheckQuestions.map((question) => [question.id, question.options[pick(0)]?.value ?? ""]));
}

describe("health check questions", () => {
  it("covers every area, with unique ids and a scored best answer", () => {
    expect(new Set(healthCheckQuestions.map((question) => question.id)).size).toBe(healthCheckQuestions.length);
    for (const area of areas) expect(questionsIn(area.id).length, area.id).toBeGreaterThan(0);
    for (const question of healthCheckQuestions) {
      expect(Math.max(...Object.values(question.points)), question.id).toBe(MAX_POINTS);
      for (const value of Object.keys(question.points)) {
        expect(question.options.some((option) => option.value === value), `${question.id}: ${value}`).toBe(true);
      }
      expect(question.options.some((option) => option.value === "not-sure"), question.id).toBe(true);
    }
  });

  it("gives every area at least one first step", () => {
    for (const area of areas) expect(area.firstSteps.length, area.id).toBeGreaterThan(0);
  });
});

describe("rate", () => {
  it("uses 75% for good foundations and 40% for some gaps", () => {
    expect(rate(4, 4)).toBe("good");
    expect(rate(3, 4)).toBe("good");
    expect(rate(2, 4)).toBe("gaps");
    expect(rate(1, 4)).toBe("attention");
    expect(rate(2, 2)).toBe("good");
    expect(rate(1, 2)).toBe("gaps");
    expect(rate(0, 2)).toBe("attention");
  });

  it("matches the ranges printed on the paper version", () => {
    for (const max of [2, 4, 6]) {
      const ranges = ratingRanges(max);
      for (let score = 0; score <= max; score += 1) {
        const rating = rate(score, max);
        const [low, high] = ranges[rating];
        expect(score >= low && score <= high, `${score} of ${max} is ${rating}`).toBe(true);
      }
    }
  });
});

describe("scoreHealthCheck", () => {
  it("rates every area as good when every best answer is chosen", () => {
    const results = scoreHealthCheck(answerAll(() => 0));
    expect(results).toHaveLength(areas.length);
    expect(results.every((result) => result.rating === "good" && result.score === result.max)).toBe(true);
  });

  it("treats 'Not sure' and missing answers as needing attention", () => {
    const notSure = Object.fromEntries(healthCheckQuestions.map((question) => [question.id, "not-sure"]));
    expect(scoreHealthCheck(notSure).every((result) => result.rating === "attention")).toBe(true);
    expect(scoreHealthCheck({}).every((result) => result.score === 0)).toBe(true);
  });

  it("lists the areas that most need attention first", () => {
    const answers = answerAll(() => 0);
    answers["account-control"] = "personal";
    answers.logins = "shared";
    answers.backups = "no";
    answers["ai-rules"] = "discussed";
    const [first, second] = scoreHealthCheck(answers);
    expect(first?.area.id).toBe("accounts");
    expect(first?.rating).toBe("attention");
    expect(second?.area.id).toBe("ai");
    expect(second?.rating).toBe("gaps");
  });

  it("counts 'We don't do any of these' as good for online safeguarding", () => {
    const answers = answerAll(() => 0);
    answers["safeguarding-policy"] = "none";
    expect(scoreHealthCheck(answers).find((result) => result.area.id === "safeguarding")?.rating).toBe("good");
  });
});
