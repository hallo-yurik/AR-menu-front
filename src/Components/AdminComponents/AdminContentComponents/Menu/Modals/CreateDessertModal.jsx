import React, {useState, useEffect} from 'react'
import {Button, Form, Input, Modal, Upload} from "antd";
import {useDispatch} from "react-redux";
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {adminFormsActions} from "../../../../../Redux/Reducers/AdminReducer/AdminFormsReducer";
import "../../../../Styles/CreateDessertModalStyle.css"

const combineFormData = () => {
    return
}

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
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 20, offset: 4},
    },
};

export const CreateDessertModal = (props) => {

    const {isVisible, onClose, dessertData} = props

    const isSendingDessert = false; //selector

    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [imageFileType, setImageFileType] = useState(null)

    useEffect(() => {
        return setImageFileType(null)
    }, [])


    const onFormSubmit = async () => {

        try {
            const result = await form.validateFields()
            console.log(result)
        } catch (err) {
            console.log(err)
        }
        // form.resetFields()

        // result
    }

    const normFile = (e) => {
        console.log('Upload event:', e);
        //
        // if (Array.isArray(e)) {
        //     return e;
        // }
        //
        // return e && e.fileList;
    };

    return (
        <>
            <Modal
                visible={true}
                title={dessertData ? dessertData.name : "New dessert"}
                centered={true}
                width={"50%"}
                onOk={onFormSubmit}
                onCancel={onClose}
                confirmLoading={isSendingDessert}
                closable
                maskClosable
            >

                <Form form={form} name="dessert" {...formItemLayoutWithOutLabel}>
                    <Form.Item name="name"
                               label="Name"
                               rules={[{required: true, whitespace: true, message: "Please input dessert's name."}]}
                               initialValue={dessertData ? dessertData.name : ""}
                               colon={false}
                               validateTrigger={['onChange', 'onBlur']}
                               {...formItemLayout}
                    >
                        <Input placeholder="dessert's name"/>
                    </Form.Item>
                    <Form.List
                        name="ingredients"
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 2) {
                                        return Promise.reject(new Error('Should be at least 2 ingredients.'));
                                    }
                                },
                            },
                        ]}
                        initialValue={dessertData ? [dessertData.ingredients] : [""]}
                    >
                        {(fields, {add, remove, move}, {errors}) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'Ingredients' : ''}
                                        required={true}
                                        key={field.key}
                                        colon={false}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: fields.length < 2 ? 'Please input ingredient.' : 'Please input ingredient or delete this field.'
                                                },

                                            ]}
                                            noStyle
                                        >
                                            <Input placeholder="ingredient" style={{width: '90%'}}/>
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{width: '90%'}}
                                        icon={<PlusOutlined/>}
                                    >
                                        Add ingredient
                                    </Button>

                                    <Form.ErrorList errors={errors}/>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item
                        name={"dessert_image"}
                        label={"Image"}
                        valuePropName={"fileList"}
                        getValueFromEvent={normFile}
                        required={true}
                        colon={false}
                        rules={[{validator: () => {
                            if (imageFileType == null) return Promise.reject(new Error('Please add dessert\'s image.'));
                            if (imageFileType !== "image/png") return Promise.reject(new Error("File should be in png format"));
                            }}]}
                        {...formItemLayout}>
                        <Upload
                            name={"image"}
                            beforeUpload={file => {

                                setImageFileType(file.type)

                                // if (file.type !== 'image/png') {
                                //     // message.error(`${file.name} is not a png file`);
                                // }
                                // console.log(file)
                                return false
                            }}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined/>}>Upload png image</Button>
                        </Upload>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}