import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetSpaces } from "../../../store/space"
import SpaceTile from "../SpaceTile"

const AllSpaces = () => {
    const dispatch = useDispatch()
    const spaces = useSelector(state => state.spaces.allSpaces)

    useEffect(() => {
        dispatch(thunkGetSpaces())
    }, [dispatch])

    if (!Array.isArray(spaces)) return null

    return (
        <div>
            <div className="space-tiles">
                {spaces && spaces.map(space => (
                    <SpaceTile key={space.id} space={space} />
                ))}
            </div>
        </div>
    )
}

export default AllSpaces