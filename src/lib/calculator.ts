export type NumberKey = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ".";
export type OperatorKey = "add" | "subtract" | "multiply" | "divide";

export type CalculatorState = {
  currentEntry: string;
  pendingOperator: OperatorKey | null;
  previousValue: string | null;
  waitingForNextEntry: boolean;
};

export const initialCalculatorState: CalculatorState = {
  currentEntry: "",
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

export function appendNumberKey(state: CalculatorState, key: NumberKey): CalculatorState {
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
  if (state.pendingOperator && state.waitingForNextEntry) {
    return {
      ...state,
      pendingOperator: operator,
    };
  }

  return {
    currentEntry: "",
    pendingOperator: operator,
    previousValue: state.currentEntry || state.previousValue || "0",
    waitingForNextEntry: true,
  };
}

export function getDisplayValues(state: CalculatorState) {
  const runningResult =
    state.previousValue && state.pendingOperator
      ? `${state.previousValue} ${operatorSymbols[state.pendingOperator]}`
      : state.previousValue;

  return {
    currentEntry: state.currentEntry,
    runningResult,
  };
}
