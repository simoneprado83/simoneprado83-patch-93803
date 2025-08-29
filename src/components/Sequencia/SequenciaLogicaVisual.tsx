import React from 'react';
import { useState } from "react";
import styles from "./SequenciaLogica.module.css";

// Definindo tipos para as formas e padrões
type ShapeType = "square" | "circle" | "triangle";

interface PatternItem {
  color: string;
  shape?: ShapeType;
}

interface Pattern {
  level: number;
  sequence: (string | PatternItem)[];
  missing: number;
  options: (string | PatternItem)[];
  correct: string | PatternItem;
  explanation: string;
}

// Dados dos padrões do jogo
const patterns: Pattern[] = [
  {
    level: 1,
    sequence: ["blue1", "blue2", "blue1", "blue2", "blue1"],
    missing: 4,
    options: ["blue1", "blue2", "blue3"],
    correct: "blue2",
    explanation: "Este é um padrão alternado: azul escuro, azul claro..."
  },
  {
    level: 1,
    sequence: ["blue1", "blue1", "blue2", "blue2", "blue1"],
    missing: 4,
    options: ["blue1", "blue2", "blue3"],
    correct: "blue1",
    explanation: "Padrão de repetição: cada cor aparece duas vezes seguidas."
  },
  {
    level: 2,
    sequence: [
      { color: "blue2", shape: "square" },
      { color: "blue2", shape: "circle" },
      { color: "blue2", shape: "square" },
      { color: "blue2", shape: "circle" },
      { color: "blue2", shape: "square" }
    ],
    missing: 4,
    options: [
      { color: "blue2", shape: "circle" },
      { color: "blue2", shape: "square" },
      { color: "blue1", shape: "circle" }
    ],
    correct: { color: "blue2", shape: "circle" },
    explanation: "As formas alternam: quadrado, círculo, quadrado..."
  },
  {
    level: 3,
    sequence: ["blue1", "blue2", "blue3", "blue4", "blue1"],
    missing: 4,
    options: ["blue1", "blue2", "blue3"],
    correct: "blue2",
    explanation: "Sequência crescente de tons: do mais escuro ao mais claro."
  }
];

const SequenciaLogica: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "answered" | "finished">("playing");
  const [feedback, setFeedback] = useState("");
  const [explanation, setExplanation] = useState("");

  const currentPattern = patterns[currentPatternIndex];

  // Função para criar o elemento da forma (div)
  function createShape(item: string | PatternItem, isMissing = false, isCorrect = false) {
    let classes = styles.shape;
    let content = "";

    if (isMissing) {
      classes += ` ${styles.missing}`;
      content = "?";
    } else if (typeof item === "string") {
      classes += ` ${styles[item]}`;
      content = "■";
    } else {
      classes += ` ${styles[item.color]}`;
      if (item.shape) {
        classes += ` ${styles[item.shape]}`;
        content = item.shape === "circle" ? "●" : item.shape === "square" ? "■" : "";
      } else {
        content = "■"; // Default para quadrado
      }
    }

    return <div className={classes}>{content}</div>;
  }

  // Lidar com a seleção de uma opção
  function handleSelect(option: string | PatternItem) {
    if (gameState !== "playing") return;

    setTotalQuestions(prev => prev + 1);

    const isCorrect = JSON.stringify(option) === JSON.stringify(currentPattern.correct);

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setScore(prev => prev + currentPattern.level * 10);
      setFeedback("🎉 Correto! Muito bem!");
      setExplanation(currentPattern.explanation);
    } else {
      setFeedback("❌ Ops! Tente observar o padrão novamente.");
      setExplanation(currentPattern.explanation);
    }
    setGameState("answered");
  }

  // Passar para o próximo padrão
  function nextPattern() {
    if (currentPatternIndex + 1 >= patterns.length) {
      setFeedback(
        `🏆 Parabéns! Você completou todos os padrões!\nPrecisão: ${Math.round(
          (correctAnswers / totalQuestions) * 100
        )}%\nPontuação final: ${score} pontos`
      );
      setGameState("finished");
      return;
    }

    const newLevel = patterns[currentPatternIndex + 1].level;
    if (newLevel > currentLevel) {
      setFeedback(`🎊 Nível ${newLevel} desbloqueado!`);
      setCurrentLevel(newLevel);
    } else {
      setFeedback("");
    }

    setCurrentPatternIndex(prev => prev + 1);
    setGameState("playing");
    setExplanation("");
  }

  // Reiniciar o jogo
  function restartGame() {
    setCurrentPatternIndex(0);
    setCurrentLevel(1);
    setScore(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
    setGameState("playing");
    setFeedback("");
    setExplanation("");
  }

  const isGameFinished = gameState === "finished";

  return (
    <div className={styles["game-container"]}>
      <h1>🧩 Sequências e Padrões</h1>
      <p className={styles.subtitle}>Complete a sequência com a forma correta!</p>

      <div className={styles["score-board"]}>
        <div className={styles.score}>Pontos: {score}</div>
        <div className={styles.level}>Nível {currentLevel}</div>
        <div className={styles.score}>Acertos: {correctAnswers}/{totalQuestions}</div>
      </div>

      <div className={styles["pattern-display"]}>
        <div className={styles["pattern-title"]}>Qual é o próximo?</div>
        <div className={styles.sequence}>
          {currentPattern.sequence.map((item, idx) =>
            <div key={idx}>
              {idx === currentPattern.missing && gameState === "answered" ? (
                createShape(currentPattern.correct, false, true)
              ) : (
                createShape(item, idx === currentPattern.missing)
              )}
            </div>
          )}
        </div>
        {!isGameFinished && (
          <div className={styles.options}>
            {currentPattern.options.map((opt, idx) => (
              <div
                key={idx}
                className={`${styles.option} ${
                  gameState === "answered" && JSON.stringify(opt) === JSON.stringify(currentPattern.correct)
                    ? styles.correct
                    : ""
                } ${
                  gameState === "answered" && JSON.stringify(opt) !== JSON.stringify(currentPattern.correct)
                    ? styles.incorrect
                    : ""
                }`}
                onClick={() => handleSelect(opt)}
              >
                {createShape(opt)}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`${styles.feedback} ${
          gameState === "answered"
            ? styles.correct
            : ""
        }`}
      >
        {feedback}
      </div>
      {explanation && <div className={styles.explanation}>{explanation}</div>}

      <button
        className={styles["next-button"]}
        onClick={isGameFinished ? restartGame : nextPattern}
        disabled={gameState === "playing" && !isGameFinished}
      >
        {isGameFinished ? "Jogar Novamente" : "Próximo Padrão"}
      </button>
    </div>
  );
};

export default SequenciaLogica;