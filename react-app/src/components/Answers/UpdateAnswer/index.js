import { useState, useEffect } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnswer, fetchAllAnswers, fetchAllAnswersOfUser } from '../../../store/answerReducer';

import "./updateanswer.css";

function UpdateAnswer() {
    const history = useHistory();
    let answerId = useParams().answerId
    const dispatch = useDispatch();
    answerId = parseInt(answerId)

    useEffect(() => {
        dispatch(fetchAllAnswers());
    }, [dispatch])

    //if not logged in, redirect to home
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id
    let answer = useSelector((state) => state.answers ? state.answers.allAnswers[answerId] : null)

    if (!answer) history.push('/');

    const [body, setBody] = useState(answer.body);
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        dispatch(fetchAllAnswers());
    }, [dispatch])

    useEffect(() => {
        const errors = {};
        if (body && body.length === 0) errors.body = 'Answer is required';
        if (body && body.length < 25) errors.body = 'Answer must be atleast 50 characters';
        setValidationErrors(errors);
    }, [body])

    if (!answer) return null
    if (!userId) return null
    if (!answerId) return null

    const onSubmit = async (e) => {
        e.preventDefault();

        const updateAnswerForm = { body };

        setHasSubmitted(true);
        if (Object.keys(validationErrors).length > 0) return;

        setBody('');

        let updateAns = await dispatch(updateAnswer(updateAnswerForm, answerId))
        if (updateAns) {
            history.push('/manage-answers')
        }
    }

    if (!sessionUser) {
        return <Redirect to='/login' />
    }

    return (
        <div className="spotform-container">
            <div>
                <h2>{answer && answer.Question_question}</h2>
            </div>
            <form onSubmit={onSubmit}>
                <div className="updtform"></div>
                <span><label htmlFor='body' >Your Answer: </label></span><span className='error'> {hasSubmitted && validationErrors.body && `${validationErrors.body}`}</span>
                <textarea id='body' className="updtextarea" placeholder='Please write your answer (atleast 50 Characters)' type="text" value={body}
                    onChange={(e) => setBody(e.target.value)} />
                <button
                    type="submit"
                    className="answerbutton" style={{ fontSize: "13px", padding: "10px", marginTop: "10px" }}>Update Answer</button>
                <div className="createcancel"><Link to="/manage-answers" style={{ textDecoration: 'none', backgroundColor: 'none', fontSize: "13px", marginTop: "10px", color: "white" }}>Cancel</Link></div>
            </form >

        </div>
    )
}

export default UpdateAnswer