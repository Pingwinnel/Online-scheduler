import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = ({ handleBackButton }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="home-container">
            <h1>Welcome to the Calendar app</h1>
            <nav>
                <ul className="nav-list">
                    {token ? (
                        <>
                            <li>
                                <NavLink to="/users" className="nav-link">Users List</NavLink>
                            </li>
                            <li>
                                <NavLink to="/friends" className="nav-link">Friends List</NavLink>
                            </li>
                            <li>
                                <NavLink to="/calendar" className="nav-link">Calendar App</NavLink>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/register" className="nav-link">Register</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Home;
