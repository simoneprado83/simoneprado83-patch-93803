import { useState } from "react";

export default function PuzzlePage() {
  // Sequência de números embaralhada
  const [sequencia, setSequencia] = useState([1, 2, 3, 4, 5]);
  const [embaralhada, setEmbaralhada] = useState(
    [...sequencia].sort(() => Math.random() - 0.5)
  );
  const [mensagem, setMensagem] = useState("");

  // Função para trocar posição de elementos
  const trocar = (index1: number, index2: number) => {
    const nova = [...embaralhada];
    [nova[index1], nova[index2]] = [nova[index2], nova[index1]];
    setEmbaralhada(nova);
  };

  // Verifica se a sequência está correta
  const verificar = () => {
    if (embaralhada.join(",") === sequencia.join(",")) {
      setMensagem("🎉 Parabéns! Sequência correta! 🎉");
    } else {
      setMensagem("❌ Ainda não está certo. Tente novamente!");
    }
  };

  return (
    <div className="px-4 py-8 text-center">
      <h2 className="text-3xl font-bold mb-4 text-purple-600">
        🧩 Puzzle de Algoritmos
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Organize os números na ordem correta arrastando ou clicando para trocar posições.
      </p>

      <div className="flex justify-center gap-2 mb-4">
        {embaralhada.map((num, idx) => (
          <button
            key={idx}
            className="px-4 py-2 bg-white dark:bg-gray-700 rounded shadow-md text-xl"
            onClick={() => {
              if (idx < embaralhada.length - 1) {
                trocar(idx, idx + 1);
              }
            }}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        className="button mt-4"
        onClick={verificar}
      >
        Verificar
      </button>

      {mensagem && (
        <p className="mt-4 font-bold text-lg text-purple-500">{mensagem}</p>
      )}

      {/* Botão para voltar à página inicial */}
      <button
        className="button mt-6"
        onClick={() => (window.location.href = "/")}
      >
        Voltar para a página inicial
      </button>
    </div>
  );
}
