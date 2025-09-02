// src/App.tsx
import React, { useState } from 'react';
import LevelSelector from './LevelSelector';
import ChallengeArea from './ChallengeArea';
import ProgressBar from './ProgressBar';
import { challenges } from './data';
import { Challenge } from './types';
import styles from './App.module.css';

const LoopPage: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set());

  const handleLevelSelect = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
  };

  const handleChallengeComplete = (id: number) => {
    setCompletedChallenges(prev => new Set(prev).add(id));
  };

  const handleBackToMenu = () => {
    setCurrentChallenge(null);
  };

  const progress = (completedChallenges.size / challenges.length) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Labirinto de Laços</h1>
        <p>Domine a arte dos loops e desenvolva sua lógica de programação!</p>
      </div>

      <div className={styles.gameArea}>
        <ProgressBar progress={progress} />

        {currentChallenge ? (
          <ChallengeArea
            challenge={currentChallenge}
            onComplete={handleChallengeComplete}
            onBack={handleBackToMenu}
          />
        ) : (
          <LevelSelector
            challenges={challenges}
            completedChallenges={completedChallenges}
            onSelect={handleLevelSelect}
          />
        )}
      </div>
    </div>
  );
};

export default LoopPage;