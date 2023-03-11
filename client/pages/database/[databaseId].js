import React, {useEffect, useState} from 'react';
import RedisToolsLayout from "../../layout/RedisToolsLayout";
import {Col, Row, Space, Tooltip, Radio, Tag, Select, Input, Badge, Form, Button, Card} from "antd";

import {useRouter} from "next/router";
import {FiArrowLeft} from "react-icons/fi";
import {MdMemory} from "react-icons/md";
import {BiKey, BiPlus, BiRefresh, BiSearch, BiTrash, BiUser} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {FaEllipsisH, FaEllipsisV, FaSearch} from "react-icons/fa";
import {HiBars3} from "react-icons/hi2";
import {TiTimes} from "react-icons/ti";
import AddKey from "../../components/AddKey";
import axios from "axios";
import DatabaseDetail from "../../components/Skeletons/DatabaseDetail";
import ActionTypes from "../../store/actionTypes";
import ShowKeyValues from "../../components/ShowKeyValues";


export const colors = {
    string: "#52c41a",
    hash: "#1890ff",
    list: "#d9d9d9",
    stream: "#faad14",
    json: "#ff4d4f",
}

export const types = [
    "string",
    "list",
    "hash",
    "stream",
    "json"
]


const Database = () => {

    const [selectedDatabase, setSelectedDatabase] = useState(null)
    const {databases, connectedDatabaseId} = useSelector((state) => state.redisTools)

    const [selectType, setSelectType] = useState("string")

    const [data, setData] = useState({
        keys: [],  // {key: "name", dataType: "string", size: "104 B"}[],
        total: 0
    })


    const dispatch = useDispatch()


    const router = useRouter()

    const {databaseId} = router.query

    const [isShowForm, setShowForm] = useState("")
    const [showKey, setShowKey] = useState("")


    function handleGoBack() {
        router.push("/")
    }

    // fetch database and connect redis database from this database info
    useEffect(() => {

        if (databaseId) {
            axios.get("/databases/" + databaseId).then(({status, data}) => {
                if (status === 200) {
                    setSelectedDatabase(data)

                    //  connect redis database
                    axios.get(`/databases/${databaseId}/connect`).then(({status, data}) => {
                        if (status === 201) {
                            // redis database connected
                            dispatch({
                                type: ActionTypes.SET_ACTIVE_DATABASE_CONNECTION,
                                payload: data.databaseId
                            })
                        }
                    }).catch(ex => {
                        // database connection fail
                    })
                }
            }).catch(ex => {

            })
        }

    }, [databaseId])


    // fetch all database keys
    function fetchAllKeys(databaseId, connectedDatabaseId){
        if (databaseId === connectedDatabaseId) {
            // get all database keys

            axios.get(`/databases/${connectedDatabaseId}/keys`).then(({data, status}) => {
                if (status === 200) {
                    setData(data)
                }
            }).catch(ex => {
                console.log(ex)
            })
        }
    }

    useEffect(() => {
        fetchAllKeys(databaseId, connectedDatabaseId)
    }, [databaseId, connectedDatabaseId])


    function handleOpenShowKeyValue(key) {
        setShowForm("value")
        setShowKey(key)
    }

    function handleChangeKeyName(oldName, newName){
        let updatedKeys = [...data.keys]
        let changeKeyIndex = updatedKeys.findIndex(key=>key.key === oldName)
        if(changeKeyIndex !== -1){
            updatedKeys[changeKeyIndex] = {
                ...updatedKeys[changeKeyIndex],
                key: newName
            }
        }

        // update state
        setData((prevState)=>({
            ...prevState,
            keys: updatedKeys
        }))

        console.log(updatedKeys)
    }

    function handleCloseShowValue(){
        setShowKey("")
        setShowForm("")
    }

    // re-fetch all redis keys
    function handleRefetchKeys(){
        fetchAllKeys(databaseId, connectedDatabaseId)
    }

    // after completed add key
    function handleDoneAddKey(){
        setShowForm("")
        setShowKey("")
    }

    // handledelete key
    function handleDeleteKey(e, key){
        e.stopPropagation();

        axios.post(`/databases/${databaseId}/keys/delete`, {keys: [key]} ).then(({data, status})=>{
            if(status === 201){
                setData(prevState => ({
                    total: prevState.total - 1,
                    keys: prevState.keys.filter(item=>item.key !== key)
                }))
            }
        }).catch(ex=>{
            console.log(ex)
        })
    }



    return (
        <RedisToolsLayout>
            <div>
                <Row className="top-bar">
                    <Col span={12}>

                        <h3 className="page-title flex items-center">
                            <FiArrowLeft size={20} onClick={handleGoBack} className="pointer"
                                         style={{marginRight: "12px"}}/>

                            <div className="flex items-center">
                                <span>{selectedDatabase?.alias}</span>
                                <Badge className="ml-2 badge-big" size="default"
                                       status={(connectedDatabaseId && (databaseId === connectedDatabaseId)) ? "processing" : "default"}/>
                            </div>
                        </h3>

                    </Col>
                    <Col span={12} className="flex-right">

                        <ul className="flex items-center link-item" style={{columnGap: "30px"}}>
                            <li className="">
                                <Tooltip title="1.11 % CPU" className="flex items-center gap-x-2">
                                    <MdMemory/>
                                    <span>1.11 %</span>
                                </Tooltip>
                            </li>

                            <li className="">
                                <Tooltip title="10.11 % MEMORY" className="flex items-center gap-x-2">
                                    <MdMemory/>
                                    <span>10.11 %</span>
                                </Tooltip>
                            </li>

                            <li className="">
                                <Tooltip title="Keys 12" className="flex items-center gap-x-2">
                                    <BiKey/>
                                    <span>12</span>
                                </Tooltip>
                            </li>


                            <li>
                                <Tooltip title="Client connected 4" className="flex items-center gap-x-2">
                                    <BiUser/>
                                    <span>4</span>
                                </Tooltip>
                            </li>

                            <li className="flex items-center gap-x-2">
                                <FaEllipsisV/>
                            </li>
                        </ul>
                    </Col>
                </Row>

                <Card className="w-full list-keys">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center input-with-select">
                            <select>
                                {types.map(item => (
                                    <option>{item}</option>
                                ))
                                }
                            </select>
                            <input type="text" placeholder="Filer by key name"/>
                            <div className="icon">
                                <FaSearch/>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center input-with-select">
                                <HiBars3 size={22}/>
                            </div>


                            <div className="flex items-center input-with-select" onClick={() => setShowForm("add")}>
                                <BiPlus size={22}/>
                                <span>Key</span>
                            </div>
                        </div>

                    </div>
                </Card>

                {selectedDatabase ?
                    <div style={{padding: "15px"}} className="flex justify-between gap-x-5 w-full">

                        <div className="card w-full list-keys">
                            <div className="flex items-center gap-x-2 justify-between">
                                <h4 style={{fontWeight: "600"}}>Total: {data.total}</h4>
                                <div className="flex items-center gap-x-2 ">
                                    <h4 style={{fontWeight: "600"}}>Last refresh: 3 min </h4>
                                    <div className="square-icon outline" onClick={handleRefetchKeys}>
                                        <BiRefresh size={20}/>
                                    </div>
                                </div>
                            </div>

                            {data.keys?.map((item) => (
                                <div className="flex list-item justify-between"
                                     onClick={() => handleOpenShowKeyValue(item.key)}>
                                    <div className="flex justify-start items-center w-full gap-x-10">
                                    <span className="list-type data-type">
                                        <Badge count={item.dataType} showZero
                                               color={colors[item?.dataType?.toLowerCase()]}/>
                                    </span>
                                        <span className="">{item.key}</span>
                                    </div>

                                    <div className="flex justify-end items-center w-full gap-x-10">
                                        <span className="">No limit</span>
                                        <span className="">{item.size}</span>

                                        <BiTrash size={16} onClick={(e)=>handleDeleteKey(e, item.key)}/>

                                    </div>



                                </div>

                            ))}
                        </div>

                        {isShowForm === "add" && (
                            <div className="card w-full">
                                <div className="flex items-center justify-between" style={{marginBottom: "15px"}}>
                                    <h3 className="font-bold">New Key</h3>
                                    <TiTimes size={21} onClick={() => setShowForm("add")}/>
                                </div>

                                <Form
                                    name="basic"
                                    layout="vertical"
                                >

                                    <label htmlFor="">Data Type</label>
                                    <MySelect
                                        onChange={(type) => setSelectType(type)}
                                        optionRender={(onChange) => (
                                            <div>
                                                {types.map((item, index) => (
                                                    <li onClick={() => onChange(item)}>
                                                        <Badge className="badge-big" style={{marginRight: "10px"}}
                                                               color={colors[item]}/>
                                                        {item.toUpperCase()}
                                                    </li>
                                                ))}
                                            </div>
                                        )}

                                        defaultValue={() => (
                                            <div>
                                                <Badge className="badge-big" style={{marginRight: "10px"}}
                                                       color={colors[selectType]}/>
                                                {selectType.toUpperCase()}
                                            </div>
                                        )}
                                    >

                                    </MySelect>

                                </Form>

                                {/******* add new redis key with value ******/}
                                <AddKey
                                    dataKeys={data}
                                    setAllkeysData={setData}
                                    databaseId={databaseId}
                                    dataType={selectType}
                                    doneAddKey={handleDoneAddKey}
                                />

                            </div>
                        )
                        }

                        {/******** show redis key value *******/}
                        {isShowForm === "value" && <div className="card w-full">
                            <ShowKeyValues
                                onKeyNameChange={handleChangeKeyName}
                                onCloseShowValue={handleCloseShowValue}
                                showKey={showKey}
                                connectedDatabaseId={connectedDatabaseId}
                                databaseId={databaseId}
                                data={data}
                                selectType={selectType}
                            />
                        </div>
                        }

                    </div>
                    : (
                        <Card style={{padding: "15px"}}>
                            <DatabaseDetail/>
                        </Card>
                    )}
            </div>


        </RedisToolsLayout>
    );
};


function MySelect({optionRender, onChange, defaultValue}) {

    const [isOpen, setOpen] = useState(false)

    function handleChoose(item) {
        onChange && onChange(item)
        setOpen(false)
    }

    return (
        <div className="my_select">
            <div onClick={() => setOpen(!isOpen)}>
                {defaultValue()}
            </div>
            {isOpen ? <div className="options"> {optionRender(handleChoose)}</div> : null}
        </div>
    )
}

export default Database;