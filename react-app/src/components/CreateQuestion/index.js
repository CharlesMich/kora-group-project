import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./createQuestion.css";

import { addQuestion } from "../../store/questions";


function CreateQuestion() {
    const dispatch = useDispatch();

    const [question, setQuestion] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [run, setRun] = useState("no")

    const err = {}
    if (question.length < 5) err['question'] = "your question is too short";
    let newQuestion = {}
    if (!Object.values(err).length) {
        newQuestion = {
            "question": question
        }
    }

    const history = useHistory();
    const updateQuestion = (e) => setQuestion(e.target.value);

    function onSubmit(e) {
        const errors = {};
        if (question.length < 5) errors['question'] = "your question is too short";
        

        setValidationErrors(errors);
        e.preventDefault();

        if (!Object.values(errors).length) {
            setRun('yes')
        } else {
            setRun('no')
        }
    }

    const submitNo = () => {
        history.push('/')
    }

    useEffect(() => {
        if (Object.values(newQuestion).length && run === 'yes') {
            const refun = async () => {
                const res = await dispatch(addQuestion(newQuestion))
                // history.push(`/answers/${res.id}`)
                history.push('/')
            }
            refun();
        }
    }, [run])

    return (
        <>
            <h1 className="createQuestion">Create a Question</h1>

            {validationErrors.question && <p className="errorsQuestion">{validationErrors.question}</p>}

            <form onSubmit={onSubmit} className="createForm">
                <div className="enterQuestion">
                    <textarea value={question} onChange={updateQuestion} placeholder="Enter your question here" className="textArea"></textarea>
                </div>
                <div className="quesButtonDiv">

                    <button className="addQuestion" disabled={question.length < 1}>Add Question</button>
                    <button onClick={submitNo} type="delNo" className="cancelCreate">Cancel</button>
                </div>

            </form>
        </>
    )


}

export default CreateQuestion;
