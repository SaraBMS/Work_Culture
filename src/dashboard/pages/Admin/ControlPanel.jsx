import React from 'react';
import './controlpanel.css';
import BoxContainer from '../home/BoxContainer';
import TeamMates from '../home/TeamMates';
import Notification from '../../components/Notification';
import Question from './Question';
import { useRole } from '../../../hook/EmailProvider';

const ControlPanel = () => {
  const{role} = useRole();

  return (
    (role === 'admin' && (
    <div className='control_panel'>
      <div className="control_panel-container">
      <BoxContainer className='w_65' filled>
         <TeamMates />
      </BoxContainer>
      <BoxContainer filled className='w_33'>
        <Notification className='admin_notification' />
      </BoxContainer>
        <Question />
      </div> 
    </div>
    ))
  )
}

export default ControlPanel