
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SignInUpPage.css';
import logo from './logo.svg'; 

function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pseudo: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(formData.pseudo, formData.password)
    .then(data => {
      // Stocker le token reçu dans localStorage
      localStorage.setItem('userToken', data.token);
      console.log(`signin ${data.token}`);
      navigate('/');
      console.log("connexion done ")
      return data; 
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion', error);
        alert(`${error.message}`);
      });
  };

  async function signIn(pseudo, password) {
    const response = await fetch('http://localhost:8080/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pseudo, password }),
    });
    if (!response.ok) {
      // Lire le texte de la réponse pour obtenir le message d'erreur
      return response.text().then(text => Promise.reject(new Error(text || 'Échec de connexion')));
    }
    return await response.json();
  }

  return (
    <div className="signInUpPage">
      <div className="logo">
      <img src={logo} className='logoNotConnected'/>
      </div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pseudo">Pseudo :</label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-box">
          <button type="submit" className="btn">Se connecter</button>
          <button type="button" className="btn" onClick={() => navigate('/')}>Annuler</button>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;