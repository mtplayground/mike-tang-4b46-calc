import type { ActionKey, NumberKey, OperatorKey } from "./calculator";

export type KeyboardAction =
  | { key: ActionKey; type: "action" }
  | { key: NumberKey; type: "number" }
  | { key: OperatorKey; type: "operator" };

export function getKeyboardAction(key: string): KeyboardAction | null {
  if (/^[0-9]$/.test(key)) {
    return { key: key as NumberKey, type: "number" };
  }

  if (key === ".") {
    return { key: ".", type: "number" };
  }

  if (key === "+") {
    return { key: "add", type: "operator" };
  }

  if (key === "-" || key === "−") {
    return { key: "subtract", type: "operator" };
  }

  if (key === "*" || key === "×") {
    return { key: "multiply", type: "operator" };
  }

  if (key === "/" || key === "÷") {
    return { key: "divide", type: "operator" };
  }

  if (key === "Enter" || key === "=") {
    return { key: "equals", type: "action" };
  }

  if (key === "Escape" || key === "a" || key === "A") {
    return { key: "clear", type: "action" };
  }

  return null;
}
