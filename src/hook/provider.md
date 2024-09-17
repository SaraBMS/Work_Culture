import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/DashboardAPI";
import { useEmail } from './EmailProvider';
import useAxiosFetch from "./useAxiosFetch";

const GoalContext = createContext();

export const CanvasProvider = ({ children }) => {
    const [goals, setGoals] = useState([]);
    const [goalDescrip, setGoalDescrip] = useState('');
    const [selectedGoal, setSelectedGoal] = useState(null);
    const { email } = useEmail();
    const { data } = useAxiosFetch('http://localhost:3400/DashboardAPI');

    const handleSaveGoal = async (e) => {
        e.preventDefault();
        if (selectedGoal) {
            // If a goal is selected, update it
            handleEditGoal(selectedGoal.id, goalDescrip);
        } else {
            // Otherwise, create a new goal
            const id = goals.length ? goals[goals.length - 1].id + 1 : 1;
            const newGoal = { id, email, completed: false, description: goalDescrip };
            try {
                const response = await api.post('./DashboardAPI', newGoal);
                const allGoals = [...goals, response.data];
                setGoals(allGoals);
                setGoalDescrip('');
            } catch (error) {
                console.log(`Error : ${error.message}`);
            }
        }
    };
    const handleEditGoal = async (id, newDescription) => {
        // Update the property of each selected goal in goals array "description":
        try {
            const updatedGoal = goals.map(goal => goal.id === id ? { ...goal, description: newDescription } : goal);

            const response = await api.put(`./DashboardAPI/${id}`, updatedGoal);
            setGoals(goals.map(goal => goal.id === id ? response.data : goal));
            // Clear the form after saving
            setGoalDescrip('');
            setSelectedGoal(null);
        } catch (error) {
            console.log(`Error : ${error.message}`);
        }
    };


    // const handleEditGoal = (id, newDescription) => {
    //     // Update the property of each selected goal in goals array "description":
    //     setGoals(goals.map(goal => goal.id === id ? { ...goal, description: newDescription } : goal));
    //     // Clear the form after saving
    //     setGoalDescrip('');
    //     setSelectedGoal(null);
    // };

    const toggleGoalCompletion = (id) => {
        setGoals(goals.map(goal =>
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
        ));
    };

    const openGoal = (id) => {
        if (id === null) {
            setSelectedGoal(null);
            setGoalDescrip('');
        } else {
            const goal = goals.find(goal => goal.id === id);
            setSelectedGoal(goal);
            setGoalDescrip(goal ? goal.description : '');
        }
    };

    // useEffect(() => {
    //     const fetchGoals = async () => {
    //         try {
    //             const response = await api.get('/DashboardAPI');
    //             setGoals(response.data);
    //         } catch (error) {
    //             if (error.response) {
    //                 console.log(error.response.data);
    //                 console.log(error.response.status);
    //                 console.log(error.response.headers);
    //             } else {
    //                 console.error('Error fetching goals:', error);
    //             }
    //         }
    //     };

    //     fetchGoals();
    // }, []);

    // Fetch goals by fetch data of useAxiosFetch 
    useEffect(() => {
        setGoals(data);
    }, [data]);

    return (
        <GoalContext.Provider value={{
            goals, goalDescrip, setGoalDescrip, handleSaveGoal,
            toggleGoalCompletion, selectedGoal, openGoal, handleEditGoal
        }}>
            {children}
        </GoalContext.Provider>
    );
};

export const useGoals = () => useContext(GoalContext);













// Submit Sign up to handle image formate  

import React, { useState, useContext, createContext, useRef, useEffect } from 'react';
import api from '../api/SignUpAPI';
import { register } from '../api/auth';

// Create Contexts
const EmailContext = createContext();
const CodeContext = createContext();
const ImageContext = createContext();
const RoleContext = createContext();
const AuthContext = createContext(); // New Auth Context for authentication

export const EmailProvider = ({ children }) => {
    // Combine all states into one formData state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        yourQue: '',
        password: '',
        passwordConf: '',
        bio: '',
        number: '',
        selectedOption1: null,
        selectedOption2: null,
        selectedOption3: null,
        check: false,
        verificationCode: ['', '', '', ''],
        image: null,
        role: 'user', // default role
        agency: '',
    });

    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isPasswordConfVisible, setIsPasswordConfVisible] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const inputRef = useRef(null);
    const [notifications, setNotifications] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [authToken, setAuthToken] = useState(true);
    const [user, setUser] = useState(null);

    const options1 = [...]; // your select options
    const options2 = [...];
    const options3 = [...];

    // Generalized handleChange function for updating formData
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value; // Handle checkbox value
        setFormData({
            ...formData,
            [name]: val, // Dynamically update the correct field
        });
    };

    // Validation logic for name, email, and password
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, passwordConf } = formData;

        if (name.trim() === '') {
            setNameError('Name is required');
            return;
        } else {
            setNameError('');
        }

        if (password !== passwordConf) {
            setPasswordError("Passwords don't match");
            return;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
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

        // Payload for API submission
        const payload = {
            ...formData,
            verificationCode: formData.verificationCode.join(''), // Format code
            selectedOption1: formData.selectedOption1 ? formData.selectedOption1.value : null,
            selectedOption2: formData.selectedOption2 ? formData.selectedOption2.value : null,
            selectedOption3: formData.selectedOption3 ? formData.selectedOption3.value : null,
        };

        try {
            const response = await api.post('/SignUpAPI', payload);
            console.log('Response:', response.data);

            if (response.status === 200) {
                const token = await register(formData.email, formData.password);
                localStorage.setItem('token', token);
                setAuthToken(token); // Update authentication state
                setUser(response.data.user); // Update user data
                console.log('User signed up successfully');
            } else {
                console.log('Server error:', response.data.error || 'Unknown error');
            }
        } catch (err) {
            console.log(`Server error: ${err.message}`);
        }
    };

    // Image and verification code handling
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, image: imageUrl });
        }
    };

    const handleVerificationCodeChange = (index, value) => {
        const updatedCode = [...formData.verificationCode];
        updatedCode[index] = value;
        setFormData({ ...formData, verificationCode: updatedCode });

        if (value !== '' && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    return (
        <EmailContext.Provider value={{
            formData, setFormData, passwordError, nameError, emailError, isPasswordVisible,
            setIsPasswordVisible, isPasswordConfVisible, setIsPasswordConfVisible, currentStep,
            setCurrentStep, handleChange, handleSubmit, handleImageChange, handleVerificationCodeChange,
            inputRefs, notifications, setNotifications, questions, setQuestions
        }}>
            <CodeContext.Provider value={{ verificationCode: formData.verificationCode, handleVerificationCodeChange }}>
                <ImageContext.Provider value={{ image: formData.image, handleImageChange }}>
                    <RoleContext.Provider value={{ role: formData.role }}>
                        <AuthContext.Provider value={{ authToken, user, setAuthToken, setUser }}>
                            {children}
                        </AuthContext.Provider>
                    </RoleContext.Provider>
                </ImageContext.Provider>
            </CodeContext.Provider>
        </EmailContext.Provider>
    );
};

// Custom Hooks to access contexts
export const useEmail = () => useContext(EmailContext);
export const useCode = () => useContext(CodeContext);
export const useImage = () => useContext(ImageContext);
export const useRole = () => useContext(RoleContext);
export const useAuth = () => useContext(AuthContext);


// On sign up 
<input name="name" value={formData.name} onChange={handleChange} />

