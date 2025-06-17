import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Hello_World');
      setMessage(response.data);
    } catch (error) {
      console.error('Erro ao buscar a mensagem:', error);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/Hello_World', { name });
      fetchMessage();
      setName('');
    } catch (error) {
      console.error('Erro ao enviar o nome:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient" style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '600px', borderRadius: '20px' }}>
        <h2 className="text-center mb-4 text-primary">🌍 Hello World App</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label fw-bold">Digite seu nome:</label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="Ex: Matheus"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success btn-lg">Salvar Nome</button>
          </div>
        </form>

        <hr className="my-4" />

        <div>
          <h5 className="text-center text-secondary">Resultado Atual:</h5>
          <div className="p-4 bg-success bg-opacity-10 border border-success rounded-3 shadow-sm text-center fs-5 fw-semibold">
            {message ? (
              <span className="text-success">{message}</span>
            ) : (
              <span className="text-muted">Nenhuma mensagem disponível ainda.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
