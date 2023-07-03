import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./deleteanswer.css";
import { fetchDeleteAnswer } from "../../store/answerReducer";



function DeleteAnswerModal({answer}){
    const dispatch = useDispatch();
    const {closeModal} = useModal();


    const answerId = answer;
    
    console.log("inside component", answerId)
    const handleSubmit = (e) => {
       return dispatch(fetchDeleteAnswer(answerId))
       .then(closeModal)        
    }


    const handleCancel =(e)=> {
        closeModal()
    }

return (
    <div className ="container1">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this answer</p>
        
        <button className="deleteButton" type="submit" onClick={handleSubmit}>Yes (Delete Answer)</button>
        <button className="cancelButton"  type="submit" onClick={handleCancel}>No (Keep Answer)</button>
    </div>
)

}

export default DeleteAnswerModal;