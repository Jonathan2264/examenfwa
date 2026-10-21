import React, { useState } from 'react';
import { initialChallenges } from './data/challenges';
import './App.css';

function App() {
  const [challenges] = useState(initialChallenges);
  const [selectedChallengeId, setSelectedChallengeId] = useState(initialChallenges[0].id);
  const [userInputs, setUserInputs] = useState({});
  const [results, setResults] = useState({}); // { [id]: { solved: boolean, feedback: string } }
  const [score, setScore] = useState(0);

  const currentChallenge = challenges.find((c) => c.id === selectedChallengeId);

  // Manejo de respuesta seleccionada o escrita
  const handleInputChange = (challengeId, value) => {
    setUserInputs({
      ...userInputs,
      [challengeId]: value,
    });
  };

  // Validación de criterios predefinidos
  const validateSolution = (challenge) => {
    const userAns = (userInputs[challenge.id] || '').trim();

    if (!userAns) {
      alert('Por favor selecciona o escribe una respuesta antes de validar.');
      return;
    }

    let isCorrect = false;

    if (challenge.type === 'choice') {
      isCorrect = userAns.toLowerCase() === challenge.correctAnswer.toLowerCase();
    } else if (challenge.type === 'code') {
      // Normalizamos eliminando espacios o paréntesis extra
      const cleanInput = userAns.replace(/[();'"]/g, '').toLowerCase();
      const cleanExpected = challenge.expectedInput.replace(/[();'"]/g, '').toLowerCase();
      isCorrect = cleanInput === cleanExpected;
    }

    const wasAlreadySolved = results[challenge.id]?.solved;

    if (isCorrect) {
      if (!wasAlreadySolved) {
        setScore((prev) => prev + challenge.points);
      }
      setResults({
        ...results,
        [challenge.id]: {
          solved: true,
          status: 'success',
          message: `¡Correcto! +${challenge.points} pts. ${challenge.explanation}`,
        },
      });
    } else {
      setResults({
        ...results,
        [challenge.id]: {
          solved: false,
          status: 'error',
          message: `Incorrecto. Revisa tu lógica e intenta de nuevo.`,
        },
      });
    }
  };

  const totalPoints = challenges.reduce((acc, curr) => acc + curr.points, 0);
  const completedCount = Object.values(results).filter((r) => r.solved).length;

  return (
    <div className="container">
      {/* Header con puntuación acumulada */}
      <header className="header">
        <div>
          <h1>💻 CodeQuest | Retos de Programación</h1>
          <p className="subtitle">Pon a prueba tus habilidades de desarrollo</p>
        </div>
        <div className="score-badge">
          <span>Puntaje Acumulado</span>
          <strong>{score} / {totalPoints} pts</strong>
          <small>{completedCount} de {challenges.length} retos superados</small>
        </div>
      </header>

      {/* Grid principal */}
      <div className="main-layout">
        {/* Lista de Retos */}
        <aside className="challenge-list">
          <h3>Lista de Desafíos</h3>
          {challenges.map((c) => {
            const isSolved = results[c.id]?.solved;
            const isSelected = c.id === selectedChallengeId;
            return (
              <button
                key={c.id}
                className={`challenge-card-nav ${isSelected ? 'active' : ''} ${isSolved ? 'done' : ''}`}
                onClick={() => setSelectedChallengeId(c.id)}
              >
                <div className="card-top">
                  <span className="card-title">{c.title}</span>
                  {isSolved && <span className="tag-done">✓ Resuelto</span>}
                </div>
                <div className="card-meta">
                  <span className="difficulty">{c.difficulty}</span>
                  <span className="points">+{c.points} pts</span>
                </div>
              </button>
            );
          })}
        </aside>

        {/* Área de Resolución */}
        <section className="challenge-workspace">
          {currentChallenge && (
            <div className="detail-card">
              <div className="detail-header">
                <div>
                  <span className="badge category">{currentChallenge.category}</span>
                  <span className="badge diff">{currentChallenge.difficulty}</span>
                </div>
                <span className="badge points-badge">Valor: {currentChallenge.points} pts</span>
              </div>

              <h2>{currentChallenge.title}</h2>
              <p className="description">{currentChallenge.description}</p>

              {/* Interacción: Opciones o Campo de Texto */}
              <div className="interaction-box">
                {currentChallenge.type === 'choice' ? (
                  <div className="options-group">
                    <p><strong>Selecciona la respuesta correcta:</strong></p>
                    {currentChallenge.options.map((opt, idx) => (
                      <label key={idx} className="option-label">
                        <input
                          type="radio"
                          name={`option-${currentChallenge.id}`}
                          value={opt}
                          checked={userInputs[currentChallenge.id] === opt}
                          onChange={(e) => handleInputChange(currentChallenge.id, e.target.value)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="input-group">
                    <label htmlFor="solution-input"><strong>Introduce tu solución:</strong></label>
                    <input
                      id="solution-input"
                      type="text"
                      className="text-solution"
                      placeholder={currentChallenge.placeholder}
                      value={userInputs[currentChallenge.id] || ''}
                      onChange={(e) => handleInputChange(currentChallenge.id, e.target.value)}
                    />
                  </div>
                )}

                <button
                  className="btn-submit"
                  onClick={() => validateSolution(currentChallenge)}
                >
                  Validar Criterios
                </button>
              </div>

              {/* Feedback / Resultados */}
              {results[currentChallenge.id] && (
                <div className={`feedback-banner ${results[currentChallenge.id].status}`}>
                  <strong>{results[currentChallenge.id].status === 'success' ? 'Éxito:' : 'Aviso:'}</strong>{' '}
                  {results[currentChallenge.id].message}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;