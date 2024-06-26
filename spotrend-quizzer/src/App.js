import logo from './logo.svg';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importe tes composants de page ici
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage.js';
import QuizPage from './QuizPage';
import ResultsPage from './ResultPage';
import ProfilePage from './ProfilePage';

export const apiUrl = "https://serveurspottrend-production.up.railway.app";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
