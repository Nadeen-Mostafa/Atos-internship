import React, { useCallback, useReducer, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/Button/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../validators/validators';
import './NewQuestion.css';
import NewAnswe from './NewAnswe';
import axios from 'axios';
import { AuthContext } from '../../user/pages/auth-context';
import ErrorModel from '../../Model/ErorrModel';
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
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [error, setError] = useState();
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
        value: null,
        isValid: false
      },
      expextedTime: {
        value: null,
        isValid: false
      },
      correctAnswers: {
        value: null,
        isValid: false
      },
      createdAt: {
        value: `${new Date()}`,
        isValid: false
      },
      answers: [
        {
          answer: {
            value: null,
            isValid: false
          },
          description: {
            value: null,
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
  
  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/questions", {
        // method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formState.inputs.name.value,
          category: formState.inputs.category.value,
          subCategory: formState.inputs.subCategory.value,
          mark: formState.inputs.mark.value,
          expextedTime: formState.inputs.expextedTime.value,
          correctAnswers: formState.inputs.correctAnswers.value,
          createdBy: auth.userId,
          createdAt:formState.inputs.createdAt.value,
          answers: [{ answer: formState.inputs.answer.value, description: formState.inputs.description.value }]
        })
      });
      history.push('/');
    }
    catch (err) {
      console.log("error")
      setError(err.message);
    }
    // console.log(formState.inputs); // send this to the backend!
  };


  // const answerInputHandler = useCallback(
  //   (index, value, isValid) => {
  //     dispatch({
  //       type: "INPUT_CHANGE",
  //       value: value,
  //       isValid: isValid,
  //       inputId: `answer-${index}`,
  //     });
  //   },
  //   []
  // );
  // const addAnswerHandler = useCallback(() => {
  //   dispatch({ type: "ADD_ANSWER" });
  // }, []);

  // function test() {

  //   const content = (
  //     <div>
  //       <Input id="title" element="input" type="text" label="Question" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title" onInput={inputHandler} />
  //       <Input
  //         id="description"
  //         element="textarea"
  //         label="Description"
  //         validators={[VALIDATOR_REQUIRE()]}
  //         errorText="Please enter a valid description (at least 5 characters)."
  //         onInput={inputHandler}
  //       />

  //       {formState.inputs.answers.map((answer, index) => (
  //         <Input
  //           key={`answer-${index}`}
  //           id={`answer-${index}`}
  //           element="input"
  //           type="text"
  //           label={`Answer ${index + 1}`}
  //           validators={[VALIDATOR_REQUIRE()]}
  //           errorText="Please enter a valid answer"
  //           onInput={(value, isValid) => answerInputHandler(index, value, isValid)}
  //         />
  //       ))}
  //     </div>
  //   );

  //   return ReactDOM.createPortal(content, document.getElementById('modal-hook'));

  // }
  const errorHandler = () => {
    setError(null);
  }
  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={errorHandler} />
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
          validators={[VALIDATOR_REQUIRE]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="expextedTime"
          element="textarea"
          label="expexted Time in minutes"
          validators={[VALIDATOR_REQUIRE]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="correct Answers"
          element="textarea"
          label="correctAnswers"
          validators={[VALIDATOR_REQUIRE]}
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

        {/* <Button type="submit" onClick={test}>
          ADD THIS ANSWER
        </Button> */}
        <Button type="submit" >
          ADD QUESTION
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewQuestion;
