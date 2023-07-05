import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { thunkGetSingleSpace } from "../../../store/space"
import { allQuestions } from "../../../store/questions"

const SpaceDetails = () => {
    const { spaceId } = useParams()
    const dispatch = useDispatch()
    const space = useSelector(state => state.spaces.singleSpace)
    const questions = useSelector(state => state.questions)

    useEffect(() => {
        dispatch(thunkGetSingleSpace(spaceId))
    }, [dispatch, spaceId])

    useEffect(() => {
        dispatch(allQuestions())
    }, [dispatch])

    if (!space) return null

    return (
        <div>
            <div>
                <h1>{space.space_name}</h1>
            </div>
            <div>

            </div>
        </div>
    )
}

export default SpaceDetails
