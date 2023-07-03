import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { fetchAllAnswersOfUser } from '../../store/answerReducer';
import { Link } from 'react-router-dom';
import DeleteAnswerModal from '../DeleteAnswerModal';
import OpenModalButton from "../OpenModalButton";
import './manageAnswers.css'

function ManageAnswers() {


    const dispatch = useDispatch();
    const history = useHistory();

    //if not logged in, redirect to home
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) history.push(`/`);


    const answers = useSelector((state) => state.answers);

    const userId = sessionUser.id

    console.log("sessionUser123", sessionUser.id)

    useEffect(() => {
        dispatch(fetchAllAnswersOfUser(userId))
    }, [dispatch, userId])

    if (!answers) return null
    console.log(answers)
    const answersArr = Object.values(answers)
    console.log('answersArr', answersArr)
    if (!answersArr.length) {
        return (
            <>
                <h1>Manage Your Answers</h1>
                <div>You have not Answered to any Questions</div>
                {/* <Link to="/spots/new" className="createNew" style={{ textDecoration: 'none', color: 'white' }}>Visit the questions page</Link> */}
            </>
        )
    }
    return (
        <div className="outer">
            <div >
                <h1>Manage Your Answers</h1>
                {/* <Link to="/spots/new" className="createNew" style={{ textDecoration: 'none', color: 'rgb(6 45 70)' }}>Create a new Spot</Link> */}
            </div>

            {answersArr.map(ele => (
                <div className="outerDiv">
                    <div className="map">

                        <div className="ansBody">
                            <div key={ele.id}>{ele.body}</div>

                        </div>
                        <div className="updateAnswer">

                            <Link to={`/answers/update/${ele.id}`} key={ele.id} style={{ textDecoration: 'none', fontSize: "15px", height: "13px", paddingTop: "7px" }}>Update</Link>
                            {/* <Link to="" style={{ textDecoration: 'none', color: 'white' }}>Delete</Link> */}
                            <OpenModalButton buttonText="Delete" modalComponent={<DeleteAnswerModal answer={ele.id} />} />

                        </div>

                    </div>
                </div>

            )

            )}

            <div>
                <h1>For Testing Only</h1>
                <h2>Create Answer</h2>
                <Link to={`/answers/new/${1}`} style={{ textDecoration: 'none', fontSize: "15px", height: "13px", paddingTop: "7px" }}>Post Answer (Question id is hardcoded)</Link>

            </div>
            <div>
                
                <h2>view all answers to a question</h2>
                <Link to={`/answers`} style={{ textDecoration: 'none', fontSize: "15px", height: "13px", paddingTop: "7px" }}>view Answer (Question id is hardcoded)</Link>

            </div>
        </div>

    )
}

export default ManageAnswers;