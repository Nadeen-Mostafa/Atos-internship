import React, {useCallback, useReducer} from "react";

import Input from "../../shared/components/input/Input";
import "./NewQuestion.css";
import { VALIDATOR_REQUIRE } from "../../validators/validators";
import Button from "../../shared/components/Button/Button";





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
        /////////////////////
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
  



const NewAnswe = () => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
          title: {
            value: '',
            isValid: false
          },
          description: {
            value: '',
            isValid: false
          },
          answers:[
            {
                answer : { value: "",
                            isValid: false},
                description: {
                            value: "",
                            isValid: true
                }
            }
          ]
        },
        isValid: false
      });

    const questionInputHandler = useCallback((id, value, isValid)=>{
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
          });  
    },[]);  
    ////////////////////////////
    
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
      ////////////////////
    
    return <form className="place-form">
     <Input id="title" element="input" type="text" label="Question" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title" onInput={questionInputHandler}/>
     <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={questionInputHandler}
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
      <button type="button" onClick={addAnswerHandler}>
        Add Answer
      </button>
     <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>

};

export default NewAnswe;