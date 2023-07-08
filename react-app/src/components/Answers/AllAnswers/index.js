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

    const answers = useSelector(state => state.answers ? state.answers.tempState : null);
    const question1 = useSelector(state => state.questions ? state.questions[questionId] : null)
    const follows = useSelector((state) => Object.values(state.follows))



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


    let newArr = Object.values(answers);

    let color;

    const handleClick = async (e) => {
        e.preventDefault();

        const { value } = e.target.dataset;
        

        const checkDuplicate = obj => obj.followed_user_id === +value;
       

        
       
        if (follows.some(checkDuplicate)) {
            color = 'blue'
            await dispatch(fetchDeleteFollow(value))
            // setColor('blue')
        } else {
            await dispatch(fetchPostFollows(value))
            color = 'green';
            // setColor('green')
        }
    }


    // if there are no answers
    if (!newArr.length && sessionUser.id !== question1.owner_id) {
        return (
            <div className="allanswers-container">
                <div className="question">{question1.question}</div>
                <span className="ansBtn"><Link to={`/answers/new/${questionId}`} style={{ textDecoration: 'none', color: 'white' }}>Be the first one to Answer</Link></span>
                <div className="manage-subtitle-2">Writing Tips</div>
                <div className="manage-answers-text">
                    <p className="manage-answers-text">• Understand the question.Assimilate the perspective with which the user has asked question.</p>
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
        )
    }

    // if user created the question
    // post answer button should not be visible

    if (sessionUser.id === question1.owner_id && !newArr.length) {
        return (
            <div className="allanswers-container">
                <div className="question">{question1.question}</div>
                <div>You are the creator of this Question</div>
                <div className="question-update-delete-container">
                                    <OpenModalButton buttonText="Update" className="delete-update-btn" modalComponent={<UpdateQuestion id={question1.id} />}/>
                                   {/* <OpenModalButton buttonText="Delete" className="delete-update-btn" modalComponent={<DeleteQuestion id={question1.id} />}/> */}
                                </div>
                {/* <span className="ansBtn"><Link to={`/answers/new/${questionId}`} style={{ textDecoration: 'none', color: "white" }}>Post your Answer</Link></span> */}
                
                    {newArr && newArr.map((answer) =>
                        <div className="answerCol">
                            <div className="profileclass">
                                <div className="imgdiv"><img className="imgclass" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" /></div>
                                <div className='name'>{answer.User_firstName} {answer.User_lastName} {'•'} {'Follow'}</div>

                            </div>
                            <div className="eachanswer" key={answer.id}>{answer.body}</div>
                        </div>

                    )}
            
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
                                <div className='name'>{answer.User_firstName} {answer.User_lastName} {'•'} <span><button onClick={handleClick} style={{ color:color, backgroundColor: 'white', border: 'none' }} data-value={answer.Question_ownerId}>Follow</button></span></div>
                                

                            </div>
                            <div className="eachanswer" key={answer.id}>{answer.body}</div>
                        </div>

                    )}
               
            </div>
        )
    }


    // if User has already answered the question, post the button should not be visible.
    const checkDuplicate = obj => obj.user_id === sessionUser.id;

    console.log(newArr.some(checkDuplicate))
    if (newArr.some(checkDuplicate)) {
        return (
            <div className="allanswers-container">
                <div className="question">{question1.question}</div>
                <div className="manage-subtitle" style={{ paddingBottom: "20px" }}><span> Question by {sessionUser.firstname} {sessionUser.lastname}</span></div>
                <div>You have already answered this question</div>
                {/* <span className="ansBtn"><Link to={`/answers/new/${questionId}`} style={{ textDecoration: 'none', color: "white" }}>Post your Answer</Link></span> */}
                <div>
                    {newArr && newArr.map((answer) =>
                        <div className="answerCol">
                            <div className="profileclass">
                                <div className="imgdiv"><img className="imgclass" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png" alt="photo" /></div>
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
        <div className="allanswers-container">
            <div className="question">{question1.question}</div>
            <span className="ansBtn"><Link to={`/answers/new/${questionId}`} style={{ textDecoration: 'none', color: "white" }}>Post your Answer</Link></span>
            
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

    )

}

export default AllAnswers;