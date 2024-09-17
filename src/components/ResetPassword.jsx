import React, { useState,useEffect } from 'react';
import { useEmail, useCode } from '../hook/EmailProvider';
import logo from '../assets/images/logo.png'
import login from '../assets/images/login.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './resetpassword.css';
import Transition from '../Transition';
import { useLocation } from 'react-router-dom';

const Resetpassword = () => {
const {  password, setPassword,
    passwordConf, setPasswordConf, isPasswordVisible,
  isPasswordConfVisible,
     handleToggleVisibility, passwordError, handleSubmit} = useEmail();
     const location = useLocation();
// const {verificationCode, setVerificationCode} = useCode();


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const payload = {email, password, passwordConf,verificationCode: verificationCode.join('')}

    //     try {
    //       if (password !== passwordConf) {
    //         setp("password and confirm password do not match");
    //         return;}
    //         else if (password.length < 8) {
    //             setpasswordError("password must be at least 8 characters long");
    //         return;
    //     } else {
    //         setpasswordError('');
    //     }
    //          await api.post('/SignUpAPI',payload );
    //          setpassword('');
    //          setpasswordConf('');
    //          setIspasswordVisible(true);
    //          setIspasswordConfVisible(true);
    //          setVerificationCode('');
    //     } catch (err) {
    //         console.log(`Error: ${err.message}`);
    //     }
    // };
 // Document title based on path name 
 useEffect(() => {
    const path = location.pathname;
    if (path === '/resetpassword') {
        document.title = "Work Culture | Reset Password";
    } else {
        document.title = "Work Culture";
    }
}, [location.pathname]);

  return (

    <div className='reset__container' id='Resetpassword'>
      <div className="reset__container-image">
        <img src={login} alt="illustration" />
    </div>
    <div className="reset__container-content">
        <div className="reset__container-content-header">
            <img src={logo} alt="logo" />
            <h1>Reset password</h1>
            <p>Enter your New password to access your account</p>
        </div>
        <div className="reset__container-content-inputs">
            <form onSubmit={handleSubmit}>
            <label htmlFor="password">password</label>
            <div className="input-container">
                <input
                    type={isPasswordVisible ? 'password' : 'text'}
                    id="password"
                    required
                    placeholder='New Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="toggle-password-visibility" onClick={() => handleToggleVisibility('password')}>
                    {isPasswordVisible ? <FaEye/> :  <FaEyeSlash/> }  
                </button>
            </div>
            <label htmlFor="passwordConf">Confirm password</label>
            <div className="input-container">
                <input
                    type={isPasswordConfVisible ? 'password' : 'text'}
                    id="passwordConf"
                    required
                    placeholder='Confirm New Password'
                    value={passwordConf}
                    onChange={(e) => setPasswordConf(e.target.value)}
                />
                
                <button type="button" className="toggle-password-visibility" onClick={() => handleToggleVisibility('passwordConf')}>
                {isPasswordConfVisible ? <FaEye/> :  <FaEyeSlash/> }  
                </button>
                </div>
                {passwordError && <div className="error">{passwordError}</div>}
               
                <button type="submit" className='button' >
                Reset password
                </button>
              
            </form>
        </div>
        
    </div>
    
</div>
  )
}

export default Transition(Resetpassword);
