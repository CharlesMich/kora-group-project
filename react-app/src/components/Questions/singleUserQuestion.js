import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { allQuestions } from "../../store/questions";
import "./questions.css"
import OpenModalButton from "../OpenModalButton";
import UpdateQuestion from "../UpdateQuestion";
import DeleteQuestion from "../DeleteQuestion";
import SpaceSidebar from "../Space/SpaceSidebar";
import CreateQuestion from "../CreateQuestion";


const SingleUserQuestion = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allQuestions())

    }, [dispatch]);

    const questions = useSelector(state => Object.values(state.questions))
    const us = useSelector(state => state.session.user)
    let user;
    let userQuestion
    if (us) {
        user = us.id
        userQuestion = questions.filter(question => question.owner_id === user)
    }
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/login" />;
    return (<>
        <div className="main-question-page">

            <div className="space-sidebar">
                < SpaceSidebar />
            </div>

            <div className="display-all-containers">
                {!userQuestion[0] && <h2>You have no questions for now</h2>} 
                {!userQuestion[0] && <NavLink className="nav-add-question-btn" exact to='/new-question'>
						Ask a question <i className="nav-icon fa-solid fa-plus"/>
					</NavLink>}
                {userQuestion.map(ele =>
                    <div className="single-container" key={ele.id}>
                        <div className="question-user-container">
                            <img className="question-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" />
                            <p className="question-user-name">{ele.User_firstName} {ele.User_lastName}</p>
                        </div>
                        <NavLink className="question-tilte" key={ele.id} exact to={`/answers/${ele.id}`}>
                            {ele.question}
                        </NavLink>
                        <div className="question-update-delete-container">
                            {user && ele.owner_id === user && <OpenModalButton
                                buttonText="Edit"
                                className="all-update-btn delete-update-btn"
                                modalComponent={<UpdateQuestion id={ele.id} />}
                            />}
                            {user && ele.owner_id === user && <OpenModalButton
                                buttonText="Delete"
                                className="all-delete-btn delete-update-btn"
                                modalComponent={<DeleteQuestion id={ele.id} />}
                            />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>)


}
export default SingleUserQuestion;
