import { useNavigate } from "react-router-dom";
import SequenciaLogicaVisual from "../Sequencia/SequenciaLogicaVisual";

export default function SequenciaPage() {
  const navigate = useNavigate();

  const containerStyle = {
    padding: "2rem",
    backgroundColor: "#3b82f6",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "1rem"
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={() => navigate("/")}
      >
        Voltar à Página Inicial
      </button>
      <SequenciaLogicaVisual />
    </div>
  );
}
