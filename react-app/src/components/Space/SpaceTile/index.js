import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './SpaceTile.css'

const SpaceTile = ({ space }) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`/spaces/${space.id}`)
    }



    return (
        <div className="space-tile-container">
            <div className="space-tile" onClick={onClick}>
                <div className="space-info">
                    <p className="space-name">{space.space_name}</p>
                    {space.description ? <p className="space-desc">{space.description}</p> : <p className="space-desc">Learn about {space.space_name}</p>}
                </div>
            </div>
        </div >
    )
}

export default SpaceTile
