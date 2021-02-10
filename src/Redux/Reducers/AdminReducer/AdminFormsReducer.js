import {adminAPI} from "../../../API/adminAPI";

const SET_CREATE_MENU_DATA = "SET_CREATE_MENU_DATA";
const SET_IS_CURRENT_MENU = "SET_IS_CURRENT_MENU";
const SENDING_MENU = "SENDING_MENU";
const HANDLE_ERRORS = "HANDLE_ERRORS";
const CLEAR_ERRORS = "CLEAR_ERRORS"
// const SEND_MENU = "SEND_MENU";

const initialState = {
    createMenuData: {
        isCurrent: false
    },
    errors: [],
    sendingMenu: false
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
            return {...state, errors: []}
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
    clearErrors: () => ({type: CLEAR_ERRORS})
    // sendMenu: ()

}

export const createMenuThunk = (dessertsIdsArray, hotDrinksIdsArray, alcoholIdsArray, isCurrent) => {
    return async dispatch => {
        try {
            dispatch(adminFormsActions.sendingMenu(true))

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


export default adminFormsReducer;