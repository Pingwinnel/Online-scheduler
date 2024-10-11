// src/components/Header.js
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, onLogout }) {
  return (
    <header>
      <nav>
        <Link to="/">Главная</Link>
        {isLoggedIn ? (
          <>
            <Link to="/calendar">Мой Календарь</Link>
            <button onClick={onLogout}>Выйти</button>
          </>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
