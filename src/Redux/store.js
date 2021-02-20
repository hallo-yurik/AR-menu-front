import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import adminReducer from "./Reducers/AdminReducer/AdminReducer";
import adminFormsReducer from "./Reducers/AdminReducer/AdminFormsReducer";
import menuReducer from "./Reducers/CommonReducers/CommonReducer";
import adminProductsReducer from "./Reducers/AdminReducer/AdminProductsReducer";

const rootReducer = combineReducers({
    menu: menuReducer,
    admin: adminReducer,
    forms: adminFormsReducer,
    adminProducts: adminProductsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;