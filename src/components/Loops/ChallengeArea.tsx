// src/components/ChallengeArea.tsx
import React, { useState } from 'react';
import { Challenge } from './types';
import MazeVisual from './MazeVisual';
import styles from './ChallengeArea.module.css';

interface ChallengeAreaProps {
  challenge: Challenge;
  onComplete: (id: number) => void;
  onBack: () => void;
}

const ChallengeArea: React.FC<ChallengeAreaProps> = ({ challenge, onComplete, onBack }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('Resultado aparecerá aqui...');
  const [outputClass, setOutputClass] = useState(styles.output);
  const [showHint, setShowHint] = useState(false);

  const runCode = () => {
    if (!code.trim()) {
      setOutput('Por favor, digite algum código!');
      setOutputClass(`${styles.output} ${styles.error}`);
      return;
    }

    try {
      let result = '';
      const originalLog = console.log;
      console.log = (...args: unknown[]) => {
        result += args.join(' ') + '\n';
      };

      eval(code);

      console.log = originalLog;
      result = result.trim();

      if (result === challenge.expected.trim()) {
        setOutput(`Parabéns! Desafio concluído!\n\nSaída:\n${result}`);
        setOutputClass(`${styles.output} ${styles.success}`);
        onComplete(challenge.id);
      } else {
        setOutput(`Não está correto ainda. Tente novamente!\n\nSua saída:\n${result}\n\nEsperado:\n${challenge.expected.trim()}`);
        setOutputClass(`${styles.output} ${styles.error}`);
      }
    } catch (error: unknown) { // CORREÇÃO: Usamos 'unknown' aqui
      if (error instanceof Error) { // CORREÇÃO: Verificamos se é um objeto Error
        setOutput(`Erro no código: ${error.message}`);
      } else {
        setOutput(`Ocorreu um erro desconhecido.`);
      }
      setOutputClass(`${styles.output} ${styles.error}`);
    }
  };

  const resetLevel = () => {
    setCode('');
    setOutput('Resultado aparecerá aqui...');
    setOutputClass(styles.output);
    setShowHint(false);
  };

  return (
    <div className={styles.challengeArea}>
      <div className={styles.challengeHeader}>
        <h2 className={styles.challengeTitle}>Nível {challenge.id}: {challenge.title}</h2>
        <p className={styles.challengeDescription}>{challenge.description}</p>
      </div>
      <MazeVisual maze={challenge.maze} />
      {showHint && <div className={styles.hint}>Dica: {challenge.hint}</div>}
      <div className={styles.codeEditor}>
        <textarea
          className={styles.codeInput}
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Digite seu código aqui..."
        />
      </div>
      <div className={styles.buttons}>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={runCode}>Executar Código</button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowHint(true)}>Dica</button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={resetLevel}>Reiniciar</button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onBack}>Voltar</button>
      </div>
      <div id="output" className={outputClass}>{output}</div>
    </div>
  );
};

export default ChallengeArea;