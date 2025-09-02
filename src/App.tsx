import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header/';
import Hero from './components/Hero/';
import GamesSection from './components/Games/';
import Features from './components/Features/';
import Footer from './components/Footer/';
import SequenciaPage from './components/Games/sequencia';

import './index.css';
import LabirintoPage from './components/Labirinto/LabirintoPage';
import PuzzlePage from './components/Puzzle/Puzzle';


import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import GamesPage from './pages/GamesPage';
import BugDetective from './components/BugDetective/BugDetective';
import LoopPage from './components/Loops/LoopPage';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToGames = () => {
    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // A função playGame agora será uma prop para as páginas que precisam dela
  // Ela será responsável por iniciar o jogo, e a navegação será gerenciada pelas páginas
  const playGame = (gameType: string) => {
    // Você pode adicionar alguma lógica aqui, se necessário.
    // Por exemplo, registrar um evento ou carregar dados do jogo.
    console.log(`Iniciando o jogo: ${gameType}`);
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
            {/* Rota principal que contém as seções da página inicial */}
            <Route
              path="/"
              element={
                <>
                  <Hero scrollToGames={scrollToGames} />
                  {/* Passe a função para o componente Games */}
                  <GamesSection playGame={playGame} />
                  <Features />
                </>
              }
            />

            {/* Rotas dos jogos - Mantenha a lógica de roteamento aqui */}
            {/* Note que as páginas dos jogos não precisam mais receber a prop playGame
            pois a navegação é feita pelos botões da GamesSection */}
            <Route path="/sequencia" element={<SequenciaPage />} />
            <Route path="/labirinto" element={<LabirintoPage />} />
            <Route path="/puzzle" element={<PuzzlePage />} />
            <Route path="/debug" element={<BugDetective />} />
            <Route path="/loop" element={<LoopPage />} />
            
            {/* Novas rotas para as páginas de navegação do cabeçalho */}
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/jogos" element={<GamesPage playGame={playGame} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
