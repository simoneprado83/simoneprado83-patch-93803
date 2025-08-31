
import { useNavigate } from "react-router-dom";
import SequenciaLogicaVisual from "../Sequencia/SequenciaLogicaVisual";
import styles from "./sequencia.module.css";

export default function SequenciaPage() {
  const navigate = useNavigate();
  
  return (
    <div className="px-4 py-8">
      <button
        className={`${styles.button} ${styles["mb-4"]}`}
        onClick={() => navigate("/#")}
      >
        Voltar à Página Inicial
      </button>
      <SequenciaLogicaVisual />
    </div>
  );
}
