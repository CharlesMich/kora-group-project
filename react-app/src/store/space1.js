const LOAD_SPACE = 'spaces1/LOAD_SPACE'

const loadSpace = payload => ({
    type: LOAD_SPACE,
    payload
})

export const thunkGetSpaces = () => async dispatch => {
    const res = await fetch('/api/spaces/')
    const payload= await res.json() 
    if (res.ok) {
        dispatch(loadSpace(payload))
    }
}

const initialState = {}

export default function spaces1reducer(state=initialState, action){
    switch (action.type) {
        case LOAD_SPACE:
            const newSpace = {};
            action.payload.forEach(ele => newSpace[ele.id] = ele);
            return { ...state, ...newSpace }

        default:
            return state
    }
}