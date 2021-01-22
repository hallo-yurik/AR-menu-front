import React, {useEffect, useState} from 'react'
import {SingleProductCard} from "./SingleProductCard";

export const AvailableProductsContainer = (props) => {

    const {productArray, productName} = props

    return (
        <div>
            {productArray.map((el, index) => {
                return (
                    <SingleProductCard key={el._id} index={index} info={el}/>
                    // <div key={el._id}>
                    //     {el.name}
                    // </div>
                )
            })}
        </div>
    )
}