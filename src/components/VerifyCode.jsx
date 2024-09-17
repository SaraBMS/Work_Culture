import React from 'react';
import { Link  } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import login from '../assets/images/login.png';
import api from '../api/SignUpAPI';
import {useEmail, useCode} from '../hook/EmailProvider'
import './verifycode.css';
import Transition from '../Transition';


const VerifyCode = () => {
  const {verificationCode, handleChange, inputRefs} = useCode();
  const {email, handleSubmit} = useEmail();

  // Function to display email in the paragraph
  const renderEmail = () => {
    if (email) {
        return <span>{email} </span>;
    } else {
        return <span>No email provided</span>;
    }
};

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//       // const response = await api.post('/SignUpAPI', {
//       //     email,
//       //     verificationCode
//       // });
      
//       // Make API call to verify code
//       await api.post('/SignUpAPI', {
//         email,
//         verificationCode: verificationCode.join('')
//       });
//       // Handle response from the API call
//   } catch (err) {
//       console.log(`Error: ${err.message}`);
//   }
// };

const handleResendCode = async () => {
  try {
      // Make API call to resend verification code
      // const response = await api.post('/SignUpAPI', { email });
      await api.post('/SignUpAPI', { email });
      // Optionally, you can handle the response (e.g., show a success message)
      console.log('Verification code resent successfully!');
  } catch (err) {
      console.log(`Error resending verification code: ${err.message}`);
  }
};

  return (

    <div className='verify__container' id='VerifyCode'>
      <div className="verify__container-image">
        <img src={login} alt="illustration" />
    </div>
    <div className="verify__container-content">
        <div className="verify__container-content-header">
            <img src={logo} alt="logo" />
            <h1>Enter Verification Code</h1>
            <p>We have just sent a verification code to {renderEmail()}</p>
        </div>
        <div className="verify__container-content-inputs">
            <form onSubmit={handleSubmit} className='verify_form'>
            {verificationCode.map((value, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength="1"
                required
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
              <span className='empty'></span>
              <Link to="/resetpassword" >
                <button type="submit" className='verify' >
               
                  Verify
                </button>
                </Link>
                <button type="submit" className='resend' onClick={handleResendCode}>
                 Resend Code
                </button>
            </form>
        </div>
        
    </div>
    
</div>
  )
}

export default Transition(VerifyCode);
