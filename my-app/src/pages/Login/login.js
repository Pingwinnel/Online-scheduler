    import React, {useState, useEffect} from 'react';
    import {Link, useNavigate} from 'react-router-dom';
    import classes from './login.css'
    import '@fortawesome/fontawesome-free/css/all.min.css';


    const Login = ({handleBackButton}) => {
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
            <div className={"container_login"}>
                <div className={"login-form"}>
                    <button className={"back-button"} onClick={handleBackButton}>Back</button>
                    <h2 className={classes.h2}>Login</h2>
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
                        {error && <p className={"error_text"}>{error}</p>}
                        <button type="submit">Login</button>
                        <div className={"register_link"}>
                            <p>Don`t have a account?{<Link to="/register" class="welcome_reg_text"
                                                           className={"text"}>Register</Link>}</p>
                        </div>

                    </form>

                </div>
            </div>
        )
            ;
    };

    export default Login;