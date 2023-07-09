import { useState } from 'react';
import './Juega.css'; // Importar archivo CSS

const Juega = () => {
  const [gameCount, setGameCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswer = (answer:any) => {
    // Verificar si la respuesta es correcta
    if (answer === 'b') {
      setCorrectAnswers(correctAnswers + 1);
    }

    // Incrementar el contador de juegos
    setGameCount(gameCount + 1);
  };

  // Función para obtener la clase de fondo actual según la opción seleccionada
  const getCurrentBackgroundClass = () => {
    if (gameCount === 1) {
      return 'background-image-1';
    } else if (gameCount === 2) {
      return 'background-image-2';
    } else {
      return 'background-image-default';
    }
  };

  return (
    <div className={`juega-container ${getCurrentBackgroundClass()}`}>
      <div className="game-container">
        {gameCount < 3 ? (
          <div>
            {/* Lógica y elementos del juego */}
            <p>¿Qué es el sol?</p>
            <button onClick={() => handleAnswer('a')}>a: Opción A</button>
            <button onClick={() => handleAnswer('b')}>b: Opción B</button>
            <button onClick={() => handleAnswer('c')}>c: Opción C</button>
          </div>
        ) : (
          <div>
            {/* Juego completado */}
            <p>Juego completado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Juega;
