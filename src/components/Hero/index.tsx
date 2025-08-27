import React from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  scrollToGames: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToGames }) => {
  return (
    <section className={styles.heroSection}>
      <div
        className={`${styles.container} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
      >
        <h2 className={styles.title}>
          Aprenda Programação
          <br />
          <span className={styles.titleHighlight}>Jogando!</span>
        </h2>
        <p className={styles.subtitle}>
          Desenvolva sua lógica de programação através de jogos divertidos e
          interativos. Perfeito para iniciantes e estudantes.
        </p>
        <button onClick={scrollToGames} className={styles.button}>
          Começar a Jogar
        </button>
      </div>
    </section>
  );
};

export default Hero;
