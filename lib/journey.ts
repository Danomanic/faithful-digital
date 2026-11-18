// A one-question-per-page journey, following the GOV.UK question page and check answers patterns.
// Answers are only held in memory in the browser. Nothing is stored or sent anywhere.

export type Answer = string | string[];
export type Answers = Record<string, Answer>;

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

export interface Question {
  id: string;
  type: "radio" | "checkbox";
  title: string;
  hint?: string;
  options: Option[];
  errorMessage: string;
  /** For checkboxes: an option, like "None of these", that can't be chosen with any other. */
  exclusive?: string;
  /** Shown on the check answers page instead of the full question. */
  shortTitle?: string;
}

export interface JourneyState {
  step: number;
  answers: Answers;
  changing: boolean;
}

export const initialState: JourneyState = { step: 0, answers: {}, changing: false };

export type JourneyAction =
  | { type: "submit"; question: Question; answer: Answer | undefined }
  | { type: "back" }
  | { type: "change"; step: number }
  | { type: "confirm" }
  | { type: "restart" };

export function validate(question: Question, answer: Answer | undefined): string | null {
  const values = Array.isArray(answer) ? answer : answer ? [answer] : [];
  if (values.length === 0) return question.errorMessage;
  if (question.exclusive && values.includes(question.exclusive) && values.length > 1) {
    const label = question.options.find((option) => option.value === question.exclusive)?.label ?? question.exclusive;
    return `Select '${label}' or the other options, not both`;
  }
  return null;
}

/** Builds the reducer for a journey with `count` questions. Step `count` is check answers, and `count + 1` is results. */
export function journeyReducer(count: number) {
  const checkAnswers = count;
  return function reducer(state: JourneyState, action: JourneyAction): JourneyState {
    switch (action.type) {
      case "submit": {
        if (validate(action.question, action.answer) !== null || action.answer === undefined) return state;
        return {
          step: state.changing ? checkAnswers : state.step + 1,
          answers: { ...state.answers, [action.question.id]: action.answer },
          changing: false,
        };
      }
      case "back":
        if (state.changing) return { ...state, step: checkAnswers, changing: false };
        return { ...state, step: Math.max(0, state.step - 1) };
      case "change":
        return { ...state, step: action.step, changing: true };
      case "confirm":
        return { ...state, step: checkAnswers + 1 };
      case "restart":
        return initialState;
    }
  };
}

export function answerLabel(question: Question, answer: Answer | undefined): string {
  const values = Array.isArray(answer) ? answer : answer ? [answer] : [];
  return values.map((value) => question.options.find((option) => option.value === value)?.label ?? value).join(", ");
}

export function asList(answer: Answer | undefined): string[] {
  return Array.isArray(answer) ? answer : answer ? [answer] : [];
}
