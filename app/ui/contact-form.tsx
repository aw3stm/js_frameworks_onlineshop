"use client";

import { useEffect, useRef, useState } from "react";

interface ContactFormValues {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

type FieldName = keyof ContactFormValues;
type ContactFormErrors = Partial<Record<FieldName, string>>;
type TouchedFields = Partial<Record<FieldName, boolean>>;
type Status = "idle" | "sending" | "sent";

const FIELD_ORDER: FieldName[] = ["fullName", "subject", "email", "message"];

const EMPTY_VALUES: ContactFormValues = {
  fullName: "",
  subject: "",
  email: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 500;

function validateField(field: FieldName, value: string): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "fullName":
      return trimmed.length < 3
        ? "Full name must be at least 3 characters."
        : undefined;
    case "subject":
      return trimmed.length < 3
        ? "Subject must be at least 3 characters."
        : undefined;
    case "email":
      return EMAIL_PATTERN.test(trimmed)
        ? undefined
        : "Please enter a valid email address.";
    case "message":
      return trimmed.length < MESSAGE_MIN
        ? `Message must be at least ${MESSAGE_MIN} characters.`
        : undefined;
  }
}

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  for (const field of FIELD_ORDER) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

const inputClass =
  "block w-full border-0 border-b bg-transparent px-0 py-3 pr-8 text-sm outline-none transition-colors duration-200";

interface FormFieldProps {
  id: FieldName;
  label: string;
  error?: string;
  isValid: boolean;
  hint?: React.ReactNode;
  children: React.ReactNode;
}

function FormField({
  id,
  label,
  error,
  isValid,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="group flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-md opacity-70 transition-opacity duration-200 group-focus-within:opacity-100"
      >
        {label}
      </label>

      <div className="relative">
        {children}

        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-focus-within:scale-x-100 motion-reduce:transition-none ${
            error ? "bg-red-700" : "bg-atelier-black"
          }`}
        />

        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`pointer-events-none absolute right-0 top-3.5 h-4 w-4 text-green-700 transition-all duration-300 motion-reduce:transition-none ${
            isValid ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          <path d="M4 10.5l4 4 8-9" />
        </svg>
      </div>

      {(error || hint) && (
        <div className="flex items-start justify-between gap-4">
          {error ? (
            <p id={`${id}-error`} role="alert" className="text-sm text-red-700">
              {error}
            </p>
          ) : (
            <span />
          )}
          {hint}
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth={3}
        className="opacity-25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  const [shown, setShown] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShown(true), 30);
    panelRef.current?.focus();
    return () => clearTimeout(timer);
  }, []);

  const draw = (delay: number, duration: number): React.CSSProperties => ({
    strokeDasharray: 1,
    strokeDashoffset: shown ? 0 : 1,
    transition: `stroke-dashoffset ${duration}ms ease-out ${delay}ms`,
  });

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="status"
      className={`mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-14 text-center outline-none transition-all duration-500 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 52 52"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-16 w-16 text-green-700"
      >
        <circle cx="26" cy="26" r="24" pathLength={1} style={draw(0, 700)} />
        <path d="M15 27l8 8 14-16" pathLength={1} style={draw(500, 450)} />
      </svg>

      <p className="text-md">Thank you! Your message has been sent.</p>

      <button
        type="button"
        onClick={onReset}
        className="cursor-pointer text-sm tracking-[0.2em] uppercase underline underline-offset-4 transition-opacity hover:opacity-60"
      >
        Send another message
      </button>
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const name = e.target.name as FieldName;
    const value = e.target.value;

    setValues((prev) => ({ ...prev, [name]: value }));

    
    setErrors((prev) => ({
      ...prev,
      [name]: touched[name] ? validateField(name, value) : undefined,
    }));
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const name = e.target.name as FieldName;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, values[name]),
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const newErrors = validate(values);
    setErrors(newErrors);
    setTouched({ fullName: true, subject: true, email: true, message: true });

    const firstInvalid = FIELD_ORDER.find((field) => newErrors[field]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("sending");

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setValues(EMPTY_VALUES);
    setErrors({});
    setTouched({});
    setStatus("sent");
  }

  function handleReset() {
    setStatus("idle");
  }

  function borderClass(field: FieldName) {
    return errors[field] ? "border-red-700" : "border-atelier-details/40";
  }

  function fieldProps(field: FieldName) {
    return {
      id: field,
      name: field,
      value: values[field],
      onChange: handleChange,
      onBlur: handleBlur,
      "aria-invalid": Boolean(errors[field]),
      "aria-describedby": errors[field] ? `${field}-error` : undefined,
      className: `${inputClass} ${borderClass(field)}`,
    };
  }

  function isValid(field: FieldName) {
    return Boolean(touched[field]) && !validateField(field, values[field]);
  }

  if (status === "sent") {
    return <SuccessPanel onReset={handleReset} />;
  }

  const isSending = status === "sending";
  const messageLength = values.message.length;
  const messageLongEnough = values.message.trim().length >= MESSAGE_MIN;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSending}
      className="mx-auto flex max-w-xl flex-col gap-6"
    >
      <FormField
        id="fullName"
        label="Full name"
        error={errors.fullName}
        isValid={isValid("fullName")}
      >
        <input type="text" autoComplete="name" {...fieldProps("fullName")} />
      </FormField>

      <FormField
        id="subject"
        label="Subject"
        error={errors.subject}
        isValid={isValid("subject")}
      >
        <input type="text" {...fieldProps("subject")} />
      </FormField>

      <FormField
        id="email"
        label="Email"
        error={errors.email}
        isValid={isValid("email")}
      >
        <input type="email" autoComplete="email" {...fieldProps("email")} />
      </FormField>

      <FormField
        id="message"
        label="Message"
        error={errors.message}
        isValid={isValid("message")}
        hint={
          <span
            className={`ml-auto text-xs tabular-nums transition-opacity duration-200 ${
              messageLongEnough ? "opacity-100" : "opacity-50"
            }`}
          >
            {messageLength}/{MESSAGE_MAX}
          </span>
        }
      >
        <textarea rows={6} maxLength={MESSAGE_MAX} {...fieldProps("message")} />
      </FormField>

      <button
        type="submit"
        disabled={isSending}
        className="group self-start inline-flex items-center gap-3 bg-atelier-button text-white rounded-sm px-8 py-3 text-sm tracking-[0.2em] uppercase transition-all duration-200 hover:opacity-80 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 cursor-pointer motion-reduce:transition-none"
      >
        {isSending ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          <>
            Send message
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            >
              →
            </span>
          </>
        )}
      </button>
    </form>
  );
}
