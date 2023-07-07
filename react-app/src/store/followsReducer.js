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
        console.log(payload)
    }
}

// ADD FOLLOW A PERSON
export const fetchPostFollows = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/follows/add-follows/${user_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify(None),
    });
    if (response.ok) {
        const payload = await response.json();
        dispatch(add_follow(payload))
        console.log("Added follow", payload)
        return payload
    }
}

// DELETE A FOLLOW
export const fetchDeleteFollow = (userId) => async (dispatch)=> {
    const response = await fetch(`/api/follows/delete-follows/${userId}`, {
        method: "POST"
    })
    if (response.ok){
        dispatch(delete_follow(userId))
        console.log("deleted follow", userId)
    }
}

const initialState = {};
export default function followReducer(state = initialState, action){
    switch (action.type) {
        case LOAD_FOLLOWS: 
        const myFollowers = {};
        myFollowers[action.payload.id] = action.payload
        return myFollowers
        case ADD_FOLLOW:
                const followedUser = {}
            return followedUser[action.payload.followed_user_id]= action.payload

        case DELETE_FOLLOW:
            const unfollow = {...state};
            delete unfollow[action.payload];
            return unfollow;
        
        default: return state;
    }
}
