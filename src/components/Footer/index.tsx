import React from 'react';
import styles from './Footer.module.css';
import { NavLink } from 'react-router-dom';

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
              <a href="mailto:pradowebplay@gmail.com" className={styles.socialIcon}>
                <span className={styles.socialEmoji}>📧</span>
              </a>
              <a href="tel:5535992528175" className={styles.socialIcon}>
                <span className={styles.socialEmoji}>📱</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <span className={styles.socialEmoji}>🐦</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className={styles.linksTitle}>Links Rápidos</h4>
            <ul className={styles.linksList}>
              <li>
                <NavLink to="/" className={styles.link}>
                  Início
                </NavLink>
              </li>
              <li>
                <NavLink to="/jogos" className={styles.link}>
                  Jogos
                </NavLink>
              </li>
              <li>
                <NavLink to="/sobre" className={styles.link}>
                  Sobre Nós
                </NavLink>
              </li>
              <li>
                <NavLink to="/contato" className={styles.link}>
                  Contato
                </NavLink>
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
            © 2025 CodePlay. Todos os direitos reservados. Feito com ❤ para
            educadores e estudantes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;