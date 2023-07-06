import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetSpaces } from "../../../store/space"

const SpaceSidebar = () => {
    const dispatch = useDispatch()

    const spaces = useSelector(state => state.spaces.allSpaces)

    useEffect(() => {
        dispatch(thunkGetSpaces())
    }, [dispatch])

    if (!Array.isArray(spaces)) return null

    return (
        <div>
            <div>Create Space</div>
            <div className="spaces">
                {spaces && spaces.map(space => (
                    <p key={space.id}>{space.space_name}</p>
                ))}
            </div>
        </div>
    )
}

export default SpaceSidebar
