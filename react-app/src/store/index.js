import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import answerReducer from './answerReducer';
import session from './session'
import reducer from './session'
import questionReducer from './questions';
import spacesReducer from './space';
import followReducer from './followsReducer';
import spaces1reducer from './space1';



const rootReducer = combineReducers({
  session: reducer,
  questions: questionReducer,
  answers: answerReducer,
  spaces: spacesReducer,
  spaces1:spaces1reducer,
  follows: followReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
