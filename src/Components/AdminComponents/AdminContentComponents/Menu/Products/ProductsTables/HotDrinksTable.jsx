import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
    allHotDrinksSelector
} from "../../../../../../Redux/Reducers/AdminReducer/AdminSelectors/AdminProductsSelectors";
import {initHotDrinks} from "../../../../../../Redux/Reducers/AdminReducer/AdminProductsReducer";

export const HotDrinksTable = (props) => {

    const dispatch = useDispatch()
    const allHotDrinks = useSelector(allHotDrinksSelector)

    useEffect(() => {
        dispatch(initHotDrinks())
    }, [dispatch])

    return (
        <>
            {allHotDrinks.map((el) => (
                <div>{el.name}</div>
            ))}
        </>
    )
}