import  { useState,  useCallback } from "react";
import styles from "./LoopMaze.module.css";

// Definição da interface para os desafios
interface Challenge {
  id: number;
  title: string;
  description: string;
  hint: string;
  solution: string;
  expected: string;
  maze: number[][];
}

// Dados de exemplo para os desafios do jogo
const challenges: Challenge[] = [
  {
    id: 1,
    title: "Loop Básico",
    description: "Use um loop for para imprimir números de 1 a 5",
    hint: "Use: for(let i = 1; i <= 5; i++) { console.log(i); }",
    solution: "for(let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
    expected: "1\n2\n3\n4\n5",
    maze: [[1, 1, 1, 1, 1]],
  },
  {
    id: 2,
    title: "Contagem Regressiva",
    description: "Crie um loop que conte de 10 até 1",
    hint: "Use: for(let i = 10; i >= 1; i--) { console.log(i); }",
    solution: "for(let i = 10; i >= 1; i--) {\n  console.log(i);\n}",
    expected: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1",
    maze: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
  },
  {
    id: 3,
    title: "Números Pares",
    description: "Imprima apenas os números pares de 2 a 10",
    hint: "Use if(i % 2 === 0) dentro do loop",
    solution: "for(let i = 2; i <= 10; i += 2) {\n  console.log(i);\n}",
    expected: "2\n4\n6\n8\n10",
    maze: [[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]],
  },
  {
    id: 4,
    title: "Soma Acumulativa",
    description: "Calcule a soma de 1 + 2 + 3 + 4 + 5",
    hint: "Use uma variável para acumular: let soma = 0;",
    solution:
      "let soma = 0;\nfor(let i = 1; i <= 5; i++) {\n  soma += i;\n}\nconsole.log(soma);",
    expected: "15",
    maze: [[1, 1, 1, 1, 1]],
  },
  {
    id: 5,
    title: "Tabuada do 3",
    description: "Mostre a tabuada do 3 (3x1 até 3x5)",
    hint: "Use: console.log('3 x ' + i + ' = ' + (3 * i));",
    solution:
      "for(let i = 1; i <= 5; i++) {\n  console.log('3 x ' + i + ' = ' + (3 * i));\n}",
    expected: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15",
    maze: [[1, 1, 1, 1, 1]],
  },
  {
    id: 6,
    title: "Loop Aninhado",
    description:
      "Crie um padrão de estrelas (3 linhas, cada uma com 3 estrelas)",
    hint: "Use dois loops for, um dentro do outro",
    solution:
      "for(let i = 1; i <= 3; i++) {\n  let linha = '';\n  for(let j = 1; j <= 3; j++) {\n    linha += '* ';\n  }\n  console.log(linha);\n}",
    expected: "* * * \n* * * \n* * * ",
    maze: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
  },
  {
    id: 7,
    title: "While Loop",
    description: "Use while para contar de 1 a 3",
    hint: "let i = 1; while(i <= 3) { ... i++; }",
    solution: "let i = 1;\nwhile(i <= 3) {\n  console.log(i);\n  i++;\n}",
    expected: "1\n2\n3",
    maze: [[1, 1, 1]],
  },
  {
    id: 8,
    title: "Array com Loop",
    description:
      "Percorra o array ['A', 'B', 'C'] e imprima cada elemento",
    hint: "Use for(let i = 0; i < array.length; i++)",
    solution:
      "let array = ['A', 'B', 'C'];\nfor(let i = 0; i < array.length; i++) {\n  console.log(array[i]);\n}",
    expected: "A\nB\nC",
    maze: [[1, 1, 1]],
  },
  {
    id: 9,
    title: "Fibonacci Simples",
    description: "Gere os primeiros 5 números da sequência Fibonacci",
    hint: "Comece com a = 0, b = 1, depois some os dois anteriores",
    solution:
      "let a = 0, b = 1;\nconsole.log(a);\nconsole.log(b);\nfor(let i = 2; i < 5; i++) {\n  let next = a + b;\n  console.log(next);\n  a = b;\n  b = next;\n}",
    expected: "0\n1\n1\n2\n3",
    maze: [[1, 1, 1, 1, 1]],
  },
  {
    id: 10,
    title: "Desafio Final",
    description: "Crie um padrão triangular crescente de números",
    hint: "Use loops aninhados onde o loop interno vai até o número da linha",
    solution:
      "for(let i = 1; i <= 4; i++) {\n  let linha = '';\n  for(let j = 1; j <= i; j++) {\n    linha += j + ' ';\n  }\n  console.log(linha);\n}",
    expected: "1 \n1 2 \n1 2 3 \n1 2 3 4 ",
    maze: [[1], [1, 1], [1, 1, 1], [1, 1, 1, 1]],
  },
];

export default function LoopMaze() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(
    null
  );
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("Resultado aparecerá aqui...");
  const [outputClass, setOutputClass] = useState("output");
  const [showHint, setShowHint] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(
    new Set()
  );

  // Memoiza a função para que ela só seja recriada quando completedChallenges muda
  const updateProgress = useCallback(() => {
    const progress = (completedChallenges.size / challenges.length) * 100;
    return `${progress}%`;
  }, [completedChallenges]);

  const runCode = () => {
    if (!currentChallenge) return;

    if (!code.trim()) {
      setOutput("Por favor, digite algum código!");
      setOutputClass(`${styles.output} ${styles.error}`);
      return;
    }

    try {
      let result = "";
      const originalLog = console.log;
      console.log = (...args: unknown[]) => {
        result += args.join(" ") + "\n";
      };

      // Executar o código
      eval(code);

      // Restaurar o console.log original
      console.log = originalLog;
      result = result.slice(0, -1);

      if (result === currentChallenge.expected) {
        setOutput("Parabéns! Desafio concluído!\n\nSaída:\n" + result);
        setOutputClass(`${styles.output} ${styles.success}`);
        setCompletedChallenges((prev) => new Set(prev).add(currentChallenge.id));

        if (completedChallenges.size + 1 === challenges.length) {
          setTimeout(() => {
            alert(
              "Parabéns! Você completou todos os desafios do Labirinto de Laços!"
            );
          }, 1000);
        }
      } else {
        setOutput(
          "Não está correto ainda. Tente novamente!\n\nSua saída:\n" +
            result +
            "\n\nEsperado:\n" +
            currentChallenge.expected
        );
        setOutputClass(`${styles.output} ${styles.error}`);
      }
    }  catch (error: unknown) { // CORREÇÃO: Usamos 'unknown' aqui
      if (error instanceof Error) { // CORREÇÃO: Verificamos se é um objeto Error
        setOutput(`Erro no código: ${error.message}`);
      } else {
        setOutput(`Ocorreu um erro desconhecido.`);
      }
      setOutputClass(`${styles.output} ${styles.error}`);
    }
  };

  const startChallenge = (id: number) => {
    const challenge = challenges.find((c) => c.id === id);
    setCurrentChallenge(challenge || null);
    setCode("");
    setOutput("Resultado aparecerá aqui...");
    setOutputClass(styles.output);
    setShowHint(false);
  };

  const resetLevel = () => {
    setCode("");
    setOutput("Resultado aparecerá aqui...");
    setOutputClass(styles.output);
    setShowHint(false);
  };

  const backToMenu = () => {
    setCurrentChallenge(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Labirinto de Laços</h1>
        <p className={styles.headerSubtitle}>
          Domine a arte dos loops e desenvolva sua lógica de programação!
        </p>
      </div>

      <div className={styles.gameArea}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: updateProgress() }}
          ></div>
        </div>

        {!currentChallenge && (
          <div className={styles.levelSelector}>
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`${styles.levelCard} ${
                  completedChallenges.has(challenge.id) ? styles.completed : ""
                }`}
                onClick={() => startChallenge(challenge.id)}
              >
                <h3 className={styles.levelCardTitle}>Nível {challenge.id}</h3>
                <p className={styles.levelCardDescription}>
                  {challenge.title}
                </p>
                {completedChallenges.has(challenge.id) && (
                  <div className={styles.levelCardCompleted}>Concluído</div>
                )}
              </div>
            ))}
          </div>
        )}

        {currentChallenge && (
          <div className={styles.challengeArea}>
            <div className={styles.challengeHeader}>
              <h2 className={styles.challengeTitle}>
                Nível {currentChallenge.id}: {currentChallenge.title}
              </h2>
              <p className={styles.challengeDescription}>
                {currentChallenge.description}
              </p>
            </div>

            <div
              className={styles.mazeVisual}
              style={{
                gridTemplateColumns: `repeat(${currentChallenge.maze[0].length}, 30px)`,
              }}
            >
              {currentChallenge.maze.map((row, i) =>
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className={`${styles.mazeCell} ${
                      cell === 1 ? styles.path : styles.wall
                    } ${
                      i === 0 && j === 0 && cell === 1 ? styles.start : ""
                    } ${
                      i === currentChallenge.maze.length - 1 &&
                      j === row.length - 1 &&
                      cell === 1
                        ? styles.end
                        : ""
                    }`}
                  >
                    {i === 0 && j === 0 && cell === 1 && "S"}
                    {i === currentChallenge.maze.length - 1 &&
                      j === row.length - 1 &&
                      cell === 1 &&
                      "F"}
                  </div>
                ))
              )}
            </div>

            {showHint && (
              <div className={styles.hint}>Dica: {currentChallenge.hint}</div>
            )}

            <div className={styles.codeEditor}>
              <textarea
                className={styles.codeInput}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Digite seu código aqui..."
              ></textarea>
            </div>

            <div className={styles.buttons}>
              <button className={styles.btnPrimary} onClick={runCode}>
                Executar Código
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => setShowHint(true)}
              >
                Dica
              </button>
              <button className={styles.btnSecondary} onClick={resetLevel}>
                Reiniciar
              </button>
              <button className={styles.btnSecondary} onClick={backToMenu}>
                Voltar
              </button>
            </div>

            <pre className={outputClass}>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}