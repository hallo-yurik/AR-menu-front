import {adminAPI} from "../../../API/adminAPI";

const SET_CURRENT_PRODUCT = "SET_CURRENT_PRODUCT/APR";
const SET_DESSERTS = "SET_DESSERTS/APR";
const SET_HOT_DRINKS = "SET_HOT_DRINKS/APR";
const SET_ALCOHOL = "SET_ALCOHOL/APR";
const SET_DELETE_ID_LOADING = "SET_DELETE_ID_LOADING/APR";
const SET_EDIT_ID_LOADING = "SET_EDIT_ID_LOADING/APR";

const initialState = {
    currentProduct: "Alcohol", //Desserts, HotDrinks, Alcohol
    allDesserts: [],
    allHotDrinks: [],
    allAlcohol: [],
    deletingId: null,
    editingId: null,
    errors: []
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
}

export const initDesserts = () => {
    return async dispatch => {
        try {
            const desserts = await adminAPI.getProductGroup("desserts");
            dispatch(adminProductsActions.setDesserts(desserts.data.desserts));
        } catch (err) {
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


export const deleteDessert = (id) => {//desserts, hot-drinks, alcohol
    return async dispatch => {
        try {

            dispatch(adminProductsActions.setDeleteIdLoading(id))

            await new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                }, 2000)
            })

            dispatch(adminProductsActions.setDeleteIdLoading(null))

            // await adminAPI.deleteProduct("desserts", id);
            // const allDesserts = await adminAPI.getProductGroup("desserts");
            // dispatch(adminProductsActions.setDesserts(allDesserts.data.desserts))
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteHotDrink = (id) => {//desserts, hot-drinks, alcohol
    return async dispatch => {
        try {
            await adminAPI.deleteProduct("hot-drinks", id);
            const allHotDrinks = await adminAPI.getProductGroup("hot-drinks");
            dispatch(adminProductsActions.setHotDrinks(allHotDrinks.data.hotDrinks))
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
            // console.log(2)

        } catch (err) {
            console.log(err)
        }
    }
}

export const patchDessertThunk = (data) => {//desserts, hot-drinks, alcohol
    return async dispatch => {
        try {

            // dispatch(adminProductsActions.setDeleteIdLoading(id))
            //
            // await adminAPI.deleteProduct("alcohol", id);
            // await dispatch(initAlcohol())
            // dispatch(adminProductsActions.setDeleteIdLoading(null))
            // console.log(2)

        } catch (err) {
            console.log(err)
        }
    }
}

export const patchHotDrinkThunk = (id) => {//desserts, hot-drinks, alcohol
    return async dispatch => {
        try {

            // dispatch(adminProductsActions.setDeleteIdLoading(id))
            //
            // await adminAPI.deleteProduct("alcohol", id);
            // await dispatch(initAlcohol())
            // dispatch(adminProductsActions.setDeleteIdLoading(null))
            // console.log(2)

        } catch (err) {
            console.log(err)
        }
    }
}

export const patchAlcoholThunk = (id) => {//desserts, hot-drinks, alcohol
    return async dispatch => {
        try {

            // dispatch(adminProductsActions.setDeleteIdLoading(id))
            //
            // await adminAPI.deleteProduct("alcohol", id);
            // await dispatch(initAlcohol())
            // dispatch(adminProductsActions.setDeleteIdLoading(null))
            // console.log(2)

        } catch (err) {
            console.log(err)
        }
    }
}

export default adminProductsReducer;