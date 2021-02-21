import {adminAPI} from "../../../API/adminAPI";
import {adminActions} from "./AdminReducer";
import {adminProductsActions, initAlcohol} from "./AdminProductsReducer";

const SET_CREATE_MENU_DATA = "SET_CREATE_MENU_DATA";
const SET_IS_CURRENT_MENU = "SET_IS_CURRENT_MENU";
const SENDING_MENU = "SENDING_MENU";
const HANDLE_ERRORS = "HANDLE_ERRORS";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const POST_DESSERT = "POST_DESSERT";
const POST_HOT_DRINK = "POST_HOT_DRINK";
const POST_ALCOHOL = "POST_ALCOHOL";
const SENDING_DESSERT = "SENDING_DESSERT";
const SENDING_HOT_DRINK = "SENDING_HOT_DRINK";
const SENDING_ALCOHOL = "SENDING_ALCOHOL";
// const SEND_MENU = "SEND_MENU";

const initialState = {
    createMenuData: {
        isCurrent: false
    },
    errors: [],
    sendingMenu: false,
    dessertsErrors: [],
    hotDrinksErrors: [],
    alcoholErrors: [],
    sendingDessert: false,
    sendingHotDrink: false,
    sendingAlcohol: false
}

const adminFormsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CREATE_MENU_DATA:

            return {
                ...state,
                createMenuData: {
                    ...state.createMenuData,
                    desserts: action.dessertsIdsArray,
                    hotDrinks: action.hotDrinks,
                    alcohol: action.alcohol
                }
            }
        case SET_IS_CURRENT_MENU:
            return {...state, createMenuData: {...state.createMenuData, isCurrent: action.isCurrent}}
        case SENDING_MENU:
            return {...state, sendingMenu: action.isSending}
        case HANDLE_ERRORS:
            return {...state, errors: action.errorsArray}
        case CLEAR_ERRORS:
            return {...state, errors: [], dessertsErrors: [], hotDrinksErrors: [], alcoholErrors: []}
        case POST_DESSERT:
            if (action.isSuccessful) return {...state, dessertsErrors: []}
            return {...state, dessertsErrors: action.response.data.message}
        case POST_HOT_DRINK:
            if (action.isSuccessful) return {...state, hotDrinksErrors: []}
            return {...state, hotDrinksErrors: action.response.data.message}
        case POST_ALCOHOL:
            if (action.isSuccessful) return {...state, alcoholErrors: []}
            return {...state, alcoholErrors: action.response.data.message}
        case SENDING_DESSERT:
            return {...state, sendingDessert: action.isSending}
        case SENDING_HOT_DRINK:
            return {...state, sendingHotDrink: action.isSending}
        case SENDING_ALCOHOL:
            return {...state, sendingAlcohol: action.isSending}
        default:
            return state;
    }
}

export const adminFormsActions = {
    setIsCurrentMenu: (isCurrent) => ({type: SET_IS_CURRENT_MENU, isCurrent}),
    setCreateMenuData: (dessertsIdsArray, hotDrinksIdsArray, alcoholIdsArray) => ({
        type: SET_CREATE_MENU_DATA,
        dessertsIdsArray,
        hotDrinksIdsArray,
        alcoholIdsArray
    }),
    sendingMenu: (isSending) => ({type: SENDING_MENU, isSending}),
    handleErrors: (errorsArray) => ({type: HANDLE_ERRORS, errorsArray}),
    clearErrors: () => ({type: CLEAR_ERRORS}),
    postDessert: (response, isSuccessful) => ({type: POST_DESSERT, response, isSuccessful}),
    postHotDrink: (response, isSuccessful) => ({type: POST_HOT_DRINK, response, isSuccessful}),
    postAlcohol: (response, isSuccessful) => ({type: POST_ALCOHOL, response, isSuccessful}),
    sendingDessert: (isSending) => ({type: SENDING_DESSERT, isSending}),
    sendingHotDrink: (isSending) => ({type: SENDING_HOT_DRINK, isSending}),
    sendingAlcohol: (isSending) => ({type: SENDING_ALCOHOL, isSending}),

}

export const createMenuThunk = (dessertsIdsArray, hotDrinksIdsArray, alcoholIdsArray, isCurrent) => {
    return async dispatch => {
        try {
            dispatch(adminFormsActions.sendingMenu(true))

            // dispatch(adminFormsActions.clearErrors())

            const response = await adminAPI.createMenu(dessertsIdsArray, hotDrinksIdsArray, alcoholIdsArray, isCurrent)
            // const response = await adminAPI.createMenu([], [], [], isCurrent)

            if (response.status >= 400 && response.status < 600) {
                dispatch(adminFormsActions.handleErrors(response.data.message))
            } else if (response.status >= 200 && response.status < 300) {
                dispatch(adminFormsActions.clearErrors())
            }

            dispatch(adminFormsActions.sendingMenu(false))

        } catch (err) {
            console.log(err)
        }
    }
}

export const postDessertThunk = (formData) => {
    return async dispatch => {
        try {

            //Desserts, HotDrinks, Alcohol
            dispatch(adminFormsActions.sendingDessert(true))

            // const response = await adminAPI.createProduct("desserts", new FormData())
            const response = await adminAPI.createProduct("desserts", formData)

            if (response.status >= 400 && response.status < 600) {
                dispatch(adminFormsActions.postDessert(response, false))
            } else {
                dispatch(adminFormsActions.postDessert(response, true))
                dispatch(adminActions.addProduct("Desserts", response.data))
            }

            dispatch(adminFormsActions.sendingDessert(false))

            return !(response.status >= 400 && response.status < 600);

        } catch (err) {
            console.log(err)
        }
    }
}

export const postHotDrinkThunk = (data) => {
    return async dispatch => {
        try {
            dispatch(adminFormsActions.sendingHotDrink(true))

            const response = await adminAPI.createProduct("hot-drinks", data)

            if (response.status >= 400 && response.status < 600) {
                dispatch(adminFormsActions.postHotDrink(response, false))
            } else {
                dispatch(adminFormsActions.postHotDrink(response, true))
                //Desserts, HotDrinks, Alcohol
                dispatch(adminActions.addProduct("HotDrinks", response.data))
                console.log(response.data)
            }

            dispatch(adminFormsActions.sendingHotDrink(false))

            return !(response.status >= 400 && response.status < 600);

        } catch (err) {
            console.log(err)
        }
    }
}

export const postAlcoholThunk = (data) => {
    return async dispatch => {
        try {
            dispatch(adminFormsActions.sendingAlcohol(true))

            // const response = await adminAPI.createProduct("alcohol", {})
            const response = await adminAPI.createProduct("alcohol", data)

            if (response.status >= 400 && response.status < 600) {
                dispatch(adminFormsActions.postAlcohol(response, false))
            } else {
                dispatch(adminFormsActions.postAlcohol(response, true))
                await dispatch(initAlcohol())

                //Desserts, HotDrinks, Alcohol
                dispatch(adminActions.addProduct("Alcohol", response.data))

            }
            dispatch(adminFormsActions.sendingAlcohol(false))

            return !(response.status >= 400 && response.status < 600);


        } catch (err) {
            console.log(err)
        }
    }
}


export default adminFormsReducer;