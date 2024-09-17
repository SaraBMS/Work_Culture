
// Origin Login:

import React,{useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import loginImg from '../assets/images/login.png';
import api from '../api/SignUpAPI.js';
import './login.css';
import Transition from '../Transition';
import PasswordLogin from './PasswordLogin';
import { useEmail, useAuth } from '../hook/EmailProvider.js';
import {login} from '../api/auth.js';

const Login = () => {
    const { email, setEmail, check, setCheck, password, setPassword } = useEmail();
    const { setAuthToken } = useAuth(); // Access context functions for authentication and role
    const navigate = useNavigate(); // For navigation after login
    const location = useLocation();

 // Update document title based on the current path
    useEffect(() => {
        const path = location.pathname;
        if (path === '/login') {
            document.title = "Work Culture | Login";
        } else {
            document.title = "Work Culture";
        }
    }, [location.pathname]);

    const handleCheckbox = () => {
        setCheck(!check);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/SignUpAPI', { email, password, check });
            console.log('Response:', response.data);

            if (response.status === 200) {
                // Handle successful login
                const token = await login(email, password);
                localStorage.setItem('token', token);
                setAuthToken(token); // Update auth token state
                resetForm();
                navigate('/admin'); // Redirect to a protected route (e.g., dashboard)
            } else {
                console.log('Login failed:', response.data.error || 'Unknown error');
            }
        } catch (err) {
            console.log(`Login failed: ${err.message}`);
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setCheck(false);
    };

    return (
        <div className='log__container' id='login'>
            <div className="log__container-image">
                <img src={loginImg} alt="illustration" />
            </div>
            <div className="log__container-content">
                <div className="log__container-content-header">
                    <img src={logo} alt="logo" />
                    <h1>Login</h1>
                </div>
                <div className="log__container-content-inputs">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email" className='log_label'>Email Address</label>
                        <input
                            className='log_input'
                            type="email"
                            id="email"
                            required
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PasswordLogin />
                        <div className='log__container-content-forget_password'>
                            <label htmlFor="check" className='cl-checkbox'>
                                <input
                                    type="checkbox"
                                    id="check"
                                    checked={check}
                                    onChange={handleCheckbox}
                                />
                                <span></span>
                                Remember me
                            </label>
                            <Link to="/forgetpassword">
                                <span className='forget_link'>Forget Password</span>
                            </Link>
                        </div>
                        <button type="submit" className='button'>
                            Log In
                        </button>
                        <div className="log__container-content-account_create">
                            Don't have an account yet?
                            <Link to="/signup">
                                <span>Create account</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Transition(Login);