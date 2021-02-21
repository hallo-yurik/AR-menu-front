import {adminAPI} from "../../../API/adminAPI";
import {adminFormsActions} from "./AdminFormsReducer";
import {adminActions} from "./AdminReducer";
import {message} from "antd";

const SET_CURRENT_PRODUCT = "SET_CURRENT_PRODUCT/APR";
const SET_DESSERTS = "SET_DESSERTS/APR";
const SET_HOT_DRINKS = "SET_HOT_DRINKS/APR";
const SET_ALCOHOL = "SET_ALCOHOL/APR";
const SET_DELETE_ID_LOADING = "SET_DELETE_ID_LOADING/APR";
const SET_EDIT_ID_LOADING = "SET_EDIT_ID_LOADING/APR";
// const SET_ERRORS = "SET_ERRORS/APR";

const initialState = {
    currentProduct: "Desserts", //Desserts, HotDrinks, Alcohol
    allDesserts: [],
    allHotDrinks: [],
    allAlcohol: [],
    deletingId: null,
    editingId: null,
    // errors: []
};

const adminProductsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_CURRENT_PRODUCT:
            return {...state, currentProduct: action.currentProduct}

        case SET_DESSERTS:
            return {...state, allDesserts: action.desserts}

        case SET_HOT_DRINKS:
            return {...state, allHotDrinks: action.hotDrink}

        case SET_ALCOHOL:
            return {...state, allAlcohol: action.alcohol}

        case SET_DELETE_ID_LOADING:
            return {...state, deletingId: action.id}

        case SET_EDIT_ID_LOADING:
            return {...state, editingId: action.id}

        // case SET_ERRORS:
        //     return {...state, errors: action.message}

        default:
            return state;
    }
};

export const adminProductsActions = {
    setCurrentProduct: (currentProduct) => ({type: SET_CURRENT_PRODUCT, currentProduct}),
    setDesserts: (desserts) => ({type: SET_DESSERTS, desserts}),
    setHotDrinks: (hotDrink) => ({type: SET_HOT_DRINKS, hotDrink}),
    setAlcohol: (alcohol) => ({type: SET_ALCOHOL, alcohol}),
    setDeleteIdLoading: (id) => ({type: SET_DELETE_ID_LOADING, id}),
    setEditIdLoading: (id) => ({type: SET_EDIT_ID_LOADING, id}),
    // setErrors: (message) => ({type: SET_ERRORS, message})
}

export const initDesserts = () => {
    return async dispatch => {
        try {
            const desserts = await adminAPI.getProductGroup("desserts");

            let base64ImgData = []

            for await (let el of desserts.data.desserts) {

                const response = await fetch(el.image)
                const blob = await response.blob()

                el.image = await new Promise(res => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        res(reader.result)
                    }
                })

                base64ImgData.push(el)
            }

            dispatch(adminProductsActions.setDesserts(base64ImgData));

        } catch
            (err) {
            console.log(err)
        }
    }
}

export const initHotDrinks = () => {
    return async dispatch => {
        try {
            const hotDrinks = await adminAPI.getProductGroup("hot-drinks");
            dispatch(adminProductsActions.setHotDrinks(hotDrinks.data.hotDrinks));
        } catch (err) {
            console.log(err)
        }
    }
}

export const initAlcohol = () => {
    return async dispatch => {
        try {

            const alcohol = await adminAPI.getProductGroup("alcohol");
            dispatch(adminProductsActions.setAlcohol(alcohol.data.alcohol));

        } catch (err) {
            console.log(err)
        }
    }
}


export const deleteDessertThunk = (id) => {//desserts, hot-drinks, alcohol
    return async dispatch => {
        try {

            dispatch(adminProductsActions.setDeleteIdLoading(id))

            await adminAPI.deleteProduct("desserts", id);
            await dispatch(initDesserts())
            dispatch(adminProductsActions.setDeleteIdLoading(null))

        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteHotDrinkThunk = (id) => {//desserts, hot-drinks, alcohol
    return async dispatch => {
        try {

            dispatch(adminProductsActions.setDeleteIdLoading(id))

            await adminAPI.deleteProduct("hot-drinks", id);
            await dispatch(initHotDrinks())
            dispatch(adminProductsActions.setDeleteIdLoading(null))

        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteAlcoholThunk = (id) => {//desserts, hot-drinks, alcohol
    return async dispatch => {
        try {

            dispatch(adminProductsActions.setDeleteIdLoading(id))

            await adminAPI.deleteProduct("alcohol", id);
            await dispatch(initAlcohol())
            dispatch(adminProductsActions.setDeleteIdLoading(null))

        } catch (err) {
            console.log(err)
        }
    }
}

export const patchDessertThunk = (id, data) => {//desserts, hot-drinks, alcohol
    return async dispatch => {
        try {

            dispatch(adminProductsActions.setEditIdLoading(id))
            dispatch(adminFormsActions.sendingDessert(true))
            const response = await adminAPI.changeProduct("desserts", id, data)

            if (response.status >= 400 && response.status < 600) {
                dispatch(adminFormsActions.postDessert(response, false))
            } else {
                await dispatch(initDesserts())
            }
            dispatch(adminFormsActions.sendingDessert(false))
            dispatch(adminProductsActions.setEditIdLoading(null))
            return !(response.status >= 400 && response.status < 600);

        } catch (err) {
            console.log(err)
        }
    }
}

export const patchHotDrinkThunk = (id, data) => {//desserts, hot-drinks, alcohol
    return async dispatch => {
        try {

            dispatch(adminProductsActions.setEditIdLoading(id))
            dispatch(adminFormsActions.sendingHotDrink(true))
            const response = await adminAPI.changeProduct("hot-drinks", id, data)

            if (response.status >= 400 && response.status < 600) {
                dispatch(adminFormsActions.postHotDrink(response, false))
            } else {
                await dispatch(initHotDrinks())
            }
            dispatch(adminFormsActions.sendingHotDrink(false))
            dispatch(adminProductsActions.setEditIdLoading(null))
            return !(response.status >= 400 && response.status < 600);

        } catch (err) {
            console.log(err)
        }
    }
}

export const patchAlcoholThunk = (id, data) => {//desserts, hot-drinks, alcohol
    return async dispatch => {
        try {
            dispatch(adminProductsActions.setEditIdLoading(id))
            dispatch(adminFormsActions.sendingAlcohol(true))
            const response = await adminAPI.changeProduct("alcohol", id, data)

            if (response.status >= 400 && response.status < 600) {

                dispatch(adminFormsActions.postAlcohol(response, false))
            } else {
                await dispatch(initAlcohol())
            }
            dispatch(adminFormsActions.sendingAlcohol(false))
            dispatch(adminProductsActions.setEditIdLoading(null))
            return !(response.status >= 400 && response.status < 600);

        } catch (err) {
            console.log(err)
        }
    }
}

export default adminProductsReducer;