import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAllAnswers } from '../../../store/answerReducer';
import { allQuestions } from '../../../store/questions';
import './AllAnswers.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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


    useEffect(() => {
        dispatch(getAllAnswers(questionId));
    }, [dispatch, questionId]);

    useEffect(() => {
        dispatch(allQuestions())
    }, [dispatch]);

    if (!answers) return null;
    if(!question1) return null;

    let newArr = Object.values(answers)

    if(!newArr.length){
        return(
            <div className="container">
            <div className="question">{question1.question}</div>
            <span className="ansBtn"><Link to={`/answers/new/${questionId}`}>Be the first one to Answer</Link></span>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="question">{question1.question}</div>
            <span className="ansBtn"><Link to={`/answers/new/${questionId}`}>Answer</Link></span>
            <div>
                {newArr && newArr.map((answer) =>
                    <div className="answerCol">
                        <div className='name'>{answer.User_firstName} {answer.User_lastName}</div>
                        <div className="eachanswer" key={answer.id}>{answer.body}</div>
                    </div>

                )}
            </div>
        </div>

    )

}

export default AllAnswers;