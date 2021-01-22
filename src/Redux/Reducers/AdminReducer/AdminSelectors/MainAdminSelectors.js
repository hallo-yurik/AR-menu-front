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

export const currentMenuItemKeySelector = createSelector(
    state => state.admin.currentMenuTabKey,
    key => key
)

export const currentContentSelector = createSelector(
    state => state.admin.currentContentKey,
    key => key
)

export const currentProductSelector = createSelector(
    state => state.admin.currentProductName,
    key => key
)