import React, {useEffect, useState} from 'react';
import InputWithValue from "../InputWithValue/InputWithValue";
import axios from "axios";
import {Spin} from "antd";


const StringVal = ({databaseId, keyName}) => {

    const [keyValue, setKeyValue] = useState("")
    const [isLoading, setLoading] = useState(false)


    useEffect(() => {
        getValueForKey(keyName)
    }, [keyName])

    function getValueForKey(key) {
        setLoading(true)
        axios.get(`/databases/${databaseId}/string?key=` + key,).then(({status, data}) => {
            if (status === 200) {
                setKeyValue(data)
            }
        }).catch(ex => {
            console.log(ex)
        }).finally(() => {
            setLoading(false)
        })
    }

    function handleOk(newValue, done) {
        axios.post(`/databases/${databaseId}/string`, {key: keyName, value: newValue}).then(({data, status}) => {
            if (status === 201) {
                setKeyValue(newValue)
                done()
            }
        }).catch(ex => {
            console.log(ex)
        })
    }


    return (
        <div>
            {!isLoading ?
                <InputWithValue handleOk={handleOk} defaultValue={keyValue} as="textarea" maxRows={10} minRows={6}
                                stringMaxHeight={400}/>

                : (
                    <div className="flex justify-center items-center" style={{marginTop: "100px"}}>
                        <Spin/>
                    </div>
                )}
        </div>
    );
};

export default StringVal;