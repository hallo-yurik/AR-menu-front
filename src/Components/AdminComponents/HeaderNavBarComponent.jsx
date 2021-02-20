import React, {useEffect} from 'react'
import {Menu} from "antd";
import {changeCurrentContent} from "../../Redux/Reducers/AdminReducer/AdminReducer";
import {useDispatch, useSelector} from "react-redux";
import {currentContentSelector} from "../../Redux/Reducers/AdminReducer/AdminSelectors/MainAdminSelectors";

export const HeaderNavBarComponent = React.memo((props) => {

    const {currentMenuTab, currentContentKey} = props;

    const dispatch = useDispatch();

    // const currentContentKey = useSelector(currentContentSelector);

    const onSelect = (item) => {

        // console.log(12345)
        dispatch(changeCurrentContent(item.key.toString()))
    }

    // console.log(currentContentKey)

    // useEffect(() => {
    //     // dispatch(changeCurrentContent("1"))
    //     console.log(currentContentKey)
    // }, [currentContentKey])

    // console.log(currentMenuTab)

    if (currentMenuTab === "1") {
        return(
            <Menu theme="dark" mode="horizontal" onSelect={onSelect} selectedKeys={currentContentKey}>
                <Menu.Item key="1">Create Menu</Menu.Item>
                <Menu.Item key="2">Products</Menu.Item>
                <Menu.Item key="3">Menus</Menu.Item>
            </Menu>
        )
    } else if (currentMenuTab === "2") {
        return(
            <Menu theme="dark" mode="horizontal" onSelect={onSelect} selectedKeys={currentContentKey}>
                <Menu.Item key="1">Waiting</Menu.Item>
                <Menu.Item key="2">Block list</Menu.Item>
                <Menu.Item key="3">Allowed</Menu.Item>
            </Menu>
        )
    }
})
