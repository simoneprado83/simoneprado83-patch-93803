// src/components/Games/GamesSection.tsx
import React from 'react';
import styles from './Games.module.css';

// Defina as props se o componente precisar de dados externos
interface GamesSectionProps {
  playGame: (gameType: string) => void;
}

const GamesSection: React.FC<GamesSectionProps> = ({ playGame }) => {
  return (
    <section id="games" className={styles.gamesSection}>
      <div className={`${styles.container} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className={styles.headerText}>
          <h3 className={styles.title}>Nossos Jogos</h3>
          <p className={styles.subtitle}>Escolha um jogo e comece sua jornada no mundo da programação</p>
        </div>
        <div className={styles.gameGrid}>
          {/* Card de Sequência Lógica */}
          <div className={styles.gameCard}>
            <div className={`${styles.cardHeader} ${styles.sequenciaGradient}`}>
              <span className={styles.emoji}>🔢</span>
            </div>
            <div className={styles.cardContent}>
              <h4 className={styles.cardTitle}>Sequência Lógica</h4>
              <p className={styles.cardDescription}>Aprenda sobre sequências e padrões através de desafios progressivos.</p>
              <div className={styles.cardFooter}>
                <span className={`${styles.level} ${styles.blueLevel}`}>Iniciante</span>
                <span className={styles.rating}>⭐ 4.8</span>
              </div>
              <button className="button mt-4 w-full" onClick={() => (window.location.href = '/sequencia')}>Jogar</button>
            </div>
          </div>

          {/* Card de Labirinto do Código */}
          <div className={styles.gameCard}>
            <div className={`${styles.cardHeader} ${styles.labirintoGradient}`}>
              <span className={styles.emoji}>🏃‍♂️</span>
            </div>
            <div className={styles.cardContent}>
              <h4 className={styles.cardTitle}>Labirinto do Código</h4>
              <p className={styles.cardDescription}>Navegue por labirintos usando comandos de programação básicos.</p>
              <div className={styles.cardFooter}>
                <span className={`${styles.level} ${styles.greenLevel}`}>Intermediário</span>
                <span className={styles.rating}>⭐ 4.9</span>
              </div>
              <button className="button mt-4 w-full" onClick={() => (window.location.href = '/labirinto')}>Jogar</button>
            </div>
          </div>

          {/* Card de Puzzle de Algoritmos */}
          <div className={styles.gameCard}>
            <div className={`${styles.cardHeader} ${styles.puzzleGradient}`}>
              <span className={styles.emoji}>🧩</span>
            </div>
            <div className={styles.cardContent}>
              <h4 className={styles.cardTitle}>Puzzle de Algoritmos</h4>
              <p className={styles.cardDescription}>Resolva quebra-cabeças criando algoritmos eficientes.</p>
              <div className={styles.cardFooter}>
                <span className={`${styles.level} ${styles.purpleLevel}`}>Avançado</span>
                <span className={styles.rating}>⭐ 4.7</span>
              </div>
              <button className="button mt-4 w-full" onClick={() => (window.location.href = '/puzzle')}>Jogar</button>
            </div>
          </div>
        </div>
      </div>
    </section>
     
  );
};

export default GamesSection;