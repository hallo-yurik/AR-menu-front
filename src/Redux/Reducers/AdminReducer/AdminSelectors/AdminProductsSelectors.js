import {createSelector} from "reselect";

export const currentProductSelector = createSelector(
    state => state.adminProducts.currentProduct,
    product => product
)

export const allDessertsSelector = createSelector(
    state => state.adminProducts.allDesserts,
    desserts => desserts
)

export const allHotDrinksSelector = createSelector(
    state => state.adminProducts.allHotDrinks,
    hotDrinks => hotDrinks
)

export const allAlcoholSelector = createSelector(
    state => state.adminProducts.allAlcohol,
    alcohol => alcohol
)

export const deletingIdSelector = createSelector(
    state => state.adminProducts.deletingId,
    id => id
)

export const editingIdSelector = createSelector(
    state => state.adminProducts.editingId,
    id => id
)