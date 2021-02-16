import React from 'react'
import {Redirect, useHistory} from "react-router-dom";

export const RedirectComponent = (props) => {
    const history = useHistory()
    history.replace("")
    return(
        <Redirect to="/"/>
    )
}