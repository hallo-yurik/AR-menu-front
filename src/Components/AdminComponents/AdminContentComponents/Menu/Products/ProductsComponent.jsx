import React, {useEffect, useState} from 'react'


import {Button, Checkbox, Modal, Select} from "antd";
import {PlusOutlined, SaveOutlined} from "@ant-design/icons";
import {adminFormsActions} from "../../../../../Redux/Reducers/AdminReducer/AdminFormsReducer";
import {CreateMenuModalComponent} from "../Modals/CreateMenuModalComponent";
import {useDispatch, useSelector} from "react-redux";
import {currentProductSelector} from "../../../../../Redux/Reducers/AdminReducer/AdminSelectors/AdminProductsSelectors";
import {adminProductsActions} from "../../../../../Redux/Reducers/AdminReducer/AdminProductsReducer";
import {ProductTableManager} from "./ProductTableManager";
import {AddCurrentProductModalManager} from "../CreateMenu/AddCurrentProductModalManager";

export const ProductsComponent = (props) => {

    const dispatch = useDispatch()

    const currentProduct = useSelector(currentProductSelector) //Desserts, HotDrinks, Alcohol

    const [createProductModalVisible, setCreateProductModalVisible] = useState(false)
    const [addCurrentProduct, setAddCurrentProduct] = useState("")

    useEffect(() => {

        switch (currentProduct) {

            case "Desserts":
                // setCurrentProductArray(availableDessertsArray)
                setAddCurrentProduct("dessert")
                // setCurrentDropdownKey("1")
                break
            case "HotDrinks":
                // setCurrentProductArray(availableHotDrinksArray)
                setAddCurrentProduct("hot drink")
                // setCurrentDropdownKey("2")
                break
            case "Alcohol":
                // setCurrentProductArray(availableAlcoholArray)
                setAddCurrentProduct("alcohol")
                // setCurrentDropdownKey("3")
                break
            default:
                // setCurrentProductArray([])
                break
        }

    }, [addCurrentProduct,
        currentProduct])

    const onProductChange = (product) => {
        dispatch(adminProductsActions.setCurrentProduct(product))
    }

    const openCreateProductModal = () => {
        setCreateProductModalVisible(true)
    }

    const closeCreateProductModal = () => {
        setCreateProductModalVisible(false)
    }

    return (
        <>
            <Select value={currentProduct} style={{width: 120, margin: "10px 0"}}
                    onChange={onProductChange}>
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

            <ProductTableManager currentProduct={currentProduct}/>

        </>

    )
}