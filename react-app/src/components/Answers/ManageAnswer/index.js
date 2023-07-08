import { useDispatch, useSelector, } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { fetchAllAnswersOfUser } from '../../../store/answerReducer';
import { Link } from 'react-router-dom';
import DeleteAnswerModal from '../DeleteAnswerModal';
import OpenModalButton from "../../OpenModalButton";
import { fetchAllFollows, fetchDeleteFollow } from '../../../store/followsReducer';
import { fetchPostFollows } from '../../../store/followsReducer';
import './manageAnswers.css'

function ManageAnswers() {


    const dispatch = useDispatch();
    const history = useHistory();

    //if not logged in, redirect to home
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser || !sessionUser.id) history.push(`/login`);


    const answers = useSelector((state) => state.answers.newState);
    const questions = useSelector((state) => state.questions)
    const follows = useSelector((state) => state.follows.myFollows)

    console.log('follows', follows)

    let userId;

    if (sessionUser) {
        userId = sessionUser.id
    }

    useEffect(() => {
        dispatch(fetchAllAnswersOfUser(userId))
    }, [dispatch, userId])

    useEffect(() => {
        dispatch(fetchAllFollows(userId))
    }, [dispatch, userId])


    const [active, setActive] = useState(false);
    const handleClick = async (e) => {
        e.preventDefault();
        setActive(!active);
        const { value } = e.target.dataset;
        console.log(value);

        if (!active) {
            await dispatch(fetchPostFollows(value))
        } else {
            await dispatch(fetchDeleteFollow(value))
        }
    }

    if (!answers) return null
    if (!userId) return null
    if (!sessionUser.id) return null
    if (!questions) return null
    if (!follows) return null
    // console.log(answers)
    // console.log('answersArr', answersArr)
    const answersArr = Object.values(answers)
    if (!answersArr) return null


    if (!answersArr.length) {
        return (
            <div className="outer">
                <div className="manageh1">Manage Your Answers</div>
                <div >You have not Answered to any Questions</div>
            </div>
        )
    }

    // • <span style={{ color: 'blue' }}>{follows ? follows[0].follows : 0}Follows</span>



    return (
        <div className="outer">
            <div className="manage-answer-title-container">
                <div className="answer-title-container">
                    <h1 className="answer-title">Manage Your Answers</h1>
                    <p>• {follows ? follows.follows : '0'} Follow</p>
                    <p className="manage-subtitle">{sessionUser.firstname} {sessionUser.lastname} </p>
                </div>
            </div>

            {/* <div className="display-all-containers"> */}
            <div className="all-answer-container">
            {answersArr.map(ele => (
                <div className="single-answer-container">
                        <p className="question-by-tag">Question by: {questions[ele.question_id] && questions[ele.question_id].User_firstName} {questions[ele.question_id] && questions[ele.question_id].User_lastName}</p>
                    <div className="answer-profile-container">
                        <img className="answer-profile-pic question-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" />
                        <button className="follow-btn" onClick={handleClick} data-value={ele.Question_ownerId}>Follow</button>
                    </div>
                    <h2 className="manageh2">{ele.Question_question}</h2>
                    <p className="manageBody" key={ele.id}>{ele.body}</p>

                    <div className="upanddelbutton">
                        <Link to={`/answers/update/${ele.id}`} key={ele.id}>Update</Link>
                        {/* <Link to="" style={{ textDecoration: 'none', color: 'white' }}>Delete</Link> */}
                        <OpenModalButton className="updateBtn" buttonText="Delete" modalComponent={<DeleteAnswerModal answer={ele.id} />} />
                    </div>
                </div>
            )
            )}
            </div>
            {/* </div> */}


        </div>

    )
}

export default ManageAnswers;