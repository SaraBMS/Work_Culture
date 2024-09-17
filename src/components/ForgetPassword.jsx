import React from 'react';
import { Link  } from 'react-router-dom';
import { useEmail } from '../hook/EmailProvider';
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/images/logo.png'
import login from '../assets/images/login.png';
import './forgetpassword.css';
import Transition from '../Transition';

const ForgetPassword = () => {
    const { email, setEmail, handleSubmit} = useEmail();
    // const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response= await api.post('/SignUpAPI', {email});
    //         if (response.db.success) {
    //             // Handle successful password reset request (e.g., show success message)
    //             console.log('Password reset code sent successfully!');
    //             setEmail(''); // Clear email field after successful request
    //           } else {
    //             // Handle unsuccessful request (e.g., show error message)
    //             console.error('Error sending password reset request:');
    //           }
    //     } catch (err) {
    //         console.log(`Error: ${err.message}`);
    //     }
    // };


  return (

    <div className='forget__container' id='forgetPassword'>
      <div className="forget__container-image">
        <img src={login} alt="illustration" />
    </div>
    <div className="forget__container-content">
        <div className="forget__container-content-header">
            <img src={logo} alt="logo" />
            <h1>Recover your password</h1>
            <p>Enter the email that you used when register to recover your password. You will receive a password reset link.
</p>
        </div>
        <div className="forget__container-content-inputs">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    required
                    placeholder='Email Address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              <span className='empty'></span>
              <Link to="/verifycode">
                <button type="submit" >
                   Send Link
                </button>
                </Link>
                <div className="forget__container-content-back">
                    <Link to="/login" className='login'>
                        <FaArrowLeft />
                        <span> Back to Login</span>
                    </Link>
                     </div>
                    <div className="forget__container-content-assist">
                    If you need further assistance
                    <Link to="/">
                        <span> Contact our support team</span>
                    </Link>
                     </div>
            </form>
        </div>
        
    </div>
    
</div>
  )
}

export default Transition(ForgetPassword);
