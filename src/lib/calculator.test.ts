import { describe, expect, it } from "vitest";
import {
  appendNumberKey,
  chooseOperator,
  getDisplayValues,
  initialCalculatorState,
  pressEquals,
  resetCalculator,
  type CalculatorState,
  type NumberKey,
  type OperatorKey,
} from "./calculator";

function enterNumber(state: CalculatorState, value: string) {
  return [...value].reduce((nextState, key) => appendNumberKey(nextState, key as NumberKey), state);
}

function calculate(left: string, operator: OperatorKey, right: string) {
  const withLeft = enterNumber(initialCalculatorState, left);
  const withOperator = chooseOperator(withLeft, operator);
  const withRight = enterNumber(withOperator, right);
  return pressEquals(withRight);
}

describe("calculator logic", () => {
  it("adds two values", () => {
    const state = calculate("8", "add", "5");

    expect(getDisplayValues(state).currentEntry).toBe("13");
  });

  it("subtracts two values", () => {
    const state = calculate("8", "subtract", "5");

    expect(getDisplayValues(state).currentEntry).toBe("3");
  });

  it("multiplies two values", () => {
    const state = calculate("8", "multiply", "5");

    expect(getDisplayValues(state).currentEntry).toBe("40");
  });

  it("divides two values", () => {
    const state = calculate("8", "divide", "4");

    expect(getDisplayValues(state).currentEntry).toBe("2");
  });

  it("chains operations by using the last result as the next operand", () => {
    const withLeft = enterNumber(initialCalculatorState, "2");
    const withAdd = chooseOperator(withLeft, "add");
    const withRight = enterNumber(withAdd, "3");
    const withMultiply = chooseOperator(withRight, "multiply");
    const finalState = pressEquals(enterNumber(withMultiply, "4"));

    expect(getDisplayValues(finalState).currentEntry).toBe("20");
  });

  it("handles decimal calculations and ignores extra decimal points", () => {
    const withFirstDecimal = enterNumber(initialCalculatorState, "1.2.3");

    expect(getDisplayValues(withFirstDecimal).currentEntry).toBe("1.23");

    const withOperator = chooseOperator(withFirstDecimal, "add");
    const withSecondDecimal = enterNumber(withOperator, "0.07");
    const finalState = pressEquals(withSecondDecimal);

    expect(getDisplayValues(finalState).currentEntry).toBe("1.3");
  });

  it("resets to the starting display state", () => {
    const calculated = calculate("9", "subtract", "4");
    const reset = resetCalculator();

    expect(getDisplayValues(calculated).currentEntry).toBe("5");
    expect(reset).toEqual(initialCalculatorState);
    expect(getDisplayValues(reset)).toEqual({ currentEntry: "", runningResult: null });
  });

  it("shows a non-crashing divide-by-zero message", () => {
    const state = calculate("8", "divide", "0");

    expect(getDisplayValues(state).currentEntry).toBe("Cannot divide by zero");
    expect(state.errorMessage).toBe("Cannot divide by zero");
    expect(state.pendingOperator).toBeNull();
    expect(state.previousValue).toBeNull();
  });
});
