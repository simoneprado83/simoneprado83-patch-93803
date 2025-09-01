import React, { useState, useEffect, useCallback } from "react";
import styles from "./CodePuzzle.module.css";
import { Challenge } from "./types";

// Dados de exemplo para os desafios do jogo
const challenges: Challenge[] = [
  {
    description: "Crie uma variável 'x' e atribua o valor 10.",
    solution: ["const x = 10;"]
  },
  {
    description: "Crie uma função que retorna a soma de dois números.",
    solution: ["function sum(a, b) {", "return a + b;", "}"]
  },
  {
    description: "Declare um array com os números 1, 2 e 3.",
    solution: ["const numbers = [1, 2, 3];"]
  },
  {
    description: "Declare uma variável 'name' e atribua a string 'Alice'.",
    solution: ["const name = 'Alice';"]
  },
  {
    description: "Crie um objeto 'person' com as propriedades 'name' e 'age'.",
    solution: ["const person = {", "  name: 'Bob',", "  age: 25", "};"]
  },
  {
    description: "Escreva uma instrução 'if' que verifica se 'x' é maior que 5.",
    solution: ["if (x > 5) {", "  // código a ser executado", "}"]
  },
  {
    description: "Crie um loop 'for' que itera de 0 a 4.",
    solution: ["for (let i = 0; i < 5; i++) {", "  // código a ser executado", "}"]
  },
  {
    description: "Crie uma função de seta (arrow function) que retorna 'Hello'.",
    solution: ["const sayHello = () => 'Hello';"]
  },
  {
    description: "Importe o 'useState' do React.",
    solution: ["import { useState } from 'react';"]
  },
  {
    description: "Escreva uma instrução 'switch' para a variável 'day'.",
    solution: ["switch (day) {", "  case 'Mon':", "    // código", "    break;", "}"]
  },
  {
    description: "Crie uma função que recebe um array e retorna o primeiro elemento.",
    solution: ["function getFirstElement(arr) {", "  return arr[0];", "}"]
  },
  {
    description: "Adicione um evento de clique a um botão usando 'onClick'.",
    solution: ["<button onClick={() => {", "  // ação", "}}>Clique</button>"]
  },
  {
    description: "Use o método 'map' para criar um novo array de números duplicados.",
    solution: ["const numbers = [1, 2, 3];", "const duplicated = numbers.map(num => num * 2);"]
  },
  {
    description: "Escreva a sintaxe básica de um componente funcional em React.",
    solution: ["function MyComponent() {", "  return (", "    <div>Olá Mundo</div>", "  );", "}"]
  },
  {
    description: "Declare uma variável booleana 'isLoggedIn' e defina como 'true'.",
    solution: ["const isLoggedIn = true;"]
  },
  {
    description: "Use o operador de 'spread' para combinar dois arrays.",
    solution: ["const arr1 = [1, 2];", "const arr2 = [3, 4];", "const combined = [...arr1, ...arr2];"]
  },
  {
    description: "Escreva uma instrução 'if/else' que verifica se 'age' é maior ou igual a 18.",
    solution: ["if (age >= 18) {", "  // maior de idade", "} else {", "  // menor de idade", "}"]
  },
  {
    description: "Crie um loop 'while' que executa enquanto 'count' for menor que 3.",
    solution: ["let count = 0;", "while (count < 3) {", "  count++;", "}"]
  },
  {
    description: "Use a desestruturação de objeto para extrair 'name' e 'age'.",
    solution: ["const person = { name: 'Dan', age: 30 };", "const { name, age } = person;"]
  },
  {
    description: "Crie uma função assíncrona 'fetchData'.",
    solution: ["async function fetchData() {", "  // código assíncrono", "}"]
  },
  {
    description: "Use o operador ternário para atribuir um valor com base em uma condição.",
    solution: ["const status = isLoggedIn ? 'Online' : 'Offline';"]
  },
  {
    description: "Declare uma classe 'Carro' com um construtor que recebe 'marca'.",
    solution: ["class Carro {", "  constructor(marca) {", "    this.marca = marca;", "  }", "}"]
  },
  {
    description: "Use 'useEffect' para executar um efeito quando o componente for montado.",
    solution: ["useEffect(() => {", "  // código do efeito", "}, []);"]
  },
  {
    description: "Declare um objeto vazio 'user'.",
    solution: ["const user = {};"]
  },
  {
    description: "Crie uma função 'multiply' que retorna a multiplicação de dois números.",
    solution: ["function multiply(a, b) {", "  return a * b;", "}"]
  },
  {
    description: "Use o método 'filter' para obter apenas os números pares de um array.",
    solution: ["const numbers = [1, 2, 3, 4, 5];", "const even = numbers.filter(num => num % 2 === 0);"]
  },
  {
    description: "Crie uma instrução 'try...catch' para lidar com erros.",
    solution: ["try {", "  // código que pode causar erro", "} catch (error) {", "  // código para lidar com o erro", "}"]
  },
  {
    description: "Declare uma variável com 'let' e reatribua um novo valor a ela.",
    solution: ["let count = 5;", "count = 10;"]
  },
  {
    description: "Crie uma função que aceita um array de strings e as junta em uma única string.",
    solution: ["function joinStrings(arr) {", "  return arr.join(' ');", "}"]
  },
  {
    description: "Use 'const' para declarar uma variável que não pode ser reatribuída.",
    solution: ["const PI = 3.14159;"]
  }
];

export default function PuzzlePage() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(challenges[0]);
  const [shuffledBlocks, setShuffledBlocks] = useState<string[]>([]);
  const [userSolution, setUserSolution] = useState<string[]>([]);
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);

  // Use useCallback para memorizar a função e evitar o aviso do React
  const loadChallenge = useCallback(() => {
    const newChallenge = challenges[level - 1];
    setCurrentChallenge(newChallenge);
    const shuffled = [...newChallenge.solution].sort(() => Math.random() - 0.5);
    setShuffledBlocks(shuffled);
    setUserSolution(Array(newChallenge.solution.length).fill(null));
  }, [level]); // A dependência de loadChallenge é o 'level'

  // Carrega o desafio inicial quando o componente é montado ou o nível muda
  useEffect(() => {
    loadChallenge();
  }, [loadChallenge]); // Adicione loadChallenge como dependência

  // Funções de Drag and Drop
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, block: string) => {
    setDraggedBlock(block);
    e.dataTransfer.setData("text/plain", block);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    e.preventDefault();
    if (draggedBlock) {
      const newUserSolution = [...userSolution];
      newUserSolution[position] = draggedBlock;
      setUserSolution(newUserSolution);
      setShuffledBlocks(shuffledBlocks.filter(block => block !== draggedBlock));
      setDraggedBlock(null);
    }
  };

  // Funções de Lógica do Jogo
  const checkSolution = () => {
    const correct = userSolution.every((code, index) => code === currentChallenge.solution[index]);
    setIsCorrect(correct);
    setIsModalOpen(true);
    if (correct) {
      setScore(score + level * 100);
    }
  };

  const nextLevel = () => {
    setIsModalOpen(false);
    if (isCorrect && level < challenges.length) {
      setLevel(level + 1);
    } else if (!isCorrect) {
      loadChallenge();
    } else {
      setLevel(1);
      setScore(0);
      loadChallenge();
    }
  };

  // Renderização do JSX
  return (
    <div className={styles['game-container']}>
      <div className={styles['main-content']}>
        {/* Header */}
        <div className={styles['header-section']}>
          <h1 className={styles['header-title']}>CodePuzzle</h1>
          <p className={styles['header-subtitle']}>Arraste os blocos de código na ordem correta!</p>
        </div>

        {/* Game Stats */}
        <div className={styles['stats-bar']}>
          <div className={styles['stat-item']}>
            <span className={styles['stat-label']}>Nível:</span>
            <span className={styles['stat-value']}>{level}</span>
          </div>
          <div className={styles['stat-item']}>
            <span className={styles['stat-label']}>Pontos:</span>
            <span className={styles['stat-value']}>{score}</span>
          </div>
        </div>

        {/* Game Area */}
        <div className={styles['game-area']}>
          {/* Challenge Description */}
          <div className={styles['challenge-box']}>
            <h2 className={styles['challenge-title']}>Desafio Atual</h2>
            <p className={styles['challenge-text']}>{currentChallenge.description}</p>
          </div>

          <div className={styles['game-grid']}>
            {/* Code Blocks Pool */}
            <div className={styles['code-blocks-section']}>
              <h3 className={styles['section-title']}>Blocos de Código</h3>
              <div className={styles['code-blocks-list']}>
                {shuffledBlocks.map((block, index) => (
                  <div
                    key={index}
                    className={styles['code-block']}
                    draggable
                    onDragStart={(e) => handleDragStart(e, block)}
                  >
                    {block}
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Area */}
            <div className={styles['solution-area']}>
              <h3 className={styles['section-title']}>Sua Solução</h3>
              <div className={styles['drop-zone-list']}>
                {userSolution.map((block, position) => (
                  <div
                    key={position}
                    className={`${styles['drop-zone']} ${block ? styles.filled : ''}`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, position)}
                  >
                    {block || `Posição ${position + 1}`}
                  </div>
                ))}
              </div>
              <button className={styles['check-button']} onClick={checkSolution}>
                Verificar Solução
              </button>
            </div>
          </div>
        </div>

        {/* Result Modal */}
        {isModalOpen && (
          <div className={styles['modal-overlay']}>
            <div className={styles['modal-content']}>
              {isCorrect && level <= challenges.length ? (
                <div>
                  <h3 className={styles['modal-title']}>Parabéns!</h3>
                  <p className={styles['modal-text']}>Você resolveu o puzzle corretamente!</p>
                  <p className={styles['modal-score']}>+{level * 100} pontos</p>
                  <button className={styles['modal-button']} onClick={nextLevel}>
                    Próximo Nível
                  </button>
                </div>
              ) : isCorrect && level > challenges.length ? (
                <div>
                  <h3 className={styles['modal-title']}>Jogo Completo!</h3>
                  <p className={styles['modal-text']}>Você completou todos os níveis!</p>
                  <p className={styles['modal-score']}>Pontuação Final: {score}</p>
                  <button className={styles['modal-button']} onClick={() => window.location.reload()}>
                    Jogar Novamente
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className={styles['modal-title']}>Quase lá!</h3>
                  <p className={styles['modal-text']}>Verifique a ordem dos blocos e tente novamente.</p>
                  <button className={styles['modal-button']} onClick={nextLevel}>
                    Tentar Novamente
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}