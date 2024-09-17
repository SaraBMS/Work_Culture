import React, { useState, useContext, createContext, useRef, useEffect } from 'react';
import api from '../api/SignUpAPI';
import { register } from '../api/auth';
// Create Contexts
const EmailContext = createContext();
const CodeContext = createContext();
const ImageContext = createContext();
const RoleContext = createContext(); // New Role Context
const AuthContext = createContext(); // New Auth Context for authentication

export const EmailProvider = ({ children }) => {
    // Email Context States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [yourQue, setYourQue] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isPasswordConfVisible, setIsPasswordConfVisible] = useState(true);
    const [bio, setBio] = useState('');
    const [number, setNumber] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedOption3, setSelectedOption3] = useState(null);
    const [check, setCheck] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [image, setImage] = useState(null);
    const inputRef = useRef(null);
    const [agency, setAgency] = useState('');

    // New state to manage user role
    const [role, setRole] = useState("user");

    // Auth Context States
    const [authToken, setAuthToken] = useState(true);
    const [user, setUser] = useState(null);

    const options1 = [
        { value: 'BackPoint0', label: 'BackPoint0 ', color: '#ff0000' },
        { value: 'BackPoint1', label: 'BackPoint1 ', color: '#00ff00' },
        { value: 'BackPoint2', label: 'BackPoint2 ', color: '#0000ff' },
    ];

    const options2 = [
        { value: 'iSyro ', label: 'iSyro', color: '#EE9C50' },
        { value: 'ArtSyro ', label: 'ArtSyro ', color: '#A744FF' },
        { value: 'ProSyro ', label: 'ProSyro ', color: '#018DFD' },
        { value: 'DevSyro ', label: 'DevSyro ', color: '#fff' },
    ];

    const options3 = [
        { value: 'Item1', label: 'Item 1', color: '#ff00ff' },
        { value: 'Item2', label: 'Item 2', color: '#ffff00' },
        { value: 'Item3', label: 'Item 3', color: '#00ffff' },
    ];

    const [notifications, setNotifications] = useState([]);

    // New state for questions
    const [questions, setQuestions] = useState([]);

    // Fetch questions when email or yourQue changes
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get('/SignUpAPI', { params: { question: yourQue } });
                const fetchedQuestions = response.data;
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error.message);
            }
        };

        fetchQuestions();
    }, [email, yourQue]);

    // Fetch user data including agency to be able to access profile team mates
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const userData = await api.get('/SignUpAPI'); // Replace with actual API
    //             setAgency(userData.data.agency); // Store the user's agency
    //             // setRole(userData.data.role); // Store the user's role
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };
    //     fetchUserData();
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            email,
            password,
            passwordConf,
            image,
            selectedOption1: selectedOption1 ? selectedOption1.value : null,
            selectedOption2: selectedOption2 ? selectedOption2.value : null,
            selectedOption3: selectedOption3 ? selectedOption3.value : null,
            check,
            number,
            bio,
            verificationCode: verificationCode.join(''),
            role,
        };

        console.log('Payload:', payload);

        try {

            // Validation logic for name input
            if (name.trim() === '') {
                setNameError('Name is required');
                return; // Prevent form submission
            } else {
                setNameError(''); // Clear error if name is valid
            }
            if (password !== passwordConf) {
                setPasswordError("Password and confirm password do not match");
                return;
            } else if (password.length < 8) {
                setPasswordError("Password must be at least 8 characters long");
                return;
            } else {
                setPasswordError('');
            }

            if (!email.includes('@')) {
                setEmailError("Email must contain '@'");
                return;
            } else {
                setEmailError('');
            }


            const resetForm = () => {
                setName('');
                setEmail('');
                setPassword('');
                setPasswordConf('');
                setSelectedOption1(null);
                setSelectedOption2(null);
                setSelectedOption3(null);
                setCheck(false);
                setVerificationCode(['', '', '', '']);
                setImage(null);
                setNumber('');
                setBio('');
            };

            const response = await api.post('/SignUpAPI', payload);
            console.log('Response:', response.data);

            if (response.status === 200) {
                // Handle user authentication and role here
                const token = await register(email, password);
                localStorage.setItem('token', token);
                setAuthToken(token); // Update auth token state
                setRole(role); // If needed, update the role state
                console.log('User signed up successfully:', response.data);
                resetForm();
            } else {
                console.log('Server error:', response.data.error || 'Unknown error');
            }
        } catch (err) {
            console.log(`Server error: ${err.message}`);
        }
    };

    const handleToggleVisibility = (field) => {
        if (field === 'password') {
            setIsPasswordVisible(!isPasswordVisible);
        } else if (field === 'passwordConf') {
            setIsPasswordConfVisible(!isPasswordConfVisible);
        }
    };

    const handleChange = (index, value) => {
        const updatedVerificationCode = [...verificationCode];
        updatedVerificationCode[index] = value;
        setVerificationCode(updatedVerificationCode);

        if (value !== '' && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    return (
        <EmailContext.Provider value={{
            name, setName, email, setEmail, password, setPassword, nameError, setNameError,
            passwordConf, setPasswordConf, passwordError, setPasswordError, isPasswordVisible,
            setIsPasswordVisible, isPasswordConfVisible, setIsPasswordConfVisible, currentStep,
            setCurrentStep, selectedOption1, setSelectedOption1, selectedOption2, setSelectedOption2,
            selectedOption3, setSelectedOption3, bio, setBio, check, setCheck, number, setNumber, handleToggleVisibility,
            options1, options2, options3, emailError, setEmailError, handleSubmit, notifications, setNotifications,
            yourQue, setYourQue, questions, setQuestions, agency, setAgency
        }}>
            <CodeContext.Provider value={{ verificationCode, setVerificationCode, handleChange, inputRefs }}>
                <ImageContext.Provider value={{ image, setImage, handleImageClick, handleImageChange, inputRef }}>
                    <RoleContext.Provider value={{ role }}>
                        <AuthContext.Provider value={{ authToken, user, setAuthToken, setUser }}>
                            {children}
                        </AuthContext.Provider>
                    </RoleContext.Provider>
                </ImageContext.Provider>
            </CodeContext.Provider>
        </EmailContext.Provider>
    );
};

export const useEmail = () => useContext(EmailContext);
export const useCode = () => useContext(CodeContext);
export const useImage = () => useContext(ImageContext);
export const useRole = () => useContext(RoleContext);
export const useAuth = () => useContext(AuthContext); // Export the custom hook for authentication
