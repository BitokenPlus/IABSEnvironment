import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) {
      setError('Por favor, ingresa una consulta.');
      return;
    }

    setIsLoading(true);
    setResponse('');
    setError('');

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Ocurrió un error en el servidor.');
      }

      const data = await res.json();
      setResponse(data.text);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🐘 Llamado a la Acción IABS Environment - ODS13</h1>
        <p className="subtitle">Sensibilizando sobre la urgencia de la Acción Climática (React Version)</p>
      </header>

      <main>
        <div className="card">
            <h2>🌍 Objetivo de Desarrollo Sostenible 13: Acción por el Clima</h2>
            <p>
                El ODS 13 busca adoptar medidas urgentes para combatir el cambio climático y sus efectos,
                fortaleciendo la resiliencia y la capacidad de adaptación.
            </p>
        </div>

        <div className="card">
            <h2>💡 Consulta a nuestra IA sobre Acción Climática</h2>
            <p>Pregunta sobre riesgos, oportunidades o estrategias relacionadas con el ODS 13.</p>
            <form onSubmit={handleSubmit}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: ¿Cuáles son los riesgos climáticos para el sector agrícola?"
                rows="4"
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Analizando...' : 'Analizar con IABS Environment 🧠'}
              </button>
            </form>
            
            {error && <p className="error-message">{error}</p>}

            {response && (
              <div className="response-card">
                <h3>Respuesta del Agente Inteligente:</h3>
                <p>{response}</p>
              </div>
            )}
        </div>
        
        <div className="card">
            <h2>🎬 Video Inspirador</h2>
             <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/Lb8zddmZ_y0" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
        </div>
      </main>

      <footer>
        <p>Desarrollado como herramienta de sensibilización para el ODS 13.</p>
      </footer>
    </div>
  );
}

export default App;