const GET_SPACES = 'spaces/GET_SPACES'
const CREATE_SPACE = 'spaces/CREATE_SPACE'

/*-----ACTIONS-----*/

//GET SPACES
export const actionGetSpaces = (spaces) => {
    return {
        type: GET_SPACES,
        spaces
    }
}

//CREATE SPACE
export const actionCreateSpace = (space) => {
    return {
        type: CREATE_SPACE,
        space
    }
}

/*-----THUNKS-----*/

//GET SPACEs
export const thunkGetSpaces = () => async dispatch => {
    const res = await fetch('/api/spaces')
    const data = await res.json()
    if (res.ok) {
        dispatch(actionGetSpaces(data['spaces']))
        return data
    }
}

//CREATE SPACES
export const thunkCreateSpace = (space) => async dispatch => {
    const res = await fetch('/api/create-space', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(space)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(actionCreateSpace(data))
        return data
    }
}


/*-----REDUCER-----*/
const initialState = {}

export default function spacesReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_SPACES: {
            newState = { ...state, allSpaces: action.spaces }
            newState.allSpaces = action.spaces
            return newState
        }
        case CREATE_SPACE: {
            newState = { ...state, allSpaces: { ...state.allSpaces, [action.space.id]: action.space } }
            return newState
        }
        default:
            return state
    }
}
