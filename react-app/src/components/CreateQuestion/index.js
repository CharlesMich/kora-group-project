import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./createQuestion.css";

import { addQuestion } from "../../store/questions";
import { thunkGetSpaces } from "../../store/space";


function CreateQuestion() {
    const dispatch = useDispatch();
    const spaces = useSelector(state => state.spaces.allSpaces)

    const [question, setQuestion] = useState("");
    const [space, setSpace] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [run, setRun] = useState("no")

    useEffect(() => {
        dispatch(thunkGetSpaces())
    }, [dispatch])

    const err = {}
    if (question.length < 5) err['question'] = "your question is too short";
    let newQuestion = {}
    if (!Object.values(err).length) {
        newQuestion = {
            "question": question,
            "space": space
        }
    }

    const history = useHistory();
    const updateQuestion = (e) => setQuestion(e.target.value);
    const updateSpace = (e) => setSpace(e.target.value);
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
                history.push('/questions/current')
            }
            refun();
        }
    }, [run])

    return (
        <div className="outer">
            <div className="manage-answer-title-container">
                <div className="answer-title-container">
                    <h1 className="createQuestion">Create a Question</h1>
                </div>
            </div>

            <div className="all-answer-container">
                <div className="single-answer-container">
                    {validationErrors.question && <p className="errorsQuestion">{validationErrors.question}</p>}

                    <form onSubmit={onSubmit} className="createForm">
                        <div className="enterQuestion">
                            <textarea
                                value={question}
                                onChange={updateQuestion}
                                placeholder="Enter your question here"
                                className="textArea"></textarea>
                        </div>
                        <div className="divlab">
                            <h5 className="space-label">Space</h5>
                            <select value={space} onChange={updateSpace}>
                                <option value="">Choose a Space</option>
                                {Object.values(spaces).map((space) => (
                                    <option key={space.id} value={space.space_name}>
                                        {space.space_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="quesButtonDiv">

                            <button className="nav-add-question-btn addQuestion" disabled={question.length < 1}>Add Question</button>
                            <button onClick={submitNo} type="delNo" className="cancelCreate">Cancel</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )


}

export default CreateQuestion;
