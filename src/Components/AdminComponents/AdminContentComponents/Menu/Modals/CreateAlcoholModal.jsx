import React from 'react'
import {Modal} from "antd";
import {useDispatch} from "react-redux";

export const CreateAlcoholModal = (props) => {

    const {isVisible, onClose, alcoholData} = props

    const isSendingHotAlcohol = false; //selector

    const dispatch = useDispatch()

    return (
        <>
            <Modal
                visible={isVisible}
                title={alcoholData ? "New alcohol" : alcoholData.name}
                centered={true}
                width={"50%"}
                // onOk={postMenu}
                onCancel={onClose}
                confirmLoading={isSendingHotAlcohol}
                closable
                maskClosable
            >

            </Modal>
        </>
    )
}