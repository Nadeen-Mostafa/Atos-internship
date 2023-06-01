import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/Button/Button';
import { useForm } from "../../shared/Hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../validators/validators';

import "./QuestionForm.css";
const DUMMY_QUESTIONS = [
  {
    id: 'p1',
    name: 'Empire State Building',
    category: 'category',
    subCategory: 'subcaegory',
    mark: '20 W 34th St, New York, NY 10001',
    expextedTime: "",
    correctAnswers: [],  //array of ids
    createdBy: "u1",
    createdAt: "",
    answers: {
      id: 40.7484405,
      name: -73.9878584,
      description: "this is desc"
    }
  },
  {
    id: 'p2',
    name: 'Emp State Building',
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
    }
  }
];

const UpdateQuestion = () => {
  const [isLoading, setIsLoading] = useState(true);
  const questionId = useParams().questionId;



  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false
      },
      category: {
        value: "",
        isValid: false
      },
      subCategory: {
        value: "",
        isValid: false
      },
      mark: {
        value: "",
        isValid: false
      },
      expextedTime: {
        value: "",
        isValid: false
      }
      ,
      correctAnswers: {
        value: "",
        isValid: false
      }
      ,
      createdAt: {
        value: "",
        isValid: false
      },
      answers: {
        // name: {
        //   value: "",
        //   isValid: false
        // },
        description: {
          value: "",
          isValid: false
        }
      }
    },
    false
  );

  const identifiedQuestion = DUMMY_QUESTIONS.find(p => p.id === questionId);
  //  console.log(identifiedQuestion);
  useEffect(() => {
    setFormData(
      {
        name: {
          value: identifiedQuestion.name,
          isValid: true
        },
        category: {
          value: identifiedQuestion.category,
          isValid: true
        },
        subCategory: {
          value: identifiedQuestion.subCategory,
          isValid: true
        },
        mark: {
          value: identifiedQuestion.mark,
          isValid: true
        },
        expextedTime: {
          value: identifiedQuestion.expextedTime,
          isValid: true
        }
        ,
        correctAnswers: {
          value: identifiedQuestion.correctAnswers,
          isValid: true
        }
        ,
        createdAt: {
          value: identifiedQuestion.createdAt,
          isValid: true
        },
        answers: {
        // name: {
        //   value: identifiedQuestion.answers.name,
        //   isValid: true
        // },
        description: {
          value: identifiedQuestion.answers.description,
          isValid: true
        }
      }
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, identifiedQuestion]);

  const QuestionUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    // console.log("test");
  };

  if (!identifiedQuestion) {

    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>

    );

  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={QuestionUpdateSubmitHandler}>
      <Input
        id="name"
        element="input"
        type="text"
        label="name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        value={formState.inputs.name.value}
        valid={formState.inputs.name.isValid}
      // {console.log(initialValue)}
      />

      {console.log("test")}
      <Input
        id="category"
        element="textarea"
        label="category"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        value={formState.inputs.category.value}
        valid={formState.inputs.category.isValid}
      />
      <Input
        id="subCategory"
        element="textarea"
        label="subCategory"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        value={formState.inputs.subCategory.value}
        valid={formState.inputs.subCategory.isValid}
      />
      <Input
        id="mark"
        element="textarea"
        label="mark"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        value={formState.inputs.mark.value}
        valid={formState.inputs.mark.isValid}
      />
      <Input
        id="expextedTime"
        element="textarea"
        label="expextedTime"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        value={formState.inputs.expextedTime.value}
        valid={formState.inputs.expextedTime.isValid}
      />
      <Input
        id="correctAnswers"
        element="textarea"
        label="correctAnswers"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        value={formState.inputs.correctAnswers.value}
        valid={formState.inputs.correctAnswers.isValid}
      />
      <input
        id="createdAt"
        element="p"
        label="createdAt"
        // validators={[VALIDATOR_MINLENGTH(5)]}
        // errorText="Please enter a valid description (min. 5 characters)."
        // onInput={() => { }}
        value={new Date()}
        readOnly
      // valid={true}
      />
      <Input
        id="answers"
        element="textarea"
        label="answers"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        value={formState.inputs.answers.description}
        valid={formState.inputs.answers.isValid}
      />

      <Button type="submit">
        UPDATE QUESTION
      </Button>
    </form>
  );
};

export default UpdateQuestion;
