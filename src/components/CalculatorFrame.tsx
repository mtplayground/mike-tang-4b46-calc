import { Display } from "./Display";

const keySlots = Array.from({ length: 20 }, (_, index) => index);

export function CalculatorFrame() {
  return (
    <section className="calculator-frame" aria-label="Calculator">
      <Display />
      <div className="calculator-keypad" aria-label="Button grid">
        {keySlots.map((slot) => (
          <span className="calculator-key-slot" key={slot} aria-hidden="true" />
        ))}
      </div>
    </section>
  );
}
