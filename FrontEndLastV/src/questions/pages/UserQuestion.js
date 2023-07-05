import React, { useState, useEffect } from 'react';

import QuestionList from '../components/QuestionList';
import { useParams } from 'react-router-dom';
import ErrorModel from '../../Model/ErorrModel';
import axios from "axios";


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