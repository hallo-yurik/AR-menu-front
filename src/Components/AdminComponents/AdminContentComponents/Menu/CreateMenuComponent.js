import React, {useEffect, useState} from 'react'
import {DragDropContext, Droppable} from "react-beautiful-dnd";
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

import {Col, Row, Collapse, Button, Checkbox, Select, Modal} from 'antd';
import "../../../Styles/CreateMenuComponentStyle.css"
import {AvailableProductsContainer} from "./AvailableProductContainer";
import {PotentialProductContainer} from "./PotentialProductContainer";
import {
    adminFormsActions,
    createMenuThunk
} from "../../../../Redux/Reducers/AdminReducer/AdminFormsReducer";
import {
    isCurrentMenuSelector,
    isMenuSendingSelector, validateMenuErrors
} from "../../../../Redux/Reducers/AdminReducer/AdminSelectors/AdminFormsSelectors";
import {CreateMenuModalComponent} from "./Modals/CreateMenuModalComponent";
import {CreateDessertModal} from "./Modals/CreateDessertModal";
import {AddCurrentProductModalManager} from "./AddCurrentProductModalManager";

const {Panel} = Collapse;

const validateMenuCreation = (dessertsArray, hotDrinkArray, alcoholArray) => {
    const errors = []

    if (dessertsArray instanceof Array && !dessertsArray.length) errors.push("there should be at least one dessert")
    if (hotDrinkArray instanceof Array && !hotDrinkArray.length) errors.push("there should be at least one hot drink")
    if (alcoholArray instanceof Array && !alcoholArray.length) errors.push("there should be at least one alcohol")

    return errors
}

export const CreateMenuComponent = React.memo((props) => {

    const [isDragging, setDragging] = useState(false)
    const [currentProductArray, setCurrentProductArray] = useState([])
    const [addCurrentProduct, setAddCurrentProduct] = useState("")
    const [currentDropdownKey, setCurrentDropdownKey] = useState(-1)
    const [currentDraggable, setCurrentDraggable] = useState(null)
    // const [currentModal, setCurrentModal] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)


    const [createProductModalVisible, setCreateProductModalVisible] = useState(false)

    const [modal, contextHolder] = Modal.useModal();

    const availableDessertsArray = useSelector(availableDessertsSelector);
    const availableHotDrinksArray = useSelector(availableHotDrinksSelector);
    const availableAlcoholArray = useSelector(availableAlcoholSelector);

    const potentialDessertsArray = useSelector(potentialDessertsSelector);
    const potentialHotDrinksArray = useSelector(potentialHotDrinksSelector);
    const potentialAlcoholArray = useSelector(potentialAlcoholSelector);

    const isPotentialColumn = useSelector(isPotentialColumnSelector);

    const potentialDropsAreOpenKeysArray = useSelector(potentialDropsOpenKeys);
    const currentProduct = useSelector(currentProductSelector); //Desserts, HotDrinks, Alcohol

    const isCurrentMenu = useSelector(isCurrentMenuSelector);
    const isSendingMenu = useSelector(isMenuSendingSelector);
    const validateMenuErrorsArray = useSelector(validateMenuErrors);

    const dispatch = useDispatch()
    // const modalRef = useRef(null)

    useEffect(() => {
        dispatch(initAllProducts())

        // setTimeout(() => {
        //     dispatch(adminFormsActions.setIsCurrentMenu(!isCurrentMenu))
        // }, 10000)

        return dispatch(adminActions.refreshMenuCreator())

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

    }, [currentProductArray,
        addCurrentProduct,
        currentDropdownKey,
        availableDessertsArray,
        availableHotDrinksArray,
        availableAlcoholArray,
        currentProduct])

    useEffect(() => {
        if (validateMenuErrorsArray.length === 0) {
            setModalVisible(false);
        } else {

            const modalElement = document.getElementsByClassName("ant-modal-wrap ant-modal-centered")[0]
            modalElement.scrollTo({top: 0, behavior: "smooth"})

        }
    }, [dispatch, validateMenuErrorsArray])

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

    const onCheckboxChange = event => dispatch(adminFormsActions.setIsCurrentMenu(event.target.checked))

    const postMenu = () => {

        const dessertsIdsArray = potentialDessertsArray.map((el) => el._id)
        const hotDrinksIdsArray = potentialHotDrinksArray.map((el) => el._id)
        const alcoholIdsArray = potentialAlcoholArray.map((el) => el._id)

        dispatch(createMenuThunk(dessertsIdsArray, hotDrinksIdsArray, alcoholIdsArray, isCurrentMenu))

    }

    const onSaveButton = () => {

        const dessertsIdsArray = potentialDessertsArray.map((el) => el._id)
        const hotDrinksIdsArray = potentialHotDrinksArray.map((el) => el._id)
        const alcoholIdsArray = potentialAlcoholArray.map((el) => el._id)

        const errors = validateMenuCreation(dessertsIdsArray, hotDrinksIdsArray, alcoholIdsArray)

        if (errors.length) {
            modal.error({
                title: 'Empty section',
                content: (
                    errors.map((error) => (<div>{error}</div>))
                ),
                centered: true
            })

        } else {
            setModalVisible(true);
        }
    }

    // const createNewProduct = () => {
    //
    // }

    const openCreateProductModal = () => {
        setCreateProductModalVisible(true)
    }

    const closeCreateProductModal = () => {
        setCreateProductModalVisible(false)
    }

    return (


        <DragDropContext
            onDragEnd={(result) => onDragEnd(result, currentProduct)}
            onBeforeCapture={onBeforeCapture}
        >
            <Row gutter={[16, 0]}>

                <Col span={12} align={"right"}>

                    <div style={{margin: "10px 0"}}>
                        <Checkbox style={{margin: "0 10px"}} onChange={onCheckboxChange}>
                            Current menu
                        </Checkbox>

                        <Button icon={<SaveOutlined/>} type={"primary"}
                                onClick={onSaveButton}>
                            Save menu
                        </Button>
                        <Modal visible={modalVisible}
                               title={`New menu${isCurrentMenu ? " (current)" : ""}`}
                               centered={true}
                               width={"50%"}
                               onOk={postMenu}
                               onCancel={() => {
                                   dispatch(adminFormsActions.clearErrors())
                                   setModalVisible(false)
                               }}
                               confirmLoading={isSendingMenu}
                               closable={false}
                               maskClosable={false}
                            // ref={modalRef}
                        >
                            <CreateMenuModalComponent potentialDessertsArray={potentialDessertsArray}
                                                      potentialHotDrinksArray={potentialHotDrinksArray}
                                                      potentialAlcoholArray={potentialAlcoholArray}
                                                      errors={validateMenuErrorsArray}
                            />
                        </Modal>
                        {contextHolder}
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
                        <Button icon={<PlusOutlined/>} type={"primary"} onClick={openCreateProductModal}>
                            Add {addCurrentProduct}
                        </Button>

                        <AddCurrentProductModalManager
                            product={currentProduct}
                            isVisible={createProductModalVisible}
                            onCancel={closeCreateProductModal}/>

                        {/*<CreateDessertModal isVisible={createMenuModalVisible} onClose={setCreateMenuModalVisible}/>*/}
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