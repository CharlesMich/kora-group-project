

const LOAD_QUESTION = "questions/LOAD_QUESTION";
const ADD_QUESTION = "questions/ADD_QUESTION";
const UPDATE_QUESTION = "questions/UPDATE_QUESTION";
const REMOVE_QUESTION = "questions/REMOVE_QUESTION";

const loadQuestion = (questions) => ({
    type: LOAD_QUESTION,
    questions
});

const addNewQuestion = (question) => ({
    type: ADD_QUESTION,
    question
});

const updateQuestion = (question) => ({
    type: UPDATE_QUESTION,
    question
});

export const allQuestions = () => async dispatch => {
    const res = await fetch("/api/question/");
    const questions = await res.json();

    dispatch(loadQuestion(questions));
};

const questionReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_QUESTION:
            const newState = {};
            action.questions.forEach(ele => newState[ele.id] = ele);
            return { ...state, ...newState }
        default:
            return state
    }
};

export default questionReducer