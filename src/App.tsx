import { CalculatorFrame } from "./components/CalculatorFrame";

export default function App() {
  return (
    <main className="app-shell" aria-labelledby="app-title">
      <h1 id="app-title" className="sr-only">
        Calculator
      </h1>
      <CalculatorFrame />
    </main>
  );
}
