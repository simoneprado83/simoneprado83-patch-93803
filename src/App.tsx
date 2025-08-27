import { useState } from 'react';
import Header from './components/Header/';
import Hero from './components/Hero/';
import Games from './components/Games/';
import Features from './components/Features/';
import Footer from './components/Footer/';
import './index.css'; // Importa os estilos globais

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToGames = () => {
    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
  };

  const playGame = (gameType: string) => {
    alert(
      `Iniciando ${gameType}! Em breve você será redirecionado para o jogo.`
    );
  };

  return (
    <div className="flex flex-col">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <main className="flex-1">
        <Hero scrollToGames={scrollToGames} />
        <Games playGame={playGame} />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
