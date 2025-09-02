// src/components/LevelSelector.tsx
import React from 'react';
import { Challenge } from './types';
import styles from './LevelSelector.module.css';

interface LevelSelectorProps {
  challenges: Challenge[];
  completedChallenges: Set<number>;
  onSelect: (challenge: Challenge) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ challenges, completedChallenges, onSelect }) => {
  return (
    <div className={styles.levelSelector}>
      {challenges.map(challenge => (
        <div
          key={challenge.id}
          className={`${styles.levelCard} ${completedChallenges.has(challenge.id) ? styles.completed : ''}`}
          onClick={() => onSelect(challenge)}
        >
          <h3>Nível {challenge.id}</h3>
          <p>{challenge.title}</p>
          {completedChallenges.has(challenge.id) && (
            <div style={{ color: '#28a745', fontWeight: 'bold' }}>Concluído</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LevelSelector;