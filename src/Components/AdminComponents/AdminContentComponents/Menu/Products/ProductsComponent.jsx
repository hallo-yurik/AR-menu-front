import {Button, Checkbox, Modal, Select} from "antd";
import {SaveOutlined} from "@ant-design/icons";
import {adminFormsActions} from "../../../../../Redux/Reducers/AdminReducer/AdminFormsReducer";
import {CreateMenuModalComponent} from "../Modals/CreateMenuModalComponent";
import {useDispatch, useSelector} from "react-redux";
import {currentProductSelector} from "../../../../../Redux/Reducers/AdminReducer/AdminSelectors/AdminProductsSelectors";
import {adminProductsActions} from "../../../../../Redux/Reducers/AdminReducer/AdminProductsReducer";
import {ProductTableManager} from "./ProductTableManager";

export const ProductsComponent = (props) => {

    const dispatch = useDispatch()

    const currentProduct = useSelector(currentProductSelector) //Desserts, HotDrinks, Alcohol

    const onProductChange = (product) => {
        dispatch(adminProductsActions.setCurrentProduct(product))
    }


    return (
        <>
            <Select value={currentProduct} style={{width: 120, margin: "10px 0"}}
                    onChange={onProductChange}>
                <Select.Option value="Desserts">Desserts</Select.Option>
                <Select.Option value="HotDrinks">Hot drinks</Select.Option>
                <Select.Option value="Alcohol">Alcohol</Select.Option>
            </Select>

            <ProductTableManager currentProduct={currentProduct}/>

        </>

    )
}