import React from 'react';
import { Link } from 'react-router-dom';


import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/questions`}>
          {/* <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div> */}
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>{props.userType}</h3>
            <h4>{props.password}</h4>
            <h5>
              {props.questionsCount} {props.questionsCount === 1 ? 'Question' : 'Questions'}
            </h5>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
