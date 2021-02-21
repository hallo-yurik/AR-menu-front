import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
    allAlcoholSelector,
    allHotDrinksSelector, deletingIdSelector, editingIdSelector
} from "../../../../../../Redux/Reducers/AdminReducer/AdminSelectors/AdminProductsSelectors";
import {
    deleteAlcoholThunk,
    initAlcohol
} from "../../../../../../Redux/Reducers/AdminReducer/AdminProductsReducer";
import {Button, Form, Modal, Space, Table, Typography} from "antd";
import {
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import {CreateAlcoholModal} from "../../Modals/CreateAlcoholModal";
import {
    isAlcoholSendingSelector,
    validateAlcoholErrors
} from "../../../../../../Redux/Reducers/AdminReducer/AdminSelectors/AdminFormsSelectors";

const {Title} = Typography;

export const AlcoholTable = (props) => {

    const dispatch = useDispatch()
    const [modal, contextHolder] = Modal.useModal();

    const [currentEditable, setCurrentEditable] = useState(null)
    const [editModalIsVisible, setEditModalIsVisible] = useState(false)
    const [clearForm, setClearForm] = useState(false)

    const allAlcohol = useSelector(allAlcoholSelector)
    const deletingId = useSelector(deletingIdSelector)
    const editingId = useSelector(editingIdSelector)
    // const alcoholErrors = useSelector(validateAlcoholErrors);

    useEffect(() => {
        dispatch(initAlcohol())
    }, [dispatch])

    const deleteAlcoholCallback = (event, data) => {

        modal.confirm({
            title: <Title level={3}>Are you sure that you want to delete this alcohol?</Title>,
            width: "50%",
            content: (
                <>
                    <Title level={4}>Name: {data.name}</Title>
                    <Title level={4}>Volume: {data.volume}</Title>
                    <Title level={4}>Price: {data.price}</Title>
                </>
            ),
            centered: true,
            onOk: async (close) => {
                await dispatch(deleteAlcoholThunk(data.id));
                close()
            }
        })
    }

    const editAlcoholCallback = (event, data) => {
        setClearForm(true)
        setEditModalIsVisible(true)
        setCurrentEditable(data)
    }

    const alcoholTableDataSource = allAlcohol.map((el, i) => ({
        key: i,
        name: el.name,
        volume: el.volume,
        price: el.price,
        id: el._id
    }))

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Volume',
            dataIndex: 'volume',
            key: 'volume',
            width: 1
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
                            onClick={(event) => editAlcoholCallback(event, record)}
                        />

                        <Button
                            type="primary"
                            icon={<DeleteOutlined/>}
                            danger
                            loading={record.id === editingId || record.id === deletingId}
                            onClick={(event) => deleteAlcoholCallback(event, record)}
                        />
                    </Space>
                )
            }
        },
    ];

    return (
        <>
            <Table
                scroll={{x: true}}
                dataSource={alcoholTableDataSource}
                columns={columns}
                pagination={false}
            >

            </Table>
            {contextHolder}
            <CreateAlcoholModal
                isVisible={editModalIsVisible}
                alcoholData={currentEditable}
                closeModal={() => {
                    setClearForm(false)
                    setCurrentEditable(null)
                    setEditModalIsVisible(false)
                }}
                clearForm={clearForm}
            />
        </>


        // <>
        //     {allAlcohol.map((el) => (
        //
        //
        //         < div> {el.name}</div>
        //     ))}
        // </>
    )
}