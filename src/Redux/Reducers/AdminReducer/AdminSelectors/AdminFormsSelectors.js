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