import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import CalendarGrid from './components/CalendarGrid/CalendarGrid'; // Импорт CalendarGrid
import Header from './components/Header/Header';
import Login from './pages/login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';

const ShadowWrapper = styled('div')`
  min-width: 850px;
  height: auto;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow:hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
  display: flex;
  flex-direction: column;
`;

function App() {
  moment.updateLocale('en', { week: { dow: 1 } });
  const today = moment();
  const startDay = today.startOf('month').startOf('week');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleSignUp = (token) => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <ShadowWrapper>
        <Routes>
          <Route
            path="/login"
            element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/calendar" />}
          />
          <Route 
          path="/signup" 
          element={!isLoggedIn ? <SignUp onSignUp={handleSignUp} /> : <Navigate to="/calendar" />} 
          />
          <Route
            path="/calendar"
            element={isLoggedIn ? <CalendarGrid startDay={startDay} /> : <Navigate to="/login" />}
          />
      
          <Route
            path="/"
            element={<h1>Добро пожаловать в Календарь!</h1>}
          />
        </Routes>
      </ShadowWrapper>
    </Router>
  );
}

export default App;
