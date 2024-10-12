import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {  
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`);
      const data = await response.json();

      if (data.length > 0) {
        const user = data[0];
        localStorage.setItem('token', user.token); 
        setError(''); // Сбрасываем ошибку
        setUsername(''); // Очищаем поле ввода имени пользователя
        setPassword(''); // Очищаем поле ввода пароля
        navigate('/'); // Перенаправление на главную страницу
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Something went wrong');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required // Обязательное поле
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Обязательное поле
        />
        <button type="submit">Login</button>
        <Link to="/register"><button type="button">Register</button></Link>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
