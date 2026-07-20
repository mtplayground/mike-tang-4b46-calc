import { useState } from "react";
import { Display } from "./Display";
import { Keypad, type ActionKey } from "./Keypad";
import {
  appendNumberKey,
  chooseOperator,
  getDisplayValues,
  initialCalculatorState,
  pressEquals,
  resetCalculator,
  type NumberKey,
  type OperatorKey,
} from "../lib/calculator";

export function CalculatorFrame() {
  const [calculatorState, setCalculatorState] = useState(initialCalculatorState);
  const displayValues = getDisplayValues(calculatorState);

  function handleNumberPress(key: NumberKey) {
    setCalculatorState((state) => appendNumberKey(state, key));
  }

  function handleOperatorPress(key: OperatorKey) {
    setCalculatorState((state) => chooseOperator(state, key));
  }

  function handleActionPress(key: ActionKey) {
    if (key === "clear") {
      setCalculatorState(resetCalculator());
      return;
    }

    if (key === "equals") {
      setCalculatorState((state) => pressEquals(state));
    }
  }

  return (
    <section className="calculator-frame" aria-label="Calculator">
      <Display
        currentEntry={displayValues.currentEntry}
        runningResult={displayValues.runningResult}
      />
      <Keypad
        onActionPress={handleActionPress}
        onNumberPress={handleNumberPress}
        onOperatorPress={handleOperatorPress}
      />
    </section>
  );
}
