import React, { useState } from 'react';
import './profile.css';
import BoxContainer from './home/BoxContainer';
import profile_pic from '../../assets/images/profilepng.png';
import { useImage, useEmail } from '../../hook/EmailProvider';
import DropDownSelect from '../../assets/images/DropDownSelect.svg';
import UpSelect from '../../assets/images/UpSelect.svg';
import api from '../../api/SignUpAPI';

const Profile = () => {
  const { image, setImage, inputRef, handleImageClick, handleImageChange } = useImage();
  const { name, setName, email, setEmail, number,
    setNumber, bio, setBio, setPasswordError, emailError, setEmailError, passwordError, selectedOption3, setSelectedOption3, passwordConf, password, setPassword, setPasswordConf, options3 } = useEmail();
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption3(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  // Function to reset form values
  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPasswordConf('');
    setSelectedOption3(null);
    setImage(null); // Reset image to null
    setNumber('');
    setBio('');
    setPasswordError('');
    setEmailError('');
  };

  // Function for submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
      passwordConf,
      image,
      selectedOption3: selectedOption3 ? selectedOption3.value : null,
      number,
      bio,
    };

    console.log('Payload:', payload);

    try {
      // Basic validation
      if (password !== passwordConf) {
        setPasswordError("Password and confirm password do not match");
        return;
      } else if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
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

      // Send payload to server
      const response = await api.post('/SignUpAPI', payload);
      console.log('Response:', response.data); // Log response from server

      // If response indicates success, reset form
      if (response.status === 200) {
        resetForm();
      } else {
        console.log('Server error:', response.data.error || 'Unknown error');
      }

    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  };

  return (
    <div className='profile'>
      <BoxContainer filled>
        <div className="profile-container">
          <div className='sign__container-content-header-profile' onClick={handleImageClick}>
            <img src={image || profile_pic} alt="your_image" />
            <label htmlFor="imgUpload" className='imgUpload_lable'>Upload Your Photo</label>
            <input
              id='imgUpload'
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={inputRef} // ref to enable upload file on click on image
            />
          </div>
          <div className="profile-container-personal">
            <form onSubmit={handleSubmit} className='profile-container-personal-dash_form'>
              <div className="profile-container-personal-container">
                <div className='profile-container-personal-left-text'><h2>Personal Info</h2></div>
                <div className="profile-container-personal-left-right">

                  <div className="profile-container-personal-left">

                    <label htmlFor="fullName"> Name</label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="email">Email </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      pattern=".+@.+"  // HTML pattern attribute to enforce email format
                      />
                      {emailError && <div className="error">{emailError}</div>}
                    
                    <label htmlFor="phoneNumber">Phone Number </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      required
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                  <div className="profile-container-personal-right">
                    <label htmlFor="bio">Bio </label>
                    <textarea
                      id="bio"
                      className='goal_descrip_box'
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      required
                    />
                    <label htmlFor="interstedAgency">Interested Agencies </label>
                    <div className="selected-option dash_select" onClick={toggleDropdown}>

                      <span id='interstedAgency'>
                        {selectedOption3 && (
                          <>
                            <span className="color-circle" style={{ backgroundColor: selectedOption3.color }}></span>
                            {selectedOption3.label}
                          </>
                        )
                        }
                      </span>
                      {isOpen ? <img src={UpSelect} alt='UpSelect' className="select_arrow" /> : <img src={DropDownSelect} alt='DropDownSelect' className="select_arrow" />}
                      {isOpen && (
                        <div className="options-dropdown options-dropdown_dash ">
                          {options3.map(option => (
                            <div
                              key={option.value}
                              className="option"
                              onClick={() => handleOptionSelect(option)}
                            >
                              <span className="color-circle" style={{ backgroundColor: option.color }}></span>
                              <span>{option.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='profile-container-personal-left-text'>
                  <h2>Password</h2>
                </div>
                <label htmlFor="password">New Password </label>
                <input
                  className='dash_password'
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="passwordConf">Rewrite New Password </label>
                <input
                  className='dash_password'
                  type="password"
                  id="passwordConf"
                  required
                  value={passwordConf}
                  onChange={(e) => setPasswordConf(e.target.value)}
                />
                {passwordError && <div className="error">{passwordError}</div>}
              </div>

            </form>
          </div>
          <div className="canvas-container-buttons dash_button">
            <button
              type='button'
              className='cancel_button'
              onClick={resetForm} // Reset the form on cancel click
            >
              Cancel
            </button>
            <button
              type='submit'
              className='save_button'
              onClick={handleSubmit}
              disabled={ name.trim() === ''  
                || email.trim() === ''
                || password.trim() === ''
                || passwordConf.trim() === ''
                || bio.trim() === ''
                || (selectedOption3 === null || typeof selectedOption3 !== 'string' || selectedOption3.trim() === '')
                || number.trim() === ''
               }
            >
              Save
            </button>
          </div>
        </div>
      </BoxContainer>
    </div>
  )
}

export default Profile;
