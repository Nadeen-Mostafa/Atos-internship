import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import QuestionItem from './QuestionItem';
import './QuestionList.css';

const QuestionList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No questions found. Maybe create one?</h2>
          <button>Share question</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
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
          // key={question.answers.id}
        // {...props.items.map(answer => (
        //   <QuestionItem
        //     key={answer.id}
        //     answers={answer.name}

        //   />
        // ))}

        />
      ))}


    </ul>
  );
};

export default QuestionList;
