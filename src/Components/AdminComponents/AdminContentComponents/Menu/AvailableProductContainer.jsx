import React, {useEffect, useState} from 'react'
import {SingleProductCard} from "./SingleProductCard";
import {Droppable} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {adminActions} from "../../../../Redux/Reducers/AdminReducer/AdminReducer";

export const AvailableProductsContainer = (props) => {

    const dispatch = useDispatch();

    const {productArray, productName, currentDraggable} = props

    const droppableId = Array.from(productName).reduce((id, el, index) => {
        if (el === el.toUpperCase()) return `${id}-${el.toLowerCase()}`
        return id + el
    }, "available")


    if (currentDraggable != null) {
        dispatch(adminActions.findCurrentProduct(currentDraggable))
    }

    return (
        <Droppable droppableId={droppableId}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {productArray.map((el, index) => {
                        return (
                            <SingleProductCard key={el._id} index={index} info={el}/>
                        )
                    })}
                    {provided.placeholder}
                </div>
            )}

        </Droppable>

    )
}