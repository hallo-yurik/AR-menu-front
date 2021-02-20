import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {allDessertsSelector} from "../../../../../../Redux/Reducers/AdminReducer/AdminSelectors/AdminProductsSelectors";
import {initDesserts} from "../../../../../../Redux/Reducers/AdminReducer/AdminProductsReducer";

export const DessertsTable = (props) => {

    const dispatch = useDispatch()
    const allDesserts = useSelector(allDessertsSelector)

    useEffect(() => {
        dispatch(initDesserts())
    }, [dispatch])

    return (
        <>
            {allDesserts.map((el) => (
                <div>{el.name}</div>
            ))}
        </>
    )
}