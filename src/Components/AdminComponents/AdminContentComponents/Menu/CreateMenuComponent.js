import React, {useEffect, useCallback, useState} from 'react'
// import {Transfer} from "antd";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import {
    alcoholSelector, currentProductSelector,
    dessertsSelector,
    hotDrinksSelector
} from "../../../../Redux/Reducers/AdminReducer/AdminSelectors/MainAdminSelectors";
import {adminActions, initAllProducts} from "../../../../Redux/Reducers/AdminReducer/AdminReducer";

import {
    SaveOutlined,
    PlusOutlined
} from '@ant-design/icons';

import {Col, Row, Collapse, Button, Checkbox, Space, Dropdown, Menu, Select, Card} from 'antd';
import Meta from "antd/es/card/Meta";
import "../../../Styles/CreateMenuComponentStyle.css"
import {AvailableProductsContainer} from "./AvailableProductContainer";


const {Panel} = Collapse;

// function callback(key) {
//     console.log(key);
// }

// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;


export const CreateMenuComponent = (props) => {


    const dessertsArray = useSelector(dessertsSelector);
    const hotDrinksArray = useSelector(hotDrinksSelector);
    const alcoholArray = useSelector(alcoholSelector);

    const currentProduct = useSelector(currentProductSelector);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initAllProducts())
    }, [dispatch, currentProduct])

    const onSelectChange = (value, option) => {
        dispatch(adminActions.changeCurrentProduct(value))
    }

    // console.log(dessertsArray, hotDrinksArray, alcoholArray, currentProduct)
    let currentProductArray;
    let addCurrentProduct;

    switch (currentProduct) {
        case "Desserts":
            currentProductArray = dessertsArray
            addCurrentProduct = "dessert"
            break
        case "HotDrinks":
            currentProductArray = hotDrinksArray
            addCurrentProduct = "hot drink"
            break
        case "Alcohol":
            currentProductArray = alcoholArray
            addCurrentProduct = "alcohol"
            break
        default:
            currentProductArray = []
            break
    }

    // console.log(currentProductArray)


    //
    //
    // const [desserts, setDesserts] = useState(dessertsArray)

    // console.log(11)

    // const onDragEnd = (result, desserts, setDesserts) => {
    //
    //     console.log(result)
    //     if (!result.destination) return;
    //     // const {source, destination} = result;
    //     // const dessert = desserts[source.droppableId];
    //     // const copiedItems = [...dessert]
    //     // const [removed] = copiedItems.splice(source.index, 1)
    //     // copiedItems.splice(destination.index, 0, removed)
    //     // setDesserts({
    //     //     ...copiedItems,
    //     //     [source.droppableId]: {
    //     //         ...desserts
    //     //     }
    //     // })
    // }

    // console.log(dessertsArray)

    return (

        <DragDropContext onDragEnd={(result) => {
            //TODO
        }}>
            <Row gutter={[16, 0]}>
                <Col span={12} align={"right"}>

                    <div style={{margin: "10px 0"}}>
                        <Checkbox style={{margin: "0 10px"}} onChange={() => {
                            //TODO
                        }}>
                            Current menu
                        </Checkbox>
                        <Button icon={<SaveOutlined/>} type={"primary"}>
                            Save menu
                        </Button>
                    </div>

                    <div>
                        <Collapse onChange={() => {
                            //TODO
                        }}>
                            <Panel header="Desserts" key="1">
                                <Droppable droppableId={"potential-desserts"}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}> desserts {provided.placeholder}</div>
                                        )
                                    }}
                                </Droppable>
                            </Panel>
                            <Panel header="Hot drinks" key="2">
                                <Droppable droppableId={"potential-hot-drinks"}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}> hot drinks {provided.placeholder}</div>
                                        )
                                    }}
                                </Droppable>
                            </Panel>
                            <Panel header="Alcohol" key="3">
                                <Droppable droppableId={"potential-alcohol"}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}> alcohol {provided.placeholder}</div>
                                        )
                                    }}
                                </Droppable>
                            </Panel>
                        </Collapse>
                    </div>
                </Col>
                <Col span={12} align={"right"}>
                    <div style={{margin: "10px 0"}}>
                        <Select defaultValue="Desserts" style={{width: 120, margin: "0 10px"}}
                                onChange={onSelectChange}>
                            <Select.Option value="Desserts">Desserts</Select.Option>
                            <Select.Option value="HotDrinks">Hot drinks</Select.Option>
                            <Select.Option value="Alcohol">Alcohol</Select.Option>
                        </Select>
                        <Button icon={<PlusOutlined/>} type={"primary"}>
                            Add {addCurrentProduct}
                        </Button>
                    </div>
                    <AvailableProductsContainer productArray={currentProductArray} productName={currentProduct}/>
                </Col>
            </Row>
        </DragDropContext>



        // <DragDropContext onDragEnd={result => onDragEnd(result, desserts, setDesserts)}>
        //     <Droppable droppableId={"potential-desserts"}>
        //         {(provided, snapshot) => {
        //             return (
        //                 <div
        //                     {...provided.droppableProps}
        //                     ref={provided.innerRef}
        //                     style={{
        //                         background: snapshot.isDraggingOver ? "#FF0000" : "#0000ff",
        //                         padding: 4,
        //                         width: 250,
        //                         // height: "100%"
        //                     }}
        //                 >
        //                     {/*{dessertsArray.map((item, index) => {*/}
        //                     {/*    return (*/}
        //                     {/*        <Draggable key={item._id} draggableId={item._id} index={index}>*/}
        //                     {/*            {(provided, snapshot) => {*/}
        //                     {/*                return (*/}
        //                     {/*                    <div*/}
        //                     {/*                        ref={provided.innerRef}*/}
        //                     {/*                        {...provided.draggableProps}*/}
        //                     {/*                        {...provided.dragHandleProps}*/}
        //                     {/*                        style={{*/}
        //                     {/*                            userSelect: "none",*/}
        //                     {/*                            padding: 16,*/}
        //                     {/*                            margin: "8px 0",*/}
        //                     {/*                            minHeight: 50,*/}
        //                     {/*                            backgroundColor: snapshot.isDragging ? "lightblue" : "lightcoral",*/}
        //                     {/*                            color: "#FFF",*/}
        //                     {/*                            ...provided.draggableProps.style*/}
        //                     {/*                        }}*/}
        //                     {/*                    >*/}
        //                     {/*                        {item.name}*/}
        //
        //                     {/*                    </div>*/}
        //                     {/*                )*/}
        //                     {/*            }}*/}
        //                     {/*        </Draggable>*/}
        //                     {/*    )*/}
        //                     {/*})}*/}
        //                     {provided.placeholder}
        //                 </div>
        //             )
        //         }}
        //
        //     </Droppable>
        //
        // </DragDropContext>
    )
}