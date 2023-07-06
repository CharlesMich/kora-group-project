import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { questionUpdate } from "../../store/questions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Update.css"
import { useModal } from "../../context/Modal";

function UpdateQuestion({id}){
    const {closeModal} = useModal();

   
  const ques = useSelector(state => state.questions[id])
  
  const dispatch = useDispatch();

  const [question, setQuestion] = useState(ques.question)
  const [validationErrors, setValidationErrors] = useState({});
  const [run, setRun] = useState("no")

  const err = {}
  if(question.length < 5) err["question"] = "Question is too short"

  let newQuestion= {}
    if(!Object.values(err).length){
        newQuestion = {
            question
        }
    }

    const history = useHistory();
    const updateQ = (e)=> setQuestion(e.target.value);

    function onSubmit(e){
        const errors = {};
        if(question.length < 5) errors["question"] = "Question is too short";
        setValidationErrors(errors);
        e.preventDefault();

        if(!Object.values(errors).length){
            setRun("yes")
        } else{
            setRun("no")
        }

    }

    useEffect (()=>{
        if(Object.values(newQuestion).length && run === "yes"){
      const refun = async () => {
        const res = await dispatch(questionUpdate(ques.id, newQuestion))
        closeModal()
        history.push(`/questions/current`)
      }
            refun();
        }
    },[run])

    return(<>
    <div className="updateDiv">
     <h1 className="updateText">Update your Question</h1>
            {validationErrors.question && <p className="errorsQuestion">{validationErrors.question}</p>}

            <form onSubmit={onSubmit} className="updateForm">
                <div>
                    <textarea value={question} onChange={updateQ} placeholder="Update your question here" className="updateTextArea"></textarea>
                </div>
                <button className="updateButton" disabled={question.length < 1}>Update Question</button>
            </form>
    </div>
    </>)

}

export default UpdateQuestion;