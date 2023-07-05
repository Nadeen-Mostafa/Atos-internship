import React, { useState, useContext, useEffect } from 'react';

import Card from '../shared/components/UIElements/Card';
import './ExamItem.css';
import Button from "../shared/components/Button/Button";
import Modal from "../Model/Model";
import { AuthContext } from '../user/pages/auth-context';
import axios from "axios";
import ErrorModel from '../Model/ErorrModel';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
const ExamItem = props => {
    const auth = useContext(AuthContext);
    const [error, setError] = useState();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    //   const confirmDeleteHandler = async () => {
    //     setShowConfirmModal(false);
    //     setIsLoading(true);
    //     try {
    //       const res = await axios.delete(
    //         `http://localhost:5000/api/questions/${props.id}`,
    //       );
    //       props.onDelete(props.id);
    //     } catch (err) { setError(err.message); }

    //     setIsLoading(false);
    //   };
    
    const [loadedQuestions, setLoadedQuestions] = useState();
    
    console.log(props.questions.length)

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);

            
                try {
                    const responseData = await axios.get(
                        `http://localhost:5000/api/questions`,
                    );

                    setLoadedQuestions(responseData.data);
                    // console.log(responseData.data);
                    // arr.push(responseData.data)
                    // console.log(arr)
                    // console.log(arr[0].question.name)

                    //   setLoadedQuestions(q=>{return[responseData.data.question[i],responseData.data.question]})
                }
                catch (err) {
                    setError(err.message);
                }
                setIsLoading(false);
            
        };
        fetchQuestions();
        //[sendReq,userId]



    })




    //   console.log(loadedQuestions)
    //   console.log(loadedQuestions)
    const errorHandler = () => {
        setError(null);
    }

    return (
        <React.Fragment>
            {/* {console.log(auth.userType)} */}
            <ErrorModel error={error} onClear={errorHandler} />


            {/* <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="question-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        
        <p>
          Do you want to proceed and delete this question? Please note that it
          can't be undone thereafter.
        </p>
      </Modal> */}
            <li className="question-item">
                <Card className="question-item__content">


                    <div className="question-item__info">

                        <h3>{props.name}</h3>

                        <p><span>questions: </span>{props.questions}</p>
                        <p><span>passing score: </span>{props.score}</p>

                        <p><span>created at: </span>{props.createdat}</p>


                        {/* <p>{loadedQuestions.name}</p> */}
                        {/* {console.log(loadedQuestions.length)}
                        <p>{loadedQuestions.name}</p> */}
                        {/* {<p>{loadedQuestions.name}</p>} */}
                        {/* <p>{props.answers.description}</p> */}
                        {/* <p>{props.correctAnswers.map(cor => ({cor}))}</p> */}
                    </div>
                    <div className="question-item__actions">
                        {/* <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button> */}
                        {auth.isLoggedIn && auth.userType == "teacher" && (
                            <Button to={`/questions/${props.id}`}>EDIT</Button>
                        )}
                        {auth.isLoggedIn && auth.userType == "teacher" && (
                            <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default ExamItem;
