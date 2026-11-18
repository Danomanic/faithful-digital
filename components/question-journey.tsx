"use client";

import Link from "next/link";
import { useEffect, useMemo, useReducer, useRef, useState, useSyncExternalStore, type ComponentType, type FormEvent } from "react";
import { Button, Checkboxes, ErrorSummary, Radios } from "./forms";
import { InsetText, SummaryList } from "./content";
import { answerLabel, initialState, journeyReducer, validate, type Answer, type Answers, type Question } from "@/lib/journey";

const subscribe = () => () => {};

export interface JourneyProps {
  /** The tool's name, used in page titles. */
  name: string;
  questions: Question[];
  /** Where the back link on the first question goes. */
  startHref: string;
  confirmLabel: string;
  resultsTitle: string;
  Results: ComponentType<{ answers: Answers }>;
  /** Shown instead of the journey when JavaScript isn't available. */
  noScriptHref: string;
  noScriptLabel: string;
}

export function QuestionJourney(props: JourneyProps) {
  // The server renders the fallback. The journey only appears once JavaScript is running in the browser.
  const enhanced = useSyncExternalStore(subscribe, () => true, () => false);
  if (!enhanced) {
    return (
      <>
        <h1>{props.name}</h1>
        <InsetText>
          <p>
            This tool needs JavaScript, which isn&apos;t available in your browser. You can{" "}
            <Link href={props.noScriptHref}>{props.noScriptLabel}</Link> instead.
          </p>
        </InsetText>
      </>
    );
  }
  return <Journey {...props} />;
}

function Journey({ name, questions, startHref, confirmLabel, resultsTitle, Results }: JourneyProps) {
  const reducer = useMemo(() => journeyReducer(questions.length), [questions.length]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [draft, setDraft] = useState<Answer | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const checkAnswersStep = questions.length;
  const question = questions[state.step];
  const stepTitle = question?.title ?? (state.step === checkAnswersStep ? "Check your answers" : resultsTitle);

  // Move focus to the new heading and update the page title when the step changes.
  useEffect(() => {
    document.title = `${stepTitle} – ${name} – Faithful Digital`;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
  }, [state.step, stepTitle, name]);

  useEffect(() => {
    if (error) {
      document.title = `Error: ${stepTitle} – ${name} – Faithful Digital`;
      errorSummary.current?.focus();
    }
  }, [error, stepTitle, name]);

  function goTo(action: Parameters<typeof dispatch>[0], nextDraft: Answer | undefined) {
    setError(null);
    setDraft(nextDraft);
    dispatch(action);
    window.scrollTo(0, 0);
  }

  function savedAnswerFor(step: number) {
    const target = questions[step];
    return target ? state.answers[target.id] : undefined;
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!question) return;
    const problem = validate(question, draft);
    if (problem) {
      setError(problem);
      return;
    }
    const nextStep = state.changing ? checkAnswersStep : state.step + 1;
    goTo({ type: "submit", question, answer: draft }, savedAnswerFor(nextStep));
  }

  function onBack() {
    const previousStep = state.changing ? checkAnswersStep : state.step - 1;
    goTo({ type: "back" }, savedAnswerFor(previousStep));
  }

  if (question) {
    const props = {
      key: question.id,
      name: question.id,
      legend: question.title,
      legendIsPageHeading: true,
      headingRef: heading,
      hint: question.hint,
      error: error ?? undefined,
      options: question.options,
    };
    return (
      <form onSubmit={onSubmit} noValidate>
        {state.step > 0 || state.changing ? (
          <button className="fd-back-link" type="button" onClick={onBack}>Back</button>
        ) : (
          <Link className="fd-back-link" href={startHref}>Back</Link>
        )}
        <p className="fd-muted fd-journey__progress">
          Question {state.step + 1} of {questions.length}
        </p>
        {error && <ErrorSummary ref={errorSummary} errors={[{ href: `#${question.id}`, text: error }]} />}
        {question.type === "radio" ? (
          <Radios {...props} value={typeof draft === "string" ? draft : undefined} onChange={setDraft} />
        ) : (
          <Checkboxes {...props} value={Array.isArray(draft) ? draft : []} onChange={setDraft} />
        )}
        <Button type="submit">Continue</Button>
      </form>
    );
  }

  if (state.step === checkAnswersStep) {
    return (
      <>
        <button className="fd-back-link" type="button" onClick={onBack}>Back</button>
        <h1 ref={heading} tabIndex={-1}>Check your answers</h1>
        <SummaryList
          rows={questions.map((item, index) => ({
            key: item.shortTitle ?? item.title,
            value: answerLabel(item, state.answers[item.id]),
            action: (
              <button
                className="fd-summary__action"
                type="button"
                onClick={() => goTo({ type: "change", step: index }, state.answers[item.id])}
              >
                Change<span className="fd-visually-hidden"> {(item.shortTitle ?? item.title).toLowerCase()}</span>
              </button>
            ),
          }))}
        />
        <Button onClick={() => goTo({ type: "confirm" }, undefined)}>{confirmLabel}</Button>
      </>
    );
  }

  return (
    <>
      <h1 ref={heading} tabIndex={-1}>{resultsTitle}</h1>
      <Results answers={state.answers} />
      <div className="fd-button-group fd-no-print">
        <Button variant="secondary" onClick={() => window.print()}>Print your results</Button>
        <Button variant="secondary" onClick={() => goTo({ type: "restart" }, undefined)}>Start again</Button>
      </div>
      <p className="fd-small fd-muted">
        Your answers are only kept on this page. They&apos;re deleted when you close or refresh it, and they&apos;re never
        sent to us or anyone else.
      </p>
    </>
  );
}
