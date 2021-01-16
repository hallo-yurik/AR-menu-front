import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentContent, changeMenuTab, initAllProducts} from "../../Redux/Reducers/AdminReducer/AdminReducer";
import {
    alcoholSelector, currentContentSelector, currentMenuItemKeySelector,
    dessertsSelector,
    hotDrinksSelector
} from "../../Redux/Reducers/AdminReducer/AdminSelectors/MainAdminSelectors";

import {Layout, Menu} from 'antd';
import {
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import "../Styles/MainAdminComponentStyle.css";
import 'antd/dist/antd.css';

import {ProductGroupComponent} from "./ProductGroupComponent";
import {HeaderNavBarComponent} from "./HeaderNavBarComponent";
import {AdminContentManagerComponent} from "./AdminContentManagerComponent";

const {Header, Content, Footer, Sider} = Layout;

export const MainAdminComponent = React.memo((props) => {

    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(initAllProducts())
    // }, [dispatch])

    // const dessertsArray = useSelector(dessertsSelector);
    // const hotDrinksArray = useSelector(hotDrinksSelector);
    // const alcoholArray = useSelector(alcoholSelector);

    const currentMenuItemKey = useSelector(currentMenuItemKeySelector);
    const currentContentKey = useSelector(currentContentSelector);

    const onSelect = (item) => {
        dispatch(changeMenuTab(item.key.toString()))
        dispatch(changeCurrentContent("1"))
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={[currentMenuItemKey]} mode="inline" onSelect={onSelect}>
                    <Menu.Item key="1" icon={<UnorderedListOutlined />}>
                        Menu
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined/>}>
                        Users
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0, background: "#001529"}} >
                    <HeaderNavBarComponent currentMenuTab={currentMenuItemKey} currentContentKey={currentContentKey}/>
                </Header>
                <Content style={{margin: '16px'}}>
                    <div className="site-layout-background" style={{padding: 24, height: "100%"}}>
                        <AdminContentManagerComponent currentMenuTab={currentMenuItemKey} currentContentKey={currentContentKey}/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Yurii Trach Dessert AR menu</Footer>
            </Layout>
        </Layout>


        // <div>
        //     <ProductGroupComponent groupName="potentialDesserts" productArray={dessertsArray}/>
        //     <ProductGroupComponent groupName="potentialHotDrinks" productArray={hotDrinksArray}/>
        //     <ProductGroupComponent groupName="potentialAlcohol" productArray={alcoholArray}/>
        // </div>
    )
})