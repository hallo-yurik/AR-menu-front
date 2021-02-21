import React, {useEffect} from 'react'
import {Button, Divider, Form, Image, Input, InputNumber, List, Modal, Typography, Upload} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import {
    isAlcoholSendingSelector,
    isDessertSendingSelector,
    isHotDrinkSendingSelector, validateAlcoholErrors, validateDessertErrors, validateHotDrinkErrors
} from "../../../../../Redux/Reducers/AdminReducer/AdminSelectors/AdminFormsSelectors";
import {
    adminFormsActions, postAlcoholThunk,
    postDessertThunk,
    postHotDrinkThunk
} from "../../../../../Redux/Reducers/AdminReducer/AdminFormsReducer";
import {patchAlcoholThunk} from "../../../../../Redux/Reducers/AdminReducer/AdminProductsReducer";

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 20, offset: 4},
    },
};

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 4},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
    },
};

export const CreateAlcoholModal = (props) => {

    const {alcoholData, isVisible, closeModal, clearForm} = props

    const [form] = Form.useForm();
    const isSendingAlcohol = useSelector(isAlcoholSendingSelector);
    const alcoholErrors = useSelector(validateAlcoholErrors);

    // console.log(isSendingAlcohol)

    // const isSendingHotDrink = false; //selector
    const dispatch = useDispatch()

    useEffect(() => {

        // console.log(clearForm)
        if (clearForm) {
            form.resetFields()
        }
    }, [clearForm, form])

    useEffect(() => {
        if (!isVisible) {
            form.resetFields()
        }

    }, [form, isVisible])

    const onFormSubmit = async () => {

        try {
            const result = await form.validateFields()
            let isSuccessful;
            if (alcoholData) {
                isSuccessful = await dispatch(patchAlcoholThunk(alcoholData.id, result))

            } else {
                isSuccessful = await dispatch(postAlcoholThunk(result))
            }

            if (isSuccessful) {
                dispatch(adminFormsActions.clearErrors())
                form.resetFields()
                closeModal()
            }

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <Modal
                visible={isVisible}
                title={alcoholData ? alcoholData.name : "New alcohol"}
                centered={true}
                width={"50%"}
                onOk={onFormSubmit}
                onCancel={() => {

                    dispatch(adminFormsActions.clearErrors())
                    closeModal()
                }}
                confirmLoading={isSendingAlcohol}
                closable
                maskClosable
                getContainer={false}
                forceRender
            >

                {alcoholErrors.length !== 0 && alcoholErrors.length !== null
                    ? <List.Item>
                        <List.Item.Meta
                            title={<Divider><Typography.Text type="danger">
                                {alcoholData ? "Alcohol can't be changed" : "Alcohol can't be created"}
                            </Typography.Text></Divider>}
                            description={
                                alcoholErrors.map((error) => <div>
                                    <Typography.Text type="danger" strong={true}>{error}</Typography.Text>
                                </div>)
                            }
                        />
                    </List.Item>
                    : null
                }

                <Form form={form} name="alcohol" {...formItemLayoutWithOutLabel} preserve={false}>
                    <Form.Item name="name"
                               label="Name"
                               rules={[{required: true, whitespace: true, message: "Please input alcohol's name."}]}
                               initialValue={alcoholData ? alcoholData.name : ""}
                               colon={false}
                               validateTrigger={['onChange', 'onBlur']}
                               {...formItemLayout}
                    >
                        <Input placeholder="alcohol's name"/>
                    </Form.Item>

                    <Form.Item name="volume"
                               label="Volume"
                               rules={[{required: true, message: "Please input alcohol's volume."}]}
                               initialValue={alcoholData ? alcoholData.volume : 1}
                               colon={false}

                               validateTrigger={['onChange', 'onBlur']}
                               {...formItemLayout}>
                        <InputNumber min={1}/>
                    </Form.Item>

                    <Form.Item name="price"
                               label="Price"
                               rules={[{required: true, message: "Please input alcohol's price."}]}
                               initialValue={alcoholData ? alcoholData.price : 1}
                               colon={false}

                               validateTrigger={['onChange', 'onBlur']}
                               {...formItemLayout}>
                        <InputNumber min={1}/>
                    </Form.Item>

                </Form>

            </Modal>
        </>
    )
}