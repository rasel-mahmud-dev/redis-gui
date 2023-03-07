import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import {toggleOpenDbForm} from "../actions/redisTools";
import {useDispatch, useSelector} from "react-redux";
import ActionTypes from "../store/actionTypes";


const AddDatabase = () => {
    const [form] = Form.useForm();
    const {updateDatabaseId, databases} = useSelector(state => state.redisTools)
    const [updateItem, setUpdateItem] = useState({})

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

    const onFinish = (values) => {


        if(!updateDatabaseId){
            // axios.post("/add-databse", values)
            dispatch({
                type: ActionTypes.ADD_DATABASE,
                payload: {...values, _id: Date.now()}
            })

        } else{
            // axios.post("/update-databse", values)
            dispatch({
                type: ActionTypes.UPDATE_DATABASE,
                payload: {
                    ...values,
                    _id: updateDatabaseId
                }
            })
        }

        // close add database form
        dispatch(toggleOpenDbForm())
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }


    return (
        <div>

            <h3 className="page-title"
                style={{marginBottom: "20px"}}>{updateDatabaseId ? "Update Database" : "Add New Database"}</h3>

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
                        },
                    ]}
                >
                    <Input className="custom-input"/>
                </Form.Item>

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
                    className="custom-input"
                >
                    <Input className="custom-input"/>
                </Form.Item>

                <Form.Item>
                    <div className="flex justify-between ">
                        {!updateDatabaseId && <button className="default_button" type="primary" htmlType="button">
                            Test Connection
                        </button>}
                        <div style={{columnGap: "10px"}} className="flex items-center">
                            <button className="default_button" type="primary" htmlType="button"
                                    onClick={() => dispatch(toggleOpenDbForm())}>
                                Cancel
                            </button>
                            <button className="default_button" type="primary" htmlType="submit">
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