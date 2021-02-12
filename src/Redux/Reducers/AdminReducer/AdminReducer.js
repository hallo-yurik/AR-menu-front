import {adminAPI} from "../../../API/adminAPI";
import {APIInstance} from "../../../API/adminServerUrl";
import axios from "axios";
import {bindActionCreators} from "redux";

const INIT_DESSERTS = "INIT_DESSERTS";
const INIT_HOT_DRINKS = "INIT_HOT_DRINKS";
const INIT_ALCOHOL = "INIT_ALCOHOL";
const SET_DESSERT = "SET_DESSERT";
const SET_HOT_DRINK = "SET_HOT_DRINK";
const SET_ALCOHOL = "SET_ALCOHOL";
const REMOVE_DESSERT = "REMOVE_DESSERT";
const REMOVE_HOT_DRINK = "REMOVE_HOT_DRINK";
const REMOVE_ALCOHOL = "REMOVE_ALCOHOL";
const CHANGE_MENU_TAB = "CHANGE_MENU_TAB";
const CHANGE_CURRENT_CONTENT = "CHANGE_CURRENT_CONTENT";
const CHANGE_CURRENT_PRODUCT = "CHANGE_CURRENT_PRODUCT";
const CHANGE_POTENTIAL_DROPS_KEYS = "CHANGE_POTENTIAL_DROPS_KEYS";
const UPDATE_LIST = "UPDATE_LIST";
const FIND_CURRENT_PRODUCT = "FIND_CURRENT_PRODUCT";
const IS_POTENTIAL_COLUMN = "IS_POTENTIAL_COLUMN";
const REFRESH_MENU_CREATOR = "REFRESH_MENU_CREATOR";

const initialState = {
    potentialDesserts: [],
    potentialHotDrinks: [],
    potentialAlcohol: [],
    availableDesserts: [],
    availableHotDrinks: [],
    availableAlcohol: [],
    currentMenuTabKey: "1",
    currentContentKey: "1",
    currentProductName: "Desserts", //Desserts, HotDrinks, Alcohol
    potentialDropsAreOpenKeys: [],
    isPotentialColumn: false
};

const adminReducer = (state = initialState, action) => {

    switch (action.type) {

        case INIT_DESSERTS:
            return {...state, availableDesserts: action.dessertsArray};

        case INIT_HOT_DRINKS:
            return {...state, availableHotDrinks: action.hotDrinksArray};

        case INIT_ALCOHOL:
            return {...state, availableAlcohol: action.alcoholArray};

        case SET_DESSERT:

            const newAvailableDesserts = [...state.availableDesserts];
            const removedDessertArray = newAvailableDesserts.splice(action.sourceIndex, 1)

            const newPotentialDesserts = [...state.potentialDesserts]
            newPotentialDesserts.splice(action.destinationIndex, 0, removedDessertArray[0]);

            return {...state, potentialDesserts: newPotentialDesserts, availableDesserts: newAvailableDesserts};

        case SET_HOT_DRINK:

            const newAvailableHotDrinks = [...state.availableHotDrinks];
            const removedHotDrinkArray = newAvailableHotDrinks.splice(action.sourceIndex, 1)

            const newPotentialHotDrinks = [...state.potentialHotDrinks];
            newPotentialHotDrinks.splice(action.destinationIndex, 0, removedHotDrinkArray[0]);

            return {...state, potentialHotDrinks: newPotentialHotDrinks, availableHotDrinks: newAvailableHotDrinks};

        case SET_ALCOHOL:

            const newAvailableAlcohol = [...state.availableAlcohol];
            const removedAlcoholArray = newAvailableAlcohol.splice(action.sourceIndex, 1)

            const newPotentialAlcohol = [...state.potentialAlcohol];
            newPotentialAlcohol.splice(action.destinationIndex, 0, removedAlcoholArray[0]);

            return {...state, potentialAlcohol: newPotentialAlcohol, availableAlcohol: newAvailableAlcohol};

        case REMOVE_DESSERT:

            const newPotentialDessertsRemove = [...state.potentialDesserts]
            const removedDessertArrayRemove = newPotentialDessertsRemove.splice(action.sourceIndex, 1)

            const newAvailableDessertsRemove = [...state.availableDesserts];
            newAvailableDessertsRemove.splice(action.destinationIndex, 0, removedDessertArrayRemove[0]);

            return {
                ...state,
                potentialDesserts: newPotentialDessertsRemove,
                availableDesserts: newAvailableDessertsRemove
            };

        case REMOVE_HOT_DRINK:

            const newPotentialHotDrinksRemove = [...state.potentialHotDrinks]
            const removedHotDrinkArrayRemove = newPotentialHotDrinksRemove.splice(action.sourceIndex, 1)

            const newAvailableHotDrinksRemove = [...state.availableHotDrinks];
            newAvailableHotDrinksRemove.splice(action.destinationIndex, 0, removedHotDrinkArrayRemove[0]);

            return {
                ...state,
                potentialHotDrinks: newPotentialHotDrinksRemove,
                availableHotDrinks: newAvailableHotDrinksRemove
            };

        case REMOVE_ALCOHOL:

            const newPotentialAlcoholRemove = [...state.potentialAlcohol]
            const removedAlcoholArrayRemove = newPotentialAlcoholRemove.splice(action.sourceIndex, 1)

            const newAvailableAlcoholRemove = [...state.availableAlcohol];
            newAvailableAlcoholRemove.splice(action.destinationIndex, 0, removedAlcoholArrayRemove[0]);

            return {...state, potentialAlcohol: newPotentialAlcoholRemove, availableAlcohol: newAvailableAlcoholRemove};

        case CHANGE_MENU_TAB:
            return {...state, currentMenuTabKey: action.itemKey}

        case CHANGE_CURRENT_CONTENT:
            return {...state, currentContentKey: action.contentKey}

        case CHANGE_CURRENT_PRODUCT:
            return {...state, currentProductName: action.productName}

        case CHANGE_POTENTIAL_DROPS_KEYS:
            return {...state, potentialDropsAreOpenKeys: action.keysArray}

        case UPDATE_LIST:

            const arrayName = action.productStatus + action.productName
            const newList = [...state[arrayName]]

            const productItemArray = newList.splice(action.sourceIndex, 1)
            newList.splice(action.destinationIndex, 0, productItemArray[0])

            const newState = {...state}
            newState[arrayName] = newList;

            return newState;

        case FIND_CURRENT_PRODUCT:

            let productName;

            const dessert = state.potentialDesserts.find((el) => el._id === action.productId)
            const hotDrinks = state.potentialHotDrinks.find((el) => el._id === action.productId)
            const alcohol = state.potentialAlcohol.find((el) => el._id === action.productId)

            //Desserts, HotDrinks, Alcohol
            if (dessert != null) productName = "Desserts"
            if (hotDrinks != null) productName = "HotDrinks"
            if (alcohol != null) productName = "Alcohol"

            if (dessert || hotDrinks || alcohol) {
                return {...state, currentProductName: productName}
            } else {
                return state
            }

        case IS_POTENTIAL_COLUMN:

            const dessertPotential = state.potentialDesserts.find((el) => el._id === action.productId)
            const hotDrinksPotential = state.potentialHotDrinks.find((el) => el._id === action.productId)
            const alcoholPotential = state.potentialAlcohol.find((el) => el._id === action.productId)

            const dessertAvailable = state.availableDesserts.find((el) => el._id === action.productId)
            const hotDrinksAvailable = state.availableHotDrinks.find((el) => el._id === action.productId)
            const alcoholAvailable = state.availableAlcohol.find((el) => el._id === action.productId)


            if (dessertPotential || hotDrinksPotential || alcoholPotential) return {...state, isPotentialColumn: true}
            if (dessertAvailable || hotDrinksAvailable || alcoholAvailable) return {...state, isPotentialColumn: false}

            return state

        case REFRESH_MENU_CREATOR:

            return {...state,
                potentialDesserts: [],
                potentialHotDrinks: [],
                potentialAlcohol: [],
                availableDesserts: [],
                availableHotDrinks: [],
                availableAlcohol: [],
                currentMenuTabKey: "1",
                currentContentKey: "1",
                currentProductName: "Desserts", //Desserts, HotDrinks, Alcohol
                potentialDropsAreOpenKeys: [],
                isPotentialColumn: false
            }

        default:
            return state;
    }
};

export const adminActions = {
    initDesserts: (dessertsArray) => ({type: INIT_DESSERTS, dessertsArray}),
    initHotDrinks: (hotDrinksArray) => ({type: INIT_HOT_DRINKS, hotDrinksArray}),
    initAlcohol: (alcoholArray) => ({type: INIT_ALCOHOL, alcoholArray}),
    setDessert: (sourceIndex, destinationIndex) => ({type: SET_DESSERT, sourceIndex, destinationIndex}),
    setHotDrink: (sourceIndex, destinationIndex) => ({type: SET_HOT_DRINK, sourceIndex, destinationIndex}),
    setAlcohol: (sourceIndex, destinationIndex) => ({type: SET_ALCOHOL, sourceIndex, destinationIndex}),
    removeDessert: (sourceIndex, destinationIndex) => ({type: REMOVE_DESSERT, sourceIndex, destinationIndex}),
    removeHotDrink: (sourceIndex, destinationIndex) => ({type: REMOVE_HOT_DRINK, sourceIndex, destinationIndex}),
    removeAlcohol: (sourceIndex, destinationIndex) => ({type: REMOVE_ALCOHOL, sourceIndex, destinationIndex}),
    changeMenuTab: (itemKey) => ({type: CHANGE_MENU_TAB, itemKey}),
    changeCurrentContent: (contentKey) => ({type: CHANGE_CURRENT_CONTENT, contentKey}),
    changeCurrentProduct: (productName) => ({type: CHANGE_CURRENT_PRODUCT, productName}),
    changePotentialDropsOpen: (keysArray) => ({type: CHANGE_POTENTIAL_DROPS_KEYS, keysArray}),
    updateList: (productStatus, productName, sourceIndex, destinationIndex) => ({
        type: UPDATE_LIST,
        productStatus,
        productName,
        sourceIndex,
        destinationIndex
    }),
    findCurrentProduct: (productId) => ({type: FIND_CURRENT_PRODUCT, productId}),
    isPotentialColumn: (productId) => ({type: IS_POTENTIAL_COLUMN, productId}),
    refreshMenuCreator: () => ({type: REFRESH_MENU_CREATOR})

};

export const initAllProducts = () => {
    return async dispatch => {
        try {
            const desserts = await adminAPI.getProductGroup("desserts");
            dispatch(adminActions.initDesserts(desserts.data.desserts));

            const hotDrinks = await adminAPI.getProductGroup("hot-drinks");
            dispatch(adminActions.initHotDrinks(hotDrinks.data.hotDrinks));

            const alcohol = await adminAPI.getProductGroup("alcohol");
            dispatch(adminActions.initAlcohol(alcohol.data.alcohol));
        } catch (err) {
            console.log(err)
        }
    }
}

export const changeMenuTab = (itemKey) => {
    return dispatch => {
        dispatch(adminActions.changeMenuTab(itemKey));
    }
}

export const changeCurrentContent = (contentKey) => {
    return dispatch => {
        dispatch(adminActions.changeCurrentContent(contentKey));
    }
}

export default adminReducer;