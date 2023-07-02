import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { allQuestions } from "../../store/questions";
import "./questions.css"

const QuestionComponent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allQuestions())

    }, [dispatch]);

    const questions = useSelector(state => Object.values(state.questions))

    return (<>
        <div>
            {questions.map(ele =>
                <div>{ele.question}</div>
                )}
        </div>
    </>)


}
export default QuestionComponent;