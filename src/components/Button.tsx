import type { ReactNode } from "react";

type ButtonVariant = "number" | "operator" | "action" | "equals";

type ButtonProps = {
  children: ReactNode;
  label: string;
  onPress: () => void;
  span?: "wide" | "tall";
  variant?: ButtonVariant;
};

export function Button({ children, label, onPress, span, variant = "number" }: ButtonProps) {
  const className = ["calculator-button", `calculator-button-${variant}`, span && `is-${span}`]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={className} type="button" aria-label={label} onClick={onPress}>
      {children}
    </button>
  );
}
