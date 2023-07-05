import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
    return (<>
        <div className="mainQuestionPage">

            <div className="spaceSidebar">
                < SpaceSidebar />
            </div>
            <div className="space"></div>
            <div className="allQuestions">
                {questions.map(ele =>
                    <div className="questionNum" key={ele.id}>
                        <div className="userPart">
                            <div className="profileDiv"></div>
                            <div className="textDiv">
                                <p className="nom">{ele.User_firstName} {ele.User_lastName}</p>

                            </div>
                        </div>
                        <div className="questionPart">
                            <div>
                                <NavLink key={ele.id} exact to={`/answers/${ele.id}`}>
                                    <p className="ques">{ele.question}</p>
                                </NavLink>
                                {user && ele.owner_id === user && <OpenModalButton
                                    buttonText="Update"
                                    modalComponent={<UpdateQuestion id={ele.id} />}
                                />}
                                {user && ele.owner_id === user && <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteQuestion id={ele.id} />}
                                />}
                            </div>
                           <p>
                           It was July 4, 2000. I asked him for a couple dollars for gas, he laughed and told me I was going to couple dollar him to death. That’s what he always said. I was a 28 year old, single mother, living an hour away from him and my mom and was in
                           </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>)


}
export default QuestionComponent;
