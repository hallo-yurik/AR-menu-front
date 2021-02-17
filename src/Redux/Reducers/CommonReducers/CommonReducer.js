import {authAPI} from "../../../API/authApi";
import {commonAPI} from "../../../API/commonAPI";

const SET_SIGN_IN_ANSWER_STATUS = "SET_SIGN_IN_ANSWER_STATUS";
const SET_SIGN_UP_ANSWER_STATUS = "SET_SIGN_UP_ANSWER_STATUS";
const RESET_SIGN_IN_ANSWER_STATUS = "RESET_SIGN_IN_ANSWER_STATUS";
const RESET_SIGN_UP_ANSWER_STATUS = "RESET_SIGN_UP_ANSWER_STATUS";
const SET_LOADING = "SET_LOADING";
const SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED";
const SET_CURRENT_MENU = "SET_CURRENT_MENU";
const SET_ERRORS = "SET_ERRORS";

const initialState = {
    signInAnswerStatus: {
        statusCode: null,
        message: []
    },
    signUpAnswerStatus: {
        statusCode: null,
        message: []
    },
    isLoading: false,
    isAuthorized: false,
    currentMenu: null,
    errors: []
};

const menuReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_SIGN_IN_ANSWER_STATUS:
            return {...state, signInAnswerStatus: {statusCode: action.statusCode, message: action.message}}

        case SET_SIGN_UP_ANSWER_STATUS:
            return {...state, signUpAnswerStatus: {statusCode: action.statusCode, message: action.message}}

        case RESET_SIGN_IN_ANSWER_STATUS:
            return {...state, signInAnswerStatus: {statusCode: null, message: []}}

        case RESET_SIGN_UP_ANSWER_STATUS:
            return {...state, signUpAnswerStatus: {statusCode: null, message: []}}

        case SET_LOADING:
            return {...state, isLoading: action.isLoading}

        case SET_IS_AUTHORIZED:
            return {...state, isAuthorized: action.isAuthorized}

        case SET_CURRENT_MENU:
            return {...state, currentMenu: action.menu}

        case SET_ERRORS:
            return {...state, errors: action.errors}

        default:
            return state;
    }
};

export const commonActions = {
    setSignInAnswerStatus: (statusCode, message) => ({type: SET_SIGN_IN_ANSWER_STATUS, statusCode, message}),
    setSignUpAnswerStatus: (statusCode, message) => ({type: SET_SIGN_UP_ANSWER_STATUS, statusCode, message}),
    resetSignInAnswerStatus: () => ({type: RESET_SIGN_IN_ANSWER_STATUS}),
    resetSignUpAnswerStatus: () => ({type: RESET_SIGN_UP_ANSWER_STATUS}),
    setLoading: (isLoading) => ({type: SET_LOADING, isLoading}),
    setAuthorized: (isAuthorized) => ({type: SET_IS_AUTHORIZED, isAuthorized}),
    setCurrentMenu: (menu) => ({type: SET_CURRENT_MENU, menu}),
    setErrors: (errors) => ({type: SET_ERRORS, errors})
};

export const initCurrentMenu = () => {
    return async (dispatch) => {

        const result = await commonAPI.getCurrentMenu()

        // await new Promise((res) => {
        //     setTimeout(() => {
        //         res()
        //     }, 10000000)
        // })

        if (result.status >= 200 && result.status < 300) dispatch(commonActions.setCurrentMenu(result.data))
        if (result.status >= 400 && result.status < 600) dispatch(commonActions.setErrors(result.data.message))


        // dispatch(commonActions.setErrors(["There is some problem", "There is some problem"]))
    }
}

export const signInRequest = (username, password) => {
    return async (dispatch) => {

        dispatch(commonActions.setLoading(true))
        const result = await authAPI.signin(username, password);
        dispatch(commonActions.setSignInAnswerStatus(result.status, result.data.message))
        dispatch(commonActions.setLoading(false))

    }
}

export const signUpRequest = (username, password) => {
    return async (dispatch) => {

        dispatch(commonActions.setLoading(true))
        const result = await authAPI.signup(username, password);
        dispatch(commonActions.setSignUpAnswerStatus(result.status, result.data.message))
        dispatch(commonActions.setLoading(false))
    }
}

export const signOutRequest = () => {
    return async (dispatch) => {

        await authAPI.signOut()
        dispatch(checkForAuth())

    }
}

export const checkForAuth = () => {
    return async (dispatch) => {
        const result = await authAPI.checkForAuth()

        if (result.status >= 200 && result.status < 300) dispatch(commonActions.setAuthorized(true))
        if (result.status >= 400 && result.status < 600) dispatch(commonActions.setAuthorized(false))
    }
}

export default menuReducer;