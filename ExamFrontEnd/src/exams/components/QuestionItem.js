import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import './QuestionItem.css';
import Button from "../../shared/components/Button/Button";
import Modal from "../../Model/Model";
import { AuthContext } from '../../user/pages/auth-context';
import axios from "axios";
import ErrorModel from '../../Model/ErorrModel';
const QuestionItem = props => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const showDeleteWarningHandler = () => {
  //   setShowConfirmModal(true);
  // };

  // const cancelDeleteHandler = () => {
  //   setShowConfirmModal(false);
  // };

  // const confirmDeleteHandler = async () => {
  //   setShowConfirmModal(false);
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.delete(
  //       `http://localhost:5000/api/questions/${props.id}`,
  //     );
  //     props.onDelete(props.id);
  //   } catch (err) { setError(err.message); }

  //   setIsLoading(false);
  // };

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
            <Button danger onClick={confirmDeleteHandler}>
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
          {/* <div className="question-item__image">
            <img src={props.image} alt={props.title} />
          </div> */}

          <div className="question-item__info">
            {/* <h2>{props.id}</h2> */}
            {/* <input
              type="text"
              id="name"
              name="name"
              value={props.name}
              // checked={isChecked}
              // onChange={handleOnChange}
            /> */}
            <h3>{props.name}</h3>
            {/* <p><span>Mark: </span> {props.mark}</p>
            <p><span>Category: </span>{props.category}</p>
            <p><span>Subcategory: </span>{props.subCategory}</p> */}
            {/* <p>{props.correctAnswers}</p> */}
            {/* <p>{props.answers}</p> */}
            {props.answers.map(q => (
              <div>
                {/* <p>{q.key}</p> */}
                {/* <li key="{q}">{q}</li> */}
                {/* <li key="{q}">{q}</li>  */}
                <p>{q.name}</p>

                <p><span>Answer: </span>{q.description}</p>
              </div>
            ))}

            {/* <p>{props.answers.description}</p> */}
            {/* <p>{props.correctAnswers.map(cor => ({cor}))}</p> */}
          </div>
          
        </Card>
      </li>
    </React.Fragment>
  );
};

export default QuestionItem;
