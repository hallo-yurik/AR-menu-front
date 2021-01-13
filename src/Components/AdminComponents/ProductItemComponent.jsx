import React from "react";

export const ProductItemComponent = (props) => {
    const {groupName, productInfo} = props;
    const isPotential = true;

    return (
        <div>{productInfo.name}</div>
    )
}