import React, {useState} from 'react';
import {Form, Input} from "antd";


const StringAdd = ({selectType}) => {

    const [value, setValue] = useState([
        {field: "", value: ""}
    ])

    return (
        <div>

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

        </div>
    );
};

export default StringAdd;