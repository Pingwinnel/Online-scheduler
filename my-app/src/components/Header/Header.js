import React, {useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import './Header.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserEvents} from "../../store/eventsSlice";
import {fetchCurrentUser} from "../../store/authSlice";

const Header = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(fetchCurrentUser(token));
        }
    }, [dispatch]);

    return (
        <header className="header">
            <img
                src={`${process.env.PUBLIC_URL}/logo192.png`}
                alt="Calendar Logo"
                className="logo"
                style={{width: '40px', height: '40px'}}
            />

            <nav className="nav">
                <ul className="left-nav">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    {token && (
                        <li>
                            <NavLink to="/friends">Friends List</NavLink>
                        </li>
                    )}
                </ul>
                <ul className="right-nav">
                    {token ? (
                        <>
                            <li>{currentUser?.username || "User"}</li>
                            {/* Safe access */}
                            <li className="separator"></li>
                            <li className='button_log'>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="separator"></li>
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
        </header>
    );
};

export default Header;
