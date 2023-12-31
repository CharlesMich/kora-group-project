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
                <button className="create-btn nav-add-question-btn">
                    <OpenModalMenuItem
                        modalComponent={<CreateSpace />}
                        itemText='Create a Space'
                    />
                </button>
            </div>
            <h2 id='discover-title'>Discover Spaces</h2>
            <p id='spaces-title'>Spaces</p>
            <div className="space-tiles">
                {spaces && Object.values(spaces).reverse().map(space => (
                    <SpaceTile key={space.id} space={space} />
                ))}
            </div>
        </div>
    )
}

export default AllSpaces
