import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const baseStyles =
  "inline-block cursor-pointer rounded-sm bg-atelier-button px-8 py-3 text-center text-sm uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50";

type ButtonAsButton = ComponentPropsWithoutRef<"button"> & {
  href?: undefined;
};

type ButtonAsLink = ComponentPropsWithoutRef<typeof Link> & {
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { className = "", ...rest } = props;
    return <Link className={`${baseStyles} ${className}`} {...rest} />;
  }

  const { className = "", type = "button", ...rest } = props;
  return (
    <button type={type} className={`${baseStyles} ${className}`} {...rest} />
  );
}
