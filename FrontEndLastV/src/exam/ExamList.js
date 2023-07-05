import React, { useContext } from 'react';

import Card from '../shared/components/UIElements/Card';
import ExamItem from './ExamItem';
import './ExamList.css';
import { AuthContext } from '../user/pages/auth-context';


const ExamList = props => {
  const auth = useContext(AuthContext);


  if (props.items.length === 0) {
    return (
      <div className="question-list center">
        {/* {console.log(auth.userType)} */}
        {/* {auth.isLoggedIn && auth.userType=="teacher" &&( */}
        <Card>
          
          <h2>No questions found.</h2>
        </Card>
        {/* )} */}
      </div>
    );
  }

  return (
    <ul className="question-list">
      {props.items.map(item => (

        <ExamItem
          key={item.id}
          id={item.id}
          name={item.exam_name}
          created_by={item.created_by}
          questions={item.questions}
          score={item.passing_score}
         createdat={item.createdat}

        />
      ))}


    </ul>
  );
};

export default ExamList;
