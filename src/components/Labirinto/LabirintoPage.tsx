// src/components/LabirintoPage.tsx

import React, { useState, useEffect } from 'react';
import styles from './Labirinto.module.css';

// Definição das interfaces para tipagem
interface Position {
    x: number;
    y: number;
}

const mazeLayout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// O componente agora não tem a palavra-chave "export" aqui
const LabirintoPage: React.FC = () => {
    const [playerPos, setPlayerPos] = useState<Position>({ x: 1, y: 1 });
    const [goalPos] = useState<Position>({ x: 13, y: 8 });
    const [moves, setMoves] = useState<number>(0);
    const [visitedCells, setVisitedCells] = useState<Set<string>>(new Set());
    const [isVictory, setIsVictory] = useState<boolean>(false);

    const createConfetti = () => {
        const colors = ['#22c55e', '#16a34a', '#15803d'];
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = styles.confetti;
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 3000);
            }, i * 100);
        }
    };

    const movePlayer = (newX: number, newY: number) => {
        if (newX < 0 || newX >= mazeLayout[0].length ||
            newY < 0 || newY >= mazeLayout.length ||
            mazeLayout[newY][newX] === 1) {
            return;
        }

        setVisitedCells(prev => new Set(prev.add(`${playerPos.x},${playerPos.y}`)));
        setPlayerPos({ x: newX, y: newY });
        setMoves(prev => prev + 1);
    };

    const moveToCell = (x: number, y: number) => {
        const dx = Math.abs(x - playerPos.x);
        const dy = Math.abs(y - playerPos.y);

        if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
            movePlayer(x, y);
        }
    };

    const resetGame = () => {
        setPlayerPos({ x: 1, y: 1 });
        setMoves(0);
        setVisitedCells(new Set());
        setIsVictory(false);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            let newX = playerPos.x;
            let newY = playerPos.y;

            switch (e.key) {
                case 'ArrowUp': newY--; break;
                case 'ArrowDown': newY++; break;
                case 'ArrowLeft': newX--; break;
                case 'ArrowRight': newX++; break;
                default: return;
            }

            e.preventDefault();
            movePlayer(newX, newY);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [playerPos]);

    useEffect(() => {
        if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
            setTimeout(() => {
                setIsVictory(true);
                createConfetti();
            }, 500);
        }
    }, [playerPos, goalPos]);

    return (
        <div className={styles['game-container']}>
            <div style={{ textAlign: 'center' }}>
                <span className={styles['version-badge']}>VERSÃO 2.0</span>
            </div>
            <h1>🎮 Labirinto do Código</h1>
            <div className={styles.maze}>
                {mazeLayout.map((row, y) =>
                    row.map((cellType, x) => {
                        const isPlayer = playerPos.x === x && playerPos.y === y;
                        const isGoal = goalPos.x === x && goalPos.y === y;
                        const isVisited = visitedCells.has(`${x},${y}`) && !isPlayer;
                        
                        const cellClasses = [
                            styles.cell,
                            cellType === 1 ? styles.wall : styles.path,
                            isPlayer ? styles.player : '',
                            isGoal ? styles.goal : ''
                        ].filter(Boolean).join(' ');

                        return (
                            <div
                                key={`${x}-${y}`}
                                className={cellClasses}
                                onClick={() => moveToCell(x, y)}
                            >
                                {isPlayer ? '🤖' : isGoal ? '🏁' : isVisited && <div className={styles.trail}></div>}
                            </div>
                        );
                    })
                )}
            </div>
            <div style={{ textAlign: 'center' }}>
                <div className={styles['moves-counter']}>Movimentos: <span>{moves}</span></div>
            </div>
            <div className={styles.controls}>
                <p>🎯 Use as setas do teclado ou clique nas células para mover o personagem</p>
                <p>🏁 Chegue até a bandeira verde para vencer!</p>
                <p>✨ <strong>Novo:</strong> Rastro visual e efeitos aprimorados!</p>
            </div>

            {isVictory && (
                <div className={styles.victory}>
                    <h2>🎉 Fantástico!</h2>
                    <p style={{ fontSize: '18px' }}>Você dominou o Labirinto Verde!</p>
                    <p>Completado em <span>{moves}</span> movimentos!</p>
                    <button className={styles['reset-btn']} onClick={resetGame}>🔄 Nova Aventura</button>
                </div>
            )}
        </div>
    );
};

// A exportação padrão acontece no final do arquivo
export default LabirintoPage;