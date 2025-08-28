import { useState, useEffect } from "react";

const labirinto = [
  ["⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛"],
  ["⬛", "👨‍💻", "⬜", "⬜", "⬛", "⬜", "⬛"],
  ["⬛", "⬛", "⬜", "⬛", "⬛", "⬜", "⬛"],
  ["⬛", "⬜", "⬜", "⬜", "⬜", "⬜", "⬛"],
  ["⬛", "⬜", "⬛", "⬛", "⬜", "⬛", "⬛"],
  ["⬛", "⬜", "⬜", "⬛", "⬜", "🏁", "⬛"],
  ["⬛", "⬛", "⬛", "⬛", "⬛", "⬛", "⬛"],
];

export default function LabirintoPage() {
  const [mapa, setMapa] = useState(labirinto);
  const [posicao, setPosicao] = useState({ x: 1, y: 1 });
  const [venceu, setVenceu] = useState(false);

  const mover = (dx: number, dy: number) => {
    if (venceu) return;

    const novoX = posicao.x + dx;
    const novoY = posicao.y + dy;
    const destino = mapa[novoY][novoX];

    if (destino === "⬛") return; // parede
    if (destino === "🏁") {
      setVenceu(true);
      return;
    }

    const novoMapa = mapa.map((linha) => [...linha]);
    novoMapa[posicao.y][posicao.x] = "⬜";
    novoMapa[novoY][novoX] = "👨‍💻";
    setMapa(novoMapa);
    setPosicao({ x: novoX, y: novoY });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          mover(0, -1);
          break;
        case "ArrowDown":
          mover(0, 1);
          break;
        case "ArrowLeft":
          mover(-1, 0);
          break;
        case "ArrowRight":
          mover(1, 0);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [posicao, venceu]);

  return (
    <div className="px-4 py-8 text-center">
      <h2 className="text-3xl font-bold mb-4 text-green-600">
        🏃‍♂ Labirinto do Código
      </h2>

      {venceu ? (
        <p className="text-2xl font-bold text-green-500">🎉 Você venceu! 🎉</p>
      ) : (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Use as setas do teclado para mover o personagem até a bandeira 🏁.
          </p>
          <div className="inline-block bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            {mapa.map((linha, y) => (
              <div key={y} className="flex justify-center">
                {linha.map((celula, x) => (
                  <span
                    key={x}
                    className="text-2xl w-8 h-8 flex items-center justify-center"
                  >
                    {celula}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </>
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
