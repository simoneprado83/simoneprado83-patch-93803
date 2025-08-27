import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import styles from "./SequenciaLogica.module.css";

type Level = "Iniciante" | "Intermediário" | "Avançado";

interface Sequence {
  seq: number[];
  answer: number;
}

// Gera sequência aleatória baseada no nível
function generateSequence(level: Level): Sequence {
  let length, step;
  switch (level) {
    case "Iniciante":
      length = 4;
      step = 1 + Math.floor(Math.random() * 3);
      break;
    case "Intermediário":
      length = 5;
      step = 2 + Math.floor(Math.random() * 4);
      break;
    case "Avançado":
      length = 6;
      step = 1 + Math.floor(Math.random() * 6);
      break;
  }
  const start = 1 + Math.floor(Math.random() * 5);
  const seq = Array.from({ length }, (_, i) => start + i * step);
  return { seq, answer: seq[seq.length - 1] + step };
}

export default function SequenciaLogicaVisual() {
  const levels: Level[] = ["Iniciante", "Intermediário", "Avançado"];
  const [level, setLevel] = useState<Level>("Iniciante");
  const [sequence, setSequence] = useState<Sequence>(generateSequence("Iniciante"));
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glow, setGlow] = useState(false);

  const successSound = useRef(new Audio("/sounds/success.mp3"));
  const failSound = useRef(new Audio("/sounds/fail.mp3"));

  useEffect(() => {
    setSequence(generateSequence(level));
  }, [level]);

  const handleSubmit = () => {
    if (parseInt(input) === sequence.answer) {
      setFeedback("✅ Correto!");
      setGlow(true);
      setShowConfetti(true);
      successSound.current.play();
      setProgress((prev) => prev + 1);

      setTimeout(() => {
        setGlow(false);
        setShowConfetti(false);
        setFeedback("");
        setInput("");
        setSequence(generateSequence(level));
      }, 1500);
    } else {
      setFeedback("❌ Tente novamente!");
      failSound.current.play();
    }
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value as Level);
    setProgress(0);
  };

  const levelColors: Record<Level, string> = {
    "Iniciante": "#60a5fa",
    "Intermediário": "#fbbf24",
    "Avançado": "#f87171"
  };

  return (
    <div
      className={styles.gameCard}
      style={{
        background: levelColors[level],
        transition: "background 0.5s ease",
        boxShadow: glow
          ? "0 0 20px #fff, 0 0 40px #fff"
          : "0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)"
      }}
    >
      {showConfetti && <Confetti numberOfPieces={150} recycle={false} />}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{level} - Sequência Lógica</h3>
        <p className={styles.cardDescription}>
          Aprenda sobre sequências e padrões através de desafios progressivos.
        </p>

        <div className={styles.levelSelector}>
          <label className={styles.label}>Nível:</label>
          <select
            value={level}
            onChange={handleLevelChange}
            className={styles.select}
          >
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        <p className={styles.subtitle}>
          Sequência:{" "}
          {sequence.seq.map((num, idx) => (
            <span
              key={idx}
              style={{
                transition: "all 0.3s ease",
                textShadow: glow ? "0 0 10px #fff, 0 0 20px #fff" : "none"
              }}
            >
              {num}{idx < sequence.seq.length - 1 ? ", " : ""}
            </span>
          ))}
          ?
        </p>

        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite o próximo número"
          className={styles.input}
        />

        <button onClick={handleSubmit} className={styles.button}>
          Conferir
        </button>

        {feedback && (
          <p
            className={`${styles.feedback} ${feedback.includes("✅") ? styles.success : styles.fail}`}
          >
            {feedback}
          </p>
        )}

        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${(progress % 5) * 20}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
