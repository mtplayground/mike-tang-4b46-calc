import { useState } from "react";
import { Display } from "./Display";
import { Keypad } from "./Keypad";
import {
  appendNumberKey,
  chooseOperator,
  getDisplayValues,
  initialCalculatorState,
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

  return (
    <section className="calculator-frame" aria-label="Calculator">
      <Display
        currentEntry={displayValues.currentEntry}
        runningResult={displayValues.runningResult}
      />
      <Keypad
        onActionPress={() => undefined}
        onNumberPress={handleNumberPress}
        onOperatorPress={handleOperatorPress}
      />
    </section>
  );
}
