import React, {useState, useEffect} from 'react'
import {Button, Divider, Form, Image, Input, InputNumber, List, message, Modal, Typography, Upload} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {
    adminFormsActions,
    postDessertThunk,
    postHotDrinkThunk
} from "../../../../../Redux/Reducers/AdminReducer/AdminFormsReducer";
import "../../../../Styles/CreateDessertModalStyle.css"
import ImgCrop from "antd-img-crop";
import {
    isAlcoholSendingSelector,
    isDessertSendingSelector, validateAlcoholErrors,
    validateDessertErrors
} from "../../../../../Redux/Reducers/AdminReducer/AdminSelectors/AdminFormsSelectors";
import {patchDessertThunk, patchHotDrinkThunk} from "../../../../../Redux/Reducers/AdminReducer/AdminProductsReducer";

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

    const {isVisible, closeModal, dessertData, clearForm} = props

    const dessertErrors = useSelector(validateDessertErrors);
    const isSendingDessert = useSelector(isDessertSendingSelector);

    // const isSendingDessert = false; //selector

    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const [imageFileType, setImageFileType] = useState(null)
    const [dessertImage, setDessertImage] = useState([])
    const [imagePreviewVisible, setImagePreviewVisible] = useState(false)
    const [dessertModel, setDessertModel] = useState([])

    useEffect(() => {
        if (dessertData) {

            fetch(dessertData.image).then(r => r.blob().then(blob => {

                const file = new File([blob], dessertData.name + ".png", {
                    type: "image/png"
                });

                setDessertImage([{
                    uid: dessertData.id,
                    name: dessertData.name + ".png",
                    url: dessertData.image,
                    status: "done",
                    originFileObj: file,
                    thumbUrl: dessertData.image
                }])

                setImageFileType("image/png")

            }));

            fetch(dessertData.ar).then(r => r.blob().then(blob => {

                const file = new File([blob], dessertData.name + ".usdz");

                setDessertModel([{
                    uid: dessertData.id,
                    name: dessertData.name + ".usdz",
                    status: "done",
                    url: dessertData.image,
                    originFileObj: file
                }])
            }));
        }
        return () => {

            setDessertImage([])
            setDessertModel([])
        }
    }, [dessertData])

    useEffect(() => {
        if (!isVisible) {

            form.resetFields()
            setDessertModel([])
            setDessertImage([])
        }

    }, [form, isVisible, isSendingDessert, dessertErrors])

    // useEffect(() => {
    //     setImageFileType(null)
    //     dispatch(adminFormsActions.clearErrors())
    // }, [isVisible])

    useEffect(() => {
        if (clearForm) {
            // console.log("reset")
            form.resetFields()
            // setDessertModel([])
            // setDessertImage([])
        }
    }, [clearForm, form])

    const onFormSubmit = async () => {

        try {
            const result = await form.validateFields()
            await combineFormData(result, dessertImage[0], dessertModel[0])

        } catch (err) {
            console.log(err)
        }
    }

    const combineFormData = async (result, dessertImage, dessertModel) => {
        try {

            const dessertFormData = new FormData()
            dessertFormData.set("name", result.name);
            dessertFormData.set("ingredients", result.ingredients);
            dessertFormData.set("price", result.price);
            dessertFormData.set("dessert_image", dessertImage.originFileObj, dessertImage.name);
            dessertFormData.set("dessert_model", dessertModel.originFileObj, dessertModel.name);

            let isSuccessful;

            if (dessertData) {

                // console.log(dessertImage.originFileObj, dessertModel.originFileObj, dessertData)

                isSuccessful = await dispatch(patchDessertThunk(dessertData.id, dessertFormData))
            } else {
                isSuccessful = await dispatch(postDessertThunk(dessertFormData))
            }

            if (isSuccessful) {

                dispatch(adminFormsActions.clearErrors())
                form.resetFields()
                setDessertModel([])
                setDessertImage([])
                closeModal()
            }

            // name: type: text, format: String
            // ingredients: [type: text, format: String]
            // price: type: text, format: Number
            // dessert_image: type: file, format: png
            // dessert_model: type: file, format: usdz


            // console.log(dessertImage)
            // console.log(dessertModel)
            // const usdz = await new Promise(resolve => {
            //     const reader = new FileReader();
            //     reader.readAsDataURL(dessertModel.originFileObj);
            //     reader.onload = () => resolve(reader.result);
            // });
            //
            // const image = await new Promise(resolve => {
            //     const reader = new FileReader();
            //     reader.readAsDataURL(dessertImage.originFileObj);
            //     reader.onload = () => resolve(reader.result);
            // });

            // console.log(dessertModel instanceof FileList)
        } catch (err) {
            console.log(err)
        }


        //
        // const request = new FormData()
        // request.set();
        // return
    }


    // const normFile = (e) => {
    //
    //
    //     console.log('Upload event:', e);
    //
    //     // if (Array.isArray(e)) {
    //     //     return e;
    //     // }
    //     //
    //     // return e && e.fileList;
    // };


    const onChange = async ({file, fileList: newFileList}) => {

        if (newFileList.length) {
            newFileList[0].status = "done"
            setImageFileType(file.type)
        }
        setDessertImage(newFileList);
    };

    const onModelChange = async ({file, fileList: newFileList, event}) => {
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
                visible={isVisible}
                title={dessertData ? dessertData.name : "New dessert"}
                centered={true}
                width={"50%"}
                onOk={onFormSubmit}
                onCancel={() => {
                    dispatch(adminFormsActions.clearErrors())
                    closeModal()
                }}
                confirmLoading={isSendingDessert}
                closable
                maskClosable
                forceRender
            >

                {dessertErrors.length !== 0 && dessertErrors.length !== null
                    ? <List.Item>
                        <List.Item.Meta
                            title={<Divider><Typography.Text type="danger">
                                {dessertData ? "Dessert can't be changed" : "Dessert can't be created"}
                            </Typography.Text></Divider>}
                            description={
                                dessertErrors.map((error) => <div>
                                    <Typography.Text type="danger" strong={true}>{error}</Typography.Text>
                                </div>)
                            }
                        />
                    </List.Item>
                    : null
                }

                <Form form={form} name="dessert" {...formItemLayoutWithOutLabel} preserve={false}>
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
                        initialValue={dessertData ? dessertData.ingredients : [""]}
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
                    <Form.Item name="price"
                               label="Price"
                               rules={[{required: true, message: "Please input dessert's price."}]}
                               initialValue={dessertData ? dessertData.price : 1}
                               colon={false}

                               validateTrigger={['onChange', 'onBlur']}
                               {...formItemLayout}>
                        <InputNumber min={1}/>
                    </Form.Item>

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
                                return Promise.resolve()
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
                        // valuePropName={"fileList"}
                        // getValueFromEvent={(e) => {
                        //
                        //
                        //     // console.log(e)
                        // }}
                        required={true}
                        colon={false}
                        rules={[

                            {
                                validator: (a, b) => {

                                    if (!dessertModel.length) return Promise.reject(new Error('Please add dessert\'s model.'));
                                    const extension = dessertModel[0].name.slice((Math.max(0, dessertModel[0].name.lastIndexOf(".")) || Infinity) + 1)
                                    if (extension !== "usdz") return Promise.reject(new Error("File should be in usdz format"));

                                    return Promise.resolve()
                                }
                            }

                        ]}
                        {...formItemLayout}>

                        <Upload
                            listType="text"
                            maxCount={1}
                            onChange={onModelChange}
                            fileList={dessertModel}
                            // fileList={[
                            //     {
                            //         uid: '-1',
                            //         name: 'image.png',
                            //         status: 'done',
                            //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                            //     },
                            // ]}
                        >
                            <Button icon={<UploadOutlined/>}>Upload USDZ model</Button>
                        </Upload>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}