import React from 'react';
import './mateinfo.css';
import Avatar from '../../assets/images/Avatar.svg';
import phonecall from '../../assets/images/phone-call.svg';
import bookmark from '../../assets/images/bookmark.svg';
import emailImg from '../../assets/images/email.svg';

const MateInfo = ({ teamMate }) => {
  // Define the agency styles
  const agencyStyles = {
    'DevSyro': {
        agency_color: "#fff",
        color: '#05CD99',
        background: '#05CD991A',
    },
    'ProSyro': {
        agency_color: "#23C1FF",
        color: '#EE5D50',
        background: '#EE5D501A',
    },
    'ArtSyro': {
        agency_color: "#A744FF",
        color: '#FFEB37',
        background: '#FFEB371A',
    },
    'iSyro': {
        agency_color: "#EE9C50",
        color: '#fff',
        background: '#333',
    },
};

  // Get the agency style based on the teamMate agency
  const agencyStyle = agencyStyles[teamMate.selectedOption2] || {}; // Assuming selectedOption2 holds the agency

  return (
    <div className="mate_info">
      <div className="mate_info-container">
        <div className="question-container-mates_container-info-profile profile_info_mate">
          <div className="mate_info-container-header">
            {/* Profile Image */}
            <img
              src={teamMate.image || Avatar}
              alt="profile_image"
              className="pro_img mate mate_info_img"
              style={{ borderColor: agencyStyle.agency_color }}
            />
            <div className='question-container-mates_container-info-profile-name'>
              {/* Name */}
              <span className='name_mate'>{teamMate.name}</span> 

              {/* Agency Name */}
              {teamMate.selectedOption2 ? (
                <span className='teame_agency mate_agency' style={{ color: agencyStyle.agency_color }}>
                  {teamMate.selectedOption2} {/* Agency name from API */}
                </span>
              ) : (
                <span className='teame_agency mate_agency' style={{ color: '#fff' }}>
                  Unknown Agency
                </span>
              )}

              {/* ID or Other Fields */}
              <span className='setter_number' style={{ color: '#23C1FF' }}>
                #54
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="mate_info-container-details">
            <div className="mate_info-container-details-mate_details">
              <div className="mate_info-container-details-mate_details-field">
                <img src={emailImg} alt="email" />
                <span className='detail_mate'>{teamMate.email}</span> 
              </div>
              <div className="mate_info-container-details-mate_details-field">
                <img src={phonecall} alt="phone" />
                <span className='detail_mate'>{teamMate.number}</span> 
              </div>
              <div className="mate_info-container-details-mate_details-field">
                <img src={bookmark} alt="bookmark" />
                <span className='detail_mate'>{teamMate.selectedOption2}</span> {/* Agency name */}
              </div>
            </div>

            {/* Bio Section */}
            <div className="mate_info-container-details-bio">
              <h3 className='bio'>Bio</h3>
              <p className='bio_paragraph'>
                {teamMate.bio || 'No bio available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateInfo;
