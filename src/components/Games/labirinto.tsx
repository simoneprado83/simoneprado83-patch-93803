import React from 'react';
import { useNavigate } from "react-router-dom";
import LabirintoPage from "../Labirinto/LabirintoPage";
import styles from "./labirinto.module.css";

export default function Labirinto() {
  const navigate = useNavigate();

  return (
    <>
    <button
        className={`${styles.button} ${styles["mb-4"]}`}
        onClick={() => navigate("/")}
      >
        Voltar à Página Inicial
      </button>
    <div className="px-4 py-8">
      
      <LabirintoPage />
    </div>
    </>
  );
}