const MY_FOLLOWERS = "follows/MY_FOLLOWERS"
const I_FOLLOW = "follows/I_FOLLOW"
const ADD_FOLLOW = "follows/ADD_FOLLOW"
const DELETE_FOLLOW = "follows/DELETE_FOLLOW"

// ACTIONS

// LOAD ALL FOLLOWS OF A USER
// const my_followers = payload => ({
//     type: MY_FOLLOWERS,
//     payload
// })

// LOAD IFOLLOW OF A USER
const i_follows = payload => ({
    type: I_FOLLOW,
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

// export const fetchAllFollows = (userId) => async (dispatch) => {
//     const response = await fetch(`/api/follows/${userId}`)

//     if (response.ok) {
//         const payload = await response.json();
//         dispatch(my_followers(payload));
//         console.log(payload)
//     }
// }

// GET ALL THE FOLLOWERS OF A PERSON
export const fetchAllFollowers = (userId) => async(dispatch) => {
    const response = await fetch(`api/follows/followers/${userId}`)

    if (response.ok) {
        const payload = await response.json();
        dispatch(i_follows(payload))
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

// myFollowers:{}, 

const initialState = {};
export default function followReducer(state = initialState, action){
    
    switch (action.type) {
        // case MY_FOLLOWERS: 
        // newState = {...state, myFollowers: action.payload}
        // // newState.myFollowers= action.payload
        // return newState


        case I_FOLLOW:
            const newState = {};
            action.payload.forEach(ele => newState[ele.followed_user_id] = ele);
            return { ...state, ...newState }

        case ADD_FOLLOW:
            const addState = {};
            addState[action.payload.followed_user_id] = action.payload; 
            return {...state, ...addState}   


        case DELETE_FOLLOW:
            const delState = {...state}
            delete delState[action.payload];
            return delState
        
        default: return state;
    }
}