"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cart-context";

const CHECKOUT_FLAG = "atelier-north-checkout";

type FormValues = {
  name: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  address: "",
  postalCode: "",
  city: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2)
    errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Please enter a valid email.";
  if (values.address.trim().length < 3)
    errors.address = "Please enter your address.";
  if (!/^\d{3}\s?\d{2}$/.test(values.postalCode))
    errors.postalCode = "Use 5 digits, e.g. 123 45.";
  if (values.city.trim().length < 2) errors.city = "Please enter your city.";

  if (values.cardNumber.replace(/\s/g, "").length !== 16)
    errors.cardNumber = "Card number must be 16 digits.";

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiry)) {
    errors.expiry = "Use MM/YY.";
  } else {
    const [month, year] = values.expiry.split("/").map(Number);
    const firstDayAfterExpiry = new Date(2000 + year, month);
    if (firstDayAfterExpiry <= new Date()) errors.expiry = "Card has expired.";
  }

  if (!/^\d{3,4}$/.test(values.cvc)) errors.cvc = "3 or 4 digits.";

  return errors;
}

// "4242424242424242" -> "4242 4242 4242 4242"
function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

// "1228" -> "12/28"
function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits;
}

export default function CheckoutForm() {
  const router = useRouter();
  const { items, totalPrice, isLoaded } = useCart();

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name as keyof FormValues;
    let value = e.target.value;

    if (name === "cardNumber") value = formatCardNumber(value);
    if (name === "expiry") value = formatExpiry(value);
    if (name === "cvc") value = value.replace(/\D/g, "").slice(0, 4);

    const next = { ...values, [name]: value };
    setValues(next);

    // Om fältet redan visar ett fel: kolla igen medan man skriver
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(next)[name] }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const name = e.target.name as keyof FormValues;
    setErrors((prev) => ({ ...prev, [name]: validate(values)[name] }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Låtsas-betalning
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Först NU får man komma åt success-sidan
    try {
      sessionStorage.setItem(CHECKOUT_FLAG, "true");
    } catch {}

    router.push("/checkout/success");
  }

  // Vänta tills kundvagnen är laddad från localStorage
  if (!isLoaded) return null;

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm mb-8">Your cart is empty.</p>
        <Link
          href="/products"
          className="inline-block rounded-sm bg-atelier-button text-white px-8 py-3 text-sm tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const fieldProps = (name: keyof FormValues) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: handleChange,
    onBlur: handleBlur,
  });

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
        <p className="rounded-sm border border-atelier-details/40 bg-atelier-beige px-4 py-3 text-sm">
          This is a demo store, so no real payment is made. Use any test number,
          e.g. <span className="font-mono">4242 4242 4242 4242</span>.
        </p>

        <fieldset className="flex flex-col gap-5">
          <legend className="mb-5 text-xs uppercase tracking-[0.2em] text-atelier-button">
            Delivery details
          </legend>
          <Field
            label="Full name"
            autoComplete="name"
            {...fieldProps("name")}
          />
          <Field
            label="Email"
            type="email"
            autoComplete="email"
            {...fieldProps("email")}
          />
          <Field
            label="Address"
            autoComplete="street-address"
            {...fieldProps("address")}
          />
          <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
            <Field
              label="Postal code"
              inputMode="numeric"
              autoComplete="postal-code"
              {...fieldProps("postalCode")}
            />
            <Field
              label="City"
              autoComplete="address-level2"
              {...fieldProps("city")}
            />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-5">
          <legend className="mb-5 text-xs uppercase tracking-[0.2em] text-atelier-button">
            Payment
          </legend>
          <Field
            label="Card number"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            {...fieldProps("cardNumber")}
          />
          <div className="grid grid-cols-2 gap-5">
            <Field
              label="Expiry date"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              {...fieldProps("expiry")}
            />
            <Field
              label="CVC"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              {...fieldProps("cvc")}
            />
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isProcessing}
          className="rounded-sm bg-atelier-button py-4 text-sm tracking-[0.2em] text-white uppercase hover:opacity-80 transition-opacity cursor-pointer disabled:cursor-wait disabled:opacity-60"
        >
          {isProcessing
            ? "Processing payment…"
            : `Pay ${totalPrice.toFixed(2)} SEK`}
        </button>
      </form>

      <aside className="h-fit rounded-sm border border-atelier-details/40 p-6 lg:sticky lg:top-24">
        <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-atelier-button">
          Order summary
        </h2>

        <ul className="flex flex-col divide-y divide-gray-400/50">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3 py-4">
              <div className="relative w-14 h-16 shrink-0 overflow-hidden">
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex grow justify-between gap-3 text-sm">
                <span>
                  {item.title}
                  <span className="block text-gray-500">× {item.quantity}</span>
                </span>
                <span className="whitespace-nowrap">
                  {(item.price * item.quantity).toFixed(2)} SEK
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between border-t border-gray-400/50 pt-4">
          <span>Total</span>
          <span className="font-medium">{totalPrice.toFixed(2)} SEK</span>
        </div>
      </aside>
    </div>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string;
};

function Field({ label, name, error, ...inputProps }: FieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-sm border px-4 py-3 outline-none transition-colors focus:border-atelier-button ${
          error ? "border-red-500" : "border-atelier-details/40"
        }`}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
