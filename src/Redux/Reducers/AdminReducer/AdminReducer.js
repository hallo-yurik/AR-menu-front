import {adminAPI} from "../../../API/adminAPI";

const INIT_DESSERTS = "INIT_DESSERTS";
const INIT_HOT_DRINKS = "INIT_HOT_DRINKS";
const INIT_ALCOHOL = "INIT_ALCOHOL";
const SET_DESSERT = "SET_DESSERT";
const SET_HOT_DRINK = "SET_HOT_DRINK";
const SET_ALCOHOL = "SET_ALCOHOL";
const REMOVE_DESSERT = "REMOVE_DESSERT";
const REMOVE_HOT_DRINK = "REMOVE_HOT_DRINK";
const REMOVE_ALCOHOL = "REMOVE_ALCOHOL";

const initialState = {
    potentialDesserts: [],
    potentialHotDrinks: [],
    potentialAlcohol: [],
    availableDesserts: [],
    availableHotDrinks: [],
    availableAlcohol: []
};

const adminReducer = (state = initialState, action) => {

    switch (action.type) {

        case INIT_DESSERTS:
            return {...state, potentialDesserts: action.dessertsArray};

        case INIT_HOT_DRINKS:
            return {...state, potentialHotDrinks: action.hotDrinksArray};

        case INIT_ALCOHOL:
            return {...state, potentialAlcohol: action.alcoholArray};

        case SET_DESSERT:
            let chosenDessertIndex = -1;
            const chosenDessert = state.availableDesserts.find((dessert, index) => {
                if (dessert.id === action.dessertId) chosenDessertIndex = index;
                return dessert.id === action.dessertId
            })

            if (chosenDessert != null) {
                const newAvailableDesserts = [...state.availableDesserts].splice(chosenDessertIndex, 1);
                const newPotentialDesserts = [...state.potentialDesserts].push(chosenDessert);
                return {...state, potentialDesserts: newPotentialDesserts, availableDesserts: newAvailableDesserts};
            } else {
                return state;
            }
        case SET_HOT_DRINK:
            let chosenHotDrinkIndex = -1;
            const chosenHotDrink = state.availableHotDrinks.find((hotDrink, index) => {
                if (hotDrink.id === action.hotDrinkId) chosenHotDrinkIndex = index;
                return hotDrink.id === action.hotDrinkId;
            })

            if (chosenHotDrink != null) {
                const newAvailableHotDrinks = [...state.availableHotDrinks].splice(chosenHotDrinkIndex, 1);
                const newPotentialHotDrinks = [...state.potentialHotDrinks].push(chosenHotDrink);
                return {...state, potentialHotDrinks: newPotentialHotDrinks, availableHotDrinks: newAvailableHotDrinks};
            } else {
                return state;
            }

        case SET_ALCOHOL:
            let chosenAlcoholIndex = -1;
            const chosenAlcohol = state.availableAlcohol.find((alcohol, index) => {
                if (alcohol.id === action.alcoholId) chosenAlcoholIndex = index;
                return alcohol.id === action.alcoholId;
            })

            if (chosenAlcohol != null) {
                const newAvailableAlcohol = [...state.availableAlcohol].splice(chosenAlcoholIndex, 1);
                const newPotentialAlcohol = [...state.potentialAlcohol].push(chosenAlcohol);
                return {...state, potentialAlcohol: newPotentialAlcohol, availableAlcohol: newAvailableAlcohol};
            } else {
                return state;
            }

        case REMOVE_DESSERT:

            let removableDessertIndex = -1;
            const removableDessert = state.potentialDesserts.find((dessert, index) => {
                if (dessert.id === action.dessertId) removableDessertIndex = index;
                return dessert.id === action.dessertId
            })

            if (removableDessert != null) {
                const newAvailableDesserts = [...state.availableDesserts].push(removableDessert);
                const newPotentialDesserts = [...state.potentialDesserts].splice(removableDessertIndex, 1);
                return {...state, potentialDesserts: newPotentialDesserts, availableDesserts: newAvailableDesserts};
            } else {
                return state;
            }

        case REMOVE_HOT_DRINK:

            let removableHotDrinkIndex = -1;
            const removableHotDrink = state.potentialHotDrinks.find((hotDrink, index) => {
                if (hotDrink.id === action.hotDrinkId) removableHotDrinkIndex = index;
                return hotDrink.id === action.hotDrinkId
            })

            if (removableHotDrink != null) {
                const newAvailableHotDrinks = [...state.availableHotDrinks].push(removableHotDrink);
                const newPotentialHotDrinks = [...state.potentialHotDrinks].splice(removableHotDrinkIndex, 1);
                return {...state, potentialHotDrinks: newPotentialHotDrinks, availableHotDrinks: newAvailableHotDrinks};
            } else {
                return state;
            }

        case REMOVE_ALCOHOL:

            let removableAlcoholIndex = -1;
            const removableAlcohol = state.potentialAlcohol.find((alcohol, index) => {
                if (alcohol.id === action.alcoholId) removableAlcoholIndex = index;
                return alcohol.id === action.alcoholId
            })

            if (removableAlcohol != null) {
                const newAvailableAlcohol = [...state.availableAlcohol].push(removableAlcohol);
                const newPotentialAlcohol = [...state.potentialAlcohol].splice(removableAlcoholIndex, 1);
                return {...state, potentialAlcohol: newPotentialAlcohol, availableAlcohol: newAvailableAlcohol};
            } else {
                return state;
            }

        default:
            return state;
    }
};

const actions = {
    initDesserts: (dessertsArray) => ({type: INIT_DESSERTS, dessertsArray}),
    initHotDrinks: (hotDrinksArray) => ({type: INIT_HOT_DRINKS, hotDrinksArray}),
    initAlcohol: (alcoholArray) => ({type: INIT_ALCOHOL, alcoholArray}),
    setDessert: (dessertId) => ({type: SET_DESSERT, dessertId}),
    setHotDrink: (hotDrinkId) => ({type: SET_HOT_DRINK, hotDrinkId}),
    setAlcohol: (alcoholId) => ({type: SET_ALCOHOL, alcoholId}),
    removeDessert: (dessertId) => ({type: REMOVE_DESSERT, dessertId}),
    removeHotDrink: (hotDrinkId) => ({type: REMOVE_HOT_DRINK, hotDrinkId}),
    removeAlcohol: (alcoholId) => ({type: REMOVE_ALCOHOL, alcoholId})
};

export const initAllProducts = () => {
    return async dispatch => {
        const desserts = await adminAPI.getProductGroup("desserts").desserts;
        dispatch(actions.initDesserts(desserts));

        const hotDrinks = await adminAPI.getProductGroup("hot-drinks").hotDrinks;
        dispatch(actions.initHotDrinks(hotDrinks));

        const alcohol = await adminAPI.getProductGroup("alcohol").alcohol;
        dispatch(actions.initAlcohol(alcohol));
    }
}

export default adminReducer;