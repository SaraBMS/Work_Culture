import React, { useState } from 'react'; 
import DropDownSelect from '../assets/images/DropDownSelect.svg';
import UpSelect from '../assets/images/UpSelect.svg';
import './select.css'; 
import { useEmail } from '../hook/EmailProvider';

const Select = ({ error1, error2, error3, setError1, setError2, setError3 }) => {
  const { options1, options2, options3, selectedOption1, setSelectedOption1, selectedOption2, setSelectedOption2, selectedOption3, setSelectedOption3 } = useEmail();
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const toggleDropdown1 = () => setIsOpen1(prevState => !prevState);
  const toggleDropdown2 = () => setIsOpen2(prevState => !prevState);
  const toggleDropdown3 = () => setIsOpen3(prevState => !prevState);

  const handleOptionSelect1 = (option) => {
    setSelectedOption1(option);
    setError1(''); // Clear error
    setIsOpen1(false);
  };

  const handleOptionSelect2 = (option) => {
    setSelectedOption2(option);
    setError2(''); // Clear error
    setIsOpen2(false);
  };

  const handleOptionSelect3 = (option) => {
    setSelectedOption3(option);
    setError3(''); // Clear error
    setIsOpen3(false);
  };

  return (
    <>
      {/* BackPoint Dropdown */}
      <div className="custom-select">
        <div className="selected-option" onClick={toggleDropdown1}>
          <span>
            {selectedOption1 ? (
              <>
                <span className="color-circle" style={{ backgroundColor: selectedOption1.color }}></span>
                {selectedOption1.label}
              </>
            ) : 'Select Your BackPoint'}
          </span>
          <img src={isOpen1 ? UpSelect : DropDownSelect} alt="Toggle Dropdown" className="select_arrow" />
        </div>
        {isOpen1 && (
          <div className="options-dropdown">
            {options1.map(option => (
              <div key={option.value} className="option" onClick={() => handleOptionSelect1(option)}>
                <span className="color-circle" style={{ backgroundColor: option.color }}></span>
                {option.label}
              </div>
            ))}
          </div>
        )}
        {error1 && <div className="error">{error1}</div>}
      </div>

      {/* Agency Dropdown */}
      <div className="custom-select">
        <div className="selected-option" onClick={toggleDropdown2}>
          <span>
            {selectedOption2 ? (
              <>
                <span className="color-circle" style={{ backgroundColor: selectedOption2.color }}></span>
                {selectedOption2.label}
              </>
            ) : 'Select Your Agency'}
          </span>
          <img src={isOpen2 ? UpSelect : DropDownSelect} alt="Toggle Dropdown" className="select_arrow" />
        </div>
        {isOpen2 && (
          <div className="options-dropdown">
            {options2.map(option => (
              <div key={option.value} className="option" onClick={() => handleOptionSelect2(option)}>
                <span className="color-circle" style={{ backgroundColor: option.color }}></span>
                {option.label}
              </div>
            ))}
          </div>
        )}
        {error2 && <div className="error">{error2}</div>}
      </div>

      {/* Interested Agencies Dropdown */}
      <div className="custom-select">
        <div className="selected-option" onClick={toggleDropdown3}>
          <span>
            {selectedOption3 ? (
              <>
                <span className="color-circle" style={{ backgroundColor: selectedOption3.color }}></span>
                {selectedOption3.label}
              </>
            ) : 'Select Interested Agencies'}
          </span>
          <img src={isOpen3 ? UpSelect : DropDownSelect} alt="Toggle Dropdown" className="select_arrow" />
        </div>
        {isOpen3 && (
          <div className="options-dropdown">
            {options3.map(option => (
              <div key={option.value} className="option" onClick={() => handleOptionSelect3(option)}>
                <span className="color-circle" style={{ backgroundColor: option.color }}></span>
                {option.label}
              </div>
            ))}
          </div>
        )}
        {error3 && <div className="error">{error3}</div>}
      </div>
    </>
  );
};

export default Select;
