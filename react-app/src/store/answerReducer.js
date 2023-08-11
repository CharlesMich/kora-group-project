const ALL_ANSWERS = "answers/ALL_ANSWERS"
const ALL_ANSWERS_BY_QUESTION = "answers/ALL_ANSWERS_BY_QUESTION"
const ADD_ANSWER = "answers/ADD_ANSWER"
const ALL_ANSWERS_BY_USER = "answers/ALL_ANSWERS_BY_USER"
const DELETE_ANSWER = "answers/DELETE_ANSWERS"
const UPDATE_ANSWER = "answers/EDIT_ANSWERS"
// const SINGLE_ANSWER = "answers/SINGLE_ANSWER"



// ACTIONS//

// ALL ANSWERS
const all_answers = payload => ({
    type: ALL_ANSWERS,
    payload
})

// ALL ANSWERS FOR A SINGLE QUESTION
const all_answers_by_question = payload => ({
    type: ALL_ANSWERS_BY_QUESTION,
    payload
})

// GET ANSWER BY ANSWER ID
// const single_answer = payload => ({
//     type: SINGLE_ANSWER,
//     payload
// })


// ADD AN ANSWER
const add_answer = payload => ({
    type: ADD_ANSWER,
    payload
})

// ALL ANSWERS BY THE USERS
const all_answers_by_user = payload => ({
    type: ALL_ANSWERS_BY_USER,
    payload
})

// UPDATE AN ANSWER
const update_answer = payload => ({
    type: UPDATE_ANSWER,
    payload
})

// DELETE AN ANSWER
const delete_answer = payload => ({
    type: DELETE_ANSWER,
    payload
})

// THUNKS
//
// GET ALL ANSWERS
export const fetchAllAnswers = () => async dispatch => {
    const response = await fetch(`/api/answer`);
    if (response.ok) {
        const payload = await response.json();
        dispatch(all_answers(payload));
        // console.log('ALL ANSWERS IN FETCH', payload)

    }
}

// GET ALL ANSWERS TO A QUESTION BY QUESTIONID
export const getAllAnswers = (questionId) => async (dispatch) => {
    const response = await fetch(`/api/answer/question/${questionId}`);

    if (response.ok) {
        const payload = await response.json();
        dispatch(all_answers_by_question(payload));
    }
}

// GET ALL ANSWERS OF A USER
export const fetchAllAnswersOfUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/answer/user/${userId}`);
    // console.log('inside fetch', userId)
    if (response.ok) {
        const payload = await response.json();
        // console.log('payload inside fetch', payload)
        dispatch(all_answers_by_user(payload))
    }
}

// GET SINGLE ANSWER BY ANSWER ID
// export const fetchAnswerById =(answerId) => async (dispatch) => {
//     const response = await fetch(`/api/answer/${answerId}`);
//     if (response.ok){
//         const payload = await response.json();
//         dispatch(single_answer(payload))
//     }
// }

// ADD AN ANSWER
export const addAnswer = (createAnswerForm, questionId) => async (dispatch) => {
    const response = await fetch(`/api/answer/new/${questionId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createAnswerForm),
    });
    if (response.ok) {
        const payload = await response.json();
        dispatch(add_answer(payload))
        return payload
    }
}

// DELETE ANSWER
export const fetchDeleteAnswer = (answerId) => async (dispatch) => {
    const response = await fetch(`/api/answer/delete-answers/${answerId}`, {
        method: "POST"
    })
    if (response.ok) {
        dispatch(delete_answer(answerId))
    }
}

// UPDATE ANSWER
export const updateAnswer = (updateAnswerForm, answerId) => async (dispatch) => {
    const res = await fetch(`/api/answer/update-answers/${answerId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateAnswerForm),
    });
    if (res.ok) {
        const payload = await res.json();
        dispatch(update_answer(payload));
        return payload;
    }
}

const initialState = {};

export default function answerReducer(state = initialState, action) {
    switch (action.type) {
        case ALL_ANSWERS:
            const allAnswers = {}
            action.payload.forEach(ele => allAnswers[ele.id] = ele);
            return { ...state, allAnswers }

        case ALL_ANSWERS_BY_QUESTION:
            const tempState = {}
            action.payload.forEach(ele => tempState[ele.id] = ele);
            return { ...state, tempState }

        case ALL_ANSWERS_BY_USER:
            const newState = {}
            action.payload.forEach(ele => newState[ele.id] = ele);
            return { ...state, newState }

        case ADD_ANSWER:
            return { ...state, [action.payload.id]: action.payload }

        case UPDATE_ANSWER:
            return { ...state, [action.payload.id]: action.payload };

        case DELETE_ANSWER:
            const state1 = { ...state.newState }
            delete state1[action.payload]
            return { ...state }

        default: return state;
    }
}
