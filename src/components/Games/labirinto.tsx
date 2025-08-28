import { useNavigate } from "react-router-dom";
import LabirintoPage from "../Labirinto/Labirinto";

export default function SequenciaPage() {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-8">
      <button
        className="button mb-4"
        onClick={() => navigate("/")}
      >
        Voltar à Página Inicial
      </button>
      <LabirintoPage />
    </div>
  );
}
