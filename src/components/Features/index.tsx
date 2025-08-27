import styles from './Features.module.css';

const Features = () => {
  return (
    <section id="features" className={styles.featuresSection}>
      <div
        className={`${styles.container} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
      >
        <div className={styles.headerText}>
          <h3 className={styles.title}>Por que escolher o CodePlay?</h3>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>🎯</span>
            </div>
            <h4 className={styles.featureTitle}>Aprendizado Focado</h4>
            <p className={styles.featureDescription}>
              Cada jogo é projetado para ensinar conceitos específicos de
              programação.
            </p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>📈</span>
            </div>
            <h4 className={styles.featureTitle}>Progresso Gradual</h4>
            <p className={styles.featureDescription}>
              Dificuldade progressiva que acompanha seu desenvolvimento.
            </p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>🏆</span>
            </div>
            <h4 className={styles.featureTitle}>Gamificação</h4>
            <p className={styles.featureDescription}>
              Sistema de pontuação e conquistas para manter você motivado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
