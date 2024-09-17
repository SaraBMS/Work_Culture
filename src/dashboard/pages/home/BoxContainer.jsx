import React from 'react';
import './boxcontainer.css';

const BoxContainer = ({ filled, children, className }) => {
    return (
        <div className={`box-container ${filled ? 'filled' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default BoxContainer;
