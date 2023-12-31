import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../../context/Modal"
import { thunkCreateSpace } from "../../../store/space"
import "./CreateSpace.css"

const CreateSpace = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => state.session.user.id)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [validationErrors, setValidationErrors] = useState({})
    const { closeModal } = useModal()
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        const errors = {}

        if (!name.length) errors.name = 'New spaces must have a name'
        setValidationErrors(errors)
    }, [name])

    const onSubmit = async e => {
        e.preventDefault()
        setHasSubmitted(true)

        const createSpace = { userId: userId, space_name: name, description }

        const createdSpace = await dispatch(thunkCreateSpace(createSpace))

        if (createdSpace && createdSpace.message) {
            setValidationErrors(createdSpace)
            return
        } else {
            closeModal()
            history.push(`/spaces/${createdSpace.id}`)
        }
    }

    return (
        <div>
            <div className="modal-create-space">
                <h2 className="create-title">Create a Space</h2>
                <div className="error"> {hasSubmitted && validationErrors.name && `${validationErrors.name}`}</div>
                <div>
                    <label>Name*</label>
                    <div>
                        <input
                            className="create-space-text"
                            value={name}
                            type='text'
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="description">
                    <p className="text-description">Brief description</p>
                    <p className="text-description">Include a few keywords to show people what to expect if they join.</p>
                    <div>
                        <input
                            className="description-space-text"
                            value={description}
                            type='text'
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="space-create-btn"
                    onClick={onSubmit}
                    disabled={Object.values(validationErrors).length > 0}
                    id={Object.values(validationErrors).length > 0 ? 'submit-button-disabled' : 'submit-button-active'}
                >Create</button>
            </div>
        </div>
    )
}

export default CreateSpace
