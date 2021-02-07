import React, {useEffect, useCallback, useState} from 'react'
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import {
    availableAlcoholSelector,
    availableDessertsSelector,
    availableHotDrinksSelector,
    currentProductSelector, isPotentialColumnSelector,
    potentialAlcoholSelector,
    potentialDessertsSelector,
    potentialDropsOpenKeys,
    potentialHotDrinksSelector
} from "../../../../Redux/Reducers/AdminReducer/AdminSelectors/MainAdminSelectors";
import {adminActions, initAllProducts} from "../../../../Redux/Reducers/AdminReducer/AdminReducer";

import {
    SaveOutlined,
    PlusOutlined
} from '@ant-design/icons';

import {Col, Row, Collapse, Button, Checkbox, Select} from 'antd';
import "../../../Styles/CreateMenuComponentStyle.css"
import {AvailableProductsContainer} from "./AvailableProductContainer";
import {PotentialProductContainer} from "./PotentialProductContainer";

const {Panel} = Collapse;

export const CreateMenuComponent = React.memo((props) => {

    const [isDragging, setDragging] = useState(false)
    const [currentProductArray, setCurrentProductArray] = useState([])
    const [addCurrentProduct, setAddCurrentProduct] = useState("")
    const [currentDropdownKey, setCurrentDropdownKey] = useState(-1)
    const [currentDraggable, setCurrentDraggable] = useState(null)

    const availableDessertsArray = useSelector(availableDessertsSelector);
    const availableHotDrinksArray = useSelector(availableHotDrinksSelector);
    const availableAlcoholArray = useSelector(availableAlcoholSelector);

    const potentialDessertsArray = useSelector(potentialDessertsSelector);
    const potentialHotDrinksArray = useSelector(potentialHotDrinksSelector);
    const potentialAlcoholArray = useSelector(potentialAlcoholSelector);

    const isPotentialColumn = useSelector(isPotentialColumnSelector);

    const potentialDropsAreOpenKeysArray = useSelector(potentialDropsOpenKeys);
    const currentProduct = useSelector(currentProductSelector); //Desserts, HotDrinks, Alcohol

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initAllProducts())
    }, [dispatch])

    useEffect(() => {

        switch (currentProduct) {
            case "Desserts":
                setCurrentProductArray(availableDessertsArray)
                setAddCurrentProduct("dessert")
                setCurrentDropdownKey("1")
                break
            case "HotDrinks":
                setCurrentProductArray(availableHotDrinksArray)
                setAddCurrentProduct("hot drink")
                setCurrentDropdownKey("2")
                break
            case "Alcohol":
                setCurrentProductArray(availableAlcoholArray)
                setAddCurrentProduct("alcohol")
                setCurrentDropdownKey("3")
                break
            default:
                setCurrentProductArray([])
                break
        }

        // console.log(9999)

    }, [currentProductArray,
        addCurrentProduct,
        currentDropdownKey,
        availableDessertsArray,
        availableHotDrinksArray,
        availableAlcoholArray,
        currentProduct])

    const onSelectChange = (value, option) => {
        dispatch(adminActions.changeCurrentProduct(value))
    }

    const onBeforeCapture = (result) => {
        dispatch(adminActions.isPotentialColumn(result.draggableId))
        setCurrentDraggable(result.draggableId)
        setDragging(true)
    }

    const onDragEnd = (result, currentProduct) => {
        const {destination, source, draggableId} = result;
        setDragging(false)
        setCurrentDraggable(null)

        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        if (destination.droppableId === source.droppableId) {
            if (destination.droppableId.includes("available")) {

                let productName; //Desserts, HotDrinks, Alcohol
                if (destination.droppableId.includes("desserts")) {
                    productName = "Desserts";
                } else if (destination.droppableId.includes("hot-drinks")) {
                    productName = "HotDrinks";
                } else if (destination.droppableId.includes("alcohol")) {
                    productName = "Alcohol";
                }

                dispatch(adminActions.updateList("available", productName, result.source.index, result.destination.index, result.draggableId))

            }

            if (destination.droppableId.includes("potential")) {

                let productName; //Desserts, HotDrinks, Alcohol
                if (destination.droppableId.includes("desserts")) {
                    productName = "Desserts";
                } else if (destination.droppableId.includes("hot-drinks")) {
                    productName = "HotDrinks";
                } else if (destination.droppableId.includes("alcohol")) {
                    productName = "Alcohol";
                }

                dispatch(adminActions.updateList("potential", productName, result.source.index, result.destination.index, result.draggableId))
            }
        }

        if (destination.droppableId !== source.droppableId) {

            if (destination.droppableId.includes("potential")) {

                if (source.droppableId.includes("potential")) {
                    return
                }

                switch (currentProduct) { //Desserts, HotDrinks, Alcohol
                    case "Desserts":
                        dispatch(adminActions.setDessert(source.index, destination.index));
                        break;

                    case "HotDrinks":
                        dispatch(adminActions.setHotDrink(source.index, destination.index));
                        break;

                    case "Alcohol":
                        dispatch(adminActions.setAlcohol(source.index, destination.index));
                        break;

                    default:
                        console.log("????")
                        break;
                }


            } else {
                switch (currentProduct) { //Desserts, HotDrinks, Alcohol
                    case "Desserts":
                        dispatch(adminActions.removeDessert(source.index, destination.index))
                        break;

                    case "HotDrinks":
                        dispatch(adminActions.removeHotDrink(source.index, destination.index))
                        break;

                    case "Alcohol":
                        dispatch(adminActions.removeAlcohol(source.index, destination.index))
                        break;

                    default:
                        console.log("????")
                        break;
                }
            }

        }
    }

    const onDropdownChange = (keys) => {
        dispatch(adminActions.changePotentialDropsOpen(keys))
    }

    const activeDropdowns = () => {
        if (isDragging && !isPotentialColumn) return [currentDropdownKey]
        return potentialDropsAreOpenKeysArray
    }

    return (

        <DragDropContext
            onDragEnd={(result) => onDragEnd(result, currentProduct)}
            onBeforeCapture={onBeforeCapture}
        >
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
                        <Collapse onChange={onDropdownChange} activeKey={activeDropdowns()}>
                            <Panel header="Desserts" key="1">
                                <Droppable droppableId={"potential-desserts"}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}>
                                                <PotentialProductContainer
                                                    productArray={potentialDessertsArray}
                                                    currentDraggable={currentDraggable}
                                                />
                                                {provided.placeholder}
                                            </div>
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
                                                ref={provided.innerRef}>


                                                <PotentialProductContainer
                                                    productArray={potentialHotDrinksArray}
                                                    currentDraggable={currentDraggable}
                                                />
                                                {provided.placeholder}
                                            </div>
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
                                                ref={provided.innerRef}>
                                                <PotentialProductContainer
                                                    productArray={potentialAlcoholArray}
                                                    currentDraggable={currentDraggable}
                                                />
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </Panel>
                        </Collapse>
                    </div>
                </Col>
                <Col span={12} align={"right"}>
                    <div style={{margin: "10px 0"}}>
                        <Select value={currentProduct} style={{width: 120, margin: "0 10px"}}
                                onChange={onSelectChange}>
                            <Select.Option value="Desserts">Desserts</Select.Option>
                            <Select.Option value="HotDrinks">Hot drinks</Select.Option>
                            <Select.Option value="Alcohol">Alcohol</Select.Option>
                        </Select>
                        <Button icon={<PlusOutlined/>} type={"primary"}>
                            Add {addCurrentProduct}
                        </Button>
                    </div>
                    <AvailableProductsContainer
                        productArray={currentProductArray}
                        productName={currentProduct}
                        currentDraggable={currentDraggable}/>
                </Col>
            </Row>
        </DragDropContext>
    )
})