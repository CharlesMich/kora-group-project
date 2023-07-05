import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnswerById, updateAnswer } from '../../../store/answerReducer';
import "./updateanswer.css";


function UpdateAnswer() {
    const history = useHistory();
    const { answerId } = useParams();
    
    const dispatch = useDispatch();

    //if not logged in, redirect to home
  let sessionUser;
  sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) history.push(`/`);


    // const user_id = useSelector(state => state.session.user.id)
    let answer = useSelector((state) =>  state.answers ? state.answers : null )
    
    
    // if(!answerId) history.push('/')
    // console.log('answer.body', answer.body)
  
  
    const [body, setBody] = useState(answer.body);
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        dispatch(fetchAnswerById(answerId));
        },[dispatch, answerId])

    
    useEffect(() => {
        const errors = {};
        if (body && body.length === 0) errors.body = 'Answer is required';
        if (body && body.length < 25) errors.body = 'Answer must be atleast 50 characters';
        setValidationErrors(errors);
    },[body])

    if(!answer || !answer.body) return null

    const onSubmit = async (e) => {
        e.preventDefault();

        const updateAnswerForm = {
            body,
        };

        setHasSubmitted(true);
        if (Object.keys(validationErrors).length > 0) return;

        setBody('');

        let updateAns = await dispatch(updateAnswer(updateAnswerForm, answerId))

        if (updateAns) {
            history.push(`/answers/${updateAns.question_id}`);
        }
    }

    return (
        <div className="spotform-container">
            <div>
                <h2>{answer && answer.Question_question}</h2>
            </div>
            <form onSubmit={onSubmit}>

                <span><label htmlFor='body' >Your Answer: </label></span><span className='error'> {hasSubmitted && validationErrors.body && `${validationErrors.body}`}</span>
                <textarea id='body' placeholder='Please write your answer (atleast 50 Characters)' type="text" value={body}
                    onChange={(e) => setBody(e.target.value)} />

                <button
                    type="submit"
                    className="answerbutton" style={{ fontSize: "10px", padding: "10px", marginTop: "10px" }}>Update Answer</button>
            </form >

        </div>
    )
}

export default UpdateAnswer