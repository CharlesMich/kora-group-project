import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {addAnswer} from '../../../store/answerReducer';
import "./createanswer.css";


// QUESTION ID IS HARDCODED / NEEDS TO CHANGE



// FULL QUESTION MUST GO AS A HEADING IN THE ANSWER FORM

function CreateAnswer() {
    const history = useHistory();
    let question_id = useParams().questionId;
    
    // console.log(question_id)
    let sessionUser;
    sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) history.push(`/`);

    const user_id  = useSelector(state => state.session.user.id);


    const question = useSelector(state=> state.questions[question_id])

    console.log(question)
    const [body, setBody] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = {};
        if (body.length === 0) errors.body = 'Body is required';
        if (body.length < 25) errors.body = 'Body must be atleast 50 characters';
    
        setValidationErrors(errors);
    },[body])

    const dispatch= useDispatch()

    // if(user_id) return null;


    const onSubmit = async (e) => {
        e.preventDefault();

        const createAnswerForm = {
            body,
            user_id,
            question_id
        };
       
        setHasSubmitted(true);
        if (Object.keys(validationErrors).length > 0) return;

        setBody('');
       
        let newAnswer = await dispatch(addAnswer(createAnswerForm, question_id))
    
        if (newAnswer) {
            history.push(`/answers/${question_id}`);
          }
    }

    return (
        <div className="answerform-container">
                <div><h2 className="QuesTitle">{question && question.question}</h2> </div>
                <form onSubmit={onSubmit}>
                    
                    <div className="answersubtitle"><span><label htmlFor='body' >Your Answer: </label></span><span className='error'> { hasSubmitted && validationErrors.body && `${validationErrors.body}`}</span></div>
                    <div><textarea id='body' className="inputbody" placeholder='Please write your answer (atleast 50 Characters)' type="text" value={body}
                        onChange={(e) => setBody(e.target.value)} /></div>

                    <button
                        type="submit"
                        className="answerbutton" style={{fontSize:"10px", padding:"10px", marginTop:"10px"}}>Post Answer</button>
                       
                </form >
                <div className="createcancel"><Link to="/" style={{ textDecoration: 'none', backgroundColor:'none', fontSize:"10px", marginTop:"10px", color:"white"}}>Cancel</Link></div>
           
        </div>
    )
}

export default CreateAnswer