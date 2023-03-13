import React, {useEffect, useState} from 'react';
import InputWithValue from "../InputWithValue/InputWithValue";
import axios from "axios";
import {Input, message, Spin} from "antd";
import moment from "moment/moment";
import {BiCheck, BiPencil, BiPlus, BiRefresh, BiTrash} from "react-icons/bi";
import {handleDeleteKey} from "../../../actions/redisTools";
import CodeEditor from "../../CodeEditor/CodeEditor";
import {TiTimes} from "react-icons/ti";


const JsonVal = ({databaseId, keyName, onCloseShowValuePanel}) => {

    const [keyValue, setKeyValue] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [size, setSize] = useState(0)
    const [lastSyncDate, setLastSyncDate] = useState(new Date())
    const [isOpenEditForm, setOpenEditForm] = useState(false)


    const [inputVal, setInputVal] = useState("")
    const [isEditAble, setEditAble] = useState(false)


    useEffect(() => {
        getValueForKey(keyName)
    }, [keyName])

    function getValueForKey(key) {
        setLoading(true)
        axios.get(`/databases/${databaseId}/string?key=` + key,).then(({status, data}) => {
            if (status === 200) {
                setKeyValue(data.value)
                setSize(data.memorySize)
            }
        }).catch(ex => {
            console.log(ex)
        }).finally(() => {
            setLoading(false)
        })
    }


    function handleReSyncData() {
        getValueForKey(keyName)
    }


    function updateJsonString(){

        try{
            JSON.stringify(inputVal)
            axios.put(`/databases/${databaseId}/json`, {key: keyName, value: inputVal}).then(({data, status}) => {
                if (status === 201) {
                    setKeyValue(inputVal)
                    setSize(data.memorySize)
                }
            }).catch(ex => {
                console.log(ex)
            })


        } catch (ex){
           return  message.error("Please provide valid data")
        }

    }


    return (
        <div>
            {!isLoading ?

                (
                    <div>

                        <div className="flex justify-between gap-x-5 mb-4">
                            <div className="flex items-center gap-x-5">
                                <div className=" outline">
                                    {((size / 1024) || 0).toFixed(2)} KB
                                </div>
                                <div className=" outline">
                                    Length: {keyValue.length}
                                </div>
                            </div>

                            <div className="flex items-center gap-x-2">

                                <div className="flex items-center gap-x-2">
                                    <h4 style={{fontWeight: "600"}}>{moment().fromNow(lastSyncDate)}</h4>
                                    <button type="button" className="square-icon outline"
                                            onClick={handleReSyncData}
                                    >
                                        <BiRefresh fontSize={16}/>
                                    </button>
                                </div>

                                <button type="button" className="square-icon outline">
                                    <BiTrash size={16}
                                             onClick={() => handleDeleteKey(databaseId, keyName, onCloseShowValuePanel)}/>
                                </button>


                                <button type="button" className="square-icon outline"
                                        onClick={()=>setEditAble(true)}
                                >
                                    <BiPencil/>
                                </button>
                            </div>

                        </div>


                        <div className="relative w-full">
                            <div>
                                <CodeEditor
                                    editable={isEditAble}
                                    data={keyValue}
                                    setData={value => setInputVal(value)}
                                />
                                {isEditAble && (
                                    <div className="absolute bottom-30 right-0 flex">
                                        <div className="square-icon" onClick={updateJsonString}><BiCheck/></div>
                                        <div className="square-icon"
                                             onClick={() => setEditAble(false)}><TiTimes/>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>


                    </div>
                )

                : (
                    <div className="flex justify-center items-center" style={{marginTop: "100px"}}>
                        <Spin/>
                    </div>
                )}
        </div>
    );
};

export default JsonVal;