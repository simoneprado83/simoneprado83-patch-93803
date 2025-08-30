import React, { useState, useEffect, DragEvent } from 'react';
import styles from './CodePuzzle.module.css'; // ✨ Importe como um módulo CSS
import { Challenge } from './types'; // A interface 'Challenge' permanece a mesma

const challenges: Challenge[] = [
  {
    description: "Crie um programa que exibe 'Olá, Mundo!' na tela",
    blocks: ["print('Olá, Mundo!')", "# Meu primeiro programa", "# Fim do programa"],
    solution: ["# Meu primeiro programa", "print('Olá, Mundo!')", "# Fim do programa"],
  },
  {
    description: "Crie uma variável chamada 'nome' e exiba seu valor",
    blocks: ["print(nome)", "nome = 'João'", "# Trabalhando com variáveis"],
    solution: ["# Trabalhando com variáveis", "nome = 'João'", "print(nome)"],
  },
  {
    description: "Faça um programa que soma dois números",
    blocks: ["resultado = a + b", "print(resultado)", "a = 5", "b = 3"],
    solution: ["a = 5", "b = 3", "resultado = a + b", "print(resultado)"],
  },
  {
    description: "Crie um loop que conta de 1 a 3",
    blocks: ["for i in range(1, 4):", "  print(i)", "# Loop simples"],
    solution: ["# Loop simples", "for i in range(1, 4):", "  print(i)"],
  },
];

const PuzzlePage: React.FC = () => {
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(challenges[0]);
  const [userSolution, setUserSolution] = useState<string[]>([]);
  const [shuffledBlocks, setShuffledBlocks] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    loadChallenge();
  }, [level]);

  const loadChallenge = () => {
    const challenge = challenges[level - 1];
    if (challenge) {
      setCurrentChallenge(challenge);
      setUserSolution(Array(challenge.solution.length).fill(''));
      setShuffledBlocks([...challenge.blocks].sort(() => Math.random() - 0.5));
    } else {
      setIsCorrect(true);
      setIsModalOpen(true);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, block: string) => {
    setDraggedItem(block);
    e.dataTransfer.setData('text/plain', block);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, position: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newSolution = [...userSolution];
    newSolution[position] = draggedItem;
    setUserSolution(newSolution);

    setShuffledBlocks(shuffledBlocks.filter(block => block !== draggedItem));
    setDraggedItem(null);
  };

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
};

export default PuzzlePage;