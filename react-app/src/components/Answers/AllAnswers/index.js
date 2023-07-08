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
            <div className="answer-container">
                <div className="question">{question1.question}</div>
                <span className="ansBtn"><Link to={`/answers/new/${questionId}`} style={{ textDecoration: 'none', color: 'white' }}>Be the first one to Answer</Link></span>
            </div>
        )
    }

    // if user created the question
    // post answer button should not be visible
    console.log(sessionUser.id === question1.owner_id)
    if(sessionUser.id === question1.owner_id){
        return(
        <div className="answer-container">
            <h2 className="question">{question1.question}</h2>
            <h3>You are the creator of this Question</h3>
            {/* <span className="ansBtn"><Link to={`/answers/new/${questionId}`} style={{ textDecoration: 'none', color: "white" }}>Post your Answer</Link></span> */}
                {newArr && newArr.map((answer) =>
                    <div className="single-answer-container">
                        <div className="profileclass">
                            <img className="question-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" />
                            <p className='name'>{answer.User_firstName} {answer.User_lastName} {'•'} {'Follow'}</p>
                        </div>
                        <p className="eachanswer" key={answer.id}>{answer.body}</p>
                    </div>

                )}
        </div>
        )
    }

    // if User has already answered the question, post the button should not be visible.
   
    
    const checkDuplicate = obj => obj.user_id === sessionUser.id;

    console.log(newArr.some(checkDuplicate))
    if(newArr.some(checkDuplicate)){
        return(
            <div className="container">
                <div className="question">{question1.question}</div>
                <div>You have already answered this question</div>
                {/* <span className="ansBtn"><Link to={`/answers/new/${questionId}`} style={{ textDecoration: 'none', color: "white" }}>Post your Answer</Link></span> */}
                <div>
                    {newArr && newArr.map((answer) =>
                        <div className="answerCol">
                            <div className="profileclass">
                                <img className="question-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" />
                                <div className='name'>{answer.User_firstName} {answer.User_lastName} {'•'} {'Follow'}</div>
                            </div>
                            <div className="eachanswer" key={answer.id}>{answer.body}</div>
                        </div>
    
                    )}
                </div>
            </div>
            )
    }
   

    return (
        <div className="container">
            <div className="question">{question1.question}</div>
            <span className="ansBtn"><Link to={`/answers/new/${questionId}`} style={{ textDecoration: 'none', color: "white" }}>Post your Answer</Link></span>
            <div>
                {newArr && newArr.map((answer) =>
                    <div className="answerCol">
                        <div className="profileclass">
                            <img className="question-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" />
                            <div className='name'>{answer.User_firstName} {answer.User_lastName} {'•'} {'Follow'}</div>
                        </div>
                        <div className="eachanswer" key={answer.id}>{answer.body}</div>
                    </div>

                )}
            </div>
        </div>

    )

}

export default AllAnswers;