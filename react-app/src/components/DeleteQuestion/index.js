import { useDispatch } from "react-redux"
import { deleteQuestion } from "../../store/questions";
import { useHistory } from "react-router-dom";
import {useModal} from "../../context/Modal"

export default function DeleteQuestion({id}){
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory()

    const submitDelete = ()=>{
        dispatch(deleteQuestion(id));
         closeModal()
       
    };

    const submitNo=()=>{
        closeModal()
    }
    
    return(
        <>
        <h3>Confirm Delete</h3>
        <p>This question and all his answers will be deleted</p>
        <button onClick={submitDelete} className="delYes">Confirm</button>
        <button onClick={submitNo} type="submit" className="delNo">Cancel</button>
        </>
    )


}
