import { useState } from "react";
import './App.css';

const keys = [
  "1A", "2A", "3A", "4A", "5A", "6A", "7A", "8A", "9A", "10A", "11A", "12A",
  "1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B", "9B", "10B", "11B", "12B",
];

const mixTable = {};
keys.forEach((key) => {
  const number = parseInt(key.slice(0, -1));
  const letter = key[key.length - 1];

  const prev = ((number + 10) % 12) + 1;
  const next = (number % 12) + 1;
  const energy = ((number + 1) % 12) + 1;
  const diagonal = letter === "A" ? `${number}B` : `${number}A`;
  const scale = letter === "A" ? `${number}B` : `${number}A`;
  const jaws = letter === "A" ? `${((number + 4) % 12) + 1}A` : `${((number + 4) % 12) + 1}B`;
  const mood = letter === "A" ? `${((number + 2) % 12) + 1}B` : `${((number + 2) % 12) + 1}A`;

  mixTable[key] = {
    "Mixagem Perfeita": `${((number + 10) % 12) + 1}${letter}`,
    "-1 Mix": letter === "A" ? `${prev}A` : `${prev}B`,
    "+1 Mix": letter === "A" ? `${next}A` : `${next}B`,
    "Impulso de Energia": letter === "A" ? `${energy}A` : `${energy}B`,
    "Mudança de Escala": scale,
    "Mixagem Diagonal": diagonal,
    "Mixagem Jaw": jaws,
    "Mudança de Humor": mood
  };
});

export default function App() {
  const [selectedKey, setSelectedKey] = useState(null);

  return (
    <div className="app">
      <h1>Camelot Mix Helper</h1>
      <div className="keys">
        {keys.map((key) => (
          <button
            key={key}
            className={`key ${selectedKey === key ? "active" : ""}`}
            onClick={() => setSelectedKey(key)}
          >
            {key}
          </button>
        ))}
      </div>
      {selectedKey && (
        <div className="results">
          <h2>Mixagens para {selectedKey}</h2>
          <ul>
            {Object.entries(mixTable[selectedKey]).map(([label, value]) => (
              <li key={label}><strong>{label}:</strong> {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
