import React from 'react';
import './setter.css';
import BoxContainer from './BoxContainer';
import Todo from './Todo';
import Done from './Done';
import XpointSetter from './XpointSetter';
import SetterPercentage from './SetterPercentage';
import { useStateContext } from '../../../hook/ContextProvider';

const Setter = () => {
     const { percentage } = useStateContext(); // Get the percentage from context
  return (
    <div className='setter'>
      <div className="setter-container">
      <BoxContainer filled className='actual_goal_box'>
       <BoxContainer filled  className="todo_goals" >
        <Todo />
        </BoxContainer>
        <BoxContainer filled className="done_goals">
        <Done  />
        </BoxContainer>
        <BoxContainer filled className="setter_percentage">
        <SetterPercentage percentage={percentage} />
        </BoxContainer>
       </BoxContainer >
       <BoxContainer filled className="xpoint_setter" >
        <XpointSetter />
       </BoxContainer >
    </div>
    </div>
  )
}

export default Setter;