import React, {useState} from 'react';
import {Form, Input, message} from "antd";
import {BiPlus, BiTrash} from "react-icons/bi";
import axios from "axios";


const ListAdd = ({selectType, databaseId, doneAddKey, setAllkeysData, dataKeys}) => {

    const [listValues, setListValues] = useState({
        1: ""
    })

    let updatedKeys = [...dataKeys.keys]


    function handleAddMoreInputField() {
        setListValues(prev => ({
            ...prev,
            [Date.now()]: ""
        }))
    }

    function handleDeleteInputField(key) {
        let updatedListValues = {...listValues}
        delete updatedListValues[key]
        setListValues(updatedListValues)
    }


    function handleAdd(data) {
        let keyName = data.keyName


        const existsIndex = updatedKeys.findIndex(item=>item.key === keyName)
        if(existsIndex !== -1){
            return message.error("This Key already exists")
        }


        let values = []
        for (let listValuesKey in listValues) {
            if (listValues[listValuesKey]) {
                values.push(listValues[listValuesKey])
            }
        }

        axios.post(`/databases/${databaseId}/list`, {key: keyName, list: values}).then(({data, status}) => {
            if(status === 201){
                updatedKeys.push({
                    key: keyName,
                    dataType: "list",
                    size: "104 B"
                })
                setAllkeysData(prev => ({
                    ...prev,
                    total: prev.total + 1,
                    keys: updatedKeys
                }))

                doneAddKey && doneAddKey()
            }
        }).catch(ex => {
            console.log(ex)
        })

    }


    // handle error.
    function onFinishFailed(error) {

    }

    function handleInputValueChange(e, key) {
        let val = e.target.value
        setListValues((prev) => ({
            ...prev,
            [key]: val
        }))
    }


    return (
        <div>
            <Form
                name="basic"
                onFinish={handleAdd}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                <Form.Item
                    style={{marginTop: "20px", marginBottom: "10px"}}
                    label="List Name"
                    name="keyName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input key name!',
                        },
                    ]}
                >
                    <Input className="custom-input"/>
                </Form.Item>


                <div className="mb-4 mt-4">
                    {Object.keys(listValues).map((key, index) => (
                        <div className="mt-4 flex items-center gap-x-5 justify-between">
                            <Input onChange={(e) => handleInputValueChange(e, key)} className="custom-input"
                                   placeholder="Enter value" value={listValues[key]}/>
                            {Object.keys(listValues).length === (index + 1) ? (
                                <button type="button" className="default_button"
                                        onClick={() => handleAddMoreInputField(selectType)}>
                                    <BiPlus/>
                                </button>
                            ) : (
                                <button type="button" className="default_button"
                                        onClick={() => handleDeleteInputField(key)}>
                                    <BiTrash/>
                                </button>
                            )
                            }

                        </div>
                    ))}

                </div>

                <button className="default_button mt-4" type="submit">
                    Save
                </button>
            </Form>

        </div>
    );
};

export default ListAdd;