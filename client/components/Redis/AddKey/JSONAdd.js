import React, {useState} from 'react';
import {Form, Input, message, Upload} from "antd";
import axios from "axios";
import CodeEditor from "../../CodeEditor/CodeEditor";


const JSONAdd = ({selectType, databaseId, onAddKeyData, doneAddKey, setAllkeysData, dataKeys}) => {

    const [value, setValue] = useState(``)


    function handleAdd(values) {
        let keyName = values.key
        if (!value) {
            message.error("Please provide json value ")
        }

        try{
            let isValidJSON = JSON.parse(value)
        }catch (ex){
            return message.error("Please Provide valid json data")
        }

        let updatedKeys = [...dataKeys]

        const existsIndex = updatedKeys.findIndex(item => item.key === keyName)
        if (existsIndex !== -1) {
            return message.error("This Key already exists")
        }


        axios.post(`/databases/${databaseId}/json`, {key: keyName, value}).then(({data, status}) => {

            if (status === 201) {
                updatedKeys.push({
                    key: keyName,
                    dataType: "json",
                    size: "104 B"
                })
                setAllkeysData(updatedKeys)
                doneAddKey && doneAddKey()
            }

        }).catch(ex => {
            console.log(ex)
        })
    }


    // handle error.
    function onFinishFailed(error) {

    }



    const props = {
        action: '',
        listType: 'picture',
        accept: "application/json",
        beforeUpload(file) {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = async (result) => {
                    let text = result.target.result
                    try{
                        JSON.parse(text)
                        setValue(text)
                    }catch (ex){
                        message.error("Select valid json file")
                    }
                };
            });
        },
    };

    return (
        <div>
            <Form
                name="basic"
                onFinish={handleAdd}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                <div className="mt-4">
                    <Form.Item
                        className="w-full"
                        label="Key Name"
                        name="key"
                        rules={[
                            {
                                required: true,
                                message: 'Please input key name',
                            },
                        ]}
                    >
                        <Input className="custom-input"/>
                    </Form.Item>

                    <div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="value" className="mt-2">Json Value</label>
                            <Upload {...props}>
                                <button className="default_button" type="button">
                                    JSON File
                                </button>
                            </Upload>

                        </div>

                        <CodeEditor
                            data={value}
                            setData={value =>  setValue(value)}
                        />

                    </div>

                </div>



                   <button className="default_button mt-4" type="submit">
                       Save
                   </button>

            </Form>

        </div>
    );
};

export default JSONAdd;