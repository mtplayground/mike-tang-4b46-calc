export type NumberKey = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ".";
export type OperatorKey = "add" | "subtract" | "multiply" | "divide";

export type CalculatorState = {
  currentEntry: string;
  errorMessage: string | null;
  pendingOperator: OperatorKey | null;
  previousValue: string | null;
  waitingForNextEntry: boolean;
};

export const initialCalculatorState: CalculatorState = {
  currentEntry: "",
  errorMessage: null,
  pendingOperator: null,
  previousValue: null,
  waitingForNextEntry: false,
};

const operatorSymbols: Record<OperatorKey, string> = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
};

function formatNumber(value: number) {
  if (Object.is(value, -0)) {
    return "0";
  }

  return Number(value.toPrecision(12)).toString();
}

function calculate(leftValue: string, rightValue: string, operator: OperatorKey) {
  const left = Number(leftValue);
  const right = Number(rightValue);

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return { errorMessage: "Invalid number", result: null };
  }

  if (operator === "divide" && right === 0) {
    return { errorMessage: "Cannot divide by zero", result: null };
  }

  const result = {
    add: left + right,
    subtract: left - right,
    multiply: left * right,
    divide: left / right,
  }[operator];

  return { errorMessage: null, result: formatNumber(result) };
}

export function appendNumberKey(state: CalculatorState, key: NumberKey): CalculatorState {
  if (state.errorMessage) {
    return appendNumberKey(initialCalculatorState, key);
  }

  if (state.waitingForNextEntry) {
    return {
      ...state,
      currentEntry: key === "." ? "0." : key,
      waitingForNextEntry: false,
    };
  }

  if (key === ".") {
    if (state.currentEntry.includes(".")) {
      return state;
    }

    return {
      ...state,
      currentEntry: state.currentEntry.length > 0 ? `${state.currentEntry}.` : "0.",
    };
  }

  return {
    ...state,
    currentEntry: state.currentEntry === "0" ? key : `${state.currentEntry}${key}`,
  };
}

export function chooseOperator(state: CalculatorState, operator: OperatorKey): CalculatorState {
  if (state.errorMessage) {
    return state;
  }

  if (state.pendingOperator && state.waitingForNextEntry) {
    return {
      ...state,
      pendingOperator: operator,
    };
  }

  if (state.pendingOperator && state.previousValue && state.currentEntry) {
    const calculation = calculate(state.previousValue, state.currentEntry, state.pendingOperator);

    if (calculation.errorMessage || calculation.result === null) {
      return {
        ...initialCalculatorState,
        errorMessage: calculation.errorMessage,
        waitingForNextEntry: true,
      };
    }

    return {
      currentEntry: "",
      errorMessage: null,
      pendingOperator: operator,
      previousValue: calculation.result,
      waitingForNextEntry: true,
    };
  }

  return {
    currentEntry: "",
    errorMessage: null,
    pendingOperator: operator,
    previousValue: state.currentEntry || state.previousValue || "0",
    waitingForNextEntry: true,
  };
}

export function pressEquals(state: CalculatorState): CalculatorState {
  if (
    state.errorMessage ||
    !state.pendingOperator ||
    !state.previousValue ||
    !state.currentEntry ||
    state.waitingForNextEntry
  ) {
    return state;
  }

  const calculation = calculate(state.previousValue, state.currentEntry, state.pendingOperator);

  if (calculation.errorMessage || calculation.result === null) {
    return {
      ...initialCalculatorState,
      errorMessage: calculation.errorMessage,
      waitingForNextEntry: true,
    };
  }

  return {
    currentEntry: calculation.result,
    errorMessage: null,
    pendingOperator: null,
    previousValue: calculation.result,
    waitingForNextEntry: true,
  };
}

export function resetCalculator(): CalculatorState {
  return { ...initialCalculatorState };
}

export function getDisplayValues(state: CalculatorState) {
  const runningResult =
    state.previousValue && state.pendingOperator
      ? `${state.previousValue} ${operatorSymbols[state.pendingOperator]}`
      : state.previousValue;

  return {
    currentEntry: state.errorMessage ?? state.currentEntry,
    runningResult,
  };
}
