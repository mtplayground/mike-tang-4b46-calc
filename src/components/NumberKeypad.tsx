import { Button } from "./Button";

export type NumberKey = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ".";

const numberKeys: NumberKey[] = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];

function getKeyLabel(key: NumberKey) {
  return key === "." ? "Decimal point" : `Digit ${key}`;
}

export function NumberKeypad({ onNumberPress }: { onNumberPress: (key: NumberKey) => void }) {
  return (
    <div className="calculator-keypad" aria-label="Number buttons">
      {numberKeys.map((key) => (
        <Button key={key} label={getKeyLabel(key)} onPress={() => onNumberPress(key)}>
          {key}
        </Button>
      ))}
    </div>
  );
}
