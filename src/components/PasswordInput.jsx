import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './passwordinput.css';
import { useEmail } from '../hook/EmailProvider.js';

const PasswordInput = ({handlePasswordChange, handlePasswordConfChange}) => {
    
const {handleToggleVisibility, password, setPassword, passwordConf, setPasswordConf, isPasswordVisible, isPasswordConfVisible  } = useEmail();
    // const handleToggleVisibility = (field) => {
    //     if (field === 'password') {
    //         setIsPasswordVisible(!isPasswordVisible);
    //     } else if (field === 'passwordConf') {
    //         setIsPasswordConfVisible(!isPasswordConfVisible);
    //     }
    // };

    return (
        <div className="password-input">
            <label htmlFor="password">Password</label>
            <div className="input-container">
                <input
                    type={isPasswordVisible ? 'password' : 'text'}
                    id="password"
                    required
                    placeholder='Password'
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button type="button" className="toggle-password-visibility" onClick={() => handleToggleVisibility('password')}>
                    {isPasswordVisible ? <FaEye/> :  <FaEyeSlash/> }  
                </button>
            </div>
            <label htmlFor="passwordConf">Confirm Password</label>
            <div className="input-container">
                <input
                    type={isPasswordConfVisible ? 'password' : 'text'}
                    id="passwordConf"
                    required
                    placeholder='Confirm Password'
                    value={passwordConf}
                    onChange={handlePasswordConfChange}
                />
                <button type="button" className="toggle-password-visibility" onClick={() => handleToggleVisibility('passwordConf')}>
                {isPasswordConfVisible ? <FaEye/> :  <FaEyeSlash/> }  
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
