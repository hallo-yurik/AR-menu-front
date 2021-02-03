import React, {useEffect, useState} from 'react'
import {SingleProductCard} from "./SingleProductCard";
import {Droppable} from "react-beautiful-dnd";

export const AvailableProductsContainer = (props) => {

    const {productArray, productName} = props

    const droppableId = Array.from(productName).reduce((id, el, index) => {
        if (el === el.toUpperCase()) return `${id}-${el.toLowerCase()}`
        return id + el
    }, "available")

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
                </div>
            )}

        </Droppable>

    )
}