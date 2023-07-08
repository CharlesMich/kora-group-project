import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetSpaces } from "../../../store/space"
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem"
import CreateSpace from "../CreateSpace"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import './SpaceSidebar.css'

const SpaceSidebar = () => {
    const dispatch = useDispatch()

    const spaces = useSelector(state => state.spaces.allSpaces)

    useEffect(() => {
        dispatch(thunkGetSpaces())
    }, [dispatch])

    if (!Array.isArray(spaces)) return null

    return (
        <div>
            <button className="create-space-btn">
                <OpenModalMenuItem
                    modalComponent={<CreateSpace />}
                    itemText='Create Space'
                />
            </button>
            <div className='spaces'>
                {spaces && Object.values(spaces).reverse().map(space => (
                    <Link className="space-link" to={`/spaces/${space.id}`} key={space.id}>{space.space_name}</Link>
                ))}
            </div>
        </div>
    )
}

export default SpaceSidebar
