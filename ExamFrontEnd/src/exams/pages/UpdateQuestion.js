import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/Button/Button';
import { useForm } from "../../shared/Hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../validators/validators';

import "./QuestionForm.css";
import axios from "axios";
import ErrorModel from '../../Model/ErorrModel';
import { AuthContext } from '../../user/pages/auth-context';
import Card from '../../shared/components/UIElements/Card';
import { useHistory } from 'react-router-dom';
// const DUMMY_QUESTIONS = [
//   {
//     id: 'p1',
//     name: 'Empire State Building',
//     category: 'category',
//     subCategory: 'subcaegory',
//     mark: '20 W 34th St, New York, NY 10001',
//     expextedTime: "",
//     correctAnswers: [],  //array of ids
//     createdBy: "u1",
//     createdAt: "",
//     answers: {
//       id: 40.7484405,
//       name: -73.9878584,
//       description: "this is desc"
//     }
//   },
//   {
//     id: 'p2',
//     name: 'Emp State Building',
//     category: 'One of the most famous sky scrapers in the world!',
//     subCategory: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
//     mark: '20 W 34th St, New York, NY 10001',
//     expextedTime: "",
//     correctAnswers: [],
//     createdBy: "u2",
//     createdAt: "",
//     answers: {
//       id: 40.7484405,
//       name: -73.9878584,
//       description: ""
//     }
//   }
// ];

const UpdateQuestion = () => {
  const history = useHistory();
  const [loadedQuestions, setLoadedQuestions] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const questionId = useParams().questionId;
  const [error, setError] = useState();
  // console.log(questionId);
  const auth = useContext(AuthContext);


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


  useEffect(() => {
    console.log("test update");
    const fetchQuestion = async () => {
      setIsLoading(true);
      try {
        console.log("test try in update")
        const responseData = await axios.get(
          `http://localhost:5000/api/questions/${questionId}`
        );
        // const u=`http://localhost:5000/api/questions/user/${questionId}`;
        // console.log(u);
        // console.log(questionId);
        // console.log(responseData.data.question);
        setLoadedQuestions(responseData.data.question);
        // console.log(responseData.data.question.answers[0].description);
        setFormData(
          {
            name: {
              value: responseData.data.question.name,
              isValid: true
            },
            category: {
              value: responseData.data.question.category,
              isValid: true
            },
            subCategory: {
              value: responseData.data.question.subCategory,
              isValid: true
            },
            mark: {
              value: responseData.data.question.subCategory,
              isValid: true
            },
            expextedTime: {
              value: responseData.data.question.expextedTime,
              isValid: true
            }
            ,
            correctAnswers: {
              value: responseData.data.question.correctAnswers,
              isValid: true
            }
            ,
            createdAt: {
              value: responseData.data.question.createdAt,
              isValid: true
            },
            answers: [{
              // name: {
              //   value: "",
              //   isValid: true
              // },
              answer: {
                value: responseData.data.question.answers[0].answer,
                isValid: true
              },
              description: {
                value: responseData.data.question.answers[0].description,
                isValid: true
              }
            }
            ]
          },
          true
        );

        // console.log(responseData.data.question.answers[0].description);

      } catch (err) {
        console.log("zft erorr");
        setError(err.message);
      }
      setIsLoading(false);
    };
    fetchQuestion();
  }, [questionId, setFormData]);

  // const identifiedQuestion = DUMMY_QUESTIONS.find(p => p.id === questionId);
  // //  console.log(identifiedQuestion);
  // useEffect(() => {
  //   setFormData(
  //     {
  //       name: {
  //         value: identifiedQuestion.name,
  //         isValid: true
  //       },
  //       category: {
  //         value: identifiedQuestion.category,
  //         isValid: true
  //       },
  //       subCategory: {
  //         value: identifiedQuestion.subCategory,
  //         isValid: true
  //       },
  //       mark: {
  //         value: identifiedQuestion.mark,
  //         isValid: true
  //       },
  //       expextedTime: {
  //         value: identifiedQuestion.expextedTime,
  //         isValid: true
  //       }
  //       ,
  //       correctAnswers: {
  //         value: identifiedQuestion.correctAnswers,
  //         isValid: true
  //       }
  //       ,
  //       createdAt: {
  //         value: identifiedQuestion.createdAt,
  //         isValid: true
  //       },
  //       answers: {
  //         // name: {
  //         //   value: identifiedQuestion.answers.name,
  //         //   isValid: true
  //         // },
  //         description: {
  //           value: identifiedQuestion.answers.description,
  //           isValid: true
  //         }
  //       }
  //     },
  //     true
  //   );
  //   setIsLoading(false);
  // }, [setFormData, identifiedQuestion]);

  const QuestionUpdateSubmitHandler = async event => {
    event.preventDefault();
    // console.log(formState.inputs);
    try {

      const res=await axios.patch(
        `http://localhost:5000/api/questions/${questionId}`,{
          // method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body :JSON.stringify({
          name: formState.inputs.name.value,
          category: formState.inputs.category.value,
          subCategory: formState.inputs.subCategory.value,
          mark: formState.inputs.mark.value,
          expextedTime: formState.inputs.expextedTime.value,
          correctAnswers: formState.inputs.correctAnswers.value,
          createdBy: auth.userId,
          createdAt: new Date(),
          answers: formState.inputs.answers.value
          
        }),
  
       } );
      //  setLoadedQuestions(res.config.data)
       console.log(formState.inputs.name.value);
      // console.log(res.config.data.name);
      //  console.log("test");
      history.push('/' + auth.userId + '/questions');
    } catch (err) { }
    // console.log("test");
  };

  // if (!identifiedQuestion) {

  //   return (
  //     <div className="center">
  //       <h2>Could not find place!</h2>
  //     </div>

  //   );

  // }

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

  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={errorHandler} />
      {!isLoading && loadedQuestions && (
        <form className="place-form" onSubmit={QuestionUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            value={loadedQuestions.name}
            valid={true}
          // {console.log(initialValue)}
          />

          {/* {console.log("test")} */}
          <Input
            id="category"
            element="textarea"
            label="category"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            value={loadedQuestions.category}
            valid={true}
          />
          <Input
            id="subCategory"
            element="textarea"
            label="subCategory"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            value={loadedQuestions.subCategory}
            valid={true}
          />
          <Input
            id="mark"
            element="textarea"
            label="mark"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            value={loadedQuestions.mark}
            valid={true}
          />
          <Input
            id="expextedTime"
            element="textarea"
            label="expextedTime"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            value={loadedQuestions.expextedTime}
            valid={true}
          />
          <Input
            id="correctAnswers"
            element="textarea"
            label="correctAnswers"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            value={loadedQuestions.correctAnswers}
            valid={true}
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

            id="answer"
            element="textarea"
            label="answer"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            value={loadedQuestions.answers[0].answer}
            valid={true}
            

          />
          <Input
            id="description"
            element="textarea"
            label="description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            value={loadedQuestions.answers[0].description}
            valid={true}
          />

          <Button type="submit">
            UPDATE QUESTION
          </Button>
        </form>)}
    </React.Fragment>
  );
};

export default UpdateQuestion;
