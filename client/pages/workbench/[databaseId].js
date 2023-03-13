import React from 'react';
import {Badge, Card, Col, Form, Modal, Row, Table} from "antd";
import {FiArrowLeft} from "react-icons/fi";
import DatabaseSlats from "../../components/Redis/DatabaseSlats/DatabaseSlats";
import {FaSearch} from "react-icons/fa";
import {HiBars3} from "react-icons/hi2";
import {BiPlus, BiRefresh} from "react-icons/bi";
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


const Workbench = () => {

    const router = useRouter()


    return (
        <div>
            <RedisToolsLayout>

                {/*/!**** Error Popup for mongodb redis database fetch failure *****!/*/}
                {/*<Modal className="add-database-modal" title="" onCancel={()=>setShowErrorMessage(false)} open={isShowErrorMessage}*/}
                {/*       footer={null}*/}
                {/*>*/}
                {/*    <h3 className="" style={{color: "#fa4b4b"}}>Database connection fail. Please check your internet</h3>*/}
                {/*</Modal>*/}


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


                <TopBarMeta  />


                </div>


            </RedisToolsLayout>
        </div>
    );
};

export default Workbench;