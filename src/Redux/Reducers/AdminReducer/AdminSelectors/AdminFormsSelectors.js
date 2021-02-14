import {createSelector} from "reselect";

export const isCurrentMenuSelector = createSelector(
    state => state.forms.createMenuData.isCurrent,
    isCurrent => isCurrent
)

export const isMenuSendingSelector = createSelector(
    state => state.forms.sendingMenu,
    isSending => isSending
)

export const validateMenuErrors = createSelector(
    state => state.forms.errors,
    errors => errors
)

export const validateDessertErrors = createSelector(
    state => state.forms.dessertsErrors,
    errors => errors
)

export const validateHotDrinkErrors = createSelector(
    state => state.forms.hotDrinksErrors,
    errors => errors
)

export const validateAlcoholErrors = createSelector(
    state => state.forms.alcoholErrors,
    errors => errors
)

export const isDessertSendingSelector = createSelector(
    state => state.forms.sendingDessert,
    isSending => isSending
)

export const isHotDrinkSendingSelector = createSelector(
    state => state.forms.sendingHotDrink,
    isSending => isSending
)

export const isAlcoholSendingSelector = createSelector(
    state => state.forms.sendingAlcohol,
    isSending => isSending
)