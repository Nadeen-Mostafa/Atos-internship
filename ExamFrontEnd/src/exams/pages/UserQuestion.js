import React, { useState, useEffect } from 'react';

import QuestionList from '../components/QuestionList';
import { useParams } from 'react-router-dom';
import ErrorModel from '../../Model/ErorrModel';
import axios from "axios";

// const DUMMY_QUESTIONS = [
//   {
//     id: 'p1',
//     name: 'this is name for first question',
//     category: 'this is category',
//     subCategory: 'this is subcaegory',
//     mark: 'this is the mark',
//     expextedTime: "",
//     correctAnswers: [1, 2, 3, 4],  //array of ids
//     createdBy: "u1",
//     createdAt: "",
//     answers: [{
//       id: 1,
//       name: "name of answer",
//       description: "this is desc"
//     }, {
//       id: 2,
//       name: "name of answer2",
//       description: "this is desc2"
//     }],
//   },
//   {
//     id: 'p2',
//     name: 'Empire State Building',
//     category: 'One of the most famous sky scrapers in the world!',
//     subCategory: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
//     mark: '20 W 34th St, New York, NY 10001',
//     expextedTime: "",
//     correctAnswers: [],
//     createdBy: "u2",
//     createdAt: "",
//     answers: {
//       id: 40.7484405,
//       name: -73.9878584,
//       description: ""
//     },
//   }
// ];

const UserQuestion = () => {
  // const [error, setError] = useState();
  const userId = useParams().userId;
  // console.log("hello world");

  const [loadedQuestions, setLoadedQuestions] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendReq = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/questions/user/${userId}`);

        const resData = await res.data;
        
        if (res.status !== 200) {
          throw new Error(resData.message);
        }
        setLoadedQuestions(resData.questions);
        // console.log(loadedQuestions)

        // console.log(res);
      }
      catch (err) {

        setError(err.message);
      }
      setIsLoading(false);
    };
    sendReq();
  }, [userId]);

  const errorHandler = () => {
    setError(null);
  }
  // useEffect(() => {

  //   const fetchQuestions = async () => {
  //     try {
  //       const responseData = await axios.get(
  //         `http://localhost:5000/api/questions/user/${userId}`,
  //       );
  //       console.log(responseData);
  //       setLoadedQuestions(responseData.questions);
  //     } catch (err) {
  //       // setError(err.message);
  //     }
  //   };
  //   fetchQuestions();
  //   //[sendReq,userId]
  // }, [userId]);

  // // const loadedQuestions = DUMMY_QUESTIONS.filter(question => question.createdBy === userId);

  const QuestionDeletedHandler = deletedQuestionId => {
    setLoadedQuestions(prevQuestions =>
      prevQuestions.filter(question => question.id !== deletedQuestionId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={errorHandler} />
      
      {/* {console.log(loadedQuestions)} */}
      {!isLoading && loadedQuestions && (<QuestionList items={loadedQuestions} onDeleteQuestion={QuestionDeletedHandler}/>)}
    </React.Fragment>
  );
};

export default UserQuestion;