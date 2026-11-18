// The digital health check: questions, scoring and first steps. Pure functions, so the
// browser journey, the printable version and the tests all use the same rules.
import type { Answers, Question } from "./journey";

export type AreaId = "leadership" | "accounts" | "data" | "safeguarding" | "welcome" | "ai";

export interface Area {
  id: AreaId;
  title: string;
  firstSteps: { text: string; href: string }[];
}

export interface ScoredQuestion extends Question {
  area: AreaId;
  /** Points for each option value. Missing values score 0. */
  points: Record<string, number>;
}

export const MAX_POINTS = 2;

export const areas: Area[] = [
  {
    id: "leadership",
    title: "Leadership and roles",
    firstSteps: [
      { text: "Share the work: roles and responsibilities", href: "/guidance/roles-and-responsibilities/" },
      { text: "Digital strategy one-pager template", href: "/templates/digital-strategy/" },
    ],
  },
  {
    id: "accounts",
    title: "Accounts and security",
    firstSteps: [
      { text: "Set up accounts and logins", href: "/guidance/accounts-and-logins/" },
      { text: "Protect your church from scams and cyber attacks", href: "/guidance/cyber-security/" },
      { text: "Systems and account ownership register template", href: "/templates/account-register/" },
    ],
  },
  {
    id: "data",
    title: "Personal data",
    firstSteps: [
      { text: "Look after personal data", href: "/guidance/data-protection/" },
      { text: "Data protection checklist template", href: "/templates/data-protection-checklist/" },
    ],
  },
  {
    id: "safeguarding",
    title: "Safeguarding online",
    firstSteps: [{ text: "Keep people safe online", href: "/guidance/safeguarding-online/" }],
  },
  {
    id: "welcome",
    title: "Welcome and inclusion",
    firstSteps: [
      { text: "Your church website", href: "/guidance/church-website/" },
      { text: "Make your digital work accessible", href: "/guidance/accessibility/" },
    ],
  },
  {
    id: "ai",
    title: "Using AI",
    firstSteps: [
      { text: "Using AI well in your church", href: "/guidance/using-ai-well/" },
      { text: "AI use policy template", href: "/templates/ai-policy/" },
    ],
  },
];

const notSure = { value: "not-sure", label: "Not sure" };

export const healthCheckQuestions: ScoredQuestion[] = [
  {
    id: "lead-trustee",
    area: "leadership",
    type: "radio",
    title: "Is one of your trustees responsible for overseeing your church's digital work?",
    shortTitle: "Trustee oversight",
    hint: "Trustees may be called a PCC, elders, deacons or a church council.",
    errorMessage: "Select whether a trustee oversees your digital work",
    options: [
      { value: "yes", label: "Yes" },
      { value: "informally", label: "Informally, but it's not agreed" },
      { value: "no", label: "No" },
      notSure,
    ],
    points: { yes: 2, informally: 1 },
  },
  {
    id: "handover",
    area: "leadership",
    type: "radio",
    title: "If the person who runs your digital work stepped down tomorrow, could someone else take over?",
    shortTitle: "Handover",
    errorMessage: "Select whether someone else could take over",
    options: [
      { value: "yes", label: "Yes, how things work is written down and shared" },
      { value: "probably", label: "Probably, but it would be difficult" },
      { value: "no", label: "No" },
      notSure,
    ],
    points: { yes: 2, probably: 1 },
  },
  {
    id: "account-control",
    area: "accounts",
    type: "radio",
    title: "Who controls your church's important accounts, such as email, website and domain name?",
    shortTitle: "Account control",
    errorMessage: "Select who controls your church's important accounts",
    options: [
      { value: "church-two", label: "The church, with at least 2 people able to manage each one" },
      { value: "church-one", label: "The church, but often only 1 person can manage them" },
      { value: "personal", label: "Some are in volunteers' personal names" },
      notSure,
    ],
    points: { "church-two": 2, "church-one": 1 },
  },
  {
    id: "logins",
    area: "accounts",
    type: "radio",
    title: "Do people use their own logins, with 2-step verification, for important church accounts?",
    shortTitle: "Logins",
    hint: "2-step verification asks for a code or a passkey as well as a password.",
    errorMessage: "Select how people log in to church accounts",
    options: [
      { value: "all", label: "Yes, for all important accounts" },
      { value: "some", label: "For some accounts" },
      { value: "shared", label: "No, logins are often shared" },
      notSure,
    ],
    points: { all: 2, some: 1 },
  },
  {
    id: "backups",
    area: "accounts",
    type: "radio",
    title: "Do you keep backups of important church information?",
    shortTitle: "Backups",
    errorMessage: "Select whether you keep backups",
    options: [
      { value: "tested", label: "Yes, and we've checked we can restore them" },
      { value: "untested", label: "Yes, but we haven't checked them" },
      { value: "no", label: "No" },
      notSure,
    ],
    points: { tested: 2, untested: 1 },
  },
  {
    id: "data-records",
    area: "data",
    type: "radio",
    title: "Do you have a list of the personal data you hold, and a privacy notice?",
    shortTitle: "Data list and privacy notice",
    errorMessage: "Select whether you have a list of personal data and a privacy notice",
    options: [
      { value: "both", label: "Yes, both" },
      { value: "one", label: "One of them" },
      { value: "neither", label: "Neither" },
      notSure,
    ],
    points: { both: 2, one: 1 },
  },
  {
    id: "breaches",
    area: "data",
    type: "radio",
    title: "Does everyone who handles personal data know what to do if it's lost or sent to the wrong person?",
    shortTitle: "Data breaches",
    errorMessage: "Select whether people know what to do if personal data is lost",
    options: [
      { value: "yes", label: "Yes" },
      { value: "some", label: "Some people do" },
      { value: "no", label: "No" },
      notSure,
    ],
    points: { yes: 2, some: 1 },
  },
  {
    id: "safeguarding-policy",
    area: "safeguarding",
    type: "radio",
    title: "Does your safeguarding policy cover online activity, such as livestreams, photos and group messaging?",
    shortTitle: "Online safeguarding",
    errorMessage: "Select whether your safeguarding policy covers online activity",
    options: [
      { value: "yes", label: "Yes" },
      { value: "partly", label: "Partly" },
      { value: "no", label: "No" },
      { value: "none", label: "We don't do any of these" },
      notSure,
    ],
    points: { yes: 2, partly: 1, none: 2 },
  },
  {
    id: "newcomers",
    area: "welcome",
    type: "radio",
    title: "Could a newcomer find your service times, location and what to expect on your website?",
    shortTitle: "Information for newcomers",
    errorMessage: "Select whether a newcomer could find what they need",
    options: [
      { value: "yes", label: "Yes, and it's up to date" },
      { value: "partly", label: "Partly, or it's sometimes out of date" },
      { value: "no", label: "No, or we don't have a website" },
      notSure,
    ],
    points: { yes: 2, partly: 1 },
  },
  {
    id: "offline",
    area: "welcome",
    type: "radio",
    title: "Can people who don't use the internet still hear church news, give and get in touch?",
    shortTitle: "People who aren't online",
    errorMessage: "Select whether people who don't use the internet can take part",
    options: [
      { value: "yes", label: "Yes" },
      { value: "partly", label: "Partly" },
      { value: "no", label: "No" },
      notSure,
    ],
    points: { yes: 2, partly: 1 },
  },
  {
    id: "ai-rules",
    area: "ai",
    type: "radio",
    title: "Has your church agreed how people may use AI tools for church work?",
    shortTitle: "AI rules",
    hint: "AI tools include chatbots and writing assistants, such as ChatGPT, Microsoft Copilot or Google Gemini.",
    errorMessage: "Select whether your church has agreed how people may use AI",
    options: [
      { value: "yes", label: "Yes, and it's written down" },
      { value: "discussed", label: "We've discussed it, but haven't agreed anything" },
      { value: "no", label: "Not yet" },
      notSure,
    ],
    points: { yes: 2, discussed: 1 },
  },
];

export type Rating = "good" | "gaps" | "attention";

export const ratingLabels: Record<Rating, string> = {
  good: "Good foundations",
  gaps: "Some gaps",
  attention: "Needs attention",
};

export interface AreaResult {
  area: Area;
  score: number;
  max: number;
  rating: Rating;
}

export function questionsIn(area: AreaId): ScoredQuestion[] {
  return healthCheckQuestions.filter((question) => question.area === area);
}

export function pointsFor(question: ScoredQuestion, answer: Answers[string] | undefined): number {
  return typeof answer === "string" ? (question.points[answer] ?? 0) : 0;
}

/** At least 75% of the possible points is good, at least 40% has some gaps, and anything less needs attention. */
export function rate(score: number, max: number): Rating {
  if (score >= max * 0.75) return "good";
  if (score >= max * 0.4) return "gaps";
  return "attention";
}

/** The score ranges for each rating, for the printable version. */
export function ratingRanges(max: number): Record<Rating, [number, number]> {
  const good = Math.ceil(max * 0.75);
  const gaps = Math.ceil(max * 0.4);
  return { good: [good, max], gaps: [gaps, good - 1], attention: [0, gaps - 1] };
}

const order: Record<Rating, number> = { attention: 0, gaps: 1, good: 2 };

/** Results for each area, with the areas that most need attention first. */
export function scoreHealthCheck(answers: Answers): AreaResult[] {
  return areas
    .map((area) => {
      const questions = questionsIn(area.id);
      const score = questions.reduce((total, question) => total + pointsFor(question, answers[question.id]), 0);
      const max = questions.length * MAX_POINTS;
      return { area, score, max, rating: rate(score, max) };
    })
    .sort((a, b) => order[a.rating] - order[b.rating] || a.score / a.max - b.score / b.max);
}
