import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header/';
import Hero from './components/Hero/';
import Games from './components/Games/';
import Features from './components/Features/';
import Footer from './components/Footer/';
import SequenciaPage from './components/Games/sequencia';

import './index.css'; // Importa os estilos globais
import LabirintoPage from './components/Labirinto/Labirinto';
import PuzzlePage from './components/Puzzle/Puzzle';

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
    <Router>
      <div className="flex flex-col">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
        <main className="flex-1">
          <Routes>
            {/* Página inicial */}
            <Route
              path="/"
              element={
                <>
                  <Hero scrollToGames={scrollToGames} />
                  <Games playGame={playGame} />
                  <Features />
                </>
              }
            />
            {/* Rotas dos jogos */}
            <Route path="/sequencia" element={<SequenciaPage />} />
            <Route path="/labirinto" element={<LabirintoPage />} />
            <Route path="/puzzle" element={<PuzzlePage/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;