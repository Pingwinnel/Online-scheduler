    import React from 'react';
    import { NavLink, useNavigate } from 'react-router-dom';
    import './Header.css'; 
    const Header = () => {
        const token = localStorage.getItem('token');
        const navigate = useNavigate();

        const handleLogout = () => {
            localStorage.removeItem('token');
            navigate('/login');
        };

        return (
            <header className="header">
                <img 
                    src={`${process.env.PUBLIC_URL}/logo192.png`} 
                    alt="Calendar Logo" 
                    className="logo" 
                    style={{ width: '40px', height: '40px' }} 
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
                                <li className="separator"></li>
                                <li className='button_log'>
                                    <button  onClick={handleLogout}>Logout</button>
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
