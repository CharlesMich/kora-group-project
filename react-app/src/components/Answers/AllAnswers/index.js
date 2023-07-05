import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAllAnswers } from '../../../store/answerReducer';
import {allQuestions} from '../../../store/questions';
import './AllAnswers.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function AllAnswers(){
    const dispatch = useDispatch();
    const history = useHistory();

    //if not logged in, redirect to home
  let sessionUser;
  sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) history.push(`/`);

    let questionId = useParams().questionId;
    console.log('questionId',questionId)
    const answers = useSelector(state=>  state.answers);


    // const questions = useSelector(state => Object.values(state.questions));

    // const question = questions.filter(q => q.id === parseInt(questionId))[0].question;

    // console.log('question', question)
 
    useEffect(()=> {
        dispatch(getAllAnswers(questionId));
    }, [dispatch, questionId]);

    useEffect(() => {
        dispatch(allQuestions())
    }, [dispatch]);

    if (!answers) return null;
    // if (!question) return null;    
   
    let newArr = Object.values(answers)
    // const newArr = answersArr.filter(answer => answer.question_id === 1)
    console.log(newArr)
    if(!newArr) return null

    return (
        <div className="container">
            <div className="question">{newArr[0] && newArr[0].Question_question}</div>
            <span className="ansBtn"><Link to={`/answers/new/${questionId}`}>Answer</Link></span>
                <div>
                {newArr && newArr.map((answer)=> 
                <div className = "answerCol">
                <div className='name'>{answer.User_firstName} {answer.User_lastName}</div>
                <div className="eachanswer" key={answer.id}>{answer.body}</div>
                </div>
                
                )}
                </div>
        </div>
        
    )

}

export default AllAnswers;