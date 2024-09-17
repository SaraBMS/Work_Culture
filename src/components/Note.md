import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import signUp from '../assets/Signup.png';
import api from '../api/SignUpAPI.js';
import PasswordInput from './PasswordInput';
import './signup.css';
import Transition from '../Transition';
import profile_pic from '../assets/profile_pic.png';
import Select from './Select.jsx';


// Array for ecah select box 

const options1 = [
    { value: 'BackPoint0', label: 'BackPoint0 ', color: '#ff0000' }, 
    { value: 'BackPoint1', label: 'BackPoint1 ', color: '#00ff00' }, 
    { value: 'BackPoint2', label: 'BackPoint2 ', color: '#0000ff' }, 
  ];

const options2 = [
    { value: 'AISyro', label: 'AISyro', color: '#EE9C50' }, 
    { value: 'ARSyro', label: 'ARSyro ', color: '#A744FF' }, 
    { value: 'ProSyro', label: 'ProSyro ', color: '#018DFD' }, 
    { value: 'DevSyro', label: 'DevSyro ', color: '#fff' }, 
  ];
  
  const options3 = [
    { value: 'Item1', label: 'Item 1', color: '#ff00ff' }, 
    { value: 'Item2', label: 'Item 2', color: '#ffff00' }, 
    { value: 'Item3', label: 'Item 3', color: '#00ffff' }, 
  ];
  

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isPasswordConfVisible, setIsPasswordConfVisible] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);


    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedOption3, setSelectedOption3] = useState(null);
  
    
  

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if password and confirm password match
            if (password !== passwordConf) {
                setPasswordError("Password and confirm password do not match");
                return;
            } else {
                setPasswordError('');
            }
            await api.post('/SignUpAPI', { name, email, password, passwordConf,image , selectedOption1, selectedOption2, selectedOption3});
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConf('');
            setIsPasswordVisible(true);
            setIsPasswordConfVisible(true);
            setSelectedOption1('');
            setSelectedOption2('');
            setSelectedOption3('');
            setCurrentStep(currentStep === 1 ? 2 : 1);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };

    return (
        <div className='sign__container' id='signUp'>
            <div className="sign__container-content">
                <div className="sign__container-content-header">
                    <img src={logo} alt="logo" />
                    <h1>Sign Up</h1>
                    <div className="progress-bar">
                        <div className={`progress-dot ${currentStep === 1 ? 'active' : ''}`}></div>
                        <div className={`progress-dot ${currentStep === 2 ? 'active' : ''}`}></div>
                    </div>
                </div>
                <div className="sign__container-content-inputs">
                    <form onSubmit={handleSubmit}>
                        {currentStep === 1 && (
                            <>
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    required
                                    placeholder='Full Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    placeholder='Email Address'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <PasswordInput
                                    password={password}
                                    setPassword={setPassword}
                                    passwordConf={passwordConf}
                                    setPasswordConf={setPasswordConf}
                                    isPasswordVisible={isPasswordVisible}
                                    setIsPasswordVisible={setIsPasswordVisible}
                                    isPasswordConfVisible={isPasswordConfVisible}
                                    setIsPasswordConfVisible={setIsPasswordConfVisible}
                                />
                            </>
                                )}
                    {currentStep === 2 && (
                                    <>
                        <div className='sign__container-content-header-profile' onClick={handleImageClick}>
                                <img src={image || profile_pic} alt="your_image" />
                                <h4>Upload Your Photo</h4>
                                <label htmlFor="imgUpload">Upload image</label>
                                <input
                                id='imgUpload'
                                type="file"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                                ref={inputRef} // Add ref here
                                />
                                </div>  
                               
                                     <Select options1={options1}
                                     options2={options2} options3={options3}
                                     selectedOption1={selectedOption1}
                                     selectedOption2={selectedOption2}
                                     selectedOption3={selectedOption3}
                                     setSelectedOption1={setSelectedOption1}
                                     setSelectedOption2={setSelectedOption2}
                                     setSelectedOption3={setSelectedOption3}
                                     />
     
    

                                    </>
                                )}
                        {passwordError && <div className="error">{passwordError}</div>}

                        <button type="submit" className='button'>
                            {currentStep === 1 ? 'Next' : 'Sign Up'}
                        </button>
                        <div className="sign__container-content-account">
                            Already have an account?
                            <Link to="/login">
                                <span>Login</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="sign__container-image">
                <img src={signUp} alt="illustration" />
            </div>
        </div>
    );
};

export default Transition(SignUp)


,
    {
      "id": "3834",
      "name": "Leen Deeb",
      "email": "leen@d",
      "password": "kl;',./m",
      "passwordConf": "kl;',./m",
      "image": "blob:http://localhost:3000/5dfd29fd-6599-40fb-a9fa-9a0c85bd603a",
      "selectedOption1": "BackPoint0",
      "selectedOption2": "ProSyro",
      "selectedOption3": "Item1"
    },
    {
      "id": "4ca0",
      "name": "Mohammed Hassan",
      "email": "mohammed@h",
      "password": "qwertyui",
      "passwordConf": "qwertyui",
      "image": "blob:http://localhost:3000/e9e59337-5e6b-466e-8108-8d0d161f133e",
      "selectedOption1": "BackPoint1",
      "selectedOption2": "ArtSyro",
      "selectedOption3": "Item1"
    },
   
    {
      "id": "4eab",
      "name": "Leen Deeb",
      "email": "leen@l",
      "password": "vbm,./''",
      "passwordConf": "vbm,./''",
      "image": "blob:http://localhost:3000/ff4b92c9-b36a-4865-b281-355a513a55fd",
      "selectedOption1": "BackPoint0",
      "selectedOption2": "ProSyro",
      "selectedOption3": "Item3"
    },
    {
      "id": "5efd",
      "name": "Eve",
      "email": "eve@e",
      "password": "evesaralaya",
      "passwordConf": "evesaralaya",
      "image": "blob:http://localhost:3000/e59e9c31-c46a-4814-a913-4f1c4fbee92e",
      "selectedOption1": "BackPoint0",
      "selectedOption2": "iSyro",
      "selectedOption3": "Item1"
    },
    {
      "id": "a1d8",
      "name": "sara",
      "email": "sara@f",
      "password": "12121213333333",
      "passwordConf": "12121213333333",
      "image": null,
      "selectedOption1": "BackPoint0",
      "selectedOption2": "iSyro",
      "selectedOption3": "Item3",
      "check": false,
      "number": "",
      "bio": "",
      "verificationCode": "2154"
    },
    {
      "id": "c8f8",
      "question": "hi"
    },
    {
      "id": "76fc",
      "question": "hi"
    },
    {
      "id": "4b78",
      "name": "admin",
      "email": "admin@example.com",
      "password": "12345678",
      "passwordConf": "12345678",
      "image": null,
      "selectedOption1": "BackPoint0",
      "selectedOption2": "iSyro",
      "selectedOption3": "Item1",
      "check": false,
      "number": "",
      "bio": "",
      "verificationCode": ""
    },
    {
      "id": "cf0d",
      "name": "sara",
      "email": "admin@admin",
      "password": "12345678",
      "passwordConf": "12345678",
      "image": null,
      "selectedOption1": "BackPoint0",
      "selectedOption2": "ArtSyro",
      "selectedOption3": "Item1",
      "check": false,
      "number": "",
      "bio": "",
      "verificationCode": "",
      "role": "user"
    },
    {
      "id": "8e6a",
      "name": "sara",
      "email": "admin@admin",
      "password": "12345678",
      "passwordConf": "12345678",
      "image": null,
      "selectedOption1": "BackPoint0",
      "selectedOption2": "iSyro",
      "selectedOption3": "Item1",
      "check": false,
      "number": "",
      "bio": "",
      "verificationCode": "",
      "role": "user"
    },
    {
      "id": "bb33",
      "name": "srara",
      "email": "admin@admin.com",
      "password": "12345678",
      "passwordConf": "12345678",
      "image": null,
      "selectedOption1": "BackPoint1",
      "selectedOption2": "iSyro",
      "selectedOption3": "Item1",
      "check": false,
      "number": "",
      "bio": "",
      "verificationCode": "",
      "role": "admin"
    },
    {
      "id": "a53b",
      "name": "srara",
      "email": "admin@admin.com",
      "password": "12345678",
      "passwordConf": "12345678",
      "image": null,
      "selectedOption1": "BackPoint1",
      "selectedOption2": "iSyro",
      "selectedOption3": "Item1",
      "check": false,
      "number": "",
      "bio": "",
      "verificationCode": "",
      "role": "admin"
    },
    {
      "id": "a46a",
      "name": "sara",
      "email": "admin@admin.com",
      "password": "12345678",
      "passwordConf": "12345678",
      "image": null,
      "selectedOption1": "BackPoint0",
      "selectedOption2": "iSyro",
      "selectedOption3": "Item1",
      "check": false,
      "number": "",
      "bio": "",
      "verificationCode": "",
      "role": "admin"
    },
    
    {
      "id": "8818",
      "name": "sara",
      "email": "admin@admin.com",
      "password": "12345678",
      "passwordConf": "12345678",
      "image": null,
      "selectedOption1": "BackPoint0",
      "selectedOption2": "iSyro",
      "selectedOption3": "Item1",
      "check": false,
      "number": "",
      "bio": "",
      "verificationCode": "",
      "role": "admin"
    },
    {
      "id": "2e85",
      "name": "sara",
      "email": "sara@f",
      "password": "12345678",
      "passwordConf": "12345678",
      "image": null,
      "selectedOption3": "Item1",
      "number": "cxczxcvczvc",
      "bio": "rgfgf"
    },
    {
      "id": "90e0",
      "name": "Sara admin",
      "email": "admin@admin.com",
      "password": "12345678",
      "passwordConf": "12345678",
      "image": null,
      "selectedOption1": "BackPoint0",
      "selectedOption2": "iSyro",
      "selectedOption3": "Item1",
      "check": false,
      "number": "",
      "bio": "",
      "verificationCode": "",
      "role": "admin"
    },
    {
      "id": "7b8f",
      "name": "Sara admin",
      "email": "admin@admin.com",
      "password": "12345678",
      "passwordConf": "12345678",
      "image": null,
      "selectedOption1": "BackPoint0",
      "selectedOption2": "iSyro",
      "selectedOption3": "Item1",
      "check": false,
      "number": "",
      "bio": "",
      "verificationCode": "",
      "role": "admin"
    },
    {
      "id": "0a7c",
      "name": "Sara admin",
      "email": "admin@admin.com",
      "password": "12345678",
      "passwordConf": "12345678",
      "image": null,
      "selectedOption1": "BackPoint0",
      "selectedOption2": "iSyro",
      "selectedOption3": "Item1",
      "check": false,
      "number": "",
      "bio": "",
      "verificationCode": "",
      "role": "admin"
    },
    {
      "id": "1724794779392",
      "type": "Soft Reminder",
      "message": "Soft Reminder has been sent from the admin to ",
      "date": "8/27/2024",
      "read": false,
      "color": "#FFC85C",
      "border": "#FFC85C"
    },
    {
      "id": "1724795233581",
      "type": "Hard Reminder",
      "message": "Hard Reminder has been sent from the admin to ",
      "date": "8/27/2024",
      "read": false,
      "color": "#FF003D",
      "border": "#FF003D"
    },
    {
      "id": "1724922998351",
      "type": "Hard Reminder",
      "message": "Hard Reminder has been sent from the admin to ",
      "date": "8/28/2024",
      "read": false,
      "color": "#FF003D",
      "border": "#FF003D"
    },
    {
      "id": "1724923000193",
      "type": "Hard Reminder",
      "message": "Hard Reminder has been sent from the admin to ",
      "date": "8/28/2024",
      "read": false,
      "color": "#FF003D",
      "border": "#FF003D"
    },
    {
      "id": "e0d8",
      "question": "what the fuck is going on ?"
    },
    {
      "id": "74b3",
      "question": "Hi  Sara"
    },
    {
      "id": "81ee",
      "question": "hi baby"
    },
    {
      "id": "64a0",
      "question": "Where would I go if I runway ?"
    },
    {
      "id": "2535",
      "question": "You will succeed "
    },
    {
      "id": "29bf",
      "question": "FUCK YOU"
    },
    {
      "id": "79b7",
      "question": "What id I say"
    },
    {
      "id": "c6cc",
      "question": "I thank God ",
      "date": "2024-08-30T06:10:25.119Z"
    },
    {
      "id": "76fe",
      "question": "I thank God ",
      "date": "2024-08-30T06:10:33.153Z"
    },
    {
      "id": "5e80",
      "question": "What the fuck is going on ?",
      "answer": "Fuck your self"
    },
    {
      "id": "fde7",
      "question": "What the fuck is going on ?",
      "answer": "Fuck your self"
    }
  ]
}
