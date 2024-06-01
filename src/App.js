import './App.css';
import { useState } from 'react';
import Dropzone from './Components/DropZone';

function App() {
  const [mode, setMode] = useState('encrypt');
  const [key, setKey] = useState('');

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  }

  const handleModeChange = (e) => {
    setMode(e.target.value);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>{mode === 'encrypt' ? 'Encryptor 🔐' : 'Decryptor 🔓'}</h1>
      </header>
      <main className='main-content'>
        <div className='info-div'>
        <h2 className='select-mode-h2'>Select Mode</h2>
        <div className="mode-switch">
          <div>
          <label className="radio-label">
            <input type="radio" value="encrypt" checked={mode === 'encrypt'} onChange={handleModeChange} />
            <span className="custom-radio"></span>
            Encrypt 🔐
          </label>
          </div>
          <div>
          <label className="radio-label">
            <input type="radio" value="decrypt" checked={mode === 'decrypt'} onChange={handleModeChange} />
            <span className="custom-radio"></span>
            Decrypt🔓
          </label>
          </div>
        </div>
        <div>
          <label htmlFor='key'>Enter Key:</label>
          <input id='key' type="password" className="password-input" onChange={handleKeyChange} />
        </div>
        <Dropzone keyValue={key} mode={mode} />
        </div>
        {mode === 'encrypt' ? (
          <img src="./encrypt.png" alt="encrypt-img" />
          
        ):<img src="./decrypt.png" alt="decrypt-img" />}
      </main>
      <footer className='footer'>
        <p>Created by Juan Palta, Danilo Erazo, Mateo Rada.</p>
      </footer>
    </div>
  );
}

export default App;
