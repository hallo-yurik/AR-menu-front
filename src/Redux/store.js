import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import menuReducer from "./Reducers/MenuReducer/MenuReducer";
import adminReducer from "./Reducers/AdminReducer/AdminReducer";

const rootReducer = combineReducers({
    main: "",
    menu: menuReducer,
    admin: adminReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;