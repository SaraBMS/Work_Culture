import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStateContext } from '../../../hook/ContextProvider';
import { useGoals } from '../../../hook/CanvasProvider';
import useAxiosFetch from '../../../hook/useAxiosFetch';
import calendar from '../../../assets/images/calendar.svg';
import plusButton from '../../../assets/images/plusButton.svg';
import arrowButton from '../../../assets/images/arrowButton.svg';
import plusGoalButton from '../../../assets/images/plusGoalButton.svg';
import SetterPercentage from './SetterPercentage';
import './actualworksetter.css';

const ActualWorkSetter = () => {   
  const { openCanvas, percentage, updatePercentage  } = useStateContext();
  const { goals, toggleGoalCompletion, openGoal } = useGoals();
  const { fetchError, isLoading } = useAxiosFetch('http://localhost:3400/DashboardAPI');
  const navigate = useNavigate();
  const [currentPercentage, setCurrentPercentage] = useState(percentage);
  const actualWorkGoals = goals.filter(goal => goal.type === 'Actual Work');
  const location = useLocation();
  const isProfileMatePage = location.pathname.startsWith('/admin/profilemate');

  useEffect(() => {
    const completedGoals = goals.filter(goal => goal.completed).length;
    const totalGoals = goals.length;
    const completionPercentage = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);
    updatePercentage(completionPercentage);
}, [goals, updatePercentage]);


  useEffect(() => {
    setCurrentPercentage(percentage);
  }, [percentage]);

  const handleOpenCanvas = (id) => {
    openGoal(id);
    openCanvas();
  };

  const handleAddNewGoal = () => {
    openGoal(null);
    openCanvas(); 
  };

  const handleArrowButtonClick = () => {
    navigate('setter');
  };

  return (
    <div className="actualwork">
        {!isProfileMatePage && (
      <div className="actualwork_container">
      
        <div className="actualwork_container-header">
          <span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.82 4H21C21 4 20.96 7.45 16.88 10C17.18 9.4 17.38 8.74 17.44 8.04L17.82 4Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.18 4H3C3 4 3.04 7.45 7.12 10C6.82 9.4 6.62 8.74 6.56 8.04L6.18 4Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.59 12.76C13.47 13.07 13.36 13.46 13.31 13.89C13.26 14.28 13.27 14.63 13.31 14.92C13.36 15.36 13.47 15.75 13.6 16.06C13.4 16.02 13.2 16 13 16H11C10.8 16 10.6 16.02 10.4 16.06C10.53 15.75 10.64 15.36 10.69 14.92C10.73 14.63 10.74 14.28 10.69 13.89C10.64 13.46 10.53 13.07 10.41 12.76C10.92 12.92 11.45 13 12 13C12.55 13 13.08 12.92 13.59 12.76Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 13C9.18 13 6.82 10.85 6.56 8.04L6 2H18L17.44 8.04C17.18 10.85 14.82 13 12 13Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 19H8C8 17.34 9.34 16 11 16H13C14.66 16 16 17.34 16 19Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 22H5C5 20.34 6.34 19 8 19H16C17.66 19 19 20.34 19 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <div className="actualwork_container-header-text">
            Current Setter <span> (Actual Work)</span>
          </div>
          <div className="calendar_img">
            <img src={calendar} alt="calendar" />
          </div>
        </div>
        <div className="actualwork_container-buttons">
          <button type='button' onClick={openCanvas}>
            <img src={plusButton} alt='plusButton' />
          </button>
          <button type='button' onClick={handleArrowButtonClick}>
            <img src={arrowButton} alt='arrowButton' />
          </button>
        </div>
      </div>
        )}
          {isProfileMatePage && (
          <div className="actualwork-mate_goal_header">
            <h2> Goals</h2>
          </div>)}
      <div className="actualwork-goal">
        <div className="actualwork-goal-field">
          <div className="actualwork__goals-container-goals_input">
            {isLoading && <p className='statusMsg'>Loading goals...</p>}
            {!isLoading && fetchError && <p className='statusMsg' style={{color:'red'}}>{fetchError}</p>}
            {!isLoading && !fetchError && 
            (actualWorkGoals.length ? (
              actualWorkGoals.map((goal, index) => (
                <label key={goal.id} htmlFor={`goal${goal.id}`} className='goal-checkbox actualwork_goal-checkbox' onDoubleClick={() => handleOpenCanvas(goal.id)}>
                  <input
                    type="checkbox"
                    id={`goal${goal.id}`}
                    checked={!!goal.completed} // Ensure it's always a boolean
                    readOnly
                  />
                  <span
                    onClick={() => toggleGoalCompletion(goal.id)}
                  >
                  </span>
                  Goal {index + 1}
                </label>
              ))
            ) : (<p className='lack_goals'> No Goals To Display.</p>))}
          </div>
          {!isProfileMatePage && (
          <div className='goal-checkbox plus'>
            <button type='button' onClick={handleAddNewGoal}>
              <img src={plusGoalButton} alt='plusGoalButton' />
            </button>
          </div>)}
        </div>
        {!isProfileMatePage && (
            <SetterPercentage percentage={currentPercentage} />
        )}
      
      </div>
    </div>
  );
};

export default ActualWorkSetter;
