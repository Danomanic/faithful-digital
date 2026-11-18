"use client";

import type { ReactNode } from "react";

export interface FieldError {
  href: string;
  text: string;
}

export function Button({
  children,
  variant = "primary",
  ...props
}: { variant?: "primary" | "secondary" | "warning"; children: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const className = variant === "primary" ? "fd-button" : `fd-button fd-button--${variant}`;
  return (
    <button className={className} type="button" {...props}>
      {children}
    </button>
  );
}

export function ErrorSummary({
  errors,
  ref,
}: {
  errors: FieldError[];
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div className="fd-error-summary" ref={ref} tabIndex={-1} role="alert">
      <h2>There is a problem</h2>
      <ul>
        {errors.map((error) => (
          <li key={error.href}>
            <a href={error.href}>{error.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ErrorMessage({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span className="fd-error-message" id={id}>
      <span className="fd-visually-hidden">Error: </span>
      {children}
    </span>
  );
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

function describedBy(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

function FieldFrame({ id, label, hint, error, children }: FieldProps & { children: ReactNode }) {
  return (
    <div className={error ? "fd-form-group fd-form-group--error" : "fd-form-group"}>
      <label className="fd-label" htmlFor={id}>{label}</label>
      {hint && <span className="fd-hint" id={`${id}-hint`}>{hint}</span>}
      {error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
      {children}
    </div>
  );
}

export function TextInput({ id, label, hint, error, ...props }: FieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldFrame id={id} label={label} hint={hint} error={error}>
      <input
        className={error ? "fd-input fd-input--error" : "fd-input"}
        id={id}
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    </FieldFrame>
  );
}

export function Textarea({ id, label, hint, error, ...props }: FieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldFrame id={id} label={label} hint={hint} error={error}>
      <textarea
        className={error ? "fd-textarea fd-textarea--error" : "fd-textarea"}
        id={id}
        rows={4}
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    </FieldFrame>
  );
}

export function Select({
  id,
  label,
  hint,
  error,
  options,
  ...props
}: FieldProps & { options: { value: string; label: string }[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldFrame id={id} label={label} hint={hint} error={error}>
      <select
        className={error ? "fd-select fd-select--error" : "fd-select"}
        id={id}
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </FieldFrame>
  );
}

interface OptionGroupProps {
  name: string;
  legend: string;
  legendIsPageHeading?: boolean;
  headingRef?: React.Ref<HTMLHeadingElement>;
  hint?: string;
  error?: string;
  options: { value: string; label: string; hint?: string }[];
}

function OptionGroup({
  type,
  name,
  legend,
  legendIsPageHeading,
  headingRef,
  hint,
  error,
  options,
  selected,
  onToggle,
}: OptionGroupProps & {
  type: "radio" | "checkbox";
  selected: string[];
  onToggle?: (value: string, checked: boolean) => void;
}) {
  return (
    <div className={error ? "fd-form-group fd-form-group--error" : "fd-form-group"}>
      <fieldset className="fd-fieldset" aria-describedby={describedBy(name, hint, error)}>
        <legend className="fd-legend">
          {legendIsPageHeading ? <h1 ref={headingRef} tabIndex={-1}>{legend}</h1> : legend}
        </legend>
        {hint && <span className="fd-hint" id={`${name}-hint`}>{hint}</span>}
        {error && <ErrorMessage id={`${name}-error`}>{error}</ErrorMessage>}
        {options.map((option, index) => {
          const id = index === 0 ? name : `${name}-${index + 1}`;
          return (
            <div className="fd-option" key={option.value}>
              <input
                id={id}
                type={type}
                name={name}
                value={option.value}
                aria-describedby={option.hint ? `${id}-hint` : undefined}
                {...(onToggle
                  ? {
                      checked: selected.includes(option.value),
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) => onToggle(option.value, event.target.checked),
                    }
                  : {})}
              />
              <label htmlFor={id}>{option.label}</label>
              {option.hint && <span className="fd-hint fd-option__hint" id={`${id}-hint`}>{option.hint}</span>}
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}

export function Radios({
  value,
  onChange,
  ...props
}: OptionGroupProps & { value?: string; onChange?: (value: string) => void }) {
  return (
    <OptionGroup
      {...props}
      type="radio"
      selected={value ? [value] : []}
      onToggle={onChange ? (next) => onChange(next) : undefined}
    />
  );
}

export function Checkboxes({
  value = [],
  onChange,
  ...props
}: OptionGroupProps & { value?: string[]; onChange?: (value: string[]) => void }) {
  return (
    <OptionGroup
      {...props}
      type="checkbox"
      selected={value}
      onToggle={
        onChange
          ? (option, checked) => onChange(checked ? [...value, option] : value.filter((item) => item !== option))
          : undefined
      }
    />
  );
}
