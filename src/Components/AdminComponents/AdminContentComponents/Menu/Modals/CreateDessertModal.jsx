import React, {useState, useEffect} from 'react'
import {Button, Form, Image, Input, message, Modal, Upload} from "antd";
import {useDispatch} from "react-redux";
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {adminFormsActions} from "../../../../../Redux/Reducers/AdminReducer/AdminFormsReducer";
import "../../../../Styles/CreateDessertModalStyle.css"
import ImgCrop from "antd-img-crop";

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
    const [dessertImage, setDessertImage] = useState([])
    const [imagePreviewVisible, setImagePreviewVisible] = useState(false)
    const [dessertModel, setDessertModel] = useState([])

    useEffect(() => {
        return () => setImageFileType(null)
    }, [])

    useEffect(() => {
        if (dessertData) {
            setDessertImage([{
                uid: dessertData._id,
                name: dessertData.name,
                url: dessertData.image,
                status: "done"
            }])

            setDessertModel([{
                uid: dessertData._id,
                name: dessertData.name,
                url: dessertData.ar,
                status: "done"
            }])
        }
        return () => {
            setDessertImage([])
            setDessertModel([])
        }
    }, [dessertData])

    // useEffect()


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


    const onChange = ({file, fileList: newFileList}) => {
        if (newFileList.length) {
            newFileList[0].status = "done"
            setImageFileType(file.type)
        }
        setDessertImage(newFileList);
    };

    const onModelChange = ({file, fileList: newFileList, event}) => {
        if (newFileList.length) {
            newFileList[0].status = "done"
        }
        setDessertModel(newFileList);
    }

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }

        setDessertImage([{...dessertImage[0], url: src}])
        setImagePreviewVisible(true)
    };

    return (
        <>
            <Modal
                visible={true}///
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
                        getValueFromEvent={(e) => {
                            console.log(e)
                        }}
                        required={true}
                        colon={false}
                        rules={[{
                            validator: (a, b) => {
                                if (!dessertImage.length) return Promise.reject(new Error('Please add dessert\'s image.'));
                                if (imageFileType !== "image/png") return Promise.reject(new Error("File should be in png format"));
                            }
                        }]}
                        // validateTrigger={['onChange', 'onBlur']}
                        {...formItemLayout}>

                        <ImgCrop>
                            <Upload
                                name={"dessert_image"}
                                listType="picture-card"
                                fileList={dessertImage}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {dessertImage.length === 0 && "Upload image"}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>
                    <Modal
                        visible={imagePreviewVisible}
                        title={!!form.getFieldValue("name") || "New dessert"}
                        centered={true}
                        width={"75%"}
                        onCancel={() => {
                            setImagePreviewVisible(false)
                        }}
                        closable
                        maskClosable
                        footer={null}
                    >
                        <Image
                            alt={!!form.getFieldValue("name") || "New dessert"}
                            width={"100%"}
                            src={dessertImage[0] && dessertImage[0].url ? dessertImage[0].url : null}
                            preview={false}
                        />
                    </Modal>

                    <Form.Item
                        name={"dessert_model"}
                        label={"Model"}
                        valuePropName={"fileList"}
                        getValueFromEvent={(e) => {
                            console.log(e)
                        }}
                        required={true}
                        colon={false}
                        rules={[

                            {
                                validator: (a, b) => {

                                    if (!dessertModel.length) return Promise.reject(new Error('Please add dessert\'s model.'));
                                    const extension = dessertModel[0].name.slice((Math.max(0, dessertModel[0].name.lastIndexOf(".")) || Infinity) + 1)
                                    if (extension !== "usdz") return Promise.reject(new Error("File should be in usdz format"));
                                }
                            }

                        ]}
                        // rules={[{
                        //     validator: (a, b) => {
                        //         // console.log(a, b)
                        //         console.log(dessertModel[0].name)
                        //         if (!dessertModel.length) return Promise.reject(new Error('Please add dessert\'s model.'));
                        //
                        //         // console.log(dessertModel[0])
                        //         // if (dessertModel[0] !== "image/png") return Promise.reject(new Error("File should be in usdz format"));
                        //     }
                        // }]}
                        // validateTrigger={['onChange', 'onBlur']}
                        {...formItemLayout}>

                        <Upload
                            listType="picture"
                            maxCount={1}
                            onChange={onModelChange}
                            fileList={dessertModel}
                        >
                            <Button icon={<UploadOutlined/>}>Upload USDZ model</Button>
                        </Upload>

                        {/*<ImgCrop>*/}
                        {/*    <Upload*/}
                        {/*        name={"dessert_model"}*/}
                        {/*        listType="picture"*/}
                        {/*        // fileList={dessertImage}*/}
                        {/*        // onChange={onChange}*/}
                        {/*        // onPreview={onPreview}*/}
                        {/*    >*/}
                        {/*        Lol*/}
                        {/*        /!*{dessertImage.length === 0 && "Upload image"}*!/*/}
                        {/*    </Upload>*/}
                        {/*</ImgCrop>*/}
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}