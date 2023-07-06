import { useDispatch } from "react-redux"
import { deleteQuestion } from "../../store/questions";
import { useHistory } from "react-router-dom";
import {useModal} from "../../context/Modal"
import "./delete.css"

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
        <div className="deleteDiv">

        <h3 className="deleteText">Confirm Delete</h3>
        <p className="deleteText">This question and all his answers will be deleted</p>
       <div className="quesButtonDiv">

        <button onClick={submitDelete} className="delQuestion">Confirm</button>
        <button onClick={submitNo} type="submit" className="delQuestion">Cancel</button>
       </div>
        </div>
        </>
    )


}
