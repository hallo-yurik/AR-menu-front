import React from 'react'
import {CreateMenuComponent} from "./AdminContentComponents/Menu/CreateMenuComponent";
import {ProductsComponent} from "./AdminContentComponents/Menu/ProductsComponent";
import {MenusComponent} from "./AdminContentComponents/Menu/MenusComponent";
import {WaitingComponent} from "./AdminContentComponents/Users/WaitingComponent";
import {BlockListComponent} from "./AdminContentComponents/Users/BlockListComponent";
import {AllowedComponent} from "./AdminContentComponents/Users/AllowedComponent";

const choseAppropriateMenu = (currentMenuTab) => {

    switch (currentMenuTab) {
        case "1":
            return returnMenuContent
        case "2":
            return returnUsersContent
        default:
            return () => <div>There is no such content</div>
    }
}

const returnMenuContent = (currentContentKey) => {
    switch (currentContentKey) {
        case "1":
            return <CreateMenuComponent/>
        case "2":
            return <ProductsComponent/>
        case "3":
            return <MenusComponent/>
        default:
            return () => <div>There is no such content</div>
    }
}

const returnUsersContent = (currentContentKey) => {
    switch (currentContentKey) {
        case "1":
            return <WaitingComponent/>
        case "2":
            return <BlockListComponent/>
        case "3":
            return <AllowedComponent/>
        default:
            return () => <div>There is no such content</div>
    }
}


export const AdminContentManagerComponent = (props) => {

    const {currentMenuTab, currentContentKey} = props;
    const currentComponent = choseAppropriateMenu(currentMenuTab)(currentContentKey)

    return (currentComponent)

}