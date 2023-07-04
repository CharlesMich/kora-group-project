import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from "react-router-dom"
import { getAllAnswers } from '../../../store/answerReducer';
import {allQuestions} from '../../../store/questions';
import './AllAnswers.css';

function AllAnswers(){
    const dispatch = useDispatch();
    // let questionId = useParams().questionId;
    
    const answers = useSelector(state=>  state.answers);


    // const questions = useSelector(state => Object.values(state.questions));

    // const question = questions.filter(q => q.id === parseInt(questionId))[0].question;

    // console.log('question', question)
 
    useEffect(()=> {
        dispatch(getAllAnswers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(allQuestions())
    }, [dispatch]);

    if (!answers) return null;
    // if (!question) return null;    
   
    let answersArr = Object.values(answers)
    const newArr = answersArr.filter(answer => answer.question_id === 1)

    return (
        <div className="container">
            <div>Question Here</div>
                <div>
                {answersArr && newArr.map((answer)=> 
                
                <div className="eachanswer" key={answer.id}>{answer.body}</div>
                )}
                </div>
        </div>
        
    )

}

export default AllAnswers;