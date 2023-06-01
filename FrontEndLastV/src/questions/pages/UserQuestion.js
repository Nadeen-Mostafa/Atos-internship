import React from 'react';

import QuestionList from '../components/QuestionList';
import { useParams } from 'react-router-dom';
const DUMMY_QUESTIONS = [
  {
    id: 'p1',
    name: 'this is name for first question',
    category: 'this is category',
    subCategory: 'this is subcaegory',
    mark: 'this is the mark',
    expextedTime: "",
    correctAnswers: [1, 2, 3, 4],  //array of ids
    createdBy: "u1",
    createdAt: "",
    answers: [{
      id: 1,
      name: "name of answer",
      description: "this is desc"
    }, {
      id: 2,
      name: "name of answer2",
      description: "this is desc2"
    }],
  },
  {
    id: 'p2',
    name: 'Empire State Building',
    category: 'One of the most famous sky scrapers in the world!',
    subCategory: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    mark: '20 W 34th St, New York, NY 10001',
    expextedTime: "",
    correctAnswers: [],
    createdBy: "u2",
    createdAt: "",
    answers: {
      id: 40.7484405,
      name: -73.9878584,
      description: ""
    },
  }
];

const UserQuestion = () => {
  const userId = useParams().userId;
  const loadedQuestions = DUMMY_QUESTIONS.filter(question => question.createdBy === userId);

  return <QuestionList items={loadedQuestions} />;
};

export default UserQuestion;