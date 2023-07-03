import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useModal } from "../../../context/Modal"

const CreateTag = () => {
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

        const createTag = { userId: user.id, name, description }

        // const createdTag = await
    }
}
