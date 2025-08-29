import React from 'react';
import { NavLink } from 'react-router-dom';
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Início
            </NavLink>
            <NavLink
              to="/jogos"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Jogos
            </NavLink>
            <NavLink
              to="/sobre"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Sobre
            </NavLink>
            <NavLink
              to="/contato"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Contato
            </NavLink>
          </nav>
          <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
            <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? '' : 'hidden'}`}>
          <div className={styles.mobileNav}>
            <NavLink to="/" className={styles.mobileNavLink}>
              Início
            </NavLink>
            <NavLink to="/jogos" className={styles.mobileNavLink}>
              Jogos
            </NavLink>
            <NavLink to="/sobre" className={styles.mobileNavLink}>
              Sobre
            </NavLink>
            <NavLink to="/contato" className={styles.mobileNavLink}>
              Contato
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;