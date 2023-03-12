import React, {useState} from 'react';
import {Form, Input, message} from "antd";
import axios from "axios";


const StringAdd = ({selectType, databaseId, onAddKeyData, doneAddKey, setAllkeysData, dataKeys}) => {

    const [value, setValue] = useState("")


    function handleAdd(values){
        let keyName = values.key
        if(!value){
            message.error("Please provide string value ")
        }

        let updatedKeys = [...dataKeys.keys]

        const existsIndex = updatedKeys.findIndex(item=>item.key === keyName)
        if(existsIndex !== -1){
            return message.error("This Key already exists")
        }


        axios.post(`/databases/${databaseId}/string`, {key: keyName, value}).then(({data, status})=>{

            if(status === 201) {
                updatedKeys.push({
                    key: keyName,
                    dataType: "string",
                    size: "104 B"
                })
                setAllkeysData(prev => ({
                    ...prev,
                    total: prev.total + 1,
                    keys: updatedKeys
                }))

                doneAddKey && doneAddKey()
            }

        }).catch(ex=>{
            console.log(ex)
        })
    }


    // handle error.
    function onFinishFailed(error){

    }

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
                        <label htmlFor="value" className="mt-2">Value</label>
                        <Input.TextArea
                            onChange={(e)=>setValue(e.target.value)}
                            autoSize={{minRows: 6, maxRows: 10 }}
                            label="Value"
                            id="value"
                            className="custom-input w-full"
                            name="value"
                        >
                        </Input.TextArea>
                    </div>

                </div>

                <button className="default_button mt-4" type="submit">
                    Save
                </button>
            </Form>

        </div>
    );
};

export default StringAdd;