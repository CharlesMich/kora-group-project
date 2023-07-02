import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from "react-router-dom"
import { getAllAnswers } from '../../store/answers';
import './AllAnswers.css'

function AllAnswers(){
    const dispatch = useDispatch();
    const answers = useSelector((state)=> {
        return state.answers
    });

    let questionId = useParams();

    useEffect(()=> {
        dispatch(getAllAnswers());
    }, [dispatch])

    if (!answers){
        return null
    }
   console.log(questionId)
    let answersArr = Object.values(answers)
    const newArr = answersArr.filter(answer => answer.question_id == 3)
    console.log('body from component1', newArr)
    return (
        <>
        <div>Question Goes Here</div>
        <div>
        {answersArr && newArr.map((answer)=> 
        <>
       
        <div>{answer.body}</div>
        </>
        )}
            </div>
        </>
        
    )
}

export default AllAnswers