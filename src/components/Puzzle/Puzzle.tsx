import { useState } from "react";

export default function PuzzlePage() {
  // Sequência de números embaralhada
  const [sequencia, setSequencia] = useState([1, 2, 3, 4, 5]);
  const [embaralhada, setEmbaralhada] = useState(
    [...sequencia].sort(() => Math.random() - 0.5)
  );
  const [mensagem, setMensagem] = useState("");

  // Função para trocar posição de elementos
  const trocar = (index1: number, index2: number) => {
    const nova = [...embaralhada];
    [nova[index1], nova[index2]] = [nova[index2], nova[index1]];
    setEmbaralhada(nova);
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

