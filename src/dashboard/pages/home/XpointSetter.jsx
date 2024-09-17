import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStateContext } from '../../../hook/ContextProvider';
import { useGoals } from '../../../hook/CanvasProvider';
import arrowBlackButton from '../../../assets/images/arrowblackButton.svg';
import useAxiosFetch from '../../../hook/useAxiosFetch';
import './xpointsetter.css';

const XpointSetter = () => {
    const location = useLocation();
    const isSetterPage = location.pathname === '/admin/home/setter';
    const isProfileMatePage = location.pathname.startsWith('/admin/profilemate');
    const setterNumber = isSetterPage ? 22 : null;
    const { openCanvas, updatePercentage } = useStateContext();
    const { goals, toggleGoalCompletion, openGoal } = useGoals();
    const [removingGoal, setRemovingGoal] = useState(null);
    const { fetchError, isLoading } = useAxiosFetch('http://localhost:3400/DashboardAPI');
    const xPointsGoals = goals.filter(goal => goal.type === 'X Points');
    
    const handleOpenCanvas = (id) => {
        openGoal(id);
        openCanvas();
    };

    const handleAddNewGoal = () => {
        openGoal(null);
        openCanvas();
    };

    useEffect(() => {
      const completedGoals = goals.filter(goal => goal.completed).length;
      const totalGoals = goals.length;
      const completionPercentage = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);
      updatePercentage(completionPercentage);
  }, [goals, updatePercentage]);


    const handleToggleGoalCompletion = (id) => {
        toggleGoalCompletion(id);
        setRemovingGoal(id);
        setTimeout(() => {
            setRemovingGoal(null);
        }, 1000);
    };

    return (
        <div className="xpoint">
            {!isProfileMatePage && (
            <div className="xpoint_container">
                <div className="xpoint_container-header">
                    <div className='xpoint_container-header-xpicon'>
                        X<span>P</span>
                    </div>
                    <div className="xpoint_container-header-text">
                        Current Setter {setterNumber} <span> (X Points )</span>
                    </div>
                </div>
                <div className="xpoint_container-buttons">
                    <button type='button' onClick={handleAddNewGoal}>
                        <img src={arrowBlackButton} alt='plusButton' />
                    </button>
                </div>
            </div>
            )}
             {isProfileMatePage && (
          <div className="actualwork-mate_goal_header">
            <h2>XX-point</h2>
          </div>)}
            <div className="xpoint-goal">
                <div className="xpoint-goal-field">
                    <div className="xpoint_goals-container-goals_input">
                    {isLoading && <p className='statusMsg'>Loading goals...</p>}
                    
                    {!isLoading && fetchError && <p className='statusMsg' style={{ color: 'red' }}>{fetchError}</p>}
                    
                    {!isLoading && !fetchError && (
                        xPointsGoals.length === 0 ? (
                            <p className='lack_goals'>No Goals To Display.</p>
                        ) : (
                            xPointsGoals.filter(goal => goal.type === 'X Points' && (!goal.completed || removingGoal === goal.id)).length === 0 ? (
                                <p className='lack_goals'>No Goals To Display.</p>
                            ) : (
                                xPointsGoals.map((goal, index) => (
                                    <label key={goal.id} htmlFor={`goal_xpoint_${goal.id}`}
                                        className={`xgoal-checkbox xpoint_xgoal-checkbox ${removingGoal === goal.id ? 'fade-out' : ''}`}
                                        onDoubleClick={() => handleOpenCanvas(goal.id)}>
                                        <input
                                            type="checkbox"
                                            id={`goal_xpoint_${goal.id}`}
                                            checked={!!goal.completed}
                                            readOnly
                                        />
                                        <span
                                            onClick={() => handleToggleGoalCompletion(goal.id)}
                                        ></span>
                                        Goal {index + 1}
                                    </label>
                                ))
                            )
                        )
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default XpointSetter;