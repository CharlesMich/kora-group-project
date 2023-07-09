import { useDispatch, useSelector, } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { fetchAllAnswersOfUser, fetchAllAnswers } from '../../../store/answerReducer';
import { Link } from 'react-router-dom';
import DeleteAnswerModal from '../DeleteAnswerModal';
import OpenModalButton from "../../OpenModalButton";
import { fetchDeleteFollow, fetchAllFollowers } from '../../../store/followsReducer';
import { fetchPostFollows } from '../../../store/followsReducer';
import { allQuestions } from '../../../store/questions'
import './manageAnswers.css'

function ManageAnswers() {


    const dispatch = useDispatch();
    const history = useHistory();

    //if not logged in, redirect to home
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser || !sessionUser.id) history.push(`/login`);


    const answers = useSelector((state) => state.answers.newState);
    const questions = useSelector((state) => state.questions)
    const follows = useSelector((state) => Object.keys(state.follows))

    // console.log(follows)
    let userId;

    if (sessionUser) {
        userId = sessionUser.id
    }

    // const[following, setFollowing] = useState('Follow')

    useEffect(() => {
        dispatch(fetchAllAnswersOfUser(userId))
    }, [dispatch, userId]);

    useEffect(() => {
        dispatch(fetchAllAnswers());
    }, [dispatch]);


    useEffect(() => {
        dispatch(fetchAllFollowers(userId))
    }, [dispatch, userId]);

    useEffect(() => {
        dispatch(allQuestions())
    }, [dispatch]);

    // let color;
    // let active;
    //     if (!active){
    //         setFollowing('Following')
    //     //    color = 'green'
    //     } else {
    //         setFollowing('Follow')
    //         // color='blue'
    //     }

    // const isFollowingUser = (userId) => {
    //     const followedUserIds = follows.map((follow) => follow.followed_user_id);
    //     return followedUserIds.includes(userId);
    // };

    // const handleClick = async (e) => {
    //     e.preventDefault();

    //     const { value } = e.target.dataset;
    //     console.log(value);

    //     const checkDuplicate = obj => obj.followed_user_id === +value;
    //     console.log(follows.some(checkDuplicate))

    //     if (follows.some(checkDuplicate)) {

    //         // active = false
    //         await dispatch(fetchDeleteFollow(value))

    //     } else {
    //         // active = true
    //         await dispatch(fetchPostFollows(value))
    //     }
    // }

    const handleAdd = async(e)=>{
        e.preventDefault();
        const {value} = e.target.dataset
        await dispatch(fetchPostFollows(value))
    }

    const handleRemove = async(e)=>{
        e.preventDefault();
        const {value} = e.target.dataset
        await dispatch(fetchDeleteFollow(value))
    }


    if (!answers) return null
    if (!userId) return null
    if (!sessionUser.id) return null
    if (!questions) return null
    if (!follows) return null

    const answersArr = Object.values(answers)
    if (!answersArr) return null

    if (!answersArr.length) {
        return (
            <div className="outer">
                <div className="manage-answer-title-container">
                    <div className="answer-title-container">
                        <h1 className="answer-title">Manage Your Answers</h1>
                        <h2 className="manage-subtitle" >You have not Answered to any Questions</h2>
                    </div>
                </div>
                <div className="all-answer-container">
                    <div className="single-answer-container">
                        <h3>If You Want To Answer A Question</h3>

                        <h3 className="manage-subtitle-2">Writing Tips</h3>
                        <p className="manage-answers-text">• Understand the question. Assimilate the perspective with which the user has asked question.</p>
                        <p className="manage-answers-text">• Your answer will be revolving around a central idea which will be derived from the question, deriving this idea is very crucial.</p>
                        <p className="manage-answers-text">• Identify the style of writing by which you would be able to express yourself perfectly. For ex: your answer need not be a straight solution to the question, you can explain your answer in a conversation/dialogue format, story format, poetic format, etc.</p>
                        <p className="manage-answers-text">• Do your ground zero research work on the points/facts/incidents that you are going to put up in your content.</p>
                        <p className="manage-answers-text">• The most important part is - “How well the structuring of content is done?”, which means, after jotting down all the bullet points for your answer how will the points be connected to each other so that something meaningful comes out in picture to the reader.</p>
                        <p className="manage-answers-text">• Taking an example of this very answer I have written, observe the flow of my content- Introduction, Bantering and then the crux of content (magic mantras) followed by conclusion.</p>
                        <p className="manage-answers-text">• To make the reader pay attention to some of the important paraphrases, words, situation, etc use the font editing as per the requirement. But don’t overdo the font editing.</p>
                        <p className="manage-answers-text">• Usage of Info-graphics within your content enhances the readability and reduces the time taken for reading answers.</p>
                        <p className="manage-answers-text">• Don’t finish your answer in a hanging situation, many a time we loose patience or we go out of stamina to write further. To overcome this distress, simply stop writing for a while and take your time for rejuvenation.</p>
                        <p className="manage-answers-text">• Kora allows you to edit your answer drafts anytime, so chill.</p>
                        <p className="manage-answers-text">• After you feel satiated with your answer, don’t hit the “submit” button directly. Every answer should be free of typos and grammatical errors which can be easily overcome by proof reading of the draft twice or thrice.</p>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className="outer">
            <div className="manage-answer-title-container">
                <div className="answer-title-container">
                    <h1 className="answer-title">Manage Your Answers</h1>
                    {/* <p>• {follows ? follows.follows : '0'} Follow</p> */}
                    <p className="manage-subtitle">{sessionUser.firstname} {sessionUser.lastname} </p>
                </div>
            </div>

            {answersArr.map(ele => (
                <div className="all-answer-container">
                    <div className="single-answer-container">
                            <p className="question-by-tag">Question by: {questions[ele.question_id] && questions[ele.question_id].User_firstName} {questions[ele.question_id] && questions[ele.question_id].User_lastName}</p>
                        <div className="answer-profile-container">
                            <img className="answer-profile-pic question-profile-pic" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" />
                            {/* <button className="follow-btn" key={ele.id} onClick={handleClick} data-value={ele.Question_ownerId}>{isFollowingUser(ele.Question_ownerId) ? 'Following' : 'Follow'}</button> */}
                            {userId !== ele.Question_ownerId && <p className="point">•</p>}
                                {userId !== ele.Question_ownerId && follows.includes(ele.Question_ownerId.toString()) && <button key={ele.id} onClick={handleRemove} data-value={ele.Question_ownerId} className="followButton1"> Following</button>}
                                {userId !== ele.Question_ownerId && !follows.includes(ele.Question_ownerId.toString()) && <button key={ele.id} onClick={handleAdd} data-value={ele.Question_ownerId} className="followButton1"> Follow</button>}

                        </div>
                        <h2 className="manageh2">{ele.Question_question}</h2>
                        <p className="manageBody" key={ele.id}>{ele.body}</p>

                        <div className="upanddelbutton">
                            <Link className="all-update-btn" to={`/answers/update/${ele.id}`} key={ele.id}><i class="fa-solid fa-pencil"/> Edit</Link>
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
