import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetSpaces } from "../../../store/space"
import SpaceTile from "../SpaceTile"
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem'
import CreateSpace from "../CreateSpace"

const AllSpaces = () => {
    const dispatch = useDispatch()
    const spaces = useSelector(state => state.spaces.allSpaces)

    useEffect(() => {
        dispatch(thunkGetSpaces())
    }, [dispatch])

    if (!Array.isArray(spaces)) return null

    return (
        <div>
            <div>
                <button className="create-space-btn">
                    <OpenModalMenuItem
                        modalComponent={<CreateSpace />}
                        itemText='Create a Space'
                    />
                </button>
            </div>
            <h2>Discover Spaces</h2>
            <p>Spaces</p>
            <div className="space-tiles">
                {spaces && spaces.map(space => (
                    <SpaceTile key={space.id} space={space} />
                ))}
            </div>
        </div>
    )
}

export default AllSpaces
