import React from 'react';
import {Avatar, Col, Dropdown, Menu, Row, Space} from "antd";
import Link from "next/link";
import AuthDropdown from "./AuthDropdown";
import {FaSignInAlt} from "react-icons/fa";
import {useSelector} from "react-redux";

const Header = () => {

    const {isAuthenticated, user} = useSelector(state => state.auth)

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
                    <div className="flex items-center gap-x-2">
                        <h3 className="page-title">Redis DB</h3>
                        {isAuthenticated ? (
                            <AuthDropdown username={user?.username}>
                                <Avatar/>
                            </AuthDropdown>
                        ) : (
                            <Link href="/login">
                                <button className="default_button flex items-center gap-x-2 ">
                                    <span>Login</span>
                                    <FaSignInAlt/>
                                </button>
                            </Link>
                        )}
                    </div>
                </Col>
            </Row>

        </div>
    );
};

export default Header;