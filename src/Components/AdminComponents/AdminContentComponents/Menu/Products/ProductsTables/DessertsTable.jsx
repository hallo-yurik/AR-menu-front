import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
    allAlcoholSelector,
    allDessertsSelector, deletingIdSelector, editingIdSelector
} from "../../../../../../Redux/Reducers/AdminReducer/AdminSelectors/AdminProductsSelectors";
import {
    deleteAlcoholThunk, deleteDessertThunk,
    initAlcohol,
    initDesserts
} from "../../../../../../Redux/Reducers/AdminReducer/AdminProductsReducer";
import {Button, Image, List, Modal, Space, Table, Typography} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {CreateHotDrinkModal} from "../../Modals/CreateHotDrinkModal";
import {CreateDessertModal} from "../../Modals/CreateDessertModal";

// import "./../../../../../Styles/DessertsTableStyle.css"

const {Title} = Typography;

export const DessertsTable = (props) => {

    const dispatch = useDispatch()
    const [modal, contextHolder] = Modal.useModal();

    const [currentEditable, setCurrentEditable] = useState(null)
    const [editModalIsVisible, setEditModalIsVisible] = useState(false)
    const [clearForm, setClearForm] = useState(false)

    const allDesserts = useSelector(allDessertsSelector)
    const deletingId = useSelector(deletingIdSelector)
    const editingId = useSelector(editingIdSelector)

    useEffect(() => {
        dispatch(initDesserts())
    }, [dispatch])

    useEffect(() => {

    }, [allDesserts])

    const deleteDessertCallback = (event, data) => {

        modal.confirm({
            title: <Title level={3}>Are you sure that you want to delete this dessert?</Title>,
            width: "50%",
            content: (
                <>
                    <Title level={4}>Name: {"test"}</Title>
                    <Title level={4}>Volume: {"test"}</Title>
                    <Title level={4}>Price: {"test"}</Title>
                </>
            ),
            centered: true,
            onOk: async (close) => {
                await dispatch(deleteDessertThunk(data.id));
                close()
            }
        })
    }

    const editDessertCallback = (event, data) => {
        setClearForm(true)
        setEditModalIsVisible(true)
        setCurrentEditable(data)
    }

    const dessertsTableDataSource = allDesserts.map((el, i) => ({
        key: i,
        name: el.name,
        ingredients: el.ingredients,
        price: el.price,
        image: el.image,
        id: el._id
    }))

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (url) => {

                // const response = await fetch(url)
                // const data = awresponse.blob()
                // const blob =

                // URL.revokeObjectURL(url)
                // console.log(url)

                return (
                    <Image
                        width={100}
                        src={url}
                    />
                )
            },

        },
        {
            title: 'Ingredients',
            dataIndex: 'ingredients',
            key: 'ingredients',
            width: 1,
            render: (ingredients) => (
                <List
                    bordered
                    dataSource={ingredients}
                    renderItem={item => (
                        <List.Item style={{padding: "5px 24px"}}>{item}</List.Item>
                    )}
                />
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 1
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 1,
            render: (text, record) => {

                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            icon={<EditOutlined/>}
                            loading={record.id === editingId || record.id === deletingId}
                            onClick={(event) => editDessertCallback(event, record)}
                        />

                        <Button
                            type="primary"
                            icon={<DeleteOutlined/>}
                            danger
                            loading={record.id === editingId || record.id === deletingId}
                            onClick={(event) => deleteDessertCallback(event, record)}
                        />
                    </Space>
                )
            }
        },
    ];

    // const dispatch = useDispatch()
    // const allDesserts = useSelector(allDessertsSelector)
    //
    // useEffect(() => {
    //     dispatch(initDesserts())
    // }, [dispatch])

    return (
        <>
            <Table
                scroll={{x: true}}
                dataSource={dessertsTableDataSource}
                columns={columns}
                pagination={false}
            >

            </Table>
            {contextHolder}

            <CreateDessertModal
                isVisible={editModalIsVisible}
                dessertData={currentEditable}
                closeModal={() => {
                    setClearForm(false)
                    setCurrentEditable(null)
                    setEditModalIsVisible(false)
                }}
                clearForm={clearForm}

            />
            {/*<CreateHotDrinkModal*/}
            {/*    isVisible={editModalIsVisible}*/}
            {/*    hotDrinkData={currentEditable}*/}
            {/*    closeModal={() => {*/}
            {/*        setClearForm(false)*/}
            {/*        setCurrentEditable(null)*/}
            {/*        setEditModalIsVisible(false)*/}
            {/*    }}*/}
            {/*    clearForm={clearForm}*/}
            {/*/>*/}
        </>
        // <>
        //     {allDesserts.map((el) => (
        //         <div>{el.name}</div>
        //     ))}
        // </>
    )
}