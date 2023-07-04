import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { questionUpdate } from "../../store/questions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";

function UpdateQuestion({id}){
    const {closeModal} = useModal();

  const ques = useSelector(state => state.question[id])
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

        if(!Object.value(errors).length){
            setRun("Yes")
        } else{
            setRun("no")
        }

    }

    useEffect (()=>{
        if(Object.values(newQuestion).length && run === "yes"){
      const refun = async () => {
        const res = await dispatch(spotUpdate(ques.id, newQuestion))
        closeModal()
        history.push("/")
      }
            refun();
        }
    },[run])

    return(<>
     <h1>Update your Question</h1>
            {validationErrors.question && <p className="errors">{validationErrors.question}</p>}

            <form onSubmit={onSubmit}>
                <div>
                    <textarea value={question} onChange={updateQ} placeholder="Enter your question here"></textarea>
                </div>
                <button>Update Question</button>
            </form>
    </>)

}

export default UpdateQuestion;