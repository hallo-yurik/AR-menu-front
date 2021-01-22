import React, {useEffect, useState} from 'react'

export const SingleProductCard = (props) => {

    const {index, info} = props;

    return(
        <div>
            {info.name}
        </div>
    )
}