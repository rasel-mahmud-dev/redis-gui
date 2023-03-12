import React, {useEffect, useState} from 'react';
import { Button, Checkbox, Form, Input, InputNumber, message, Spin} from 'antd';
import {toggleOpenDbForm} from "../../actions/redisTools";
import {useDispatch, useSelector} from "react-redux";
import ActionTypes from "../../store/actionTypes";
import axios from "axios";
import HttpResponse from "./HttpResponse";
import useHttpResponse from "../../hooks/useHtttpResponse";


const AddDatabase = ({isOpenAddDbForm}) => {
    const [form] = Form.useForm();
    const {updateDatabaseId, databases} = useSelector(state => state.redisTools)
    const [updateItem, setUpdateItem] = useState({})

    const [status, setStatus, resetStatus] = useHttpResponse()


    useEffect(() => {
        form.resetFields();

        if (updateDatabaseId) {
            let updateItem = databases.find(db => db._id === updateDatabaseId)
            if (updateItem) {
                setUpdateItem(updateItem)
                form.setFieldsValue({
                    host: updateItem.host,
                    port: updateItem.port,
                    alias: updateItem.alias,
                    username: updateItem.username,
                    password: updateItem.password,
                    timeout: updateItem.timeout,
                    connectionType: updateItem.connectionType,
                    lastConnection: updateItem.lastConnection,
                    modules: updateItem.modules,
                });
            }
        } else {
            setUpdateItem({})
        }

    }, [updateDatabaseId])

    const dispatch = useDispatch()


    useEffect(() => {
        if (!isOpenAddDbForm) {
            resetStatus()
            form.resetFields()
        }
    }, [isOpenAddDbForm])


    const onFinish = (values) => {

        if (isNaN(values.port)) {
            form.setFields([
                {
                    name: "port", // required
                    value: values.port,//optional
                    errors: ["Port should be an number"],
                },
            ]);
            return;
        }

        if (values.port.toString().length < 4 || values.port.toString().length > 5) {
            form.setFields([
                {
                    name: "port", // required
                    value: values.port,//optional
                    errors: ["Port should be 4 or 5 digit"],
                },
            ]);
            return;
        }


        let payload = {
            ...updateItem,
            alias: values.alias ? values.alias : values.host + ":" + values.port,
            host: values.host,
            port: Number(values.port),
            username: values.username || "",
            password: values.password || "",
            timeout: values.timeout || 30000
        }

        setStatus(true, "", false)

        if (!updateDatabaseId) {
            axios.post("/databases", payload).then(({status, data}) => {
                if (status === 201) {
                    dispatch({
                        type: ActionTypes.ADD_DATABASE,
                        payload: data
                    })
                    // close add database form
                    dispatch({type: ActionTypes.CLOSE_ADD_DB_FORM})
                }
            }).catch(ex => {
                setStatus(false, ex.message, false)
            }).finally(() => {
                setStatus(false, undefined, false)
            })

        } else {
            axios.put("/databases/" + updateDatabaseId, payload).then(({status, data}) => {
                if (status === 201) {

                    dispatch({
                        type: ActionTypes.UPDATE_DATABASE,
                        payload: {
                            ...data,
                            _id: updateDatabaseId
                        }
                    })
                    // close add database form
                    dispatch({type: ActionTypes.CLOSE_ADD_DB_FORM})
                }
            }).catch(err => {
                setStatus(false, err.message, false)
            }).finally(() => {
                setStatus(false, undefined, false)
            })
        }
    };

    const onFinishFailed = (errorInfo) => {
        setStatus(false, "", false)
    }

    function handleTestConnection(e) {

        e.preventDefault();

        let host = form.getFieldValue("host")
        let port = form.getFieldValue("port")
        let username = form.getFieldValue("username")
        let pass = form.getFieldValue("password")
        let timeout = form.getFieldValue("timeout")

        if (!(host && port)) {
            return message.error("Please provide host and port number")
        }
        setStatus(true, "", false)


        axios.post(`/databases/test-connection`, {
            host,
            port,
            timeout,
            password: pass,
            username

        }).then(({data, status}) => {
            setStatus(false, "Database connected", true)

        }).catch(ex => {
            let message = ex?.response?.data?.message || "Database connection fail"
            setStatus(false, message, false)
        })
    }


    return (
        <div>

            <h2 className="page-title"
                style={{marginBottom: "20px"}}>{updateDatabaseId ? "Update Database" : "Add New Database"}</h2>

            <HttpResponse status={status} />

            <Form
                form={form}
                name="basic"
                layout={"vertical"}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Host*"
                    name="host"
                    className="custom-input"
                    rules={[
                        {
                            required: true,
                            message: 'Please provide host name like 127.0.0.1',
                        },
                    ]}
                >
                    <Input className="custom-input"/>
                </Form.Item>

                <Form.Item
                    label="Port*"
                    name="port"
                    className="custom-input"
                    rules={[
                        {
                            required: true,
                            message: 'Please provide Port number',
                        }
                    ]}
                >
                    <InputNumber className="custom-input"/>
                </Form.Item>

                {updateDatabaseId ? (
                    <Form.Item
                        label="Database Alias*"
                        name="alias"
                        className="custom-input"
                        rules={[
                            {
                                required: true,
                                message: 'Please provide Port number',
                            },
                        ]}
                    >
                        <Input className="custom-input"/>
                    </Form.Item>
                ) : null}


                <Form.Item
                    label="Username"
                    name="username"
                    className="custom-input"
                >
                    <Input className="custom-input"/>
                </Form.Item>


                <Form.Item
                    label="Password"
                    name="password"
                    className="custom-input"
                >
                    <Input className="custom-input"/>
                </Form.Item>


                <Form.Item
                    label="Timeout (s)"
                    name="timeout"
                    initialValue={30000}
                    className="custom-input"
                >
                    <InputNumber className="custom-input"/>
                </Form.Item>

                <Form.Item>
                    <div className="flex justify-between ">
                        <button className="default_button" type="primary" htmlType="button"
                                onClick={(e) => handleTestConnection(e)}>
                            Test Connection
                        </button>
                        <div style={{columnGap: "10px"}} className="flex items-center">
                            <button className="default_button" type="primary" htmlType="button"
                                    onClick={() => {
                                        resetStatus();
                                        dispatch(toggleOpenDbForm())
                                    }}>
                                Cancel
                            </button>
                            <button disabled={status.isLoading} className="default_button " type="primary"
                                    htmlType="submit">
                                {updateDatabaseId ? "Update Database" : "Add Database"}
                            </button>
                        </div>
                    </div>
                </Form.Item>
            </Form>

        </div>
    );
};

export default AddDatabase;