import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary";

function buttonClassName(variant: Variant, className = "", pill = false) {
  return `button button--${variant} ${pill ? "button--pill" : ""} ${className}`;
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  pill?: boolean;
};

export function Button({
  variant = "primary",
  pill = false,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName(variant, className, pill)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: Variant;
  pill?: boolean;
};

export function ButtonLink({
  variant = "primary",
  pill = false,
  className,
  ...props
}: ButtonLinkProps) {
  return <a className={buttonClassName(variant, className, pill)} {...props} />;
}
