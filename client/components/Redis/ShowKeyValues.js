import React, {useEffect, useState} from 'react';
import {Badge, Input, message} from "antd";
import {colors} from "../../pages/database/[databaseId]";
import {BiCheck} from "react-icons/bi";
import {TiTimes} from "react-icons/ti";
import axios from "axios";

import StringVal from "./Values/StringVal";
import ListValue from "./Values/ListVal";
import HashVal from "./Values/HashVal";



const ShowKeyValues = (props) => {

    const { connectedDatabaseId, databaseId, onCloseShowValue, showKey, selectType, onKeyNameChange } = props

    const [keyState, setKeyState] = useState({
        isEditAble: false,
        value: "",
        preValue: ""
    })

    useEffect(() => {
        setKeyState({
            isEditAble: false,
            value: showKey,
            preValue: showKey,
        })

    }, [showKey, databaseId, selectType])


    function handleKeyNameChange(e) {
        setKeyState((prev) => {
            return {
                ...prev,
                value: e.target.value
            }
        })
    }

    function handleUpdateKey() {
        axios.put(`/databases/${databaseId}/key`, {
            oldKey: keyState.preValue,
            newName: keyState.value
        }).then(({data, status}) => {
            if (status === 201) {
                // update also key from parent component.
                onKeyNameChange(keyState.preValue, keyState.value)
                setKeyState((prev) => ({
                    ...prev,
                    preValue: keyState.value,
                    isEditAble: false,
                }))
            }

        }).catch((ex) => {
            message.error(ex?.response?.data?.message)
        })
    }


    const mapAddKey = {
        string: StringVal,
        hash: HashVal,
        list: ListValue,
    }

    const Component = mapAddKey[selectType]


    return (
        <div>
            <div className="flex items-center justify-between gap-x-5 border-b pb-4">
                <div className="flex items-center gap-x-2 w-full">
                    <Badge count={selectType.toUpperCase()} showZero color={colors[selectType?.toLowerCase()]}/>
                    <div className="relative w-full">
                        {keyState.isEditAble
                            ? <div>
                                <Input onChange={handleKeyNameChange} className="custom-input pointer"
                                       defaultValue={keyState.value}/>
                                <div className="absolute top-32 right-0 flex">
                                    <div className="square-icon" onClick={handleUpdateKey}><BiCheck/></div>
                                    <div className="square-icon"
                                         onClick={() => setKeyState((p) => ({...p, isEditAble: false}))}><TiTimes/>
                                    </div>
                                </div>
                            </div>
                            : <div className="pointer" onClick={() => setKeyState((p) => ({
                                ...p,
                                isEditAble: true
                            }))}>{keyState.value}</div>}
                    </div>
                </div>

                <div className="square-icon outline" onClick={onCloseShowValue}><TiTimes/></div>
            </div>

            {/***** key content ******/}
           <div className="mt-4">
               <Component databaseId={databaseId} keyName={showKey} />
           </div>

        </div>
    );
};

export default ShowKeyValues;