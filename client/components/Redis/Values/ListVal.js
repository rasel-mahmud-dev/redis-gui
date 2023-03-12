import React, {useEffect, useState} from 'react';
import InputWithValue from "../InputWithValue/InputWithValue";
import axios from "axios";
import {Input, Popconfirm, Select, Table} from "antd";
import {BiCheck, BiPencil, BiPlus, BiTrash} from "react-icons/bi";
import {TiTimes} from "react-icons/ti";


const ListValue = ({databaseId, keyName}) => {

    const [keyValue, setKeyValue] = useState([])
    const [size, setSize] = useState(200)

    const [newElement, setNewElement] = useState({
        order: 1,
        value: "",
        active: false
    })


    useEffect(() => {
        getValueForKey(keyName)
    }, [keyName])

    function getValueForKey(key) {
        axios.get(`/databases/${databaseId}/list?key=` + key,).then(({status, data}) => {
            if (status === 200) {
                setKeyValue(data)
            }
        }).catch(ex => {
            console.log(ex)
        })
    }

    function handleAddElement() {

        axios.post(`/databases/${databaseId}/list/push`, {
            key: keyName,
            value: newElement.value,
            order: Number(newElement.order)

        }).then(({data, status}) => {
            if (Number(status === 201)) {
                if (newElement.order === 1) {
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

    function handleDeleteElement(value){
        axios.post(`/databases/${databaseId}/list/delete`, {
            key: keyName,
            value

        }).then(({data, status}) => {
            if (Number(status === 201)) {
                setKeyValue(keyValue.filter((item)=> item !== value))
            }
        }).catch(ex => {
            console.log(ex)
        })
    }

    function handleUpdateElement(index){

    }


    return (
        <div>

            {/**** list values meta ****/}
            <div className="flex justify-between gap-x-5 mb-4">

                <div className="flex items-center gap-x-5">
                    <div className=" outline">
                        {size} B
                    </div>
                    <div className=" outline">
                        Length: {keyValue.length}
                    </div>
                </div>

                <button type="button" className="square-icon outline"
                        onClick={handleAddElementField}>
                    <BiPlus/>
                </button>

            </div>

            <div className="list-value-table">

                <div className="flex  gap-x-5 items-center row row-head">
                    <label htmlFor="">Index</label>
                    <span>Element</span>
                </div>

                {keyValue.map((item, index) => (
                    <div className="flex  gap-x-5 items-center row">
                        <label htmlFor="">{index}</label>
                        <span className="flex justify-between items-center">
                            <p>{item}</p>
                            <div className="flex" style={{columnGap: "10px"}}>
                                <BiTrash onClick={()=>handleDeleteElement(item)} fontSize={18} className="pointer"/>
                                <BiPencil onClick={() => handleUpdateElement(item._id)} fontSize={18} className="pointer"/>
                            </div>
                        </span>
                    </div>
                ))}

                {newElement && newElement.active && <div className="flex  gap-x-5 items-center row add-new relative ">
                    <div className="flex  gap-x-5 items-center w-full  ">
                        <Select
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
                             onClick={() => setNewElement(prevState => ({...prevState, active: false}))}><TiTimes/>
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    );
};

export default ListValue;