import {authAPI} from "../../../API/authApi";

const PARSE_DESSERTS = "PARSE_DESSERTS";
const PARSE_HOT_DRINKS = "PARSE_HOT_DRINKS";
const PARSE_ALCOHOL = "PARSE_ALCOHOL";
const SET_SIGN_IN_ANSWER_STATUS = "SET_SIGN_IN_ANSWER_STATUS";
const SET_SIGN_UP_ANSWER_STATUS = "SET_SIGN_UP_ANSWER_STATUS";
const RESET_SIGN_IN_ANSWER_STATUS = "RESET_SIGN_IN_ANSWER_STATUS";
const RESET_SIGN_UP_ANSWER_STATUS = "RESET_SIGN_UP_ANSWER_STATUS";
const SET_LOADING = "SET_LOADING";
const SET_IS_AUTHORIZED = "SET_IS_AUTHORIZED";

const initialState = {
    Desserts: [],
    HotDrinks: [],
    Alcohol: [],
    signInAnswerStatus: {
        statusCode: null,
        message: []
    },
    signUpAnswerStatus: {
        statusCode: null,
        message: []
    },
    isLoading: false,
    isAuthorized: false
};

const menuReducer = (state = initialState, action) => {

    switch (action.type) {

        case PARSE_DESSERTS:

            return state;

        case PARSE_HOT_DRINKS:

            return state;

        case PARSE_ALCOHOL:

            return state;

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

        default:
            return state;
    }
};

export const commonActions = {
    parseDesserts: (dessertsArray) => ({type: PARSE_DESSERTS, dessertsArray}),
    parseHotDrinks: (hotDrinksArray) => ({type: PARSE_HOT_DRINKS, hotDrinksArray}),
    parseAlcohol: (alcoholArray) => ({type: PARSE_ALCOHOL, alcoholArray}),
    setSignInAnswerStatus: (statusCode, message) => ({type: SET_SIGN_IN_ANSWER_STATUS, statusCode, message}),
    setSignUpAnswerStatus: (statusCode, message) => ({type: SET_SIGN_UP_ANSWER_STATUS, statusCode, message}),
    resetSignInAnswerStatus: () => ({type: RESET_SIGN_IN_ANSWER_STATUS}),
    resetSignUpAnswerStatus: () => ({type: RESET_SIGN_UP_ANSWER_STATUS}),
    setLoading: (isLoading) => ({type: SET_LOADING, isLoading}),
    setAuthorized: (isAuthorized) => ({type: SET_IS_AUTHORIZED, isAuthorized})
};

export const initCurrentMenu = () => {
    return async (dispatch) => {
        // await


        // dispatch(actions.parseDesserts())
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

        // const result = await new Promise((res) => {
        //     setTimeout(() => {
        //         res({status: 200, message: ["unsuccessful"]})
        //     }, 2000)
        // })

        const result = await authAPI.signup(username, password);

        console.log(result)
        // dispatch(commonActions.setSignInAnswerStatus(result.status, result.data.message))
        // console.log(result)
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

        // console.log(result)
        // await new Promise(res => {
        //     setTimeout(() => {
        //         res()
        //     }, 10000)
        // })





    }
}

export default menuReducer;