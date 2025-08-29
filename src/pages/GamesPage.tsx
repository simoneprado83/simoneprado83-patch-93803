// src/pages/GamesPage.tsx

import React from 'react';
import GamesSection from '../components/Games/GamesSection'; // Importe o componente da seção de jogos

// Defina as props se o componente GamesSection precisar
interface GamesPage {
  playGame: (gameType: string) => void;
}

const GamesPage: React.FC<GamesPage> = ({ playGame }) => {
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Página de Jogos</h1>
      
      {/* Aqui você renderiza o componente GamesSection */}
      <GamesSection playGame={playGame} />
    </div>
  );
};

export default GamesPage;