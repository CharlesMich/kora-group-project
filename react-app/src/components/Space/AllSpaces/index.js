import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetSpaces } from "../../../store/space"
import { Redirect } from 'react-router-dom';
import SpaceTile from "../SpaceTile"
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem'
import CreateSpace from "../CreateSpace"
import './AllSpaces.css'

const AllSpaces = () => {
    const dispatch = useDispatch()
    const spaces = useSelector(state => state.spaces.allSpaces)

    useEffect(() => {
        dispatch(thunkGetSpaces())
    }, [dispatch])

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/login" />;

    if (!Array.isArray(spaces)) return null


    return (
        <div className="container">
            <div>
                <h2>Welcome to Spaces!</h2>
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
