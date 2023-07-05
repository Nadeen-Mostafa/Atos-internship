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
const CreateExamIns = props => {


    const [input, dispatch] = useReducer(formReducer, {
        inputs: {
            examdefinationid: {
                value: '',
                isValid: false
            },
            startedtime: {
                value: '',
                isValid: false
            },
            endtime: {
                value: '',
                isValid: false
            },
            duration: {
                value: '',
                isValid: false
            },
            completiontime: {
                value: '',
                isValid: false
            },
            schduledtimefrom: {
                value: '',
                isValid: false
            },
            schduledtimeto: {
                value: '',
                isValid: false
            },
            created_by: {
                value: '',
                isValid: false

            },
            createdat: {
                value: '',
                isValid: false
            },
            taken_by: {
                value: '',
                isValid: false
            },
            status: {
                value: '',
                isValid: false
            },
            score: {
                value: '',
                isValid: false
            }
        }
    }
    );


    const [loadedExams, setLoadedExams] = useState();
    const [isLoading, setIsLoading] = useState(true);
    // const questionId = useParams().questionId;
    const [error, setError] = useState();

    const [checkedState, setCheckedState] = useState([]);

    const [formState, setFormData] = useForm(
        {
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
                    "http://localhost:3000/api/exams/examdef"
                );

                const responseData = await response.data;

                if (response.status !== 200) {
                    throw new Error(responseData.message);
                }

                setLoadedExams(responseData);
                console.log(responseData)
                setCheckedState(new Array(loadedExams.length).fill(false));

                
                setFormData(
                    {
                        exam_name: {
                            value: responseData.exam_name,
                            isValid: false
                        },
                        passing_score: {
                            value: responseData.passing_score,
                            isValid: false
                        },
                        questions: [{
                            value: responseData.questions,
                            isValid: false
                        }],
                        created_by: {
                            value: responseData.created_by,
                            isValid: false
                        }

                    },
                    true
                );

                // console.log(loadedExams)




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
    if (!loadedExams && !error) {
        return (<div className="center">
            <Card>
                <h2>Could not find exams!</h2>
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


    const placeSubmitHandler = async (e) => {
        for (let i = 0; i < checkedState.length; i++) {
            if (checkedState[i] === true) {
                arr.push(loadedExams[i].id);
            }

        }
        // console.log(arr)
        e.preventDefault();
        // try {
        //     const response = await axios.post("http://localhost:3000/api/exams/examins", {
        //         // method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             exam_name: input.inputs.exam_name.value,
        //             passing_score: input.inputs.passing_score.value,
        //             created_by:"T1",
        //             questions: arr
        //             // created_by: formState.inputs.mark.valuey
        //         })
        //     });
        //     // history.push('/');
        //     console.log(response)
        // }
        // catch (err) {
        //     console.log(err)
        //     setError(err.message);
        // }



    }

    return (
        <React.Fragment>
            <ErrorModel error={error} onClear={errorHandler} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
                <span >choose questions</span>
                {loadedExams.map(({ created_by }, index) => {
                    return (
                        // <li key={index}>
                        <div className="toppings-list-item">
                            <div className="left-section">
                                <input
                                    type="checkbox"
                                    id={loadedExams[index].id}
                                    name={loadedExams[index].exam_name}
                                    value={loadedExams[index].exam_name}
                                    checked={setCheckedState[index]}
                                    onChange={() => handleOnChange(index)}
                                />

                                <label >{created_by}</label>
                            </div>
                        </div>
                    );

                })}
            </form>

        </React.Fragment>
    );
};

export default CreateExamIns;
