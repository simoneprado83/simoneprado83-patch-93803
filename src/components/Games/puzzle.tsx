import React from 'react';
import { useNavigate } from "react-router-dom";
import PuzzlePage from "../Puzzle/Puzzle";

export default function Puzzle() {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-8">
      <button
        className="button mb-4"
        onClick={() => navigate("/")}
      >
        Voltar à Página Inicial
      </button>
      <PuzzlePage />
    </div>
  );
}
