import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import "./createForm.css";

import { addQuestion } from "../../store/questions";


function CreateQuestion() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id)

    const [question, setQuestion] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [run, setRun] = useState(false)

    useEffect(() => {
        const err = {}
        if (question.length < 5) err.question = "your question is too short";
        setValidationErrors(err);
    }, [question])

    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        setRun(true)

        const newQuestion = { owner_id: userId, question }
        const response = await dispatch(addQuestion(newQuestion))

        if (response.message) {
            const data = await response.json()
            setValidationErrors(data)
            return
        } else {
            history.push('/')
        }
    }


    return (
        <>
            <h1>Create a Question</h1>
            {run && validationErrors.question && <p className="errors">{validationErrors.question}</p>}

            <form>
                <div>
                    <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Enter your question here"></textarea>
                </div>
                <button onClick={onSubmit}>Add Question</button>
            </form>
        </>
    )


}

export default CreateQuestion;
