import React,{useState} from 'react';
import './team.css';
import BoxContainer from './home/BoxContainer';
import TeamMates from './home/TeamMates';

const Team = () => {
  const [currentTap, setCurrentTap] = useState(2);

  const handleNextTap = (tap) => {
    setCurrentTap(tap);
  }; 
  return (
    <div className='team'>
    <BoxContainer filled>
      <div className="team_container">
       <div className="taem_container-header">
        <div className={`tap_team leagership ${currentTap === 1 ? 'active' : ''}`} onClick={() => handleNextTap(1)}>
          <h2>Leagership Board</h2>
        </div>
        <div className={`tap_team team_agencies ${currentTap === 2 ? 'active' : ''}`}  onClick={() => handleNextTap(2)}>
        <h2>Team Agencies</h2>
        </div>
       </div>
       {currentTap === 2 && (
              <>
                  <TeamMates />
              </>)}
      {currentTap === 1 && (
              <>
                  <h2>Leagership Board</h2>
              </>)}
      </div>
    </BoxContainer>
    </div>
  )
}

export default Team
