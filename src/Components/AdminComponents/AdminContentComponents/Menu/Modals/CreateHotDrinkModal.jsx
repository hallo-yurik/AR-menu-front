import React, {useEffect} from 'react'
import {Button, Divider, Form, Image, Input, InputNumber, List, Modal, Typography, Upload} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import {
    isDessertSendingSelector,
    isHotDrinkSendingSelector, validateDessertErrors, validateHotDrinkErrors
} from "../../../../../Redux/Reducers/AdminReducer/AdminSelectors/AdminFormsSelectors";
import {
    adminFormsActions,
    postDessertThunk,
    postHotDrinkThunk
} from "../../../../../Redux/Reducers/AdminReducer/AdminFormsReducer";

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

export const CreateHotDrinkModal = (props) => {

    const {isVisible, closeModal, hotDrinkData, clearForm} = props //TODO

    const isSendingHotDrink = useSelector(isHotDrinkSendingSelector);
    const hotDrinkErrors = useSelector(validateHotDrinkErrors);
    const [form] = Form.useForm();

    // const isSendingHotDrink = false; //selector
    const dispatch = useDispatch()

    useEffect(() => {
        if (clearForm) {
            form.resetFields()
        }
    }, [clearForm, form])

    useEffect(() => {
        if (!isVisible) {
            form.resetFields()
        }

    }, [form, isVisible])

    // useEffect(() => {
    //     return () => {
    //         dispatch(adminFormsActions.clearErrors())
    //     }
    // }, [dispatch])

    const onFormSubmit = async () => {

        try {
            const result = await form.validateFields()

            // console.log(result)
            dispatch(postHotDrinkThunk(result))
            // await combineFormData(result, dessertImage[0], dessertModel[0])


        } catch (err) {
            console.log(err)
        }
        // form.resetFields()

        // result
    }

    // return (
    //     <>
    //         <Modal
    //             visible={isVisible}
    //             title={hotDrinkData ? "New hot drink" : hotDrinkData.name}
    //             centered={true}
    //             width={"50%"}
    //             // onOk={postMenu}
    //             onCancel={onClose}
    //             confirmLoading={isSendingHotDrink}
    //             closable
    //             maskClosable
    //         >
    //
    //         </Modal>
    //     </>
    // )

    return (
        <>
            <Modal
                visible={isVisible}
                title={hotDrinkData ? hotDrinkData.name : "New hot drink"}
                centered={true}
                width={"50%"}
                onOk={onFormSubmit}
                onCancel={() => {
                    dispatch(adminFormsActions.clearErrors())
                    closeModal()
                }}
                confirmLoading={isSendingHotDrink}
                closable
                maskClosable
                forceRender
            >

                {hotDrinkErrors.length !== 0 && hotDrinkErrors.length !== null
                    ? <List.Item>
                        <List.Item.Meta
                            title={<Divider><Typography.Text type="danger">
                                {hotDrinkData ? "Hot drink can't be changed" : "Hot drink can't be created"}
                            </Typography.Text></Divider>}
                            description={
                                hotDrinkErrors.map((error) => <div>
                                    <Typography.Text type="danger" strong={true}>{error}</Typography.Text>
                                </div>)
                            }
                        />
                    </List.Item>
                    : null
                }

                <Form form={form} name="hot-drink" {...formItemLayoutWithOutLabel} preserve={false}>
                    <Form.Item name="name"
                               label="Name"
                               rules={[{required: true, whitespace: true, message: "Please input hot drink's name."}]}
                               initialValue={hotDrinkData ? hotDrinkData.name : ""}
                               colon={false}
                               validateTrigger={['onChange', 'onBlur']}
                               {...formItemLayout}
                    >
                        <Input placeholder="hot drink's name"/>
                    </Form.Item>

                    <Form.Item name="volume"
                               label="Volume"
                               rules={[{required: true, message: "Please input hot drink's volume."}]}
                               initialValue={hotDrinkData ? hotDrinkData.volume : 1}
                               colon={false}

                               validateTrigger={['onChange', 'onBlur']}
                               {...formItemLayout}>
                        <InputNumber min={1}/>
                    </Form.Item>

                    <Form.Item name="price"
                               label="Price"
                               rules={[{required: true, message: "Please input hot drink's price."}]}
                               initialValue={hotDrinkData ? hotDrinkData.price : 1}
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