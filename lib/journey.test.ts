import { describe, expect, it } from "vitest";
import { answerLabel, initialState, journeyReducer, validate, type JourneyState, type Question } from "./journey";

const size: Question = {
  id: "size",
  type: "radio",
  title: "How big is your church?",
  errorMessage: "Select how big your church is",
  options: [
    { value: "small", label: "Small" },
    { value: "large", label: "Large" },
  ],
};

const records: Question = {
  id: "records",
  type: "checkbox",
  title: "What do you have?",
  errorMessage: "Select what you have",
  exclusive: "none",
  options: [
    { value: "register", label: "A register" },
    { value: "policy", label: "A policy" },
    { value: "none", label: "None of these" },
  ],
};

const reducer = journeyReducer(2);
const CHECK_ANSWERS = 2;
const RESULTS = 3;

describe("validate", () => {
  it("rejects a missing answer", () => {
    expect(validate(size, undefined)).toBe(size.errorMessage);
    expect(validate(records, [])).toBe(records.errorMessage);
  });
  it("accepts an answer", () => {
    expect(validate(size, "small")).toBeNull();
    expect(validate(records, ["register", "policy"])).toBeNull();
    expect(validate(records, ["none"])).toBeNull();
  });
  it("rejects an exclusive option chosen with others", () => {
    expect(validate(records, ["register", "none"])).toBe("Select 'None of these' or the other options, not both");
  });
});

describe("journeyReducer", () => {
  it("stays on the question when the answer is invalid", () => {
    expect(reducer(initialState, { type: "submit", question: size, answer: undefined })).toEqual(initialState);
  });
  it("moves forward and stores a valid answer", () => {
    const state = reducer(initialState, { type: "submit", question: size, answer: "small" });
    expect(state).toEqual({ step: 1, answers: { size: "small" }, changing: false });
  });
  it("reaches check answers after the last question, then results", () => {
    const atLast: JourneyState = { step: 1, answers: { size: "small" }, changing: false };
    const check = reducer(atLast, { type: "submit", question: records, answer: ["none"] });
    expect(check.step).toBe(CHECK_ANSWERS);
    expect(reducer(check, { type: "confirm" }).step).toBe(RESULTS);
  });
  it("does not go back past the first question, and keeps answers when going back", () => {
    expect(reducer(initialState, { type: "back" }).step).toBe(0);
    const state: JourneyState = { step: 1, answers: { size: "small" }, changing: false };
    expect(reducer(state, { type: "back" })).toEqual({ ...state, step: 0 });
  });
  it("returns to check answers after a change, or when backing out of one", () => {
    const atCheck: JourneyState = { step: CHECK_ANSWERS, answers: { size: "small" }, changing: false };
    const changing = reducer(atCheck, { type: "change", step: 0 });
    expect(changing).toMatchObject({ step: 0, changing: true });
    expect(reducer(changing, { type: "submit", question: size, answer: "large" })).toMatchObject({
      step: CHECK_ANSWERS,
      changing: false,
      answers: { size: "large" },
    });
    expect(reducer(changing, { type: "back" })).toMatchObject({ step: CHECK_ANSWERS, changing: false });
  });
  it("clears everything on restart", () => {
    expect(reducer({ step: RESULTS, answers: { size: "small" }, changing: false }, { type: "restart" })).toEqual(initialState);
  });
});

describe("answerLabel", () => {
  it("shows option labels", () => {
    expect(answerLabel(size, "large")).toBe("Large");
    expect(answerLabel(records, ["register", "policy"])).toBe("A register, A policy");
    expect(answerLabel(size, undefined)).toBe("");
  });
});
