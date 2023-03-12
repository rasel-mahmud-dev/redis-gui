import React, {useState} from 'react';
import {Form, Input} from "antd";
import {BiPlus, BiTrash} from "react-icons/bi";

const ListAdd = ({selectType}) => {

    const [listValues, setListValues] = useState([
        {1: ""}
    ])

    function handleAddMoreInputField(valueType) {
        setListValues(prev => ([
            ...prev,
            {[prev.length + 1]: "sdf"}
        ]))
    }

    function handleDeleteInputField(inputIndex){
        setListValues(listValues.filter((_, index)=> index !== inputIndex ))
    }


    return (
        <div>
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
                {listValues.map((item, index) => (
                    <div className="mt-4 flex items-center gap-x-5 justify-between">
                        <Input className="custom-input" placeholder="Enter value"/>
                        {index === listValues.length - 1 ? (
                            <button className="default_button" onClick={() => handleAddMoreInputField(selectType)}>
                                <BiPlus/>
                            </button>
                        ) : (
                            <button className="default_button" onClick={() => handleDeleteInputField(index)}>
                                <BiTrash/>
                            </button>
                        )
                        }

                    </div>
                ))}

            </div>

            <button className="default_button" type="submit">
                Save
            </button>

        </div>
    );
};

export default ListAdd;