import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

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
        setError(''); 
        setUsername('');
        setPassword(''); 
        navigate('/'); 
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Something went wrong');
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            className="label_login"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className="label_login"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p>{error}</p>}
          <button type="submit">Login</button>
          <p><a href="#">Forgot password?</a></p>
        </form>
      </div>
      <div className="welcome-section">
        <h2>Welcome to the system</h2>
        <p>Don't have an account?</p>
        <Link to="/register" class="welcome_reg">Register</Link>
      </div>
    </div>
  );
};

export default Login;
