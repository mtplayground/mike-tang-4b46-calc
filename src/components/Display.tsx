type DisplayProps = {
  currentEntry?: string | null;
  runningResult?: string | null;
};

function normalizeDisplayValue(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : "0";
}

export function Display({ currentEntry, runningResult }: DisplayProps) {
  const entry = normalizeDisplayValue(currentEntry);
  const result = normalizeDisplayValue(runningResult);

  return (
    <div
      className="calculator-display"
      aria-live="polite"
      aria-label={`Result ${result}. Entry ${entry}.`}
    >
      <output className="display-result" title={result}>
        {result}
      </output>
      <output className="display-entry" title={entry}>
        {entry}
      </output>
    </div>
  );
}
