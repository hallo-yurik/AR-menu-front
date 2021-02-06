import React, {useEffect, useState} from 'react'
import {Card} from "antd";
import {
    PauseOutlined
} from '@ant-design/icons';
import {Draggable} from "react-beautiful-dnd";

export const SingleProductCard = (props) => {

    const {index, info, currentDroppable} = props;

    return (
        <Draggable draggableId={info._id} index={index}>
            {(provided, snapshot) => (
                // {currentDroppable(snapshot.draggingOver)}
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}

                >
                    {currentDroppable(snapshot.draggingOver)}
                    <Card style={{width: "100%", marginBottom: 5}}>
                        <Card.Meta
                            avatar={<PauseOutlined rotate={90} {...provided.dragHandleProps}/>}
                            title={info.name}
                        />

                    </Card>
                </div>
            )}
        </Draggable>

    )
}