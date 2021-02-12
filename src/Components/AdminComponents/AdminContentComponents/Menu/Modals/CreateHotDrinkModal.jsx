import React from 'react'
import {Modal} from "antd";
import {useDispatch} from "react-redux";

export const CreateHotDrinkModal = (props) => {

    const {isVisible, onClose, hotDrinkData} = props

    const isSendingHotDrink = false; //selector

    const dispatch = useDispatch()

    return (
        <>
            <Modal
                visible={isVisible}
                title={hotDrinkData ? "New hot drink" : hotDrinkData.name}
                centered={true}
                width={"50%"}
                // onOk={postMenu}
                onCancel={onClose}
                confirmLoading={isSendingHotDrink}
                closable
                maskClosable
            >

            </Modal>
        </>
    )
}