import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { allQuestions } from "../../store/questions";
import "./questions.css"
import OpenModalButton from "../OpenModalButton";
import UpdateQuestion from "../UpdateQuestion";
import DeleteQuestion from "../DeleteQuestion";
import SpaceSidebar from "../Space/SpaceSidebar";


const QuestionComponent = () => {

    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allQuestions())
        
    }, [dispatch]);
    
    const questions = useSelector(state => Object.values(state.questions))
    const us = useSelector(state => state.session.user)
    let user;
    if (us) {
        user = us.id
    }

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/login" />;

    return (<>
        <div className="main-question-page">

            <div className="space-sidebar">
                < SpaceSidebar />
            </div>
            <div className="allQuestions">
                {questions.map(ele =>
                    <div className="single-question-container" key={ele.id}>
                        <div className="question-user-container">
                        <img className="question-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo"/>
                                <p className="question-user-name">{ele.User_firstName} {ele.User_lastName}</p>
                        </div>
                                <NavLink className="question-tilte" key={ele.id} exact to={`/answers/${ele.id}`}>
                                    {ele.question}
                                </NavLink>
                                <div className="question-update-delete-container">
                                    {user && ele.owner_id === user && <OpenModalButton
                                        buttonText="Update"
                                        className="delete-update-btn"
                                        modalComponent={<UpdateQuestion id={ele.id} />}
                                    />}
                                    {user && ele.owner_id === user && <OpenModalButton
                                        buttonText="Delete"
                                        className="delete-update-btn"
                                        modalComponent={<DeleteQuestion id={ele.id} />}
                                    />}
                                </div>
                          
                    </div>
                )}
            </div>
        </div>
    </>)


}
export default QuestionComponent;
