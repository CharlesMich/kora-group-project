import { useDispatch, useSelector, useStore } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { fetchAllAnswersOfUser } from '../../../store/answerReducer';
import { Link } from 'react-router-dom';
import DeleteAnswerModal from '../DeleteAnswerModal';
import OpenModalButton from "../../OpenModalButton";
import { fetchDeleteFollow, fetchAllFollowers } from '../../../store/followsReducer';
import { fetchPostFollows } from '../../../store/followsReducer';
import './manageAnswers.css'

function ManageAnswers() {


    const dispatch = useDispatch();
    const history = useHistory();
    const store = useStore()

    //if not logged in, redirect to home
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser || !sessionUser.id) history.push(`/`);


    const answers = useSelector((state) => state.answers.newState);
    const questions = useSelector((state) => state.questions)
    const follows = useSelector((state) => state.follows)

    const [active, setActive] = useState(false)


    let userId;

    if (sessionUser) {
        userId = sessionUser.id
    } else {
        userId = null
    }

    useEffect(() => {
        dispatch(fetchAllAnswersOfUser(userId))
        dispatch(fetchAllFollowers(userId))
    }, [dispatch, userId])

    // let active;

    // console.log(active)
    const isFollowed = (value) => {
        return follows && follows[value];
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const { value } = e.target.dataset;
        console.log('value', value);

        console.log('isfollowed', isFollowed(value));

        if (value !== sessionUser.id && isFollowed(value)) {
            await dispatch(fetchDeleteFollow(value));
        } else if (value !== sessionUser.id && !isFollowed(value)) {
            await dispatch(fetchPostFollows(value));
        }

        // dispatch(fetchAllFollowers(userId));
    };



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
            <div>
                <div className="manageh1">Manage Your Answers</div>
                <div className="manage-subtitle" style={{ paddingBottom: "20px" }}><span>{sessionUser.firstname} {sessionUser.lastname}</span></div>

            </div>

            {answersArr.map(ele => (
                <div className="outerDiv">
                    <div className="map">

                        <div className="ansBody">
                            <div className="profileclass1">
                                <div className="imgdiv"><img className="imgclass" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" /></div>
                                <div className="mngansname">Question by {questions[ele.question_id] && questions[ele.question_id].User_firstName} {questions[ele.question_id] && questions[ele.question_id].User_lastName}</div>

                                <button onClick={handleClick} style={{ color: active ? "blue" : "black" }} data-value={ele.Question_ownerId}>Follow</button>
                                <div><h2 className="manageh2">{ele.Question_question}</h2></div>
                            </div>
                            <div className="manageBody" key={ele.id}>{ele.body}</div>

                        </div>
                        <div className="upanddelbutton">

                            <span className="updateBtn" style={{ backgroundColor: 'rgba(237,236,237,1)' }}><Link to={`/answers/update/${ele.id}`} key={ele.id} style={{ textDecoration: 'none', color: 'black', backgroundColor: 'none' }}>Update</Link></span>
                            {/* <Link to="" style={{ textDecoration: 'none', color: 'white' }}>Delete</Link> */}
                            <OpenModalButton className="updateBtn" buttonText="Delete" modalComponent={<DeleteAnswerModal answer={ele.id} />} />

                        </div>

                    </div>
                </div>

            )

            )}


        </div>

    )
}

export default ManageAnswers;
