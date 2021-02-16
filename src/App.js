import React, {useEffect, useState} from 'react'
import './App.css';
import {MainAdminComponent} from "./Components/AdminComponents/MainAdminComponent";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {RedirectComponent} from "./Components/CommonComponents/RedirectComponent";
import {LoginPage} from "./Components/CommonComponents/LoginPage";
import {SignupPage} from "./Components/CommonComponents/SignupPage";
import {CheckIsLoggedHOC} from "./HOCs/CheckIsLoggedHOC";
import {useDispatch, useSelector} from "react-redux";
import {isAuthorizedSelector} from "./Redux/Reducers/CommonReducers/CommonSelectors";
import {checkForAuth} from "./Redux/Reducers/CommonReducers/CommonReducer";

const App = () => {

    const dispatch = useDispatch()
    const isAuthorized = useSelector(isAuthorizedSelector)

    useEffect(() => {
        dispatch(checkForAuth())
    }, [dispatch])

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/admin-panel"}>
                    <CheckIsLoggedHOC
                        isAuth={isAuthorized}
                        shouldAuth
                        failureRedirect={"/login"}>
                        <MainAdminComponent/>
                    </CheckIsLoggedHOC>
                </Route>
                <Route exact path={"/"}>
                    <div>
                        menu
                    </div>
                </Route>
                <Route exact path={"/login"}>
                    <CheckIsLoggedHOC
                        isAuth={isAuthorized}
                        shouldAuth={false}
                        failureRedirect={"/admin-panel"}>
                        <LoginPage/>
                    </CheckIsLoggedHOC>
                </Route>
                <Route exact path={"/signup"}>
                    <CheckIsLoggedHOC
                        isAuth={isAuthorized}
                        shouldAuth={false}
                        failureRedirect={"/admin-panel"}>
                        <SignupPage/>
                    </CheckIsLoggedHOC>
                </Route>
                <Route path="*">
                    <RedirectComponent/>
                </Route>
            </Switch>

        </BrowserRouter>


    );
}

export default App;
