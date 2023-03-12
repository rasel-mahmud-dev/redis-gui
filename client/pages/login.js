import {Button, Checkbox, Form, Input} from 'antd';
import React from 'react';
import axios from "axios";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";


const Login = () => {

    const dispatch = useDispatch()

    const router = useRouter()

    const onFinish = async (values) => {
        try {
            const payload = {
                email: values.email,
                password: values.password,
            }
            let {data, status} = await axios.post("/auth/login", payload)
            if (status === 201) {
                localStorage.setItem("token", data.token)
                dispatch({
                    type: "SET_USER",
                    payload: data
                })
                router.push("/")
            }
        } catch (ex) {
            console.log(ex)
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login-form">
            <h1>Login Form</h1>
            <Form
                layout="vertical"
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email',
                        },
                    ]}
                >
                    <Input className="custom-input"/>
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
                    <Input.Password className="custom-input"/>
                </Form.Item>


                <p className="mb-4">Not account. <Link href="/registration">Create new one</Link></p>

                <button className="default_button" style={{margin: "auto"}} type="primary" htmlType="submit">
                    Submit
                </button>

            </Form>
        </div>
    );
};
export default Login;