import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className={styles.flexWrapper}>
          <div className={styles.logoWrapper}>
            <div className={styles.logoIcon}>
              <span className={styles.iconText}>🎮</span>
            </div>
            <h1 className={styles.logoText}>CodePlay</h1>
          </div>
          <nav className={styles.desktopNav}>
            <a href="#hero" className="nav-link">Início</a>
            <a href="#games" className="nav-link">Jogos</a>
            <a href="#features" className="nav-link">Sobre</a>
            <a href="#footer" className="nav-link">Contato</a>
          </nav>
          <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
            <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? '' : 'hidden'}`}>
          <div className={styles.mobileNav}>
            <a href="#hero" className={styles.mobileNavLink}>Início</a>
            <a href="#games" className={styles.mobileNavLink}>Jogos</a>
            <a href="#features" className={styles.mobileNavLink}>Sobre</a>
            <a href="#footer" className={styles.mobileNavLink}>Contato</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;