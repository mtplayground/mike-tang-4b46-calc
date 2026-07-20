import { useCallback, useEffect, useState } from "react";
import { Display } from "./Display";
import { Keypad } from "./Keypad";
import {
  type ActionKey,
  appendNumberKey,
  chooseOperator,
  getDisplayValues,
  initialCalculatorState,
  pressEquals,
  resetCalculator,
  type NumberKey,
  type OperatorKey,
} from "../lib/calculator";
import { getKeyboardAction } from "../lib/keyboard";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLSelectElement ||
    target instanceof HTMLTextAreaElement
  );
}

export function CalculatorFrame() {
  const [calculatorState, setCalculatorState] = useState(initialCalculatorState);
  const displayValues = getDisplayValues(calculatorState);

  const handleNumberPress = useCallback((key: NumberKey) => {
    setCalculatorState((state) => appendNumberKey(state, key));
  }, []);

  const handleOperatorPress = useCallback((key: OperatorKey) => {
    setCalculatorState((state) => chooseOperator(state, key));
  }, []);

  const handleActionPress = useCallback((key: ActionKey) => {
    if (key === "clear") {
      setCalculatorState(resetCalculator());
      return;
    }

    if (key === "equals") {
      setCalculatorState((state) => pressEquals(state));
    }
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (isEditableTarget(event.target)) {
        return;
      }

      const action = getKeyboardAction(event.key);

      if (!action) {
        return;
      }

      event.preventDefault();

      if (action.type === "number") {
        handleNumberPress(action.key);
        return;
      }

      if (action.type === "operator") {
        handleOperatorPress(action.key);
        return;
      }

      handleActionPress(action.key);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleActionPress, handleNumberPress, handleOperatorPress]);

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
