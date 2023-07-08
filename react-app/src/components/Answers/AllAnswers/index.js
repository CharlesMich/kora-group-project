import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom";
import { getAllAnswers } from '../../../store/answerReducer';
import { allQuestions } from '../../../store/questions';
import { fetchPostFollows } from '../../../store/followsReducer';

import './AllAnswers.css';

function AllAnswers() {
    const dispatch = useDispatch();
    const history = useHistory();


    //if not logged in, redirect to home
    let sessionUser;
    sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) history.push(`/`);

    let questionId = useParams().questionId;

    const answers = useSelector(state => state.answers ? state.answers.tempState : null);
    const question1 = useSelector(state => state.questions ? state.questions[questionId] : null)
    const follows = useSelector((state) => state.follows.myFollows)

    

    let userId;

    if (sessionUser) {
        userId = sessionUser.id
    }

    

    useEffect(() => {
        dispatch(getAllAnswers(questionId));
    }, [dispatch, questionId]);

    useEffect(() => {
        dispatch(allQuestions())
    }, [dispatch]);

    if (!answers) return null;
    if (!question1) return null;
    

    let newArr = Object.values(answers)


    // if there are no answers
    if (!newArr.length && sessionUser.id !== question1.owner_id ) {
        return (
            <div className="outer">
                <div className="manage-answer-title-container">
                    <div className="answer-title-container">
                        <h1 className="question">{question1.question}</h1>
                    </div>
                </div>
                        <Link className="first-to-answer-btn" to={`/answers/new/${questionId}`}>Be the first one to Answer</Link>
            </div>
        )
    }

    // if user created the question
    // post answer button should not be visible
    console.log(sessionUser.id === question1.owner_id)
    if(sessionUser.id === question1.owner_id){
        return(
            <div className="outer">
                <div className="manage-answer-title-container">
                    <div className="answer-title-container">
                        <h2 className="question">{question1.question}</h2>
                        <h3>You are the creator of this Question</h3>
                    </div>

                    <div className="user-question-answer all-answer-container">
                        {newArr && newArr.map((answer) =>
                            <div className="single-answer-container">
                                <div className="answer-profile-container">
                                    <img className="answer-profile-pic question-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" />
                                    <p className='name'>{answer.User_firstName} {answer.User_lastName} {'•'} {'Follow'}</p>
                                </div>
                                <p className="manageBody" key={answer.id}>{answer.body}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // if User has already answered the question, post the button should not be visible.
   
    
    const checkDuplicate = obj => obj.user_id === sessionUser.id;

    console.log(newArr.some(checkDuplicate))
    if(newArr.some(checkDuplicate)){
        return(
            <div className="outer">
                <div className="manage-answer-title-container">
                    <div className="answer-title-container">
                        <h2>{question1.question}</h2>
                        <p>You have already answered this question</p>
                    </div>
                </div>

                    {newArr && newArr.map((answer) =>
                        <div className="user-question-answer all-answer-container">
                            <div className="single-answer-container">
                                <div className="answer-profile-container">
                                    <img className="answer-profile-pic question-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" />
                                    <p className='name'>{answer.User_firstName} {answer.User_lastName} {'•'} {'Follow'}</p>
                                </div>
                                <p className="eachanswer" key={answer.id}>{answer.body}</p>
                            </div>
        
                        </div>
                    )}
            </div>
            )
    }
   

    return (
        <div className="outer">
            <div className="manage-answer-title-container">
                <div className="answer-title-container">
                    <h2>{question1.question}</h2>
                </div>
            </div>

            <Link className="first-to-answer-btn" to={`/answers/new/${questionId}`}>Post your Answer</Link>

            {newArr && newArr.map((answer) =>
                <div className="user-question-answer all-answer-container">
                    <div className="single-answer-container">
                        <div className="answer-profile-container">
                            <img className="question-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" />
                            <p className='name'>{answer.User_firstName} {answer.User_lastName} {'•'} {'Follow'}</p>
                        </div>
                        <p className="eachanswer" key={answer.id}>{answer.body}</p>
                    </div>
                </div>
            )}
        </div>

    )

}

export default AllAnswers;