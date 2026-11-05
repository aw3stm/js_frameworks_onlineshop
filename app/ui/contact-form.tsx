"use client";

import { useState } from "react";

interface ContactFormValues {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMPTY_VALUES: ContactFormValues = {
  fullName: "",
  subject: "",
  email: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters.";
  }
  if (values.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

const inputClass =
  "w-full border bg-white px-4 py-3 text-sm outline-none focus:border-atelier-black";

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSent, setIsSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const name = e.target.name as keyof ContactFormValues;
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setIsSent(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors = validate(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSent(true);
    setValues(EMPTY_VALUES);
  }

  function borderClass(field: keyof ContactFormValues) {
    return errors[field] ? "border-red-700" : "border-atelier-details/40";
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 max-w-xl mx-auto"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="text-md">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={`${inputClass} ${borderClass("fullName")}`}
        />
        {errors.fullName && (
          <p id="fullName-error" role="alert" className="text-sm text-red-700">
            {errors.fullName}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-md">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={`${inputClass} ${borderClass("subject")}`}
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="text-sm text-red-700">
            {errors.subject}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-md">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${inputClass} ${borderClass("email")}`}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-sm text-red-700">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-md">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} ${borderClass("message")}`}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-sm text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="self-start bg-atelier-button text-white rounded-sm px-8 py-3 text-sm tracking-[0.2em] uppercase hover:opacity-80 transition-opacity cursor-pointer"
      >
        Send message
      </button>

      {isSent && (
        <p role="status" className="text-md">
          Thank you! Your message has been sent.
        </p>
      )}
    </form>
  );
}
