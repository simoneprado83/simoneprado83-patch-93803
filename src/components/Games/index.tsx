import React from 'react';
import styles from './Games.module.css';

interface GamesProps {
  playGame: (gameType: string) => void;
}

const gameData = [
  {
    type: 'sequencia',
    emoji: '🔢',
    title: 'Sequência Lógica',
    description: 'Aprenda sobre sequências e padrões através de desafios progressivos.',
    level: 'Iniciante',
    rating: '⭐ 4.8',
  },
  {
    type: 'labirinto',
    emoji: '🏃‍♂',
    title: 'Labirinto do Código',
    description: 'Navegue por labirintos usando comandos de programação básicos.',
    level: 'Intermediário',
    rating: '⭐ 4.9',
  },
  {
    type: 'puzzle',
    emoji: '🧩',
    title: 'Puzzle de Algoritmos',
    description: 'Resolva quebra-cabeças criando algoritmos eficientes.',
    level: 'Avançado',
    rating: '⭐ 4.7',
  },
  // outros jogos...
];

const GameCard: React.FC<{
  game: (typeof gameData)[0];
  onClick: () => void;
}> = ({ game, onClick }) => {
  let gradientClass;
  let levelColor;

  switch (game.type) {
    case 'sequencia':
      gradientClass = styles.sequenciaGradient;
      levelColor = styles.blueLevel;
      break;
    case 'labirinto':
      gradientClass = styles.labirintoGradient;
      levelColor = styles.greenLevel;
      break;
    case 'puzzle':
      gradientClass = styles.puzzleGradient;
      levelColor = styles.purpleLevel;
      break;
    case 'debug':
      gradientClass = styles.debugGradient;
      levelColor = styles.redLevel;
      break;
    case 'loops':
      gradientClass = styles.loopsGradient;
      levelColor = styles.orangeLevel;
      break;
    case 'condicoes':
      gradientClass = styles.condicoesGradient;
      levelColor = styles.indigoLevel;
      break;
    default:
      gradientClass = '';
      levelColor = '';
  }

  return (
    <div className={`game-card ${styles.gameCard}`}>
      <div className={`${styles.cardHeader} ${gradientClass}`}>
        <span className={styles.emoji}>{game.emoji}</span>
      </div>
      <div className={styles.cardContent}>
        <h4 className={styles.cardTitle}>{game.title}</h4>
        <p className={styles.cardDescription}>{game.description}</p>
        <div className={styles.cardFooter}>
          <span className={`${styles.level} ${levelColor}`}>{game.level}</span>
          <span className={styles.rating}>{game.rating}</span>
        </div>

        {/* Botão do card */}
        {game.type === 'sequencia' && (
          <button
            className="button mt-4 w-full"
            onClick={() => (window.location.href = '/sequencia')}
          >
            Jogar
          </button>
        )}
        {game.type === 'labirinto' && (
          <button
            className="button mt-4 w-full"
            onClick={() => (window.location.href = '/labirinto')}
          >
            Jogar
          </button>
        )}
        {game.type === 'puzzle' && (
          <button
            className="button mt-4 w-full"
            onClick={() => (window.location.href = '/puzzle')}
          >
            Jogar
          </button>
        )}
        {game.type !== 'sequencia' &&
          game.type !== 'labirinto' &&
          game.type !== 'puzzle' && (
            <button className="button mt-4 w-full" onClick={onClick}>
              Jogar
            </button>
          )}
      </div>
    </div>
  );
};

const Games: React.FC<GamesProps> = ({ playGame }) => {
  const handleCardClick = (gameType: string) => {
    playGame(gameType); // outros jogos continuam chamando playGame
  };

  return (
    <section id="games" className={styles.gamesSection}>
      <div className={`${styles.container} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className={styles.headerText}>
          <h3 className={styles.title}>Nossos Jogos</h3>
          <p className={styles.subtitle}>
            Escolha um jogo e comece sua jornada no mundo da programação
          </p>
        </div>

        <div className={styles.gameGrid}>
          {gameData.map((game, index) => (
            <GameCard
              key={index}
              game={game}
              onClick={() => handleCardClick(game.type)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;
