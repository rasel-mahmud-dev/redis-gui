import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Input, message, Popconfirm, Select, Spin, Table} from "antd";
import {BiCheck, BiPencil, BiPlus, BiRefresh, BiSync, BiTrash} from "react-icons/bi";
import {TiTimes} from "react-icons/ti";
import moment from "moment/moment";


const ListValue = ({databaseId, keyName}) => {

    const [keyValue, setKeyValue] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [lastSyncDate, setLastSyncDate] = useState(new Date())
    const [size, setSize] = useState(200)

    const [newElement, setNewElement] = useState({
        order: 1,
        value: "",
        active: false
    })

    const [editMode, setEditMode] = useState(null)
    const [updateElementValue, setUpdateElementValue] = useState("")

    useEffect(() => {
        getValueForKey(keyName)
    }, [keyName])

    function getValueForKey(key) {
        setLoading(true)
        axios.get(`/databases/${databaseId}/list?key=` + key,).then(({status, data}) => {
            if (status === 200) {
                setKeyValue(data)
                setLastSyncDate(new Date())
            }
        }).catch(ex => {
            console.log(ex)
        }).finally(()=>{
            setLoading(false)
        })
    }

    function handleAddElement() {

        axios.post(`/databases/${databaseId}/list/push`, {
            key: keyName,
            value: newElement.value,
            order: Number(newElement.order)

        }).then(({data, status}) => {
            if (status === 201) {
                if (Number(newElement.order) === 1) {
                    setKeyValue(prev => ([
                        ...prev,
                        newElement.value
                    ]))
                } else {
                    setKeyValue(prev => ([
                        newElement.value,
                        ...prev,
                    ]))
                }
            }
            // close input element
            setNewElement({
                order: 1,
                value: "",
                active: false
            })
        }).catch(ex => {
            console.log(ex)
        })
    }

    function handleAddElementField() {
        setNewElement(prev => ({
            ...prev,
            active: true
        }))
    }

    function handleChangeOrder(value) {
        setNewElement(prev => ({...prev, order: value}))
    }

    function handleDeleteElement(value) {
        axios.post(`/databases/${databaseId}/list/delete`, {
            key: keyName,
            value

        }).then(({data, status}) => {
            if (Number(status === 201)) {
                setKeyValue(keyValue.filter((item) => item !== value))
            }
        }).catch(ex => {
            console.log(ex)
        })
    }

    function toggleEditModeForm(elementIndex) {
        setEditMode(elementIndex)
    }

    function closeUpdateElementForm() {
        setNewElement(prevState => ({
            ...prevState,
            active: false,
        }))
        setEditMode(null)
    }

    function handleUpdateElement() {
        if (!updateElementValue) {
            return message.error("Element value required.")
        }

        axios.put(`/databases/${databaseId}/list`, {
            key: keyName,
            value: updateElementValue,
            index: editMode

        }).then(({data, status}) => {
            if (status === 201) {
                keyValue[editMode] = updateElementValue
                setKeyValue(keyValue)
                setEditMode(null)
                setUpdateElementValue("")
            }
        }).catch(ex => {
            console.log(ex)
        })

    }


    function handleReSyncData() {
        setKeyValue([])
        getValueForKey(keyName)
    }


    return (
        <div>

            {/**** list values meta ****/}
            {!isLoading ? (
                    <>
                        <div className="flex justify-between gap-x-5 mb-4">
                            <div className="flex items-center gap-x-5">
                                <div className=" outline">
                                    {size} B
                                </div>
                                <div className=" outline">
                                    Length: {keyValue.length}
                                </div>
                            </div>

                            <div className="flex items-center gap-x-2">

                                <div className="flex items-center gap-x-2">
                                    <h4 style={{fontWeight: "600"}}>{moment().fromNow(lastSyncDate)}</h4>
                                    <button type="button" className="square-icon outline"
                                            onClick={handleReSyncData}>
                                        <BiRefresh fontSize={16}/>
                                    </button>
                                </div>

                                <button type="button" className="square-icon outline"
                                        onClick={handleAddElementField}>
                                    <BiPlus/>
                                </button>
                            </div>

                        </div>
                        <div className="list-value-table">

                            <div className="flex gap-x-5 items-center row row-head">
                                <label htmlFor="">Index</label>
                                <span>Element</span>
                            </div>

                            {keyValue.map((item, index) => (
                                <div className="flex  gap-x-5 items-center row">
                                    <label htmlFor="">{index}</label>
                                    <span className="flex justify-between items-center w-full">
                            <div className="w-full">
                                {(editMode !== null && editMode === index) ? (
                                    <>
                                        <Input onChange={(e) => setUpdateElementValue(e.target.value)}
                                               className="w-full" defaultValue={item} minRows={4} maxRows={6}
                                               handleCancel={() => {
                                               }} handleOk={handleUpdateElement}></Input>
                                        <div className="absolute action-ok-btn flex">
                                            <div className="square-icon" onClick={handleUpdateElement}><BiCheck/></div>
                                            <div className="square-icon"
                                                 onClick={closeUpdateElementForm}><TiTimes/>
                                            </div>
                                        </div>
                                    </>
                                ) : item
                                }

                            </div>
                            <div className="flex" style={{columnGap: "10px"}}>
                                <BiTrash onClick={() => handleDeleteElement(item)} fontSize={18} className="pointer"/>
                                <BiPencil onClick={() => toggleEditModeForm(index)} fontSize={18}
                                          className="pointer"/>
                            </div>
                        </span>
                                </div>
                            ))}

                            {newElement && newElement.active &&
                                <div className="flex  gap-x-5 items-center row add-new relative ">
                                    <div className="flex  gap-x-5 items-center w-full  ">
                                        <Select
                                            labelInValue={true}
                                            style={{width: '200px'}}
                                            defaultValue="1"
                                            onChange={handleChangeOrder}
                                            options={[
                                                {
                                                    value: '1',
                                                    label: 'Pull to tail',
                                                },
                                                {
                                                    value: '0',
                                                    label: 'Push to head',
                                                }
                                            ]}
                                        />

                                        <Input className="w-full" placeholder="Enter Element"
                                               onChange={(e) => setNewElement(prev => ({...prev, value: e.target.value}))}/>

                                    </div>
                                    <div className="absolute action-ok-btn flex">
                                        <div className="square-icon" onClick={handleAddElement}><BiCheck/></div>
                                        <div className="square-icon"
                                             onClick={() => setNewElement(prevState => ({...prevState, active: false}))}>
                                            <TiTimes/>
                                        </div>
                                    </div>
                                </div>}

                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center" style={{marginTop: "100px"}}>
                        <Spin/>
                    </div>
                )}
        </div>
    );
};

export default ListValue;