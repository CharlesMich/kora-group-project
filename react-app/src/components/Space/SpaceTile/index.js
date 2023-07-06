import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './SpaceTile.css'

const SpaceTile = ({ space }) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`/spaces/${space.id}`)
    }



    return (
        <div>
            <div className="space-tile" onClick={onClick}>
                <div className="space-info">
                    <p className="space-name">{space.space_name}</p>
                    <p className="space-desc">{space.description}</p>
                </div>
            </div>
        </div >
    )
}

export default SpaceTile
