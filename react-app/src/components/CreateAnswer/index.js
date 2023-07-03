import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {addAnswer} from '../../store/answers';
import "./createanswer.css";


// QUESTION ID IS HARDCODED / NEED TO CHANGE

let question_id = 1

// FULL QUESTION MUST GO AS A HEADING IN THE ANSWER FORM

function CreateAnswer() {
    const history = useHistory();

    const user_id  = useSelector(state => state.session.user.id)

    console.log(user_id)

    const [body, setBody] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = {};
        if (body.length === 0) errors.body = 'Body is required';
        // if (body.length < 25) errors.body = 'Body must be atleast 50 characters';
    
        setValidationErrors(errors);
    }, [body])


    const dispatch= useDispatch()
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
        <div className="spotform-container">
                <div>
                <h2>This Text will be replaced with the full question</h2>
                </div>
                <form onSubmit={onSubmit}>
                    
                    <span><label htmlFor='body' >Your Answer: </label></span><span className='error'> { hasSubmitted && validationErrors.body && `${validationErrors.body}`}</span>
                    <textarea id='body' placeholder='Please write your answer (atleast 50 Characters)' type="text" value={body}
                        onChange={(e) => setBody(e.target.value)} />

                    <button
                        type="submit"
                        className="answerbutton" style={{fontSize:"10px", padding:"10px", marginTop:"10px"}}>Post Answer</button>
                </form >
           
        </div>
    )
}

export default CreateAnswer