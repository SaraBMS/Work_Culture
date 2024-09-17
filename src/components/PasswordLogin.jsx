import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './passwordinput.css';
import { useEmail } from '../hook/EmailProvider.js';

const PasswordInput = () => {
const { password, setPassword, isPasswordVisible, setIsPasswordVisible  } = useEmail();
    
    const handleToggleVisibility = () => {
            setIsPasswordVisible(!isPasswordVisible);}
    return (
        <div className="password-input">
            <label htmlFor="password" className='log_label'>Password</label>
            <div className="input-container">
                <input
                 className='log_input'
                    type={isPasswordVisible ? 'password' : 'text'}
                    id="password"
                    required
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="toggle-password-visibility" onClick={() => handleToggleVisibility('password')}>
                    {isPasswordVisible ? <FaEye/> :  <FaEyeSlash/> }  
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
