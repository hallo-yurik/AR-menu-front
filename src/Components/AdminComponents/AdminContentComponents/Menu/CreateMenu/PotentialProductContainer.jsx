import React, {useEffect, useState} from 'react'
import {SingleProductCard} from "./SingleProductCard";

export const PotentialProductContainer = (props) => {

    const {productArray} = props

    return (
        <div>
            {productArray.map((el, index) => {
                return (
                    <SingleProductCard key={el._id} index={index} info={el}/>
                )
            })}
        </div>
    )
}