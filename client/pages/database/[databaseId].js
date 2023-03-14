import React, {useEffect, useState} from 'react';
import RedisToolsLayout from "../../layout/RedisToolsLayout";
import {Col, Row, Badge, Form, Card, Table, Modal} from "antd";

import {useRouter} from "next/router";
import {FiArrowLeft} from "react-icons/fi";
import {BiPlus, BiRefresh, BiTrash} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {FaSearch} from "react-icons/fa";
import {HiBars3} from "react-icons/hi2";
import {TiTimes} from "react-icons/ti";
import AddKey from "../../components/Redis/AddKey";
import axios from "axios";
import DatabaseDetail from "../../components/Redis/Skeletons/DatabaseDetail";
import ActionTypes from "../../store/actionTypes";
import ShowKeyValues from "../../components/Redis/ShowKeyValues";
import moment from "moment";
import MySelect from "../../components/Redis/MySelect/MySelect";
import TopBarMeta from "../../components/Redis/TopBarMeta";

import {decrementKeys, incrementKeys} from "../../actions/redisTools"


export const colors = {
    string: "#52c41a",
    hash: "#1890ff",
    list: "#ff23ef",
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

    const { currentSelectedDb, connectedDatabaseId, connectedDbMeta } = useSelector((state) => state.redisTools)
    const {user} = useSelector((state) => state.auth)

    const [isShowErrorMessage, setShowErrorMessage] = useState(false)


    const [selectType, setSelectType] = useState("string")
    const [lastRefresh, setLastRefresh] = useState(new Date())


    // {key: "name", dataType: "string", size: "104 B"}[],
    const [allKeys, setAllKeys] = useState([])

    const [isDatabaseConnectionFail, setDatabaseConnectionFail] = useState(false)


    const dispatch = useDispatch()


    const router = useRouter()

    const {databaseId} = router.query

    const [isShowForm, setShowForm] = useState("")
    const [showKey, setShowKey] = useState("")


    // fetch database and connect redis database from this database info
    useEffect(() => {

        if (databaseId) {

            axios.get("/databases/" + databaseId).then(({status, data: data2}) => {
                if (status === 200) {
                    dispatch({
                        type: ActionTypes.SET_CURRENT_SELECTED_DB,
                        payload: data2
                    })

                    //  connect redis database
                    axios.get(`/databases/${databaseId}/connect`).then(({status, data: responseData}) => {
                        if (status === 201) {
                            // redis database connected
                            dispatch({
                                type: ActionTypes.SET_ACTIVE_DATABASE_CONNECTION,
                                payload: {
                                    databaseId: responseData.databaseId,
                                    connectedDbMeta:  responseData.connectedDbMeta,
                                }
                            })
                        } else {
                            setDatabaseConnectionFail(true)
                        }
                    }).catch(ex => {
                        // database connection fail
                        setDatabaseConnectionFail(true)
                    })
                }
            }).catch(ex => {
                setShowErrorMessage(true)

            })
        }

    }, [databaseId])


    // fetch all database keys
    function fetchAllKeys(databaseId, connectedDatabaseId) {

        if (databaseId === connectedDatabaseId) {
            // get all database keys

            axios.get(`/databases/${connectedDatabaseId}/keys`).then(({data, status}) => {
                if (status === 200) {
                    setLastRefresh(new Date())
                    setAllKeys(data)
                }
            }).catch(ex => {
                console.log(ex)
            })
        }
    }

    useEffect(() => {
        fetchAllKeys(databaseId, connectedDatabaseId)
    }, [databaseId, connectedDatabaseId])


    function handleOpenShowKeyValue(key, dataType) {
        setShowForm("value")
        setShowKey(key)
        setSelectType(dataType)
    }

    function handleChangeKeyName(oldName, newName) {
        let updatedKeys = [...allKeys]
        let changeKeyIndex = updatedKeys.findIndex(key => key.key === oldName)
        if (changeKeyIndex !== -1) {
            updatedKeys[changeKeyIndex] = {
                ...updatedKeys[changeKeyIndex],
                key: newName
            }
        }

        // update state
        setAllKeys(updatedKeys)
    }

    function handleCloseShowValue() {
        setShowKey("")
        setShowForm("")
    }

    // re-fetch all redis keys
    function handleRefetchKeys() {
        setShowForm("")
        setAllKeys([])
        fetchAllKeys(databaseId, connectedDatabaseId)
    }

    // after completed add key
    function handleDoneAddKey() {
        setShowForm("")
        setShowKey("")

        // increment keys number
        dispatch(incrementKeys())
    }

    // handledelete key
    function handleDeleteKey(e, key) {
        e.stopPropagation();

        axios.post(`/databases/${databaseId}/keys/delete`, {keys: [key]}).then(({data, status}) => {
            if (status === 201) {
                setAllKeys(allKeys.filter(item => item.key !== key))
                dispatch(decrementKeys())
            }
        }).catch(ex => {
            console.log(ex)
        })
    }

    function removeKey(key){
        setAllKeys(allKeys.filter(item => item.key !== key))
        dispatch(decrementKeys())
    }




    const columns = [
        {
            title: 'Type',
            dataIndex: 'dataType',
            key: 'dataType',
            width:  '120px',
            sorter: (a, b) => a.dataType > b.dataType ? 1 : a.dataType < b.dataType ? -1 : 0,
            render: (_, item) => <div>
                    <span className="list-type data-type">
                        <Badge
                            count={item.dataType} showZero
                            color={colors[item?.dataType?.toLowerCase()]}/>
                    </span>
            </div>
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => a.key > b.key ? 1 : a.key < b.key ? -1 : 0,
            render: (key, item) => (
                <a onClick={() => handleOpenShowKeyValue(key, item.dataType)}>
                    {key}
                </a>
            )
        },
        {
            title: 'TTL',
            dataIndex: 'ttl',
            key: 'ttl',
            render: (_) => (
                <div>
                    No limit
                </div>
            )
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: (size) => (
                <div>
                    {((size / 1024) || 0).toFixed(2)} KB
                </div>
            )
        },

        {
            title: 'Actions',
            dataIndex: '',
            key: '',
            className: "text-end",
            render: (_, item) => (
                <BiTrash size={16} onClick={(e) => handleDeleteKey(e, item.key)}/>
            )
        },
    ];


    return (
        <RedisToolsLayout>

            {/**** Error Popup for mongodb redis database fetch failure *****/}
            <Modal className="add-database-modal" title="" onCancel={() => setShowErrorMessage(false)}
                   open={isShowErrorMessage}
                   footer={null}
            >
                <h3 className="" style={{color: "#fa4b4b"}}>Database connection fail. Please check your internet</h3>
            </Modal>


            {/**** Error Popup for redis cluster connection failure ****/}
            <Modal className="add-database-modal" title="" cancelButtonProps={null} open={isDatabaseConnectionFail}
                   footer={[
                       <button
                           className="default_button" onClick={() => router.push("/")}
                       >
                           Check Connection URL
                       </button>,
                   ]}
            >
                <h3 className="" style={{color: "#fa4b4b"}}>Database connection fail. Please check host name, port
                    number for this connection.</h3>
            </Modal>

            <div>
                <TopBarMeta  />

                <div className="" style={{marginLeft: "60px"}}>
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


                    {currentSelectedDb ?
                        <div style={{padding: "15px"}} className="flex justify-between gap-x-5 w-full">

                            <div className="card w-full list-keys">
                                <div className="flex items-center gap-x-2 justify-between">
                                    <h4 style={{fontWeight: "600"}}>Total: {connectedDbMeta?.totalKeys}</h4>
                                    <div className="flex items-center gap-x-2 ">
                                        <h4 style={{fontWeight: "600"}}>Last
                                            refresh: {moment().fromNow(lastRefresh)} </h4>
                                        <div className="square-icon outline" onClick={handleRefetchKeys}>
                                            <BiRefresh size={16}/>
                                        </div>
                                    </div>
                                </div>


                                {/******* render all redis keys ******/}
                                <Table dataSource={allKeys} columns={columns} loading={allKeys.length === 0}/>

                            </div>


                            {/******* add redis key form ******/}
                            {isShowForm === "add" && (
                                <div className="card w-full">
                                    <div className="flex items-center justify-between" style={{marginBottom: "15px"}}>
                                        <h3 className="font-bold">New Key</h3>
                                        <div className="square-icon outline">
                                            <TiTimes size={21} onClick={() => setShowForm("")}/>
                                        </div>
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
                                        dataKeys={allKeys}
                                        setAllkeysData={setAllKeys}
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
                                    onCloseShowValuePanel={(key)=>{setShowForm(""); removeKey(key) }}
                                    onKeyNameChange={handleChangeKeyName}
                                    onCloseShowValue={handleCloseShowValue}
                                    showKey={showKey}
                                    connectedDatabaseId={connectedDatabaseId}
                                    databaseId={databaseId}
                                    data={allKeys}
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
            </div>


        </RedisToolsLayout>
    );
};


export default Database;