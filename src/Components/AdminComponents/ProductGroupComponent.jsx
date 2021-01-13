import React from 'react'
import {ProductItemComponent} from "./ProductItemComponent";

export const ProductGroupComponent = (props) => {
    const {groupName, productArray} = props;

    const potentialProducts = productArray.map((product) => {
        return <ProductItemComponent groupName={groupName} productInfo={product}/>

    })

    return (
        <div>
            {potentialProducts}
        </div>
    )

}