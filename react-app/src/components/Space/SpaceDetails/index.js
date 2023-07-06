import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { thunkGetSingleSpace } from "../../../store/space"
import { allQuestions } from "../../../store/questions"
import OpenModalButton from "../../OpenModalButton"
import UpdateQuestion from "../../UpdateQuestion"
import DeleteQuestion from "../../DeleteQuestion"
import './SpaceDetails.css'

const SpaceDetails = () => {
    const { spaceId } = useParams()
    const dispatch = useDispatch()
    const space = useSelector(state => state.spaces.singleSpace)
    const questions = useSelector(state => state.questions)
    const user = useSelector(state => state.session.user.id)

    useEffect(() => {
        dispatch(thunkGetSingleSpace(spaceId))
        dispatch(allQuestions())
    }, [dispatch, spaceId])

    if (!space || !questions || !user) return null

    const questionsArray = Object.values(questions)
    const spaceQuestions = questionsArray.filter(question => question.space_id === space.id)

    return (
        <div className="space-detail-container">
            <div>
                <h2>{space.space_name}</h2>
            </div>
            <div className="allQuestions-space">
                {spaceQuestions.map(ele =>
                    <div className="single-question-container" key={ele.id}>
                        <div className="question-user-container">
                            <div className="question-profile-pic"></div>
                            <p className="question-user-name">{ele.User_firstName} {ele.User_lastName}</p>
                        </div>
                        <NavLink className="question-tilte" key={ele.id} exact to={`/answers/${ele.id}`}>
                            {ele.question}
                        </NavLink>
                        <div className="question-update-delete-container">
                            {user && ele.owner_id === user && <OpenModalButton
                                buttonText="Update"
                                className="delete-update-btn"
                                modalComponent={<UpdateQuestion id={ele.id} />}
                            />}
                            {user && ele.owner_id === user && <OpenModalButton
                                buttonText="Delete"
                                className="delete-update-btn"
                                modalComponent={<DeleteQuestion id={ele.id} />}
                            />}
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default SpaceDetails
