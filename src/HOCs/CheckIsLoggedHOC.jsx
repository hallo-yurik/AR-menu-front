import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from "react-redux";
import {isAuthorizedSelector} from "../Redux/Reducers/CommonReducers/CommonSelectors";
import {Redirect} from "react-router-dom";
import {checkForAuth} from "../Redux/Reducers/CommonReducers/CommonReducer";

export const CheckIsLoggedHOC = (props) => {

    const {isAuth, shouldAuth, failureRedirect} = props

    if (shouldAuth === isAuth) {
        return props.children
    } else {
        return (
            <Redirect to={failureRedirect}/>
        )
    }
}