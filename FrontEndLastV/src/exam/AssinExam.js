import React, { useState, useEffect, useReducer, useCallback, useContext } from 'react';

import Card from '../shared/components/UIElements/Card';
import './GetAllQuestions.css';
import Button from "../shared/components/Button/Button";
import Modal from "../Model/Model";
import { useForm } from '../shared/Hooks/form-hook';
import ErrorModel from '../Model/ErorrModel';
import axios from "axios";
// import QuestionItem from '../components/QuestionItem';
// import QuestionList from '../components/QuestionList';
import Input from '../shared/components/input/Input';
import { AuthContext } from '../user/pages/auth-context';
import { VALIDATOR_REQUIRE } from '../validators/validators';
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
const AssinExam = props => {
    const auth = useContext(AuthContext);

    // console.log(auth);

    const [input, dispatch] = useReducer(formReducer, {
        inputs: {
            examdefinationid: {
                value: '',
                isValid: false
            },
            statedtime: {
                value: null,
                isValid: false
            },
            endtime: {
                value: null,
                isValid: false
            },
            duration: {
                value: 60,
                isValid: false
            },
            completiontime: {
                value: null,
                isValid: false
            },
            sechudledtimefrom: {
                value: Date(),
                isValid: false
            },
            sechudledtimeto: {
                value: Date(),
                isValid: false
            },
            created_by: {
                value: '',
                isValid: false
            },
            createdat: {
                value: `${new Date()}`,
                isValid: false
            },
            taken_by: {
                value: null,
                isValid: false
            },
            status: {
                value: null,
                isValid: false
            },
            score: {
                value: null,
                isValid: false
            },


        }, isValid: false
    })


    const [loadedUsers, setLoadedUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    // const questionId = useParams().questionId;
    const [error, setError] = useState();

    const [checkedState, setCheckedState] = useState([]);

    const [loadedExam, setLoadedExam] = useState();
    const [CheckedExams, setCheckedExams] = useState([]);

    const [formState, setFormData] = useForm(
        {
            name: {
                value: "",
                isValid: false
            },
            userType: {
                value: "",
                isValid: false
            },

        },
        false
    );

    const [FormExam, setFormExam] = useForm(
        {
            exam_name: {
                value: "",
                isValid: false
            },
            passing_score: {
                value: "",
                isValid: false
            },

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
                    "http://localhost:4000/api/users"
                );

                const responseData = await response.data;

                if (response.status !== 200) {
                    throw new Error(responseData.message);
                }


                setLoadedUsers(responseData.users);

                setCheckedState(new Array(responseData.users.length).fill(false));
                // console.log(loadedUsers)
                setFormData(
                    {
                        name: {
                            value: responseData.users.name,
                            isValid: true
                        },
                        userType: {
                            value: responseData.users.userType,
                            isValid: true
                        },


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

    useEffect(() => {

        const fetchQuestion = async () => {
            // setIsLoading(true);
            try {

                const response = await axios.get(
                    "http://localhost:3000/api/exams/examdef"
                );

                const responseData = await response.data;

                if (response.status !== 200) {
                    throw new Error(responseData.message);
                }


                setLoadedExam(responseData);


                setCheckedExams(new Array(responseData.length).fill(false));
                // console.log(loadedUsers)
                setFormData(
                    {
                        exam_name: {
                            value: responseData.exam_name,
                            isValid: true
                        },
                        passing_score: {
                            value: responseData.passing_score,
                            isValid: true
                        },


                    },
                    true
                );




            } catch (err) {
                console.log(err);
                setError(err.message);
            }
            // setIsLoading(false);
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
    if (!loadedUsers && !error) {
        return (<div className="center">
            <Card>
                <h2>Could not find users!</h2>
            </Card>
        </div>);
    }


    const handleOnChangeForExam = (position) => {
        const updatedCheckedState = CheckedExams.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedExams(updatedCheckedState);
    }
    // const errorHandler = () => {
    //     setError(null);
    // }



    // let arr = [];
    // const handleOnChange = (position) => {
    //     const updatedCheckedState = checkedState.map((item, index) =>
    //         index === position ? !item : item
    //     );
    //     setCheckedState(updatedCheckedState);
    // }



    let ExamId;
    // var intlDateObj = new Intl.DateTimeFormat('en-GB', {  timeZone: 'Australia/Sydney' });
    let dateLocal;
    let newDate;
    let dateLocal2;
    let newDate2;
    function test(e) {
        dateLocal = new Date(e.target.value);
        newDate = new Date(dateLocal.getTime() - dateLocal.getTimezoneOffset()*60*1000);
        input.inputs.sechudledtimefrom.value=newDate;
      }
      function test2(e) {
        dateLocal2 = new Date(e.target.value);
        newDate2 = new Date(dateLocal2.getTime() - dateLocal2.getTimezoneOffset()*60*1000);
        input.inputs.sechudledtimeto.value=newDate2;
      }
      
    const placeSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(auth)
        for (let i = 0; i < CheckedExams.length; i++) {
            if (CheckedExams[i] === true) {
                ExamId = loadedExam[i].id
            }

        }
        console.log(input.inputs)
        try {
            const response = await axios.post("http://localhost:3000/api/exams/examins", {
                // method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    examdefinationid: ExamId,
                    statedtime: input.inputs.statedtime.value,
                    endtime: input.inputs.endtime.value,
                    duration: input.inputs.duration.value,
                    completiontime: input.inputs.completiontime.value,
                    sechudledtimefrom: "",
                    sechudledtimeto: "",
                    created_by: auth.userId,
                    createdat: input.inputs.createdat.value,
                    taken_by: input.inputs.taken_by.value,
                    status: input.inputs.status.value,
                    score: input.inputs.score.value
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

    let arr = [];
    for (let i = 0; i < loadedUsers.length; i++) {
        if (loadedUsers[i].userType === "student") {
            arr.push(loadedUsers[i])
        }
    }



    // }
    const errorHandler = () => {
        setError(null);
    }

    
    return (
        <React.Fragment>
            <ErrorModel error={error} onClear={errorHandler} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">sechudledtimefrom</span>

                    <input
                        id="sechudledtimefrom"

                        type="date"
                        validators={[VALIDATOR_REQUIRE]}
                        errorText="Please enter a valid title."
                        onInput={inputHandler}
                        onChange={test}
                        
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">sechudledtimeto</span>

                    <input
                        id="sechudledtimeto"

                        type="date"
                        validators={[VALIDATOR_REQUIRE]}
                        errorText="Please enter a valid title."
                        onInput={inputHandler}
                        onChange={test2}
                    />
                </div>
                <span >choose users</span>
                {arr.map(({ name }, index) => {

                    return (
                        // <li key={index}>
                        <div className="toppings-list-item">
                            <div className="left-section">
                                <input
                                    type="checkbox"
                                    id={loadedUsers[index]._id}
                                    name={loadedUsers[index].name}
                                    value={loadedUsers[index].name}
                                // checked={setCheckedState[index]}
                                // onChange={() => handleOnChange(index)}
                                />

                                <label >{name}</label>
                            </div>
                        </div>
                    );

                })}

                <br />
                <span >choose Exam Definition</span>
                {loadedExam.map(({ exam_name }, index) => {

                    return (
                        // <li key={index}>
                        <div className="toppings-list-item">
                            <div className="left-section">
                                <input
                                    type="checkbox"
                                    id={loadedExam[index]._id}
                                    name={loadedExam[index].exam_name}
                                    value={loadedExam[index].exam_name}
                                    checked={setCheckedExams[index]}
                                    onChange={() => handleOnChangeForExam(index)}
                                />

                                <label >{exam_name}</label>
                            </div>
                        </div>
                    );

                })}
                <button className='btn btn-primary' type='submit'>Assign</button>
            </form>
        </React.Fragment>
    );
};

export default AssinExam;
