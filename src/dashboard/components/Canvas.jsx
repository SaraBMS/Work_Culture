import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../hook/ContextProvider';
import { useEmail } from '../../hook/EmailProvider';
import { useGoals } from '../../hook/CanvasProvider';
import './canvas.css';

const Canvas = () => {
  const { isClicked, closeCanvas } = useStateContext();
  const [isVisible, setIsVisible] = useState(false);
  const { email } = useEmail();
  const { goals, goalDescrip, setGoalDescrip, handleSaveGoal, selectedGoal } = useGoals();

  const [selectedValue, setSelectedValue] = useState('Actual Work');
  const [isOpen, setIsOpen] = useState(false);

  const options = ['Actual Work', 'X Points'];

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    handleSaveGoal(selectedValue); // Pass selectedValue to the save handler
  };

  useEffect(() => {
    if (isClicked.canvasVisible) {
      setIsVisible(true);
    }
  }, [isClicked.canvasVisible]);

  const resetForm = () => {
    setGoalDescrip('');
  }

  useEffect(() => {
    if (selectedGoal) {
      setGoalDescrip(selectedGoal.description);
      setSelectedValue(selectedGoal.type || 'Actual Work'); // Set the selectedValue based on selectedGoal's type
    } else {
      setGoalDescrip('');
      setSelectedValue('Actual Work'); // Default to 'Actual Work' if no goal is selected
    }
  }, [selectedGoal, setGoalDescrip]);

  const handleAnimationEnd = () => {
    if (!isClicked.canvasVisible) {
      setIsVisible(false);
    }
  };

  return (
    isVisible && (
      <div className={`canvas ${isClicked.canvasVisible ? 'show' : 'hide'}`} onAnimationEnd={handleAnimationEnd}>
        <span className='canvas_column'>
          <svg
            className="arrow"
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={closeCanvas}
          >
            <path
              d="M1.65923 5.79496e-05C1.87269 -0.000594382 2.0836 0.0417945 2.27646 0.12411C2.46932 0.206425 2.63924 0.326575 2.77372 0.47573L9.67496 8.18929C9.88511 8.41932 10 8.70786 10 9.00564C10 9.30341 9.88511 9.59195 9.67496 9.82199L2.53082 17.5355C2.28829 17.7981 1.93978 17.9632 1.56196 17.9945C1.18414 18.0259 0.807961 17.9209 0.51617 17.7027C0.224379 17.4845 0.040883 17.1709 0.0060481 16.8309C-0.0287868 16.491 0.0878943 16.1525 0.330421 15.89L6.71728 8.99921L0.544745 2.10843C0.370023 1.91973 0.259037 1.68994 0.224917 1.44626C0.190797 1.20257 0.234971 0.955195 0.352215 0.733395C0.469459 0.511596 0.654864 0.324654 0.886491 0.194693C1.11812 0.0647324 1.38628 -0.00281068 1.65923 5.79496e-05Z"
              fill="black"
            />
          </svg>
        </span>
        <div className="canvas-container">
          <div className="canvas-container-header">
            <div className="canvas-container-header-goal">
              <div className='goal-checkbox_canvas'>
                <span className='circle'></span>
                Goal {selectedGoal ? selectedGoal.id : goals.length ? (Number(goals[goals.length - 1].id) + 1).toString() : '1'}
              </div>
            </div>
            <div className="canvas-container-header-select-container">
              <div className="styled-select" onClick={() => setIsOpen(!isOpen)}>
                <span id="selected-value">{selectedValue}</span>
                <svg className="dropdown-icon" width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.78 0.78725L11.78 3.54725L6.284 9.35525L0.764 3.54725L0.764 0.787249L6.284 6.59525L11.78 0.78725Z" fill="url(#paint0_linear_1_2728)" />
                  <defs>
                    <linearGradient id="paint0_linear_1_2728" x1="40.2368" y1="-4.89977" x2="36.2433" y2="23.9501" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00FEFC" />
                      <stop offset="1" stopColor="#0002FE" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="select-options" style={{ display: isOpen ? 'flex' : 'none' }}>
                  {options.filter(option => option !== selectedValue).map((option, index) => (
                    <div
                      key={index}
                      className="select-option"
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="canvas-container-ids">
            <div className="decrip">Assignee : <span>{email}</span></div>
            <div className="decrip">Goal Setter :<span>23 <span className='this_setter'>(This Setter)</span></span></div>
          </div>
          <div className="canvas-container-goal_descrip">
            <label htmlFor="GoalDescrip">
              <textarea
                id="GoalDescrip"
                className='goal_descrip_box'
                placeholder='Goal Description'
                value={goalDescrip}
                onChange={(e) => setGoalDescrip(e.target.value)}
                required
              />
            </label>
          </div>
          {selectedValue === 'Actual Work' ? (
            <div className="canvas-container-actual_content">
              {/* Content specific to Actual Work */}
              <div className="canvas-container-actual_content-box">
              <span className="canvas-container-actual_content-box-title">
              Goal Attachment
              </span>
              <div className="attachment_container">
                <div className="attachment_container-box">
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.4998 0H27.3852L39.6422 12.2592V35.8006C39.6422 38.6592 37.3037 41 34.4428 41H13.4999C10.6413 41 8.30286 38.6592 8.30286 35.8006V5.19939C8.30286 2.34076 10.6413 0 13.4998 0Z" fill="#004CFB"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M27.3853 0L39.6422 12.2592H28.7068C27.9781 12.2592 27.3853 11.6641 27.3853 10.9354V0Z" fill="#23C1FF"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.4989 17.4586H30.7359C31.3639 17.4586 31.877 17.9718 31.877 18.5997V28.9587C31.877 29.5866 31.3639 30.0998 30.7359 30.0998H2.4989C1.87093 30.0998 1.35779 29.5866 1.35779 28.9587V18.5997C1.35779 17.9718 1.87101 17.4586 2.4989 17.4586Z" fill="#6B97FF"/>
                <path d="M9.42991 19.571H7.29999C6.93443 19.571 6.63806 19.8674 6.63806 20.2329V23.7242V24.5841V27.3232C6.63806 27.6888 6.93443 27.9851 7.29999 27.9851C7.66554 27.9851 7.96191 27.6888 7.96191 27.3232V25.246H9.42983C10.9692 25.246 12.2217 23.9936 12.2217 22.4542V22.3629C12.2217 20.8234 10.9693 19.571 9.42991 19.571ZM10.8979 22.4541C10.8979 23.2636 10.2393 23.9221 9.42991 23.9221H7.96191V23.7241V20.8948H9.42983C10.2393 20.8948 10.8978 21.5533 10.8978 22.3627V22.4541H10.8979ZM16.553 19.571H14.4232C14.0576 19.571 13.7613 19.8674 13.7613 20.2329V27.3232C13.7613 27.6888 14.0576 27.9851 14.4232 27.9851H16.553C18.0924 27.9851 19.3449 26.7327 19.3449 25.1934V22.3629C19.3449 20.8234 18.0924 19.571 16.553 19.571ZM18.021 25.1933C18.021 26.0027 17.3624 26.6612 16.553 26.6612H15.0851V20.8948H16.553C17.3624 20.8948 18.021 21.5533 18.021 22.3627V25.1933ZM22.337 20.8949V22.7272H25.4053C25.7709 22.7272 26.0673 23.0236 26.0673 23.3891C26.0673 23.7547 25.7709 24.0511 25.4053 24.0511H22.337V27.3232C22.337 27.6888 22.0406 27.9851 21.6751 27.9851C21.3095 27.9851 21.0131 27.6888 21.0131 27.3232V20.2329C21.0131 19.8674 21.3095 19.571 21.6751 19.571H25.9348C26.3004 19.571 26.5967 19.8674 26.5967 20.2329C26.5967 20.5985 26.3004 20.8949 25.9348 20.8949H22.337Z" fill="#D9D7FE"/>
                </svg>
                <div className="attachment_container-box-text">
                  <div className="up_text">
                  File Name.pdf
                  </div>
                  <div className="bottom_text">
                  PDF - <span>Download</span> 
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1_2709)">
                <path d="M4.8125 2.625V1.31162C4.8125 1.19559 4.85859 1.08431 4.94064 1.00227C5.02269 0.920218 5.13397 0.874125 5.25 0.874125H8.75C8.86603 0.874125 8.97731 0.920218 9.05936 1.00227C9.14141 1.08431 9.1875 1.19559 9.1875 1.31162V2.625H12.6875C12.8035 2.625 12.9148 2.67109 12.9969 2.75314C13.0789 2.83519 13.125 2.94647 13.125 3.0625C13.125 3.17853 13.0789 3.28981 12.9969 3.37186C12.9148 3.45391 12.8035 3.5 12.6875 3.5H1.3125C1.19647 3.5 1.08519 3.45391 1.00314 3.37186C0.921094 3.28981 0.875 3.17853 0.875 3.0625C0.875 2.94647 0.921094 2.83519 1.00314 2.75314C1.08519 2.67109 1.19647 2.625 1.3125 2.625H4.8125ZM5.6875 2.625H8.3125V1.75H5.6875V2.625ZM2.625 13.125C2.50897 13.125 2.39769 13.0789 2.31564 12.9969C2.23359 12.9148 2.1875 12.8035 2.1875 12.6875V3.5H11.8125V12.6875C11.8125 12.8035 11.7664 12.9148 11.6844 12.9969C11.6023 13.0789 11.491 13.125 11.375 13.125H2.625ZM5.6875 10.5C5.80353 10.5 5.91481 10.4539 5.99686 10.3719C6.07891 10.2898 6.125 10.1785 6.125 10.0625V5.6875C6.125 5.57147 6.07891 5.46019 5.99686 5.37814C5.91481 5.29609 5.80353 5.25 5.6875 5.25C5.57147 5.25 5.46019 5.29609 5.37814 5.37814C5.29609 5.46019 5.25 5.57147 5.25 5.6875V10.0625C5.25 10.1785 5.29609 10.2898 5.37814 10.3719C5.46019 10.4539 5.57147 10.5 5.6875 10.5ZM8.3125 10.5C8.42853 10.5 8.53981 10.4539 8.62186 10.3719C8.70391 10.2898 8.75 10.1785 8.75 10.0625V5.6875C8.75 5.57147 8.70391 5.46019 8.62186 5.37814C8.53981 5.29609 8.42853 5.25 8.3125 5.25C8.19647 5.25 8.08519 5.29609 8.00314 5.37814C7.92109 5.46019 7.875 5.57147 7.875 5.6875V10.0625C7.875 10.1785 7.92109 10.2898 8.00314 10.3719C8.08519 10.4539 8.19647 10.5 8.3125 10.5Z" fill="#FF003D"/>
                </g>
                <defs>
                <clipPath id="clip0_1_2709">
                <rect width="14" height="14" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                </div>
                <div className="attachment_container-box">
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.4998 0H27.3852L39.6422 12.2592V35.8006C39.6422 38.6592 37.3037 41 34.4428 41H13.4999C10.6413 41 8.30286 38.6592 8.30286 35.8006V5.19939C8.30286 2.34076 10.6413 0 13.4998 0Z" fill="#004CFB"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M27.3853 0L39.6422 12.2592H28.7068C27.9781 12.2592 27.3853 11.6641 27.3853 10.9354V0Z" fill="#23C1FF"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.4989 17.4586H30.7359C31.3639 17.4586 31.877 17.9718 31.877 18.5997V28.9587C31.877 29.5866 31.3639 30.0998 30.7359 30.0998H2.4989C1.87093 30.0998 1.35779 29.5866 1.35779 28.9587V18.5997C1.35779 17.9718 1.87101 17.4586 2.4989 17.4586Z" fill="#6B97FF"/>
                <path d="M9.42991 19.571H7.29999C6.93443 19.571 6.63806 19.8674 6.63806 20.2329V23.7242V24.5841V27.3232C6.63806 27.6888 6.93443 27.9851 7.29999 27.9851C7.66554 27.9851 7.96191 27.6888 7.96191 27.3232V25.246H9.42983C10.9692 25.246 12.2217 23.9936 12.2217 22.4542V22.3629C12.2217 20.8234 10.9693 19.571 9.42991 19.571ZM10.8979 22.4541C10.8979 23.2636 10.2393 23.9221 9.42991 23.9221H7.96191V23.7241V20.8948H9.42983C10.2393 20.8948 10.8978 21.5533 10.8978 22.3627V22.4541H10.8979ZM16.553 19.571H14.4232C14.0576 19.571 13.7613 19.8674 13.7613 20.2329V27.3232C13.7613 27.6888 14.0576 27.9851 14.4232 27.9851H16.553C18.0924 27.9851 19.3449 26.7327 19.3449 25.1934V22.3629C19.3449 20.8234 18.0924 19.571 16.553 19.571ZM18.021 25.1933C18.021 26.0027 17.3624 26.6612 16.553 26.6612H15.0851V20.8948H16.553C17.3624 20.8948 18.021 21.5533 18.021 22.3627V25.1933ZM22.337 20.8949V22.7272H25.4053C25.7709 22.7272 26.0673 23.0236 26.0673 23.3891C26.0673 23.7547 25.7709 24.0511 25.4053 24.0511H22.337V27.3232C22.337 27.6888 22.0406 27.9851 21.6751 27.9851C21.3095 27.9851 21.0131 27.6888 21.0131 27.3232V20.2329C21.0131 19.8674 21.3095 19.571 21.6751 19.571H25.9348C26.3004 19.571 26.5967 19.8674 26.5967 20.2329C26.5967 20.5985 26.3004 20.8949 25.9348 20.8949H22.337Z" fill="#D9D7FE"/>
                </svg>
                <div className="attachment_container-box-text">
                  <div className="up_text">
                  File Name.pdf
                  </div>
                  <div className="bottom_text">
                  PDF - <span>Download</span> 
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1_2709)">
                <path d="M4.8125 2.625V1.31162C4.8125 1.19559 4.85859 1.08431 4.94064 1.00227C5.02269 0.920218 5.13397 0.874125 5.25 0.874125H8.75C8.86603 0.874125 8.97731 0.920218 9.05936 1.00227C9.14141 1.08431 9.1875 1.19559 9.1875 1.31162V2.625H12.6875C12.8035 2.625 12.9148 2.67109 12.9969 2.75314C13.0789 2.83519 13.125 2.94647 13.125 3.0625C13.125 3.17853 13.0789 3.28981 12.9969 3.37186C12.9148 3.45391 12.8035 3.5 12.6875 3.5H1.3125C1.19647 3.5 1.08519 3.45391 1.00314 3.37186C0.921094 3.28981 0.875 3.17853 0.875 3.0625C0.875 2.94647 0.921094 2.83519 1.00314 2.75314C1.08519 2.67109 1.19647 2.625 1.3125 2.625H4.8125ZM5.6875 2.625H8.3125V1.75H5.6875V2.625ZM2.625 13.125C2.50897 13.125 2.39769 13.0789 2.31564 12.9969C2.23359 12.9148 2.1875 12.8035 2.1875 12.6875V3.5H11.8125V12.6875C11.8125 12.8035 11.7664 12.9148 11.6844 12.9969C11.6023 13.0789 11.491 13.125 11.375 13.125H2.625ZM5.6875 10.5C5.80353 10.5 5.91481 10.4539 5.99686 10.3719C6.07891 10.2898 6.125 10.1785 6.125 10.0625V5.6875C6.125 5.57147 6.07891 5.46019 5.99686 5.37814C5.91481 5.29609 5.80353 5.25 5.6875 5.25C5.57147 5.25 5.46019 5.29609 5.37814 5.37814C5.29609 5.46019 5.25 5.57147 5.25 5.6875V10.0625C5.25 10.1785 5.29609 10.2898 5.37814 10.3719C5.46019 10.4539 5.57147 10.5 5.6875 10.5ZM8.3125 10.5C8.42853 10.5 8.53981 10.4539 8.62186 10.3719C8.70391 10.2898 8.75 10.1785 8.75 10.0625V5.6875C8.75 5.57147 8.70391 5.46019 8.62186 5.37814C8.53981 5.29609 8.42853 5.25 8.3125 5.25C8.19647 5.25 8.08519 5.29609 8.00314 5.37814C7.92109 5.46019 7.875 5.57147 7.875 5.6875V10.0625C7.875 10.1785 7.92109 10.2898 8.00314 10.3719C8.08519 10.4539 8.19647 10.5 8.3125 10.5Z" fill="#FF003D"/>
                </g>
                <defs>
                <clipPath id="clip0_1_2709">
                <rect width="14" height="14" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                </div>
              </div>
          </div>
            </div>
          ) : (
            <div className="canvas-container-xpoints_content">
              <h1>x points</h1>
              {/* Content specific to X Points */}
            </div>
          )}
          <div className="canvas-container-buttons">
            <button type='button' className='cancel_button' onClick={resetForm}>
              Cancel
            </button>
            <button type='submit' className='save_button' onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Canvas;
