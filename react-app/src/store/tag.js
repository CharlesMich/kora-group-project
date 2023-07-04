const GET_TAGS = 'tags/GET_TAGS'
const CREATE_TAG = 'tags/CREATE_TAG'

/*-----ACTIONS-----*/

//GET TAGS
export const actionGetTags = (tags) => {
    return {
        type: GET_TAGS,
        tags
    }
}

//CREATE TAG
export const actionCreateTag = (tag) => {
    return {
        type: CREATE_TAG,
        tag
    }
}

/*-----THUNKS-----*/

//GET TAGS
export const thunkGetTags = () => async dispatch => {
    const res = await fetch('/api/')
}
