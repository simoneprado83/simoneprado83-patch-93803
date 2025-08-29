import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSendMessage = (event: React.MouseEvent) => {
    event.preventDefault(); // Impede o envio do formulário para o servidor

    // Coleta os valores dos campos do formulário
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    // Constrói o corpo do e-mail com os dados do formulário
    const subject = 'Mensagem do site CodePlay';
    const body = `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`;
    const mailtoLink = `mailto:pradowebplay@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Abre o cliente de e-mail do usuário
    window.location.href = mailtoLink;
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentBox}>
        <h1 style={styles.title}>Fale Conosco</h1>
        <p style={styles.subtitle}>
          Estamos prontos para responder suas dúvidas e ouvir suas sugestões.
        </p>
        <div style={styles.separator}></div>
        
        {/* Seção de Formulário de Contato */}
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Nome Completo</label>
            <input type="text" id="name" name="name" style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input type="email" id="email" name="email" style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="message" style={styles.label}>Mensagem</label>
            <textarea id="message" name="message" rows={5} style={styles.textarea}></textarea>
          </div>
          <button 
            type="button" // Use o tipo "button" para evitar o envio do formulário
            style={styles.submitButton}
            onClick={handleSendMessage} // Adicione a função de clique
          >
            Enviar Mensagem
          </button>
        </form>

        {/* Informações de Contato Adicionais */}
        <div style={styles.contactInfo}>
          <p style={styles.infoText}>
            Ou entre em contato diretamente:
            <br />
            Email: <a href="mailto:pradowebplay@gmail.com" style={styles.infoLink}>pradowebplay@gmail.com</a>
          </p>
        </div>

        <button style={styles.backButton} onClick={() => navigate('/')}>
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
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'stretch' as 'stretch',
    gap: '20px',
    marginTop: '30px',
    marginBottom: '30px',
  },
  formGroup: {
    textAlign: 'left' as 'left',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '1rem',
    fontWeight: 'bold' as 'bold',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    outline: 'none',
    resize: 'vertical' as 'vertical',
  },
  submitButton: {
    background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '25px',
    fontSize: '1rem',
    fontWeight: 'bold' as 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
  contactInfo: {
    marginBottom: '20px',
  },
  infoText: {
    fontSize: '1rem',
    lineHeight: 1.5,
    marginBottom: '10px',
  },
  infoLink: {
    color: '#fff',
    textDecoration: 'underline',
    fontWeight: 'bold' as 'bold',
  },
  backButton: {
    background: 'transparent',
    color: 'rgba(255, 255, 255, 0.8)',
    border: '2px solid rgba(255, 255, 255, 0.4)',
    padding: '10px 20px',
    borderRadius: '25px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default ContactPage;