import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


const SpaceTile = ({ space }) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`/spaces/${space.id}`)
    }



    return (
        <div>
            <div className="space-tile" onClick={onClick}>
                <div className="space-name">
                    <p>{space.space_name}</p>
                    <p>{space.description}</p>
                </div>
            </div>
        </div >
    )
}

export default SpaceTile
