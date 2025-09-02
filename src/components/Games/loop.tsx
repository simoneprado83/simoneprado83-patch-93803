
import { useNavigate } from "react-router-dom";
import LoopPage from "../Loops/LoopPage";


export default function Detective() {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-8">
      <button
        className="button mb-4"
        onClick={() => navigate("/")}
      >
        Voltar à Página Inicial
      </button>
      <LoopPage />
    </div>
  );
}
