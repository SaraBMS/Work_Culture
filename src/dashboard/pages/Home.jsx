import React  from 'react';
import BoxContainer from './home/BoxContainer';
import './home.css';
import ActualWorkSetter from './home/ActualWorkSetter';
import XpointSetter from './home/XpointSetter';
import SetterStatistics from './home/SetterStatistics';
import TeamMates from './home/TeamMates';


const Home = () => {

 
  return (
    
    <div className='home active'>
      <div className="home-container">
      <BoxContainer className="w_60" >
        <ActualWorkSetter /> 
      </BoxContainer >
      <BoxContainer filled className="w_38" >
        <XpointSetter />
      </BoxContainer >
      <BoxContainer filled className="w_49" >
        <SetterStatistics />
      </BoxContainer >
      <BoxContainer filled className="w_49_2" >
        <TeamMates />
      </BoxContainer >
      </div>
    </div>
   
  )
}

export default Home
 

