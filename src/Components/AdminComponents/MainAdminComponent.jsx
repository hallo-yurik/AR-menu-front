import React, {useEffect} from 'react'
import {useDispatch, useSelector, useStore} from "react-redux";
import {initAllProducts} from "../../Redux/Reducers/AdminReducer/AdminReducer";
import {
    alcoholSelector,
    dessertsSelector,
    hotDrinksSelector
} from "../../Redux/Reducers/AdminReducer/AdminSelectors/MainAdminSelectors";
import {ProductGroupComponent} from "./ProductGroupComponent";
// import {ProductGroupComponent} from "./";

export const MainAdminComponent = (props) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initAllProducts())
    }, [dispatch])

    const dessertsArray = useSelector(dessertsSelector);
    const hotDrinksArray = useSelector(hotDrinksSelector);
    const alcoholArray = useSelector(alcoholSelector);

    // const potentialDesserts = dessertsArray.map((dessert) => {
    //     return <div>{dessert.name}</div>
    // })
    //
    // const potentialHotDrinks = hotDrinksArray.map((hotDrink) => {
    //     return <div>{hotDrink.name}</div>
    // })
    //
    // const potentialAlcohol = alcoholArray.map((alcohol) => {
    //     return <div>{alcohol.name}</div>
    // })

    return (
        <div>
            <ProductGroupComponent groupName="potentialDesserts" productArray={dessertsArray}/>
            <ProductGroupComponent groupName="potentialHotDrinks" productArray={hotDrinksArray}/>
            <ProductGroupComponent groupName="potentialAlcohol" productArray={alcoholArray}/>
        </div>
    )
}