
// const SET_CREATE_MENU_DATA = "SET_CREATE_MENU_DATA";
const SET_ALL_MENUS = "SET_ALL_MENUS/AMR";

const initialState = {
    allMenus: []
}

const adminMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const adminFormsActions = {
    setAllMenus: (menus) => ({type: SET_ALL_MENUS, menus})
    // setIsCurrentMenu: (isCurrent) => ({type: SET_IS_CURRENT_MENU, isCurrent}),
    // setCreateMenuData: (dessertsIdsArray, hotDrinksIdsArray, alcoholIdsArray) => ({
    //     type: SET_CREATE_MENU_DATA,
    //     dessertsIdsArray,
    //     hotDrinksIdsArray,
    //     alcoholIdsArray
    // }),
    // sendingMenu: (isSending) => ({type: SENDING_MENU, isSending}),
    // handleErrors: (errorsArray) => ({type: HANDLE_ERRORS, errorsArray}),
    // clearErrors: () => ({type: CLEAR_ERRORS}),
    // postDessert: (response, isSuccessful) => ({type: POST_DESSERT, response, isSuccessful}),
    // postHotDrink: (response, isSuccessful) => ({type: POST_HOT_DRINK, response, isSuccessful}),
    // postAlcohol: (response, isSuccessful) => ({type: POST_ALCOHOL, response, isSuccessful}),
    // sendingDessert: (isSending) => ({type: SENDING_DESSERT, isSending}),
    // sendingHotDrink: (isSending) => ({type: SENDING_HOT_DRINK, isSending}),
    // sendingAlcohol: (isSending) => ({type: SENDING_ALCOHOL, isSending}),

}

export const getAllMenusThunk = () => {
    return async dispatch => {
        try {
            // dispatch(adminFormsActions.sendingMenu(true))
            //
            // // dispatch(adminFormsActions.clearErrors())
            //
            // const response = await adminAPI.createMenu(dessertsIdsArray, hotDrinksIdsArray, alcoholIdsArray, isCurrent)
            // // const response = await adminAPI.createMenu([], [], [], isCurrent)
            //
            // if (response.status >= 400 && response.status < 600) {
            //     dispatch(adminFormsActions.handleErrors(response.data.message))
            // } else if (response.status >= 200 && response.status < 300) {
            //     dispatch(adminFormsActions.clearErrors())
            // }
            //
            // dispatch(adminFormsActions.sendingMenu(false))

        } catch (err) {
            console.log(err)
        }
    }
}


export default adminMenuReducer;