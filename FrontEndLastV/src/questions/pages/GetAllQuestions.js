import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import './GetAllQuestions.css';
import Button from "../../shared/components/Button/Button";
import Modal from "../../Model/Model";

const GetAllQuestions = props => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('DELETING...');
  };
  return (
    <React.Fragment>
      {/* <Modal
        // show={showMap}
        // onCancel={closeMapHandler}
        header={props.name}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
      // footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        {/* <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div> */}

      {/* <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
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
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal> */}
      <li className="place-item">
        <Card className="place-item__content">
          {/* <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div> */}
          <div className="place-item__info">
            <h2>{props.id}</h2>
            <h3>{props.name}</h3>
            <p>{props.mark}</p>
            <p>{props.category}</p>
            <p>{props.subCategory}</p>
            <p>{props.correctAnswers}</p>
            {/* <p>{props.answers}</p> */}
            {props.answers.map(q => (
              <>
                {/* <p>{q.key}</p> */}
                {/* <li key="{q}">{q}</li> */}
                <p>{q.name}</p>
                <p>{q.description}</p>
              </>
            ))}
            </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default GetAllQuestions;
