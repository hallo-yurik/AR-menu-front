import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import menuReducer from "./Reducers/MenuReducer/MenuReducer";
import adminReducer from "./Reducers/AdminReducer/AdminReducer";
import adminFormsReducer from "./Reducers/AdminReducer/AdminFormsReducer";

const rootReducer = combineReducers({
    menu: menuReducer,
    admin: adminReducer,
    forms: adminFormsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;