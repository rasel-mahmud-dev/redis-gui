import React, {useEffect, useState} from 'react';
import RedisToolsLayout from "../../layout/RedisToolsLayout";
import {Col, Row, Space, Tooltip, Radio, Tag, Select, Input, Badge, Form, Button} from "antd";

import {useRouter} from "next/router";
import {FiArrowLeft} from "react-icons/fi";
import {MdMemory} from "react-icons/md";
import {BiKey, BiPlus, BiRefresh, BiSearch, BiUser} from "react-icons/bi";
import {useSelector} from "react-redux";
import {FaEllipsisH, FaEllipsisV, FaSearch} from "react-icons/fa";
import {HiBars3} from "react-icons/hi2";
import {TiTimes} from "react-icons/ti";
import AddKey from "../../components/AddKey";


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
    const {databases, currentSelectedDb} = useSelector((state) => state.redisTools)

    const [selectType, setSelectType] = useState("string")


    const router = useRouter()
    const {databaseId} = router.query

    const [isShowValues, setShowValues] = useState(false)


    function handleGoBack() {
        router.push("/")
    }

    useEffect(() => {
        if (databaseId) {
            let item = databases.find(db => db._id == databaseId)
            setSelectedDatabase(item)
        }
    }, [databaseId])

    let databaseKeys = [
        {name: "name", type: "string", size: "104 B"},
        {name: "list", type: "list", size: "104 B"},
        {name: "person", type: "hash", size: "104 B"},
        {name: "peoples", type: "list", size: "104 B"},
        {name: "stream", type: "stream", size: "104 B"},
    ]


    function handleOpenAddNewKey() {
        setShowValues(true)
    }


    return (
        <RedisToolsLayout>
            {selectedDatabase ? <div>
                <Row className="top-bar">
                    <Col span={12}>

                        <h3 className="page-title flex items-center">
                            <FiArrowLeft size={20} onClick={handleGoBack} className="pointer"
                                         style={{marginRight: "12px"}}/>
                            <span>{selectedDatabase.alias}</span>
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

                <div className="card w-full list-keys">

                    <div className="flex items-center justify-between">
                        <div className="flex items-center input-with-select">
                            <select>
                                {types.map(item => (
                                    <option>{item}</option>
                                ))
                                }
                            </select>
                            <input type="text" placeholder="Filer by key name "/>
                            <div className="icon">
                                <FaSearch/>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center input-with-select">
                                <HiBars3 size={22}/>
                            </div>


                            <div className="flex items-center input-with-select" onClick={handleOpenAddNewKey}>
                                <BiPlus size={22}/>
                                <span>Key</span>
                            </div>
                        </div>

                    </div>
                </div>


                <div style={{padding: "15px"}} className="flex justify-between gap-x-5">

                    <div className="card w-full list-keys">
                        <div className="flex items-center gap-x-2 justify-between">
                            <h4 style={{fontWeight: "600"}}>Total: {databaseKeys.length}</h4>
                            <div className="flex items-center gap-x-2 ">
                                <h4 style={{fontWeight: "600"}}>Last refresh: 3 min </h4>
                                <BiRefresh size={22}/>
                            </div>
                        </div>

                        {databaseKeys.map(item => (
                            <div className="flex list-item justify-between">
                                <div className="flex justify-start items-center w-full gap-x-10">
                                    <span className="list-type data-type">
                                        <Badge count={item.type} showZero color={colors[item.type.toLowerCase()]}/>
                                    </span>
                                    <span className="">{item.name}</span>
                                </div>

                                <div className="flex justify-end items-center w-full gap-x-10">
                                    <span className="">No limit</span>
                                    <span className="">{item.size}</span>
                                </div>
                            </div>

                        ))}

                    </div>

                    {isShowValues && <div className="card w-full">

                        <div className="flex items-center justify-between" style={{marginBottom: "15px"}}>
                            <h3 className="font-bold">New Key</h3>
                            <TiTimes size={21} onClick={() => setShowValues(false)}/>
                        </div>


                        <Form
                            name="basic"
                            autoComplete="off"
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

                            <AddKey dataType={selectType}/>


                        </Form>
                    </div>
                    }
                </div>

            </div> : (
                <div>
                    <h1>Please select a database</h1>
                </div>
            )}


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