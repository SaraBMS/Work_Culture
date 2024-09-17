import React, { useState } from 'react';
import './monthselect.css';
import { useRole } from '../../../hook/EmailProvider';

const MonthSelect = ({ onChange, type }) => {  
  const { role } = useRole();
  
  const dataMonth = [ '7 month','4 month', '5 month', '6 month', '7 month', '8 month', '9 month', '10 month', '11 month', '12 month'];
  const dataTeam = ['All Agencies', 'DevSyro', 'Product Syro', 'ArtSyro', 'AiSyro'];
  const dataNotification = ['All', 'Hard Reminder', 'Good Job' , 'Soft Reminder'];

  // Choose the data array based on the role and type
  const data = role === 'admin' && type === 'notification' ? dataNotification 
             : role === 'admin' && type === 'team' ? dataTeam 
             : dataMonth;

  const [selectedValue, setSelectedValue] = useState(data[0]);  // Default to the first item
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange(value); 
  };

  return (
    <div className="month">
      <div className="styled-month-select" >
        <span id="selected-month">{selectedValue}</span>
        <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg" className='change-month' onClick={() => setIsOpen(!isOpen)}>
          <path d="M0.416504 0.166748L4.99984 4.75008L9.58317 0.166748H0.416504Z" fill="#23C1FF" />
        </svg>
        <div className="select-months" style={{ display: isOpen ? 'flex' : 'none' }}>
          {data.filter(option => option !== selectedValue).map((option, index) => (
            <div
              key={index}
              className="select-month"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MonthSelect;
