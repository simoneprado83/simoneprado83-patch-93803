import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div
        className={`${styles.container} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
      >
        <div className={styles.grid}>
          <div className={styles.logoDescriptionWrapper}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoIcon}>
                <span className={styles.iconText}>🎮</span>
              </div>
              <h1 className={styles.logoTitle}>CodePlay</h1>
            </div>
            <p className={styles.description}>
              Transformando o aprendizado de programação em uma experiência
              divertida e interativa.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}>
                <span className={styles.socialEmoji}>📧</span>
              </a>
              <a href="#" className={styles.socialIcon}>
                <span className={styles.socialEmoji}>📱</span>
              </a>
              <a href="#" className={styles.socialIcon}>
                <span className={styles.socialEmoji}>🐦</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className={styles.linksTitle}>Links Rápidos</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#hero" className={styles.link}>
                  Início
                </a>
              </li>
              <li>
                <a href="#games" className={styles.link}>
                  Jogos
                </a>
              </li>
              <li>
                <a href="#features" className={styles.link}>
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#footer" className={styles.link}>
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={styles.linksTitle}>Suporte</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#" className={styles.link}>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Tutoriais
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Comunidade
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2024 CodePlay. Todos os direitos reservados. Feito com ❤ para
            educadores e estudantes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
