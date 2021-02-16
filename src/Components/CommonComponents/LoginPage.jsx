import React, {useEffect, useState} from 'react'
import "../Styles/LoginPageStyle.css";
import {Button, Col, Divider, Form, Input, Layout, List, Modal, Row, Space, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {isLoadingSelector, signInAnswerSelector} from "../../Redux/Reducers/CommonReducers/CommonSelectors";
import {BrowserRouter, Switch, Route, Redirect, useHistory, Link, NavLink} from "react-router-dom";
import {checkForAuth, commonActions, signInRequest} from "../../Redux/Reducers/CommonReducers/CommonReducer";

const {Header, Footer, Sider, Content} = Layout;
const {Title} = Typography;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export const LoginPage = (props) => {

    const dispatch = useDispatch()
    const signInAnswer = useSelector(signInAnswerSelector)
    const isLoading = useSelector(isLoadingSelector)
    const [errors, setErrors] = useState([])
    const history = useHistory()

    // history

    useEffect(() => {
        if (signInAnswer.statusCode >= 400 && signInAnswer.statusCode < 600) {
            // console.log("hello")

            console.log(signInAnswer.message)
            setErrors(signInAnswer.message)
        }

        if (signInAnswer.statusCode >= 200 && signInAnswer.statusCode < 300) {
            dispatch(commonActions.resetSignInAnswerStatus())
            dispatch(checkForAuth())
            // history.push("/admin-panel")
        }


        return () => {

            setErrors([])
            // dispatch(commonActions.resetSignInAnswerStatus())
            // console.log("deleted")
        }
    }, [dispatch, history, signInAnswer])

    // console.log(isLoading)

    useEffect(() => {
        // console.log(isLoading)
    }, [isLoading])

    const onFinish = (values) => {

        dispatch(commonActions.resetSignInAnswerStatus())


        console.log('Success:', values);

        dispatch(signInRequest(values.username, values.password))

        // console.log("yes")


    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        // console.log("no")
    };

    return (
        <div style={{height: '100vh'}}>
            <Row justify="center" align="middle" style={{height: "100%"}}>
                <Col span={12}>

                    {errors.length !== 0 && errors.length !== null
                        ? <List.Item>
                            <List.Item.Meta
                                title={<Divider><Typography.Text type="danger">
                                    Login problem
                                </Typography.Text></Divider>}
                                description={
                                    errors.map((error) => <div>
                                        <Typography.Text type="danger" strong={true}>{error}</Typography.Text>
                                    </div>)
                                }
                            />
                        </List.Item>
                        : null
                    }

                    <Title style={{textAlign: "center"}}>Login</Title>

                    <Form
                        {...layout}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Submit {isLoading}
                            </Button>
                        </Form.Item>
                        <div style={{textAlign: "center"}}>
                            <NavLink to="/signup" component={Typography.Link}>
                                Signup
                            </NavLink>
                        </div>
                    </Form>

                </Col>
                {/*<Col span={4}>*/}
                {/*    <div>lol</div>*/}
                {/*</Col>*/}
                {/*<Col span={4}>*/}
                {/*    <div>lol</div>*/}
                {/*</Col>*/}
                {/*<Col span={4}>*/}
                {/*    <div>lol</div>*/}
                {/*</Col>*/}
            </Row>
            {/*<Row style={{height: '100%'}}>*/}
            {/*    /!*    <Col span={6} />*!/*/}
            {/*    /!*    <Col span={6} />*!/*/}
            {/*    /!*    <Col span={6} />*!/*/}
            {/*    <Col span={24}>*/}
            {/*        log*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<Space align="center">*/}
            {/*    center*/}
            {/*    /!*<Button type="primary">Primary</Button>*!/*/}
            {/*    /!*<span className="mock-block">Block</span>*!/*/}
            {/*</Space>*/}
            {/*hello*/}
            {/*<Header>Header</Header>*/}
            {/*<Content>*/}
            {/*    */}
            {/*</Content>*/}
            {/*<Footer>Footer</Footer>*/}
        </div>
    )
}