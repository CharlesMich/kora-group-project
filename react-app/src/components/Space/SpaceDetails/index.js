import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, NavLink, Redirect } from "react-router-dom/cjs/react-router-dom.min"
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
    const user = useSelector(state => state.session.user)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(thunkGetSingleSpace(spaceId))
            .then(() => setIsLoading(false))
        dispatch(allQuestions())
    }, [dispatch, spaceId])

    if (!space || !questions) return null

    const questionsArray = Object.values(questions)
    const spaceQuestions = questionsArray.filter(question => question.space_id === space.id)

    if (!user) {
        return <Redirect to='/login' />
    }

    if (isLoading) {
        return <div></div>
    }

    if (spaceQuestions.length === 0) {
        return (
            <div className="space-detail-container">
                <div>
                    <h2>{space.space_name}</h2>
                    <h3>{space.description ? <p>{space.description}</p> : <p>Learn about {space.space_name}</p>}</h3>
                </div>
                <div className="empty-questions-container">
                    <p>There are no questions in this space yet</p>
                    <NavLink className="nav-add-question-btn space-add-question-btn" exact to='/new-question'>
                        Add question <i className="nav-icon fa-solid fa-plus" />
                    </NavLink>
                </div>
            </div>
        )
    }

    return (
        <div className="space-detail-container">
            <div>
                <h2>{space.space_name}</h2>
                <h3>{space.description ? <p>{space.description}</p> : <p>Learn about {space.space_name}</p>}</h3>
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
                            {user.id && ele.owner_id === user.id && <OpenModalButton
                                buttonText="Update"
                                className="delete-update-btn"
                                modalComponent={<UpdateQuestion id={ele.id} />}
                            />}
                            {user.id && ele.owner_id === user.id && <OpenModalButton
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
