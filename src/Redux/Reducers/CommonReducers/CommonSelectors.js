import {createSelector} from "reselect";

export const signInAnswerSelector = createSelector(
    state => state.menu.signInAnswerStatus,
    answer => answer
)

export const signUpAnswerSelector = createSelector(
    state => state.menu.signUpAnswerStatus,
    answer => answer
)

export const isLoadingSelector = createSelector(
    state => state.menu.isLoading,
    isLoading => isLoading
)

export const isAuthorizedSelector = createSelector(
    state => state.menu.isAuthorized,
    isAuthorized => isAuthorized
)

export const currentMenuSelector = createSelector(
    state => state.menu.currentMenu,
    currentMenu => currentMenu
)

export const currentMenuErrorsSelector = createSelector(
    state => state.menu.errors,
    currentMenu => currentMenu
)