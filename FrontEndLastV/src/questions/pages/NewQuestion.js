import React, { useCallback, useReducer, useContext, useState, useEffect } from 'react';
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
          answers: [state.inputs.answers, { value: "", isValid: false }],
        },
      };
    ////////////////////////
    default:
      return state;
  }
};

const NewQuestion = () => {

  const [state, setState] = React.useState({
    0: "",
    1: "",
    2: "",
    3: ""
  })

  const [message, setMessage] = useState();

  const change = event => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });

  };
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
      answers: {
        value: state,
        isValid: true
      }


    },
    isValid: false
  });
  const [counter, setCounter] = useState(0);
  const handleClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };




  formState.inputs.answers.value = state;



  // console.log(state)

  // const addAnswerHandler = useCallback(() => {
  //   dispatch({ type: "ADD_ANSWER" });
  // }, []);
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [error, setError] = useState();


  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);
  const answerInputHandler = useCallback(
    (index, value, isValid) => {
      dispatch({
        type: "ADD_ANSWER",
        value: state[index],
        isValid: isValid,
        inputId: `answer-${index}`,
      });
    },
    []
  );

  let testState = state;
  // console.log(testState)
  // console.log(formState.inputs.answers)
  const SubmitHandler = async event => {
    event.preventDefault();
    console.log(formState.inputs.answers.value[message])
    console.log(formState.inputs)
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
          correctAnswers: formState.inputs.answers.value[message],
          createdBy: auth.userId,
          createdAt: formState.inputs.createdAt.value,
          answers: formState.inputs.answers.value
        })
      });
      history.push('/');

      console.log(response.data)
    }
    catch (err) {
      console.log("error")
      setError(err.message);
    }
    // console.log(formState.inputs); // send this to the backend!
  };


  
  const errorHandler = () => {
    setError(null);
  }




  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={errorHandler} />
      <form className="place-form" onSubmit={SubmitHandler}>
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
          validators={[VALIDATOR_REQUIRE]}
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

        <br />
        <h5>
          Correct Answer
        </h5>
        <input
          id="correctAnswers"
          element="textarea"
          label="correctAnswers"
          validators={[VALIDATOR_REQUIRE]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
          onChange={change}
        />
        <br />
        <h5>
          Created At
        </h5>
        <input
          id="createdAt"
          element="p"
          label="createdAt"
          defaultValue={new Date()}
          readOnly />


        <br />
        <br />
        <h5>
          ADD ANSWERS
        </h5>
        <span onClick={handleClick}>+</span>

        {Array.from(Array(counter)).map((c, index) => {
          return (
            <div>
              <label>{`Answer ${index + 1}`}</label>
              <input
                key={`answer-${index}`}
                id={`answer-${index}`}
                element="textarea"
                label={`Answer ${index + 1}`}
                name={index}
                value={state[index]}
                onChange={handleChange}
                onInput={inputHandler}


              />

            </div>
          )
        })}

        {/* <span type="button" onClick={addAnswerHandler}>
          Add Answer
        </span> */}
        {/* {console.log(arr)}
        {console.log(zft)} */}
        <Button type="submit" >
          ADD QUESTION
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewQuestion;
