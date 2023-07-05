import React, { useState, useEffect } from 'react';

import ExamList from './ExamList';
import { useParams } from 'react-router-dom';
import ErrorModel from '../Model/ErorrModel';
import axios from "axios";


const UserQuestion = () => {
  // const [error, setError] = useState();
  
  const userId = useParams().userId;

  const [loadedExams, setLoadedExams] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendReq = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/exams/examdef`);

        const resData = await res.data;
        
        if (res.status !== 200) {
          throw new Error(resData.message);
        }
        setLoadedExams(resData);
        console.log(loadedExams)

        // console.log(res);
      }
      catch (err) {

        setError(err.message);
      }
      setIsLoading(false);
    };
    sendReq();
  }, []);

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
    setLoadedExams(prevQuestions =>
      prevQuestions.filter(question => question.id !== deletedQuestionId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={errorHandler} />
      
 
      
      {!isLoading && loadedExams && (<ExamList items={loadedExams} onDeleteQuestion={QuestionDeletedHandler}/>)}
    </React.Fragment>
  );
};

export default UserQuestion;