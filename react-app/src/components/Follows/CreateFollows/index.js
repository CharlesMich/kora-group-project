const LOAD_FOLLOWS = "follows/LOAD_FOLLOWS"
const ADD_FOLLOW = "follows/ADD_FOLLOW"
const DELETE_FOLLOW = "follows/DELETE_FOLLOW"

// ACTIONS

// LOAD ALL FOLLOWS OF A USER
const load_follows = payload => ({
    type: LOAD_FOLLOWS,
    payload
})

const add_follow = payload => ({
    type: ADD_FOLLOW,
    payload
})

const delete_follow = payload => ({
    type: DELETE_FOLLOW,
    payload
})

// THUNKS
// GET ALL FOLLOWS OF A PERSON

export const fetchAllFollows = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${userId}`)

    if (response.ok) {
        const payload = await response.json();
        dispatch(load_follows(payload));
    }
}

// ADD FOLLOW A PERSON
export const fetchPostFollows = (followForm, userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(followForm),
    });
    if (response.ok) {
        const payload = await response.json();
        dispatch(add_follow(payload))
        return payload
    }
}

// DELETE A FOLLOW
export const fetchDeleteFollow = (userId) => async (dispatch)=> {
    const response = await fetch(`/api/follows/delete-answers/${userId}`, {
        method: "POST"
    })
    if (response.ok){
        dispatch(delete_follow(userId))
    }
}

const initialState = {};
export default function followReducer(state = initialState, action){
    switch (action.type) {
        case LOAD_FOLLOWS: 
        const allFollows = {}
            action.payload.forEach(ele => allFollows[ele.id] = ele);
          
            return {...state, allFollows }

        case ADD_FOLLOW:
            return {...state, [action.payload.id]: action.payload} 

        case DELETE_FOLLOW:
            const followState = {...state};
            delete followState[action.spotId];
            return followState;
        
        default: return state;
    }
}