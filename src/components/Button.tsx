import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  label: string;
  onPress: () => void;
};

export function Button({ children, label, onPress }: ButtonProps) {
  return (
    <button className="calculator-button" type="button" aria-label={label} onClick={onPress}>
      {children}
    </button>
  );
}
