import React, {useEffect, useState} from 'react'
import "../Styles/LoginPageStyle.css";
import {Button, Col, Divider, Form, Input, Layout, List, Modal, Row, Space, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    isLoadingSelector,
    signInAnswerSelector,
    signUpAnswerSelector
} from "../../Redux/Reducers/CommonReducers/CommonSelectors";
import {BrowserRouter, Switch, Route, Redirect, useHistory, Link, NavLink} from "react-router-dom";
import {commonActions, signInRequest, signUpRequest} from "../../Redux/Reducers/CommonReducers/CommonReducer";

const {Header, Footer, Sider, Content} = Layout;
const { Title } = Typography;

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

export const SignupPage = (props) => {

    const dispatch = useDispatch()
    const signUpAnswer = useSelector(signUpAnswerSelector)
    const isLoading = useSelector(isLoadingSelector)
    const [errors, setErrors] = useState([])
    const [successMessage, setSuccessMessage] = useState([])
    const history = useHistory()

    // history

    useEffect(() => {

        console.log(signUpAnswer)

        if (signUpAnswer.statusCode >= 400 && signUpAnswer.statusCode < 600) {
            // console.log("hello")

            // console.log(signInAnswer.message)
            setErrors(signUpAnswer.message)
            setSuccessMessage([])
        }

        if (signUpAnswer.statusCode >= 200 && signUpAnswer.statusCode < 300) {
            setErrors([])
            setSuccessMessage(signUpAnswer.message)
            // dispatch(commonActions.resetSignUpAnswerStatus())
            // history.push("/")
        }


        return () => {

            setErrors([])
            setSuccessMessage([])
            // dispatch(commonActions.resetSignInAnswerStatus())
            console.log("deleted")
        }
    }, [dispatch, history, signUpAnswer])
    //
    // console.log(isLoading)
    //
    // useEffect(() => {
    //     console.log(isLoading)
    // }, [isLoading])

    const onFinish = (values) => {

        dispatch(commonActions.resetSignUpAnswerStatus())
        console.log('Success:', values);

        dispatch(signUpRequest(values.username, values.password))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{height: '100vh'}}>
            <Row justify="center" align="middle" style={{height: "100%"}}>
                <Col span={12}>

                    {errors.length !== 0 && errors.length !== null
                        ? <List.Item>
                            <List.Item.Meta
                                title={<Divider><Typography.Text type="danger">
                                    Signup problem
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

                    {successMessage.length !== 0 && errors.length !== null
                        ? <List.Item>
                            <List.Item.Meta
                                title={<Divider><Typography.Text type="success">
                                    Signup success
                                </Typography.Text></Divider>}
                                description={
                                    successMessage.map((message) => <div>
                                        <Typography.Text type="success" strong={true}>{message}</Typography.Text>
                                    </div>)
                                }
                            />
                        </List.Item>
                        : null
                    }

                    <Title style={{textAlign: "center"}}>Signup</Title>

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
                                    message: 'Please input username',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input password',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Submit {isLoading}
                            </Button>
                        </Form.Item>

                    </Form>
                    <div  style={{textAlign: "center"}}>
                        <NavLink to="/login" component={Typography.Link}>
                            Login
                        </NavLink>
                    </div>

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