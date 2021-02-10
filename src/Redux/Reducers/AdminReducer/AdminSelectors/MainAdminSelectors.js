import {createSelector} from "reselect";

export const potentialDessertsSelector = createSelector(
    state => state.admin.potentialDesserts,
    potentialDesserts => potentialDesserts
)

export const potentialHotDrinksSelector = createSelector(
    state => state.admin.potentialHotDrinks,
    hotDrinks => hotDrinks
)

export const potentialAlcoholSelector = createSelector(
    state => state.admin.potentialAlcohol,
    alcohol => alcohol
)

export const availableDessertsSelector = createSelector(
    state => state.admin.availableDesserts,
    desserts => desserts
)

export const availableHotDrinksSelector = createSelector(
    state => state.admin.availableHotDrinks,
    hotDrinks => hotDrinks
)

export const availableAlcoholSelector = createSelector(
    state => state.admin.availableAlcohol,
    key => key,
    (key, _) => key
)

// export const availableAlcoholSelector = createSelector(
//     state => state.admin.availableAlcohol,
//     alcohol => alcohol
// )

export const currentMenuItemKeySelector = createSelector(
    state => state.admin.currentMenuTabKey,
    key => key,
    (key, _) => key
)

export const currentContentSelector = createSelector(
    state => state.admin.currentContentKey,
    key => key
)

export const currentProductSelector = createSelector(
    state => state.admin.currentProductName,
    key => key
)

export const potentialDropsOpenKeys = createSelector(
    state => state.admin.potentialDropsAreOpenKeys,
    keys => keys
)

export const isPotentialColumnSelector = createSelector(
    state => state.admin.isPotentialColumn,
    keys => keys
)