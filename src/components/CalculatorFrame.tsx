import { useState } from "react";
import { Display } from "./Display";
import { Keypad, type NumberKey } from "./Keypad";

function appendNumberKey(entry: string, key: NumberKey) {
  if (key === ".") {
    if (entry.includes(".")) {
      return entry;
    }

    return entry.length > 0 ? `${entry}.` : "0.";
  }

  return entry === "0" ? key : `${entry}${key}`;
}

export function CalculatorFrame() {
  const [currentEntry, setCurrentEntry] = useState("");

  function handleNumberPress(key: NumberKey) {
    setCurrentEntry((entry) => appendNumberKey(entry, key));
  }

  return (
    <section className="calculator-frame" aria-label="Calculator">
      <Display currentEntry={currentEntry} />
      <Keypad
        onActionPress={() => undefined}
        onNumberPress={handleNumberPress}
        onOperatorPress={() => undefined}
      />
    </section>
  );
}
