import React, {useEffect, useState} from 'react'
import {Modal} from "antd";
import {adminFormsActions} from "../../../../Redux/Reducers/AdminReducer/AdminFormsReducer";
import {CreateDessertModal} from "./Modals/CreateDessertModal";
import {useSelector} from "react-redux";
import {
    validateAlcoholErrors,
    validateDessertErrors,
    validateHotDrinkErrors
} from "../../../../Redux/Reducers/AdminReducer/AdminSelectors/AdminFormsSelectors";
import {CreateHotDrinkModal} from "./Modals/CreateHotDrinkModal";
import {CreateAlcoholModal} from "./Modals/CreateAlcoholModal";

export const AddCurrentProductModalManager = (props) => {

    const {product, isVisible, onCancel} = props

    const [modal, contextHolder] = Modal.useModal();
    const [clearForm, setClearForm] = useState(false);

    const dessertErrors = useSelector(validateDessertErrors);
    const hotDrinksErrors = useSelector(validateHotDrinkErrors);
    const alcoholErrors = useSelector(validateAlcoholErrors);

    useEffect(() => {

        if (product === "Desserts") {

            if (dessertErrors.length === 0 && isVisible) {
                setClearForm(true)
                onCancel()
                setClearForm(false)
            }
        }

        if (product === "HotDrinks" && isVisible) {
            if (hotDrinksErrors.length === 0 && isVisible) {
                setClearForm(true)
                onCancel()
                setClearForm(false)
            }
        }

        if (product === "Alcohol" && isVisible) {
            if (alcoholErrors.length === 0 && isVisible) {
                setClearForm(true)
                onCancel()
                setClearForm(false)
            }
        }




        // if (dessertErrors.length === 0) {
        //     closeModal()
        // } else {
        //     const modalElement = document.getElementsByClassName("ant-modal-wrap ant-modal-centered")[0]
        //     modalElement.scrollTo({top: 0, behavior: "smooth"})
        //
        // }
    }, [dessertErrors, hotDrinksErrors, alcoholErrors, product])



    if (product === "Desserts") {
        return (
            <CreateDessertModal
                isVisible={isVisible}
                closeModal={onCancel}
                clearForm={clearForm}
            />
        )
    }

    if (product === "HotDrinks") {
        return (
            <CreateHotDrinkModal
                isVisible={isVisible}
                closeModal={onCancel}
                clearForm={clearForm}
            />
        )
    }

    if (product === "Alcohol") {
        return (
            <CreateAlcoholModal
                isVisible={isVisible}
                closeModal={onCancel}
                clearForm={clearForm}
            />
        )
    }


    if (isVisible) {
        modal.error({
            title: 'Something went wrong',
            centered: true
        })
    }


    return (
        <>
            {contextHolder}
        </>
    )
}