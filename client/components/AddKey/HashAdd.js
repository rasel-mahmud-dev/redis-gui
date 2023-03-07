import React, {useState} from 'react';
import {Form, Input} from "antd";
import {BiPlus} from "react-icons/bi";

const Hash = ({selectType}) => {

    const [hashValues, setHashValues]  = useState([
        {field: "name", value: "test value"}
    ])

    function handleAddMoreInputField(valueType){
        setHashValues([
            ...hashValues,
            {field: "", value: ""}
        ])
    }


    return (
        <div>
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
                <Input className="custom-input" />
            </Form.Item>



            <div className="mb-4">
                {hashValues.map((item)=>(
                    <div className="flex items-center gap-x-5 ">
                        <Input className="custom-input mt-4" placeholder="Enter field"/>
                        <Input className="custom-input mt-4" placeholder="Value" />
                    </div>
                ))}
                <div className="mt-4">
                    <button className="default_button" onClick={()=>handleAddMoreInputField(selectType)}>
                        <BiPlus/>
                    </button>
                </div>
            </div>

            <button className="default_button" type="submit">
                Save
            </button>
            
        </div>
    );
};

export default Hash;