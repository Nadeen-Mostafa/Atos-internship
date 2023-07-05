import React, { useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import QuestionItem from './QuestionItem';
import './QuestionList.css';
import { AuthContext } from '../../user/pages/auth-context';


const QuestionList = props => {
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
      {props.items.map(question => (

        <QuestionItem
          key={question.id}
          id={question.id}
          name={question.name}
          mark={question.mark}
          correctAnswers={question.correctAnswers}
          category={question.category}
          subCategory={question.subCategory}
          createdBy={question.createdBy}
          answers={question.answers}
          onDelete={props.onDeleteQuestion}
         

        />
      ))}


    </ul>
  );
};

export default QuestionList;
