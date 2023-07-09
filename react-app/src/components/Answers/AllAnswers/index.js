import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom";
import { getAllAnswers } from '../../../store/answerReducer';
import { allQuestions } from '../../../store/questions';
import OpenModalButton from "../../OpenModalButton";
import UpdateQuestion from "../../UpdateQuestion";
import { fetchDeleteFollow, fetchAllFollowers } from '../../../store/followsReducer';
import { fetchPostFollows } from '../../../store/followsReducer';
import DeleteQuestion from "../../DeleteQuestion";
import './AllAnswers.css';

function AllAnswers() {
    const dispatch = useDispatch();
    const history = useHistory();


    //if not logged in, redirect to home
    let sessionUser;
    sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) history.push(`/`);

    let questionId = useParams().questionId;
    // console.log(questionId)
    const answers = useSelector(state => state.answers ? state.answers.tempState : null);
    const question1 = useSelector(state => state.questions ? state.questions[questionId] : null)
    const follows = useSelector((state) => Object.keys(state.follows))


    let userId;

    if (sessionUser) {
        userId = sessionUser.id
    }

    useEffect(() => {
        dispatch(getAllAnswers(questionId));
    }, [dispatch, questionId]);

    useEffect(() => {
        dispatch(fetchAllFollowers(userId))
    }, [dispatch, userId]);

    useEffect(() => {
        dispatch(allQuestions())
    }, [dispatch]);

    if (!answers) return null;
    if (!question1) return null;
    if (!follows) return null;
    if (!userId) return null


    let newArr = Object.values(answers);

    // let color;

    // const handleClick = async (e) => {
    //     e.preventDefault();

    //     const { value } = e.target.dataset;
        

    //     const checkDuplicate = obj => obj.followed_user_id === +value;
       

    //     if (follows.some(checkDuplicate)) {
    //         color = 'blue'
    //         await dispatch(fetchDeleteFollow(value))
    //         // setColor('blue')
    //     } else {
    //         await dispatch(fetchPostFollows(value))
    //         color = 'green';
    //         // setColor('green')
    //     }
    // }

    const handleAdd = async(e)=>{
        e.preventDefault();
        const {value} = e.target.dataset
        // console.log(value)
        await dispatch(fetchPostFollows(value))
    }

    const handleRemove = async(e)=>{
        e.preventDefault();
        const {value} = e.target.dataset
        await dispatch(fetchDeleteFollow(value))
    }


    // if there are no answers
    if (!newArr.length && sessionUser.id !== question1.owner_id) {
        return (
            <div className="outer">
                <div className="manage-answer-title-container">
                    <div className="answer-title-container">
                        <h1 className="question">{question1.question}</h1>
                    </div>
                </div>
                        <Link className="first-to-answer-btn" to={`/answers/new/${questionId}`}><i class="fa-solid fa-pen-to-square"/> Be the first one to Answer</Link>
            
                <div className="all-answer-container">
                    <div className="single-answer-container">
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

    // if user created the question
    // post answer button should not be visible
    // console.log(sessionUser.id === question1.owner_id)
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
                                    <p className='name'>{answer.User_firstName} {answer.User_lastName}</p>
                                    {userId !== answer.User_id && <p className="point">•</p>}
                                {userId !== answer.User_id && follows.includes(answer.User_id.toString()) && <button key={answer.id} onClick={handleRemove} data-value={answer.User_id} className="followButton"> Following</button>}
                                {userId !== answer.User_id && !follows.includes(answer.User_id.toString()) && <button key={answer.id} onClick={handleAdd} data-value={answer.User_id} className="followButton"> Follow</button>}
                                </div>
                                <p className="manageBody" key={answer.id}>{answer.body}</p>
                            </div>
                        )}
                    </div>
                </div>
{/* 
    if (sessionUser.id === question1.owner_id && !newArr.length) {
        return (
            <div className="allanswers-container">
                <div className="question">{question1.question}</div>
                <div>You are the creator of this Question</div>
                <div className="question-update-delete-container">
                                    <OpenModalButton buttonText="Update" className="delete-update-btn" modalComponent={<UpdateQuestion id={question1.id} />}/>
              
                                </div>
              
                
                    {newArr && newArr.map((answer) =>
                        <div className="answerCol">
                            <div className="profileclass">
                                <div className="imgdiv"><img className="imgclass" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" /></div>
                                <div className='name'>{answer.User_firstName} {answer.User_lastName} {'•'} {'Follow'}</div>

                            </div>
                            <div className="eachanswer" key={answer.id}>{answer.body}</div>
                        </div>

                    )}
             */}
            </div>
        )
    }

    // if the user is the creator of the question and there are answers.
    if (sessionUser.id === question1.owner_id && newArr.length) {
        return (
            <div className="allanswers-container">
                <div className="question">{question1.question}</div>
                <div className="manage-subtitle" style={{ paddingBottom: "20px",}}><span> Question by {sessionUser.firstname} {sessionUser.lastname}</span><span style={{marginLeft:"10px"}}><OpenModalButton buttonText="Update Question" style={{border:"none", }} modalComponent={<UpdateQuestion id={question1.id} />}/></span></div>

                
                
               
                {/* <span className="ansBtn"><Link to={`/answers/new/${questionId}`} style={{ textDecoration: 'none', color: "white" }}>Post your Answer</Link></span> */}
               
                    {newArr && newArr.map((answer) =>
                        <div className="answerCol">
                            <div className="profileclass">
                                <div className="imgdiv"><img className="imgclass" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" /></div>
                                <div className='name'>{answer.User_firstName} {answer.User_lastName} {'•'} <span>{userId !== answer.User_id && <p className="point">•</p>}
                                {userId !== answer.User_id && follows.includes(answer.User_id.toString()) && <button key={answer.id} onClick={handleRemove} data-value={answer.User_id} className="followButton"> Following</button>}
                                {userId !== answer.User_id && !follows.includes(answer.User_id.toString()) && <button key={answer.id} onClick={handleAdd} data-value={answer.User_id} className="followButton"> Follow</button>}</span>
                                </div>
                                

                            </div>
                            <div className="eachanswer" key={answer.id}>{answer.body}</div>
                        </div>

                    )}
               
            </div>
        )
    }


    // if User has already answered the question, post button should not be visible.
    const checkDuplicate = obj => obj.user_id === sessionUser.id;

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
                                    <p className='name'>{answer.User_firstName} {answer.User_lastName}</p>
                                    {userId !== answer.User_id && <p className="point">•</p>}
                                {userId !== answer.User_id && follows.includes(answer.User_id.toString()) && <button key={answer.id} onClick={handleRemove} data-value={answer.User_id} className="followButton"> Following</button>}
                                {userId !== answer.User_id && !follows.includes(answer.User_id.toString()) && <button key={answer.id} onClick={handleAdd} data-value={answer.User_id} className="followButton"> Follow</button>}
                                </div>
                                <p className="eachanswer" key={answer.id}>{answer.body}</p>
                            </div>
        
                        </div>
                    )}
            </div>
        )
    }

    // user is not the creator of the question and there are answers

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
                            <p className='name'>{answer.User_firstName} {answer.User_lastName} </p>
                            {userId !== answer.User_id && <p className="point">•</p>}
                                {userId !== answer.User_id && follows.includes(answer.User_id.toString()) && <button key={answer.id} onClick={handleRemove} data-value={answer.User_id} className="followButton"> Following</button>}
                                {userId !== answer.User_id && !follows.includes(answer.User_id.toString()) && <button key={answer.id} onClick={handleAdd} data-value={answer.User_id} className="followButton"> Follow</button>}
                        </div>
                        <p className="eachanswer" key={answer.id}>{answer.body}</p>
                    </div>
                </div>
            )}
        </div>

    )

}

export default AllAnswers;