import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import authReducer from "./reducers/authReducer";

const reducers = combineReducers({ authReducer });
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = compose(applyMiddleware(promiseMiddleware()));

export default createStore(reducers, enhancer);
