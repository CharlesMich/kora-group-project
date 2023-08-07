import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../../context/Modal";
import "./deleteanswer.css";
import { useHistory } from "react-router-dom";
import { fetchDeleteAnswer, fetchAllAnswersOfUser } from "../../../store/answerReducer";

function DeleteAnswerModal({ answer }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory()
    const sessionUser = useSelector(state=> state.session.user)
   
    let userId;
    if(sessionUser){
        userId = sessionUser.id
    }

    const answerId = answer;

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(fetchDeleteAnswer(answerId))
            .then(dispatch(fetchAllAnswersOfUser(userId)))
            .then(dispatch(fetchAllAnswersOfUser(userId)))
            .then(closeModal)
    }

    const handleCancel = (e) => {
        closeModal()
    }

    if (!sessionUser) {
        return <Redirect to='/login' />
    }

    return (
        <div className="container1">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this answer</p>

            <button className="deleteButton" type="submit" onClick={handleSubmit}>Yes (Delete Answer)</button>
            <button className="cancelButton" type="submit" onClick={handleCancel}>No (Keep Answer)</button>
        </div>
    )

}

export default DeleteAnswerModal;
