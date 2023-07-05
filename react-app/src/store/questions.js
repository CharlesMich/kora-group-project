

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

const removeQuestion = (questionId) => ({
    type: REMOVE_QUESTION,
    questionId
});

export const allQuestions = () => async dispatch => {
    const res = await fetch("/api/question");
    const questions = await res.json();

    dispatch(loadQuestion(questions));
};

export const addQuestion = (question) => async dispatch => {
    const res = await fetch("/api/question/new-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({question})
    });
    if (res.ok) {
        const question = await res.json();
        dispatch(addNewQuestion(question));
        return res;

    }
};

export const deleteQuestion = (id) => async dispatch => {
    const res = await fetch(`/api/question/delete-question${id}`, {
        method: "POST"
    });
    if (res.ok) {
        // dispatch(removeSpot(id));
        dispatch(removeQuestion(id));
    }
}

export const questionUpdate = (id, ques) => async dispatch => {
    const res = await fetch(`/api/question/update-question${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ques)
    });

    if (res.ok) {

        const updateQues = await res.json()

        dispatch(updateQuestion(updateQues))
    }
}

const questionReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_QUESTION:
            const newState = {};
            action.questions.forEach(ele => newState[ele.id] = ele);
            return { ...state, ...newState }
        case ADD_QUESTION:
            const np = {};
            np[action.question.id] = action.question;
            return { ...state, ...np }
        case UPDATE_QUESTION:
            return { ...state, [action.question.id]: action.question }
        case REMOVE_QUESTION:
            const nState = { ...state };

            delete nState[action.questionId];
            return nState
        default:
            return state
    }
};

export default questionReducer
