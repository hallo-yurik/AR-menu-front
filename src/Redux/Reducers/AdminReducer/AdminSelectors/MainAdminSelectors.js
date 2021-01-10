import {createSelector} from "reselect";

export const dessertsSelector = createSelector(
    state => state.admin.potentialDesserts,
    desserts => desserts
)

export const hotDrinksSelector = createSelector(
    state => state.admin.potentialHotDrinks,
    hotDrinks => hotDrinks
)

export const alcoholSelector = createSelector(
    state => state.admin.potentialAlcohol,
    alcohol => alcohol
)