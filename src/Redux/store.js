import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import menuReducer from "./Reducers/MenuReducer/MenuReducer";

const rootReducer = combineReducers({
    main: "",
    menu: menuReducer,
    admin: ""
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;