const LOAD_ANSWERS = "answers/LOAD_ANSWERS"
const ADD_ANSWER = "answers/ADD_ANSWER"
const ALL_ANSWERS_BY_USER = "answers/ALL_ANSWERS_BY_USER"
const DELETE_ANSWER = "answers/DELETE_ANSWERS"
const UPDATE_ANSWER = "answers/EDIT_ANSWERS"


// ACTIONS// 

// ALL ANSWERS FOR A SINGLE QUESTION
const load_answers = payload => ({
    type:LOAD_ANSWERS,
    payload
})


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
// GET ALL ANSWERS TO A QUESTION
export const getAllAnswers = () => async (dispatch) => {
    const response = await fetch(`/api/answer/`);
    console.log(response)
    if (response.ok){
        const payload = await response.json();
        dispatch(load_answers(payload));
    }
}

// GET ALL ANSWERS OF A USER
export const getAllAnswersOfUser = () => async (dispatch) => {
    const response = await (`/api/....`);
    if(response.ok){
        const payload = await response.json();
        dispatch(all_answers_by_user(payload))
    }
}

// ADD AN ANSWER
export const addAnswer = (createAnswerForm, question_id) => async (dispatch) => {
    const response = await fetch(`/api/answer/${question_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createAnswerForm),
    });
    if(response.ok) {
        const payload = await response.json();
        dispatch(add_answer(payload))
        return payload
    }
}

// DELETE ANSWER
export const deleteAnswer = (answerId) => async (dispatch)=> {
    const response = await fetch(`/api/../${answerId}`, {
        method: "POST"
    })
    if (response.ok){
        dispatch(delete_answer(answerId))
    }
}

// UPDATE ANSWER
export const updateAnswer = (updateAnswerForm, spotId) => async (dispatch) => {
    const res = await fetch(`/api/answers/${spotId}`, {
        method:"PUSH",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateAnswerForm),
        });
        if (res.ok){
            const payload = await res.json();
            dispatch(update_answer(payload));
            return payload;
        }
}

const initialState = {};

export default function answerReducer(state = initialState, action){
    switch (action.type) {
        case LOAD_ANSWERS: 
        // const allAnswers = {...action.payload};
        console.log(action.payload)
        return {...state, ...action.payload}
        // case ADD_ANSWER: 'abc'
        // case ALL_ANSWERS_BY_USER: 'abc'
        // case DELETE_ANSWER: 'abc'
        // case UPDATE_ANSWER: 'abc'
        
        default: return state;
    }
}



