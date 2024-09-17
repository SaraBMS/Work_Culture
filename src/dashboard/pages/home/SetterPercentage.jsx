import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../../hook/ContextProvider';
import './setterpercentage.css';
import useAxiosFetch from '../../../hook/useAxiosFetch';
import { useLocation } from 'react-router-dom';
import { useGoals } from '../../../hook/CanvasProvider';

const SetterPercentage = ({percentage}) => {
    // const { percentage } = useStateContext(); // Get the percentage from context
    const { fetchError, isLoading } = useAxiosFetch('http://localhost:3400/DashboardAPI');
    const [animatedPercentage, setAnimatedPercentage] = useState(percentage);
    const location = useLocation();
    const isSetterPage = location.pathname === '/admin/home/setter';
    const isProfileMatePage = location.pathname.startsWith('/admin/profilemate');
    const { goals } = useGoals(); // Get goals to calculate pending count
    const setterPending = isSetterPage || isProfileMatePage ? `pending ${goals.filter(goal => !goal.completed).length}` : null;

    useEffect(() => {
        const animate = (start, end, duration) => {
            let startTime = null;

            const step = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                setAnimatedPercentage(value);

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };

            requestAnimationFrame(step);
        };

        animate(animatedPercentage, percentage, 2000); // Animate from the current to the new percentage over 2 seconds
    }, [percentage]);

    const strokeDashoffset = 450 - (450 * animatedPercentage) / 100;

    return (
        <div className='setterPercentage'>
            <div className="setterPercentage-container">
                <div className="setterPercentage-container-outer">
                    <div className="setterPercentage-container-inner">
                        <div id="number">
                            {isLoading && <p className='statusMsg'>Loading...</p>}
                            {!isLoading && fetchError && <p className='statusMsg' style={{ color: 'red' }}>{fetchError}</p>}
                            {!isLoading && !fetchError && `${animatedPercentage}%`}
                        </div>  
                    </div>
                    <div className="svg_circle">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="176px" height="176px">
                            <defs>
                                <linearGradient id="GradientColor" gradientTransform="rotate(103.18)">
                                    <stop offset="-41.67%" stopColor="#00FEFC" />
                                    <stop offset="141.58%" stopColor="#0002FE" />
                                </linearGradient>
                            </defs>
                            <circle
                                cx="88"
                                cy="88"
                                r="70"
                                strokeLinecap="round"
                                style={{
                                    fill: 'none',
                                    stroke: 'url(#GradientColor)',
                                    strokeWidth: '35px',
                                    strokeDasharray: '450',
                                    strokeDashoffset,
                                    transition: 'stroke-dashoffset 2s linear'
                                    
                                }}
                            />
                        </svg>
                    </div>
                </div>
                <div className='setterPercentage-name'>
                Setter Percentage
            </div>
            </div>
          
            {setterPending &&
                <div className='setterPercentage-pending'>
                {isLoading && <p className='statusMsg'>Loading...</p>}
                {!isLoading && fetchError && <p className='statusMsg' style={{ color: 'red' }}>{fetchError}</p>}
                {!isLoading && !fetchError && (setterPending) }
                </div>
            }
        </div>
    );
};

export default SetterPercentage;