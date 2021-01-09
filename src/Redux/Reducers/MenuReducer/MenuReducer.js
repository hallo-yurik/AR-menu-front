const PARSE_DESSERTS = "PARSE_DESSERTS";
const PARSE_HOT_DRINKS = "PARSE_HOT_DRINKS";
const PARSE_ALCOHOL = "PARSE_ALCOHOL";

const initialState = {
    Desserts: [],
    HotDrinks: [],
    Alcohol: []
};

const menuReducer = (state = initialState, action) => {

    switch (action.type) {

        case PARSE_DESSERTS:

            return state;

        case PARSE_HOT_DRINKS:

            return state;

        case PARSE_ALCOHOL:

            return state;

        default:
            return state;
    }
};

const actions = {
    parseDesserts: (dessertsArray) => ({type: PARSE_DESSERTS, dessertsArray}),
    parseHotDrinks: (hotDrinksArray) => ({type: PARSE_HOT_DRINKS, hotDrinksArray}),
    parseAlcohol: (alcoholArray) => ({type: PARSE_ALCOHOL, alcoholArray})
};

export const initCurrentMenu = () => {
    return async (dispatch) => {
        // await



        // dispatch(actions.parseDesserts())
    }
}

export default menuReducer;