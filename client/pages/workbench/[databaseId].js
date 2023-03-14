import React, {useState} from 'react';
import {Badge, Card, Col, Form, Modal, Row, Spin, Table} from "antd";
import {FiArrowLeft} from "react-icons/fi";
import DatabaseSlats from "../../components/Redis/DatabaseSlats/DatabaseSlats";
import {FaPlay, FaSearch} from "react-icons/fa";
import {HiBars3} from "react-icons/hi2";
import {BiPlus, BiRefresh, BiTime, BiTrash} from "react-icons/bi";
import moment from "moment/moment";
import {TiTimes} from "react-icons/ti";
import MySelect from "../../components/Redis/MySelect/MySelect";
import AddKey from "../../components/Redis/AddKey";
import ShowKeyValues from "../../components/Redis/ShowKeyValues";
import DatabaseDetail from "../../components/Redis/Skeletons/DatabaseDetail";
import RedisToolsLayout from "../../layout/RedisToolsLayout";
import {colors, types} from "../database/[databaseId]";
import {useRouter} from "next/router";
import TopBarMeta from "../../components/Redis/TopBarMeta";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import axios from "axios";
import {useSelector} from "react-redux";
import {handleDeleteKey} from "../../actions/redisTools";


const Workbench = () => {

    const router = useRouter()
    const {databaseId} = router.query

    const [value, setValue] = useState("")
    const [result, setResult] = useState("")
    const [executeTime, setExecuteTime] = useState(0)
    const [error, setError] = useState('')
    const [isRedisConnectionError, setRedisConnectionError] = useState(false)

    const {currentSelectedDb, connectedDatabaseId, connectedDbMeta} = useSelector((state) => state.redisTools)

    const [isLoading, setLoading] = useState(false)


    function runCommand() {
        if(!connectedDatabaseId){
            return setRedisConnectionError(true)
        }
        let startDate = new Date()
        setLoading(true)
        setResult("")
        axios.post(`/databases/${connectedDatabaseId}/run`, {raw: value}).then(({data, status}) => {
            if (status === 200) {
                setResult(data)
            }
            setExecuteTime(new Date() - startDate)
        }).catch(ex => {
            setError("Invalid Command")
        }).finally(() => {

            setLoading(false)
        })
    }

    function handleReSyncData() {
        runCommand()
    }


    return (
        <div>
            <RedisToolsLayout>

                {/*/!**** Error Popup for mongodb redis database fetch failure *****!/*/}
                <Modal className="add-database-modal" title="" onCancel={()=>setRedisConnectionError(false)} open={isRedisConnectionError}
                       footer={null}
                >
                    <h3 className="" style={{color: "#fa4b4b"}}>Your cluster is not connected. Please connect first</h3>
                </Modal>


                {/*/!**** Error Popup for redis cluster connection failure ****!/*/}
                {/*<Modal className="add-database-modal" title="" cancelButtonProps={null} open={isDatabaseConnectionFail}*/}
                {/*       footer={[*/}
                {/*           <button*/}
                {/*               className="default_button" onClick={()=>router.push("/")}*/}
                {/*           >*/}
                {/*               Check Connection URL*/}
                {/*           </button>,*/}
                {/*       ]}*/}
                {/*>*/}
                {/*    <h3 className="" style={{color: "#fa4b4b"}}>Database connection fail. Please check host name, port number for this connection.</h3>*/}
                {/*</Modal>*/}

                <div>

                    <TopBarMeta/>
                    <div className="workbench" style={{marginLeft: "60px"}}>
                        <div className="card w-full list-keys ">

                            <h4 className="page-title mb-2">Workbench</h4>
                            <div>
                                <CodeMirror
                                    value={""}
                                    height="200px"
                                    extensions={[javascript({jsx: true})]}
                                    onChange={(v) => setValue(v)}
                                    className="codeeditor"
                                />
                                <button className="default_button flex items-center gap-x-2 mt-4" onClick={runCommand}>
                                    <span>Execute</span>
                                    <FaPlay/>
                                </button>
                            </div>

                        </div>


                        <div className="card w-full list-keys mt-8 result ">
                            <div className="header flex justify-between items-center">
                                <h4 className="page-title">Result for <span className="bg-code">{value}</span></h4>

                                <div className="flex items-center gap-x-2 right-menu">

                                    <div className="flex items-center gap-x-2">
                                        <BiTime fontSize={20}/>
                                        <div>{(executeTime / 1000).toFixed(2)}seconds</div>
                                    </div>

                                    <div className="flex items-center gap-x-2">
                                        <div>{result.length} Char</div>
                                    </div>


                                    <button type="button" className="square-icon"
                                            onClick={handleReSyncData}>
                                        <BiRefresh fontSize={16}/>
                                    </button>

                                </div>
                            </div>

                            {isLoading ? (
                                <div className="loading-wrapper">
                                    <Spin/>
                                </div>
                            ) : (
                                <div>
                                    {result && <div className="out">
                                    <pre>
                                    {result}
                                        </pre>
                                    </div>}
                                    {error && <div className="out">
                                        {error} <span className="bg-code">{value}</span>
                                    </div>}
                                </div>
                            )}


                        </div>

                    </div>
                </div>


            </RedisToolsLayout>
        </div>
    );
};

export default Workbench;