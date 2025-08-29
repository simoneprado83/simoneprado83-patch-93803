import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.contentBox}>
        <h1 style={styles.title}>Sobre o CodePlay</h1>
        <p style={styles.subtitle}>
          Transformando o aprendizado de programação em uma aventura divertida.
        </p>
        <div style={styles.separator}></div>
        <p style={styles.paragraph}>
          O **CodePlay** nasceu da paixão por combinar educação com diversão. Acreditamos que
          os conceitos de lógica e algoritmos, essenciais na programação, podem ser
          aprendidos de forma intuitiva e envolvente, através de jogos interativos.
        </p>
        <p style={styles.paragraph}>
          Nossa missão é descomplicar o mundo da tecnologia para iniciantes, oferecendo
          uma plataforma onde cada desafio é um novo passo na sua jornada de aprendizado.
          Junte-se a nós para resolver puzzles, navegar por labirintos e decifrar padrões
          que fortalecerão seu raciocínio lógico.
        </p>
        <button style={styles.button} onClick={() => navigate('/')}>
          Voltar à Página Inicial
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #60a5fa)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  contentBox: {
    maxWidth: '800px',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    textAlign: 'center' as 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    opacity: 0.9,
  },
  separator: {
    width: '80px',
    height: '4px',
    background: '#fff',
    margin: '20px auto',
    borderRadius: '2px',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: 1.6,
    marginBottom: '20px',
    textAlign: 'left' as 'left',
  },
  button: {
    background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '25px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
};

export default AboutPage;