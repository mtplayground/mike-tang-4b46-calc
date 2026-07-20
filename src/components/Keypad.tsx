import { Button } from "./Button";

export type NumberKey = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ".";
export type OperatorKey = "add" | "subtract" | "multiply" | "divide";
export type ActionKey = "clear" | "equals";

type KeypadProps = {
  onActionPress: (key: ActionKey) => void;
  onNumberPress: (key: NumberKey) => void;
  onOperatorPress: (key: OperatorKey) => void;
};

export function Keypad({ onActionPress, onNumberPress, onOperatorPress }: KeypadProps) {
  return (
    <div className="calculator-keypad" aria-label="Calculator buttons">
      <Button label="Clear" onPress={() => onActionPress("clear")} span="wide" variant="action">
        C
      </Button>
      <Button label="Divide" onPress={() => onOperatorPress("divide")} variant="operator">
        ÷
      </Button>
      <Button label="Multiply" onPress={() => onOperatorPress("multiply")} variant="operator">
        ×
      </Button>

      <Button label="Digit 7" onPress={() => onNumberPress("7")}>
        7
      </Button>
      <Button label="Digit 8" onPress={() => onNumberPress("8")}>
        8
      </Button>
      <Button label="Digit 9" onPress={() => onNumberPress("9")}>
        9
      </Button>
      <Button label="Subtract" onPress={() => onOperatorPress("subtract")} variant="operator">
        −
      </Button>

      <Button label="Digit 4" onPress={() => onNumberPress("4")}>
        4
      </Button>
      <Button label="Digit 5" onPress={() => onNumberPress("5")}>
        5
      </Button>
      <Button label="Digit 6" onPress={() => onNumberPress("6")}>
        6
      </Button>
      <Button label="Add" onPress={() => onOperatorPress("add")} variant="operator">
        +
      </Button>

      <Button label="Digit 1" onPress={() => onNumberPress("1")}>
        1
      </Button>
      <Button label="Digit 2" onPress={() => onNumberPress("2")}>
        2
      </Button>
      <Button label="Digit 3" onPress={() => onNumberPress("3")}>
        3
      </Button>
      <Button label="Equals" onPress={() => onActionPress("equals")} span="tall" variant="equals">
        =
      </Button>

      <Button label="Digit 0" onPress={() => onNumberPress("0")} span="wide">
        0
      </Button>
      <Button label="Decimal point" onPress={() => onNumberPress(".")}>
        .
      </Button>
    </div>
  );
}
