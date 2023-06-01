import React, { useCallback, useReducer } from 'react';
import ReactDOM from 'react-dom';
import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/Button/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../validators/validators';
import './NewQuestion.css';
import NewAnswe from './NewAnswe';

let index = 0;
const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    case "ADD_ANSWER":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          answers: [...state.inputs.answers, { value: "", isValid: false }],
        },
      };
    ////////////////////////
    default:
      return state;
  }
};

const NewQuestion = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      name: {
        value: '',
        isValid: false
      },
      category: {
        value: '',
        isValid: false
      },
      subCategory: {
        value: '',
        isValid: false
      },
      mark: {
        value: '',
        isValid: false
      },
      expextedTime: {
        value: '',
        isValid: false
      },
      correctAnswers: {
        value: '',
        isValid: false
      },
      createdAt: {
        value: `${new Date()}`,
        isValid: false
      },
      answers: [
        {
          answer: {
            value: "",
            isValid: false
          },
          description: {
            value: "",
            isValid: true
          }
        }
      ]
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);
  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };


  const answerInputHandler = useCallback(
    (index, value, isValid) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: `answer-${index}`,
      });
    },
    []
  );
  const addAnswerHandler = useCallback(() => {
    dispatch({ type: "ADD_ANSWER" });
  }, []);

  function test() {

    const content = (
      <div>
        <Input id="title" element="input" type="text" label="Question" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title" onInput={inputHandler} />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />

        {formState.inputs.answers.map((answer, index) => (
          <Input
            key={`answer-${index}`}
            id={`answer-${index}`}
            element="input"
            type="text"
            label={`Answer ${index + 1}`}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid answer"
            onInput={(value, isValid) => answerInputHandler(index, value, isValid)}
          />
        ))}
      </div>
    );

    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));

  }

  let zft;
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="name"
        element="input"
        type="text"
        label="name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="category"
        element="textarea"
        label="category"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="subCategory"
        element="textarea"
        label="subCategory"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="mark"
        element="textarea"
        label="mark"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="expextedTime"
        element="textarea"
        label="expextedTime"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="correctAnswers"
        element="textarea"
        label="correctAnswers"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <input
        id="createdAt"
        element="p"
        label="createdAt"
        defaultValue={new Date()}
        readOnly
      // validators={[VALIDATOR_MINLENGTH(5)]}
      // errorText="Please enter a valid description (at least 5 characters)."
      // onInput={inputHandler}
      />


      {/* {/* {/* <Input
        id="answers"
        element="textarea"
        label="answers"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        
      />  */}


      {formState.inputs.answers.map(index => (
        <>
          <Input
            
            id="answer"
            element="textarea"
            label="answer"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            {...index.answer.value}

          />
          <Input
            id="description"
            element="textarea"
            label="description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}

          />
        </>
      )
      )}



      {/* <Input id="answer" 
      element="input" 
      type="text" 
      label="answer" 
      validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title" onInput={inputHandler} />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      /> */}

      {/* <Input
          key={`answer-${index}`}
          id={`answer-${index}`}
          element="input"
          type="text"
          label={`Answer ${index + 1}`}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid answer"
          onInput={(value, isValid) => answerInputHandler(index, value, isValid)}
        /> */}



      <Button type="submit" onClick={test}>
        ADD THIS ANSWER
      </Button>
      <Button type="submit" >
        ADD QUESTION
      </Button>
    </form>
  );
};

export default NewQuestion;
