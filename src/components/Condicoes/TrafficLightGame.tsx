import  { useState, useCallback } from "react";
import styles from "./TrafficLightGame.module.css";

// Definição do tipo para um cenário, garantindo tipagem segura
interface Scenario {
  title: string;
  condition: string;
  description: string;
  correctAnswer: "red" | "yellow" | "green";
  explanation: string;
  codeExplanation: string;
}

// Dados dos cenários do jogo
const scenarios: Scenario[] = [
  {
    title: "Cenário 1: Hora do Rush",
    condition: `SE (hora_do_dia === "manhã" && trafego === "intenso") {
  // Qual sinal escolher?
}`,
    description: "É 8h da manhã e o trânsito está muito intenso. Muitos carros precisam passar.",
    correctAnswer: "green",
    explanation:
      "Verde é correto! Durante o rush matinal com tráfego intenso, precisamos deixar os carros passarem para evitar congestionamentos.",
    codeExplanation: `if (hora_do_dia === 'manhã' && trafego === 'intenso') {
  sinal = 'verde'; // Permite passagem
}`,
  },
  {
    title: "Cenário 2: Pedestres Esperando",
    condition: `SE (pedestres_esperando === true && tempo_verde > 60) {
  // Qual sinal escolher?
}`,
    description: "Há pedestres esperando há mais de 1 minuto e o sinal está verde há muito tempo.",
    correctAnswer: "red",
    explanation:
      "Vermelho é correto! Quando pedestres esperam muito tempo, devemos parar o tráfego para eles atravessarem.",
    codeExplanation: `if (pedestres_esperando === true && tempo_verde > 60) {
  sinal = 'vermelho'; // Para dar passagem aos pedestres
}`,
  },
  {
    title: "Cenário 3: Mudança de Sinal",
    condition: `SE (sinal_atual === "verde" && precisa_mudar === true) {
  // Qual sinal escolher?
}`,
    description: "O sinal está verde mas precisa mudar. Há carros se aproximando do cruzamento.",
    correctAnswer: "yellow",
    explanation:
      "Amarelo é correto! O amarelo serve como aviso de transição entre verde e vermelho, dando tempo para os carros pararem com segurança.",
    codeExplanation: `if (sinal_atual === 'verde' && precisa_mudar === true) {
  sinal = 'amarelo'; // Transição segura
}`,
  },
  {
    title: "Cenário 4: Emergência",
    condition: `SE (veiculo_emergencia === true) {
  // Qual sinal escolher?
}`,
    description: "Uma ambulância está se aproximando do cruzamento com sirene ligada.",
    correctAnswer: "green",
    explanation:
      "Verde é correto! Veículos de emergência têm prioridade absoluta e precisam de passagem livre.",
    codeExplanation: `if (veiculo_emergencia === true) {
  sinal = 'verde'; // Prioridade para emergência
}`,
  },
  {
    title: "Cenário 5: Madrugada",
    condition: `SE (hora_do_dia === "madrugada" && trafego === "baixo") {
  // Qual sinal escolher?
}`,
    description: "São 3h da madrugada, quase não há carros na rua. Um carro solitário se aproxima.",
    correctAnswer: "green",
    explanation:
      "Verde é correto! Durante a madrugada com tráfego baixo, é eficiente manter o fluxo livre para os poucos veículos.",
    codeExplanation: `if (hora_do_dia === 'madrugada' && trafego === 'baixo') {
  sinal = 'verde'; // Fluxo livre
}`,
  },
  {
    title: "Cenário 6: Condição Complexa",
    condition: `SE (chuva === true && visibilidade === "baixa" && velocidade_media > 40) {
  // Qual sinal escolher?
}`,
    description: "Está chovendo, a visibilidade está ruim e os carros estão em velocidade alta.",
    correctAnswer: "red",
    explanation:
      "Vermelho é correto! Com chuva, baixa visibilidade e alta velocidade, é mais seguro parar o tráfego para evitar acidentes.",
    codeExplanation: `if (chuva === true && visibilidade === 'baixa' && velocidade_media > 40) {
  sinal = 'vermelho'; // Segurança em primeiro lugar
}`,
  },
];

export default function TrafficLightGame() {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [chosenLight, setChosenLight] = useState<
    "red" | "yellow" | "green" | null
  >(null);
  const [feedback, setFeedback] = useState<{
    text: string;
    isCorrect: boolean | null;
  } | null>(null);

  const currentScenario = scenarios[currentScenarioIndex];
  const isGameOver = currentScenarioIndex >= scenarios.length;

  // Lógica para escolher o sinal de trânsito
  const chooseLight = useCallback(
    (color: "red" | "yellow" | "green") => {
      if (chosenLight !== null) return; // Evita múltiplas escolhas

      setTotalAnswers((prev) => prev + 1);
      setChosenLight(color);

      const isCorrect = color === currentScenario.correctAnswer;
      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
        setScore((prev) => prev + 10);
        setFeedback({
          text: currentScenario.explanation,
          isCorrect: true,
        });
      } else {
        setFeedback({
          text: `Incorreto! ${currentScenario.explanation}`,
          isCorrect: false,
        });
      }
    },
    [currentScenario, chosenLight]
  );

  // Lógica para avançar para o próximo cenário ou finalizar o jogo
  const nextScenario = useCallback(() => {
    setChosenLight(null);
    setFeedback(null);
    setCurrentScenarioIndex((prev) => prev + 1);
  }, []);

  // Lógica para reiniciar o jogo
  const restartGame = useCallback(() => {
    setCurrentScenarioIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setTotalAnswers(0);
    setChosenLight(null);
    setFeedback(null);
  }, []);

  // Exibição do resultado final
  const renderFinalResults = () => {
    const percentage = Math.round((correctAnswers / totalAnswers) * 100);
    let message = "";

    if (percentage >= 80) {
      message = "Excelente! Você dominou as declarações condicionais!";
    } else if (percentage >= 60) {
      message = "Bom trabalho! Continue praticando as condições.";
    } else {
      message = "Continue estudando! As declarações condicionais são fundamentais.";
    }

    return (
      <div className={styles["final-results"]}>
        <h2 className={styles["final-results-title"]}>Jogo Concluído!</h2>
        <p className={styles["final-results-message"]}>{message}</p>
        <div className={styles["final-results-stats"]}>
          <p>
            Pontuação Final: <strong>{score} pontos</strong>
          </p>
          <p>
            Precisão: <strong>{percentage}%</strong> ({correctAnswers}/{totalAnswers})
          </p>
        </div>
        <button className={styles["next-btn"]} onClick={restartGame}>
          Jogar Novamente
        </button>
      </div>
    );
  };

  return (
    <div className={styles["game-container"]}>
      <h1 className={styles.title}>Sinais e Condições</h1>
      <p className={styles.subtitle}>
        Aprenda declarações condicionais controlando o trânsito!
      </p>

      <div className={styles["score-board"]}>
        <div className={styles.score}>
          Pontuação: <span id="score">{score}</span>
        </div>
        <div className={styles.score}>
          Nível: <span id="level">{currentScenarioIndex + 1}</span>
        </div>
        <div className={styles.score}>
          Acertos:{" "}
          <span id="correct">
            {correctAnswers}/{totalAnswers}
          </span>
        </div>
      </div>

      {isGameOver ? (
        renderFinalResults()
      ) : (
        <div className={styles["game-area"]}>
          <div className={styles["traffic-light"]}>
            <h3>Semáforo</h3>
            <div
              className={`${styles.light} ${styles.red} ${
                chosenLight === "red" ? "" : styles.off
              }`}
            ></div>
            <div
              className={`${styles.light} ${styles.yellow} ${
                chosenLight === "yellow" ? "" : styles.off
              }`}
            ></div>
            <div
              className={`${styles.light} ${styles.green} ${
                chosenLight === "green" ? "" : styles.off
              }`}
            ></div>
          </div>

          <div className={styles.scenario}>
            <h3 id="scenario-title">{currentScenario.title}</h3>
            <div className={styles.condition}>
              <div
                className={styles["condition-text"]}
                dangerouslySetInnerHTML={{
                  __html: currentScenario.condition.replace(/\n/g, "<br>"),
                }}
              />
              <p id="scenario-description">{currentScenario.description}</p>
            </div>
            <div className={styles.buttons}>
              <button
                className={`${styles.btn} ${styles["btn-red"]}`}
                onClick={() => chooseLight("red")}
                disabled={chosenLight !== null}
              >
                Vermelho
              </button>
              <button
                className={`${styles.btn} ${styles["btn-yellow"]}`}
                onClick={() => chooseLight("yellow")}
                disabled={chosenLight !== null}
              >
                Amarelo
              </button>
              <button
                className={`${styles.btn} ${styles["btn-green"]}`}
                onClick={() => chooseLight("green")}
                disabled={chosenLight !== null}
              >
                Verde
              </button>
            </div>
          </div>
        </div>
      )}

      {feedback && (
        <>
          <div
            className={`${styles.feedback} ${
              feedback.isCorrect ? styles.correct : styles.incorrect
            }`}
          >
            {feedback.text}
          </div>
          <div className={styles["code-explanation"]}>
            <strong>Explicação do Código:</strong>
            <pre>
              <span id="explanation-text">{currentScenario.codeExplanation}</span>
            </pre>
          </div>
          <button className={styles["next-btn"]} onClick={nextScenario}>
            Próximo Cenário →
          </button>
        </>
      )}
    </div>
  );
}