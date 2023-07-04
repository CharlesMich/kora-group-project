import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../../context/Modal"
import { thunkCreateSpace } from "../../../store/space"

const CreateSpace = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [validationErrors, setValidationErrors] = useState({})
    const { closeModal } = useModal()
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        const errors = {}

        if (!name.length) errors.name = 'New tags must have a name'
        setValidationErrors(errors)
    }, [name])

    const onSubmit = async e => {
        e.preventDefault()
        setHasSubmitted(true)

        const createSpace = { userId: user.id, name, description }

        const createdSpace = await dispatch(thunkCreateSpace(createSpace))

        if (createdSpace.message) {
            setValidationErrors(createdTag)
            return
        } else {
            closeModal()
                .then(history.push(`/tags/${createdSpace.id}`))
        }
    }

    return (
        <div>
            <div>
                <h2>Create a Space</h2>
                <div className="error"> {hasSubmitted && validationErrors.name && `${validationErrors.name}`}</div>
                <div className="name">
                    <label>Name</label><span className="star">*</span>
                    <p>This can be changed in Space settings</p>
                    <div>
                        <input
                            value={name}
                            type='text'
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="description">
                    <label>Brief description</label>
                    <p>Include a few keywords to show people what to expect if they join.</p>
                    <div>
                        <input
                            value={description}
                            type='text'
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
