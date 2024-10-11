import React, { useState } from 'react';

function SignUp({ onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Получаем существующих пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверяем, существует ли уже пользователь с таким email
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
      setError('Пользователь с таким email уже существует.');
      return;
    }

    // Добавляем нового пользователя в localStorage
    const newUser = { email, password };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    
    // Мокаем токен
    const token = "mockSignUpToken";
    localStorage.setItem('token', token);

    onSignUp(token);  // Вызываем метод для авторизации
  };

  return (
    <div>
      <h2>Регистрация</h2>
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
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default SignUp;
