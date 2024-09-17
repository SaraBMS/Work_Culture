import React, { useState, useEffect } from 'react';
import './askquestion.css';
import { useStateContext } from '../../hook/ContextProvider';
import { useEmail } from '../../hook/EmailProvider';
import api from '../../api/QuestionAPI';

const AskQuestion = () => {
    const { yourQue, setYourQue, email } = useEmail();
    const { showpopUp, closepopUp } = useStateContext();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [askedQuestio, setaskedQuestion] = useState(null); // New state
    const [questionVisible, setQuestionVisible] = useState(false); // New state

    useEffect(() => {
        if (showpopUp.popup) {
            setPopupVisible(true);
        }
    }, [showpopUp.popup]);

    const handleSubmitQue = async (e) => {
        e.preventDefault();
        const currentDate =  new Date().toLocaleDateString() 
    
        try {
            console.log('Submitting Question:', yourQue);
            const response = await api.post('/QuestionAPI', {
                question: yourQue,
                date: currentDate,
                email:email // Send the date with the question
            });
            console.log('Response:', response.data);
            if (response.status === 200) {
                setYourQue(''); // Clear the input after successful submission
                closepopUp(); // Close the popup after submission
                setaskedQuestion('answer sent successfully');
                setQuestionVisible(true)
            } else {
                console.log('Server error:', response.data.error || 'Unknown error');
                setaskedQuestion('Failed to send notification');
                setQuestionVisible(true);
            }
        } catch (err) {
            console.log(`Server error: ${err.message}`);
            setaskedQuestion('Error sending notification');
            setQuestionVisible(true);
        }
        setYourQue('');
        setPopupVisible(false);
        closepopUp();
    
        // Hide the notification after 3 seconds
        setTimeout(() => {
            setQuestionVisible(false);
        }, 3000);
    };

    return (
        isPopupVisible && (
            <div className={`askquestion ${showpopUp.popup ? 'show' : ''}`}>
                <div className="askquestion-container">
                    <div className="askquestion-container-header">
                        <h2>Ask Your Question</h2>
                    </div>
                    <div className="askquestion-container-question_field">
                        <label htmlFor="yourQuestion">Your Question</label>
                        <textarea
                            type="text"
                            id="yourQuestion"
                            required
                            value={yourQue} 
                            onChange={(e) => setYourQue(e.target.value)}
                        />
                    </div>
                    <div className="askquestion-container-buttons">
                        <button type='button' className='cancel_button' onClick={closepopUp}>
                            Cancel
                        </button>
                        <button type='submit' className='save_button' onClick={handleSubmitQue}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default AskQuestion;
