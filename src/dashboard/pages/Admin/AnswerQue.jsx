import React, { useState, useEffect } from 'react';
import './answerque.css';
import { useStateContext } from '../../../hook/ContextProvider';
import api from '../../../api/QuestionAPI';
import { useEmail } from '../../../hook/EmailProvider';

const AnswerQue = () => {
    const [answerQue, setAnswerQue] = useState('');
    const { email } = useEmail();
    const { showAnspopUp, closeAnspopUp, selectedQuestion, markQuestionAsAnswered  } = useStateContext();
    const [isAnsPopupVisible, setAnsPopupVisible] = useState(false);
    const [answerdQuestion, setAnsweredQuestion] = useState(null); // New state
    const [AnswerVisible, setAnswerVisible] = useState(false); // New state
    const [isAnswered, setIsAnswered] = useState(false); // New state to manage the button state

    useEffect(() => {
        console.log('Selected Question in AnswerQue:', selectedQuestion); // Debugging line
        if (showAnspopUp.answer) {
            setAnsPopupVisible(true);
        }
    }, [showAnspopUp.answer, selectedQuestion]); // Add selectedQuestion as a dependency

    const handleSaveAnswer = async () => {
        try {
            const response = await api.post('/QuestionAPI', { question: selectedQuestion, answer: answerQue, email: email }); 
            console.log('Response:', response.data);
            if (response.status === 200) {
                setAnswerQue('');
                closeAnspopUp();
                setAnsweredQuestion('answer sent successfully');
                setIsAnswered(true); // Set as answered when the answer is successfully submitted
                setAnswerVisible(true)
                markQuestionAsAnswered(selectedQuestion);
            } else {
                console.log('Server error:', response.data.error || 'Unknown error');
                setAnsweredQuestion('Failed to send notification');
                setAnswerVisible(true);
            }
        } catch (err) {
            setAnsweredQuestion('Error sending notification');
            setAnswerVisible(true);
            console.log(`Server error: ${err.message}`);
        }

        setAnsPopupVisible(false);
        closeAnspopUp();
        setAnswerQue('');
    
        // Hide the notification after 3 seconds
        setTimeout(() => {
            setAnswerVisible(false);
        }, 3000);
    };

    return (
        isAnsPopupVisible && (
            <div className={`answerque ${showAnspopUp.answer ? 'show' : ''}`}>
                <div className="answerque-container">
                    <div className="answerque-container-header">
                        <h2>Answer Question</h2>
                    </div>
                    <div className="answerque-container-header-team_msg">
                        {selectedQuestion || "No question selected"}
                    </div>
                    <div className="answerque-container-question_field">
                        <label htmlFor="AnswerQuestion">Answer Question</label>
                        <textarea
                            type="text"
                            id="AnswerQuestion"
                            required
                            value={answerQue}
                            onChange={(e) => setAnswerQue(e.target.value)}
                        />
                    </div>
                    <div className="answerque-container-buttons">
                        <button type='button' className='cancel_button' onClick={closeAnspopUp}>
                            Cancel
                        </button>
                        {isAnswered ? (
                            <div className="question-answered">Question Answered</div>
                        ) : (
                            <button type='submit' className='save_button' onClick={handleSaveAnswer}>
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default AnswerQue;
