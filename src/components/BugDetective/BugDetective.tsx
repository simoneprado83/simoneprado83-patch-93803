import  { useState, useEffect, useCallback } from "react";
import styles from "./BugDetective.module.css";
import { Challenge } from "./types";

const challenges: Challenge[] = [
    {
        title: "Erro de Sintaxe - Ponto e Vírgula",
        difficulty: "easy",
        code: [
            "function somar(a, b) {",
            "   let resultado = a + b",
            "   return resultado;",
            "}"
        ],
        bugLine: 1,
        explanation: "Faltou o ponto e vírgula (;) no final da linha 2. Em JavaScript, embora seja opcional em muitos casos, é uma boa prática sempre usar.",
        hint: "Procure por uma linha que deveria terminar com ponto e vírgula."
    },
    {
        title: "Variável Não Declarada",
        difficulty: "easy",
        code: [
            "function calcular() {",
            "   x = 10;",
            "   let y = 20;",
            "   return x + y;",
            "}"
        ],
        bugLine: 1,
        explanation: "A variável 'x' não foi declarada com 'let', 'const' ou 'var'. Isso pode causar problemas de escopo.",
        hint: "Uma variável está sendo usada sem ser declarada adequadamente."
    },
    {
        title: "Parênteses Não Fechados",
        difficulty: "easy",
        code: [
            "if (idade >= 18 {",
            "   console.log('Maior de idade');",
            "}"
        ],
        bugLine: 0,
        explanation: "Faltou fechar o parênteses na condição do if. Toda abertura de parênteses deve ter seu fechamento correspondente.",
        hint: "Verifique se todos os parênteses estão balanceados."
    },
    {
        title: "Chaves Não Balanceadas",
        difficulty: "easy",
        code: [
            "function exemplo() {",
            "   if (true) {",
            "      console.log('teste');",
            "   }",
            "// Faltou fechar a função"
        ],
        bugLine: 4,
        explanation: "A função não foi fechada com '}'. Toda abertura de chaves deve ter seu fechamento.",
        hint: "Conte as chaves de abertura e fechamento."
    },
    {
        title: "Erro de Comparação",
        difficulty: "medium",
        code: [
            "let senha = '123';",
            "if (senha = '123') {",
            "   console.log('Acesso liberado');",
            "}"
        ],
        bugLine: 1,
        explanation: "Usado '=' (atribuição) ao invés de '==' ou '===' (comparação). O '=' atribui valor, não compara.",
        hint: "Verifique o operador usado na comparação."
    },
    {
        title: "Loop Infinito",
        difficulty: "medium",
        code: [
            "let i = 0;",
            "while (i < 10) {",
            "   console.log(i);",
            "   // i++ está comentado",
            "}"
        ],
        bugLine: 3,
        explanation: "O contador 'i' nunca é incrementado, causando um loop infinito. Faltou 'i++' ou 'i = i + 1'.",
        hint: "O que faz o loop parar de executar?"
    },
    {
        title: "Índice de Array Inválido",
        difficulty: "medium",
        code: [
            "let frutas = ['maçã', 'banana'];",
            "console.log(frutas[2]);",
            "console.log('Fim do programa');"
        ],
        bugLine: 1,
        explanation: "Tentativa de acessar índice 2 em um array que só tem índices 0 e 1. Isso retorna 'undefined'.",
        hint: "Verifique se o índice existe no array."
    },
    {
        title: "Função Não Definida",
        difficulty: "medium",
        code: [
            "function principal() {",
            "   let resultado = calcular(5, 3);",
            "   console.log(resultado);",
            "}"
        ],
        bugLine: 1,
        explanation: "A função 'calcular' está sendo chamada mas não foi definida em lugar nenhum do código.",
        hint: "Uma função está sendo chamada mas não existe."
    },
    {
        title: "Tipo de Dados Incorreto",
        difficulty: "medium",
        code: [
            "let idade = '25';",
            "let proximoAno = idade + 1;",
            "console.log(proximoAno);"
        ],
        bugLine: 1,
        explanation: "A idade está como string ('25'), então '25' + 1 = '251' (concatenação) ao invés de 26 (soma). Use parseInt() ou Number().",
        hint: "Verifique o tipo da variável antes de fazer operações matemáticas."
    },
    {
        title: "Escopo de Variável",
        difficulty: "hard",
        code: [
            "function teste() {",
            "   if (true) {",
            "      var x = 10;",
            "   }",
            "   console.log(x);",
            "}"
        ],
        bugLine: 2,
        explanation: "Embora funcione com 'var', é melhor usar 'let' para escopo de bloco. Com 'var', a variável vaza do bloco if.",
        hint: "Pense sobre o escopo da variável declarada dentro do if."
    },
    {
        title: "Callback Assíncrono",
        difficulty: "hard",
        code: [
            "function buscarDados() {",
            "   setTimeout(() => {",
            "      return 'dados';",
            "   }, 1000);",
            "}"
        ],
        bugLine: 2,
        explanation: "O return dentro do setTimeout não retorna para a função buscarDados. Funções assíncronas precisam de callbacks ou Promises.",
        hint: "O return está no lugar certo para uma função assíncrona?"
    },
    {
        title: "Mutação de Const",
        difficulty: "medium",
        code: [
            "const PI = 3.14;",
            "PI = 3.14159;",
            "console.log(PI);"
        ],
        bugLine: 1,
        explanation: "Tentativa de reatribuir valor a uma constante. Variáveis 'const' não podem ser reatribuídas após a declaração.",
        hint: "Uma constante está sendo modificada."
    },
    {
        title: "Método de Array Incorreto",
        difficulty: "medium",
        code: [
            "let numeros = [1, 2, 3];",
            "numeros.push(4, 5);",
            "let ultimo = numeros.pop(2);",
            "console.log(ultimo);"
        ],
        bugLine: 2,
        explanation: "O método pop() não aceita parâmetros. Ele sempre remove o último elemento. Para remover por índice, use splice().",
        hint: "Verifique se o método está sendo usado corretamente."
    },
    {
        title: "Condição Sempre Falsa",
        difficulty: "hard",
        code: [
            "let x = 5;",
            "if (x > 10 && x < 3) {",
            "   console.log('Impossível');",
            "}"
        ],
        bugLine: 1,
        explanation: "A condição 'x > 10 && x < 3' nunca pode ser verdadeira. Um número não pode ser maior que 10 E menor que 3 ao mesmo tempo.",
        hint: "Analise se a condição lógica faz sentido."
    },
    {
        title: "Referência Circular",
        difficulty: "hard",
        code: [
            "let obj1 = { nome: 'A' };",
            "let obj2 = { nome: 'B' };",
            "obj1.ref = obj2;",
            "obj2.ref = obj1;",
            "console.log(JSON.stringify(obj1));"
        ],
        bugLine: 4,
        explanation: "JSON.stringify() falha com referências circulares. Os objetos se referenciam mutuamente, criando um loop infinito.",
        hint: "Há uma referência circular que pode causar problemas."
    },
    {
        title: "Hoisting Problemático",
        difficulty: "hard",
        code: [
            "console.log(minhaVar);",
            "var minhaVar = 'Olá';"
        ],
        bugLine: 0,
        explanation: "Devido ao hoisting, 'var' é elevada mas não inicializada, resultando em 'undefined'. Use 'let' ou declare antes de usar.",
        hint: "A variável está sendo usada antes de ser inicializada."
    },
    {
        title: "Closure Incorreto",
        difficulty: "hard",
        code: [
            "for (var i = 0; i < 3; i++) {",
            "   setTimeout(() => {",
            "      console.log(i);",
            "   }, 100);",
            "}"
        ],
        bugLine: 0,
        explanation: "Todas as funções setTimeout compartilham a mesma variável 'i'. Use 'let' ao invés de 'var' para criar escopo de bloco.",
        hint: "Todas as funções estão capturando a mesma variável."
    },
    {
        title: "Divisão por Zero",
        difficulty: "easy",
        code: [
            "function dividir(a, b) {",
            "   return a / b;",
            "}",
            "console.log(dividir(10, 0));"
        ],
        bugLine: 1,
        explanation: "Não há verificação para divisão por zero. Embora JavaScript retorne 'Infinity', é boa prática verificar.",
        hint: "O que acontece quando o divisor é zero?"
    },
    {
        title: "String Template Incorreta",
        difficulty: "medium",
        code: [
            "let nome = 'João';",
            "let idade = 25;",
            "let msg = 'Olá ${nome}, você tem ${idade} anos';",
            "console.log(msg);"
        ],
        bugLine: 2,
        explanation: "Para usar template literals (${variável}), deve-se usar crases (`) ao invés de aspas simples (').",
        hint: "O tipo de aspas usado está correto para template literals?"
    },
    {
        title: "Modificação Durante Iteração",
        difficulty: "hard",
        code: [
            "let array = [1, 2, 3, 4, 5];",
            "for (let i = 0; i < array.length; i++) {",
            "   if (array[i] % 2 === 0) {",
            "      array.splice(i, 1);",
            "   }",
            "}"
        ],
        bugLine: 3,
        explanation: "Modificar um array durante a iteração pode pular elementos. Quando remove um item, os índices mudam mas o loop continua.",
        hint: "O que acontece com os índices quando você remove um elemento?"
    }
];

export default function BugDetective() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" | "info" | null }>({
    message: "",
    type: null,
  });

  const currentChallenge = challenges[currentChallengeIndex];

  // Função para lidar com a seleção da linha
  const selectLine = useCallback((lineIndex: number) => {
    setSelectedLine(lineIndex);
    // Limpa o feedback ao selecionar uma nova linha
    setFeedback({ message: "", type: null });
  }, []);

  // Função para verificar a resposta
  const checkAnswer = useCallback(() => {
    if (selectedLine === null) {
      setFeedback({ message: "Selecione uma linha primeiro!", type: "info" });
      return;
    }

    if (selectedLine === currentChallenge.bugLine) {
      let points = 0;
      switch (currentChallenge.difficulty) {
        case "easy":
          points = 10;
          break;
        case "medium":
          points = 20;
          break;
        case "hard":
          points = 30;
          break;
      }
      
      if (hintUsed) {
        points = Math.floor(points * 0.7);
      }

      setScore(prevScore => prevScore + points);
      setCorrectAnswers(prevAnswers => prevAnswers + 1);
      setFeedback({
        message: `Correto! +${points} pontos`,
        type: "success",
      });
      setHintUsed(false);
    } else {
      setFeedback({
        message: "Incorreto! Tente novamente.",
        type: "error",
      });
    }
  }, [selectedLine, currentChallenge, hintUsed]);

  // Função para exibir a dica
  const showHint = useCallback(() => {
    setFeedback({
      message: `Dica: ${currentChallenge.hint}`,
      type: "info",
    });
    setHintUsed(true);
  }, [currentChallenge]);

  // Função para avançar para o próximo desafio
  const nextChallenge = useCallback(() => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prevIndex => prevIndex + 1);
      setSelectedLine(null);
      setFeedback({ message: "", type: null });
      setHintUsed(false);
    } else {
      setFeedback({
        message: `Parabéns! Você completou todos os desafios! Pontuação final: ${score}`,
        type: "success",
      });
    }
  }, [currentChallengeIndex, score]);
  
  // Efeito para resetar a seleção quando o desafio muda
  useEffect(() => {
    setSelectedLine(null);
    setFeedback({ message: "", type: null });
    setHintUsed(false);
  }, [currentChallengeIndex]);

  // Renderização
  const difficultyText = currentChallenge.difficulty === 'easy' ? 'Fácil' :
                        currentChallenge.difficulty === 'medium' ? 'Médio' : 'Difícil';
  const progress = ((currentChallengeIndex + 1) / challenges.length) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Detetive de Bugs</h1>
        <p>Encontre e corrija os erros no código para se tornar um verdadeiro detetive!</p>
        <div className={styles.stats}>
          <div className={styles['stat-item']}>
            <span>Desafio: </span>
            <span>{currentChallengeIndex + 1}</span>/{challenges.length}
          </div>
          <div className={styles['stat-item']}>
            <span>Pontos: </span>
            <span>{score}</span>
          </div>
          <div className={styles['stat-item']}>
            <span>Acertos: </span>
            <span>{correctAnswers}</span>
          </div>
        </div>
        <div className={styles['progress-bar']}>
          <div className={styles['progress-fill']} style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className={styles['game-area']}>
        <div className={styles['challenge-header']}>
          <div className={styles['challenge-title']}>{currentChallenge.title}</div>
          <div className={`${styles.difficulty} ${styles[currentChallenge.difficulty]}`}>
            {difficultyText}
          </div>
        </div>

        {feedback.type && (
          <div className={`${styles.feedback} ${styles[feedback.type]}`}>
            {feedback.message}
          </div>
        )}

        <div className={styles['code-container']}>
          {currentChallenge.code.map((line, index) => (
            <div
              key={index}
              onClick={() => selectLine(index)}
              className={`${styles['code-line']} ${
                selectedLine === index && (
                  feedback.type === "success"
                    ? styles.correct
                    : feedback.type === "error"
                    ? styles.incorrect
                    : styles.selected
                )
              }`}
            >
              <span className={styles['line-numbers']}>{index + 1}</span>
              <span>{line}</span>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <button className={`${styles.btn} ${styles['btn-primary']}`} onClick={checkAnswer}>
            Verificar Bug
          </button>
          <button className={`${styles.btn} ${styles['btn-secondary']}`} onClick={showHint}>
            Dica
          </button>
          <button className={`${styles.btn} ${styles['btn-success']}`} onClick={nextChallenge}>
            Próximo Desafio
          </button>
        </div>

        {feedback.type === "success" && (
          <div className={styles.explanation}>
            <h4>Explicação:</h4>
            <p>{currentChallenge.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}