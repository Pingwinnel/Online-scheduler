import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Получаем существующих пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверяем пользователя по email и паролю
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
      setError('Неверный email или пароль.');
      return;
    }

    // Мокаем токен
    const token = "mockLoginToken";
    localStorage.setItem('token', token);

    onLogin(token);  // Вызываем метод для авторизации
  };

  return (
    <div>
      <h2>Вход</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
