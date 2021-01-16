import React, {useEffect, useCallback, useState} from 'react'
// import {Transfer} from "antd";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import {
    alcoholSelector,
    dessertsSelector,
    hotDrinksSelector
} from "../../../../Redux/Reducers/AdminReducer/AdminSelectors/MainAdminSelectors";
import {initAllProducts} from "../../../../Redux/Reducers/AdminReducer/AdminReducer";

export const CreateMenuComponent = (props) => {


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initAllProducts())
    }, [dispatch])

    const dessertsArray = useSelector(dessertsSelector);
    const hotDrinksArray = useSelector(hotDrinksSelector);
    const alcoholArray = useSelector(alcoholSelector);

    const [desserts, setDesserts] = useState(dessertsArray)

    const onDragEnd = (result, desserts, setDesserts) => {

        console.log(result)
        if (!result.destination) return;
        // const {source, destination} = result;
        // const dessert = desserts[source.droppableId];
        // const copiedItems = [...dessert]
        // const [removed] = copiedItems.splice(source.index, 1)
        // copiedItems.splice(destination.index, 0, removed)
        // setDesserts({
        //     ...copiedItems,
        //     [source.droppableId]: {
        //         ...desserts
        //     }
        // })
    }

    console.log(dessertsArray)

    return (
        <DragDropContext onDragEnd={result => onDragEnd(result, desserts, setDesserts)}>
            <Droppable droppableId={"potential-desserts"}>
                {(provided, snapshot) => {
                    return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                                background: snapshot.isDraggingOver ? "#FF0000" : "#0000ff",
                                padding: 4,
                                width: 250,
                                height: "100%"
                            }}
                        >
                            {dessertsArray.map((item, index) => {
                                return (
                                    <Draggable key={item._id} draggableId={item._id} index={index}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        userSelect: "none",
                                                        padding: 16,
                                                        margin: "8px 0",
                                                        minHeight: 50,
                                                        backgroundColor: snapshot.isDragging ? "lightblue" : "lightcoral",
                                                        color: "#FFF",
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                    {item.name}

                                                </div>
                                            )
                                        }}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )
                }}

            </Droppable>

        </DragDropContext>
    )
}