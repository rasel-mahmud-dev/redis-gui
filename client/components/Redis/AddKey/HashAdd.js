import React, {useState} from 'react';
import {Col, Form, Input, message, Row} from "antd";
import {BiPlus, BiTrash} from "react-icons/bi";
import axios from "axios";


const HashAdd = ({selectType, databaseId, doneAddKey, setAllkeysData, dataKeys}) => {
    const [hashValues, setHashValues] = useState([
        {field: "name", value: "test value"}
    ])

    function handleAddMoreInputField(valueType) {
        setHashValues([
            ...hashValues,
            {field: "", value: ""}
        ])
    }

    function handleDeleteItem(idx) {
        setHashValues(hashValues.filter((val, index) => index !== idx))
    }

    function onValueChange(inputType, index, value) {
        let updatedHashValues = [...hashValues]
        let hashItem = updatedHashValues[index]

        if (hashItem) {
            if (inputType === "value") {
                hashItem["value"] = value
            } else {
                hashItem["field"] = value
            }
            setHashValues(updatedHashValues)
        }
    }

    function handleAdd(values) {
        let keyName = values.keyName

        let updatedKeys = [...dataKeys]

        const existsIndex = updatedKeys.findIndex(item => item.key === keyName)
        if (existsIndex !== -1) {
            return message.error("This Key already exists")
        }


        let trimmedHashValues = []
        for (let hashValue of hashValues) {
            if (hashValue.value && hashValue.field) {
                trimmedHashValues.push({value: hashValue.value, field: hashValue.field})
            }
        }

        axios.post(`/databases/${databaseId}/hash`, {key: keyName, values: trimmedHashValues})
            .then(({
                       data,
                       status
                   }) => {
                if (status === 201) {
                    updatedKeys.push({
                        key: keyName,
                        dataType: "hash",
                        size: "104 B"
                    })
                    setAllkeysData(updatedKeys)
                    doneAddKey && doneAddKey()
                }
            }).catch(ex => {
            console.log(ex)
        })
    }

    function onFinishFailed() {

    }


    return (
        <Form
            name="basic"
            onFinish={handleAdd}
            onFinishFailed={onFinishFailed}
            layout="vertical"
        >
            <Form.Item
                style={{marginTop: "20px", marginBottom: "10px"}}
                label="Key Name"
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
                <label htmlFor="">Properties and Values</label>
                {hashValues.map((item, index) => (
                    <Row className="flex items-center gap-x-2" style={{marginBottom: "15px"}}>
                        <Col span={6}>
                            <Input value={hashValues[index].field}
                                   onChange={(e) => onValueChange("property", index, e.target.value)}
                                   className="custom-input" placeholder="Enter property"/>
                        </Col>
                        <Col span={16}>
                            <div className="flex items-center gap-x-2">
                                <Input value={hashValues[index].value}
                                       onChange={(e) => onValueChange("value", index, e.target.value)}
                                       className="custom-input" placeholder="Value"/>
                                {hashValues.length === (index + 1) ? (
                                    <button type="button" className="default_button"
                                            onClick={() => handleAddMoreInputField(selectType)}>
                                        <BiPlus/>
                                    </button>
                                ) : (
                                    <button type="button" onClick={() => handleDeleteItem(index)}
                                            className="default_button">
                                        <BiTrash/>
                                    </button>
                                )
                                }
                            </div>
                        </Col>
                    </Row>
                ))}
            </div>

            <button className="default_button" type="submit">
                Save
            </button>

        </Form>
    );
};

export default HashAdd