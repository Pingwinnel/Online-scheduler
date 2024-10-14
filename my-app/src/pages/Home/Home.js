import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import  classes from "./Home.module.css";
import Calendar_App from "../../components/CalendarApp/Calendar_App";

const Home = ({handleBackButton }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h1>Welcome to the User Management System</h1>
            <nav>
                <ul>
                    {token ? (
                        <>
                            <li>
                                <NavLink to="/users">Users List</NavLink>
                            </li>
                            <li>
                                <NavLink to="/friends">Friends List</NavLink>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">Register</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Home;