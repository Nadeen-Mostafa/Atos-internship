import React, { useState, useEffect, useReducer, useCallback } from 'react';

import Card from '../../shared/components/UIElements/Card';
import './GetAllQuestions.css';
import Button from "../../shared/components/Button/Button";
import Modal from "../../Model/Model";
import { useForm } from '../../shared/Hooks/form-hook';
import ErrorModel from '../../Model/ErorrModel';
import axios from "axios";
import QuestionItem from '../components/QuestionItem';
import QuestionList from '../components/QuestionList';
import Input from '../../shared/components/input/Input';
import { async } from 'q';
const formReducer = (state, action) => {
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
};
const CreateExamDef = props => {


    const [input, dispatch] = useReducer(formReducer, {
        inputs: {
            exam_name: {
                value: '',
                isValid: false
            },
            passing_score: {
                value: '',
                isValid: false
            },
            questions: [{
                value: '',
                isValid: false
            }],
            created_by: {
                value: '',
                isValid: false
            }
        }, isValid: false
    })


    const [loadedQuestions, setLoadedQuestions] = useState();
    const [isLoading, setIsLoading] = useState(true);
    // const questionId = useParams().questionId;
    const [error, setError] = useState();

    const [checkedState, setCheckedState] = useState([]);
    const [SavedQuestions, setSavedQuestions] = useState([{}]);


    const [formState, setFormData] = useForm(
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
                answer: {
                    value: "",
                    isValid: false
                },
                description: {
                    value: "",
                    isValid: false
                }
            }
        },
        false
    );

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, []);


    useEffect(() => {

        const fetchQuestion = async () => {
            setIsLoading(true);
            try {

                const response = await axios.get(
                    "http://localhost:5000/api/questions"
                );

                const responseData = await response.data;

                if (response.status !== 200) {
                    throw new Error(responseData.message);
                }

                setLoadedQuestions(responseData.questions);

                setCheckedState(new Array(loadedQuestions.length).fill(false));

                setFormData(
                    {
                        name: {
                            value: responseData.questions.name,
                            isValid: true
                        },
                        category: {
                            value: responseData.questions.category,
                            isValid: true
                        },
                        subCategory: {
                            value: responseData.questions.subCategory,
                            isValid: true
                        },
                        mark: {
                            value: responseData.questions.mark,
                            isValid: true
                        },
                        expextedTime: {
                            value: responseData.questions.expextedTime,
                            isValid: true
                        }
                        ,
                        correctAnswers: {
                            value: responseData.questions.correctAnswers,
                            isValid: true
                        }
                        ,
                        createdAt: {
                            value: responseData.questions.createdAt,
                            isValid: true
                        },
                        // answers: [{
                        //   // name: {
                        //   //   value: "",
                        //   //   isValid: true
                        //   // },
                        //   answer: {
                        //     value: responseData.data.questions.answers[0].answer,
                        //     isValid: true
                        //   },
                        //   description: {
                        //     value: responseData.data.questions.answers[0].description,
                        //     isValid: true
                        //   }
                        // }

                    },
                    true
                );




            } catch (err) {
                console.log(err);
                setError(err.message);
            }
            setIsLoading(false);
        };
        fetchQuestion();
    }, [setFormData]);



    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    }
    if (!loadedQuestions && !error) {
        return (<div className="center">
            <Card>
                <h2>Could not find place!</h2>
            </Card>
        </div>);
    }
    const errorHandler = () => {
        setError(null);
    }



    let arr = [];
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }



    const click = async () => {



    }

    let score = 0;
    const placeSubmitHandler = async (e) => {
        e.preventDefault();
        
        for (let i = 0; i < checkedState.length; i++) {
            if (checkedState[i] === true) {
                arr.push(loadedQuestions[i]._id);
                score += loadedQuestions[i].mark

            }

        }
        score = score / 2;
        console.log(score);
       
        try {
            const response = await axios.post("http://localhost:3000/api/exams/examdef", {
                // method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    exam_name: input.inputs.exam_name.value,
                    passing_score: score,
                    created_by: "T1",
                    questions: arr
                    // created_by: formState.inputs.mark.valuey
                })
            });
            // history.push('/');
            console.log(response)
        }
        catch (err) {
            console.log(err)
            setError(err.message);
        }



    }

    return (
        <React.Fragment>
            <ErrorModel error={error} onClear={errorHandler} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Exam Name</span>
                    {/* <input type="text" className="form-control" aria-label="Sizing example input" onInput={inputHandler} id='exam_name' /> */}

                    <Input
                        id="exam_name"
                        element="input"
                        type="text"
                        errorText="Please enter a valid title."
                        onInput={inputHandler}
                    />
                </div>


                {/* <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Passing Score</span>
                    <input className="form-control" type="text" id="country" name="country" value={score} readonly/>
                    
                </div> */}
                <span >choose questions</span>
                {loadedQuestions.map(({ name }, index) => {
                    return (
                        // <li key={index}>
                        <div className="toppings-list-item">
                            <div className="left-section">
                                <input
                                    type="checkbox"
                                    id={loadedQuestions[index]._id}
                                    name={loadedQuestions[index].name}
                                    value={loadedQuestions[index].name}
                                    checked={setCheckedState[index]}
                                    onChange={() => handleOnChange(index)}
                                />

                                <label >{name}</label>
                            </div>
                        </div>
                    );

                })}
                <button className='btn btn-primary' type='submit' onClick={click}>Done</button>
            </form>

        </React.Fragment>
    );
};

export default CreateExamDef;
