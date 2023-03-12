import React from 'react';
import {Col, Row} from "antd";
import Link from "next/link";

const Header = () => {
    return (

        <div className="top-bar">
            <Row className="">
                <Col span={12}>
                    <Link href="/">
                        <h3 className="page-title">
                            My Redis Databases</h3>
                    </Link>
                </Col>
                <Col span={12} className="flex-right">
                    <h3 className="page-title">Redis DB</h3>
                </Col>
            </Row>

        </div>
    );
};

export default Header;