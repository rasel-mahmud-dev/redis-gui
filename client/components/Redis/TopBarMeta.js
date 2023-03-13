import React, {useState} from 'react';
import {Badge, Col, Row} from "antd";
import {FiArrowLeft} from "react-icons/fi";
import DatabaseSlats from "./DatabaseSlats/DatabaseSlats";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const TopBarMeta = () => {

    const { currentSelectedDb, connectedDatabaseId, connectedDbMeta} = useSelector((state) => state.redisTools)
    const {user} = useSelector((state) => state.auth)

    const router = useRouter()
    const {databaseId} = router.query

    function handleGoBack() {
        router.push("/")
    }

    return (
        <>
            <Row className="top-bar">
                <Col span={12}>

                    <h3 className="page-title flex items-center">
                        <FiArrowLeft size={20} onClick={handleGoBack} className="pointer"
                                     style={{marginRight: "12px"}}/>

                        <div className="flex items-center">
                            <span>{currentSelectedDb?.alias}</span>
                            <Badge className="ml-2 badge-big" size="default"
                                   status={(connectedDatabaseId && (databaseId === connectedDatabaseId)) ? "processing" : "default"}/>
                        </div>
                    </h3>

                </Col>
                <Col span={12} className="flex-right">
                    <DatabaseSlats meta={connectedDbMeta} username={user?.username}/>
                </Col>
            </Row>
            <div className="top-bar-space"></div>
        </>
    );
};

export default TopBarMeta;