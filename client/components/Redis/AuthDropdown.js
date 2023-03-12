import React from 'react';
import { Dropdown, Menu, Space} from "antd";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

const AuthDropdown = ({children, username}) => {


    const dispatch = useDispatch()
    const router = useRouter()

    function handleLogout() {
        dispatch({
            type: "LOGOUT"
        })
        localStorage.removeItem("token")
        router.push("/login")
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a rel="noopener noreferrer" href="#">
                            {username}
                        </a>
                    ),
                },{
                    key: '1',
                    label: (
                        <a rel="noopener noreferrer" href="#">
                            Profile
                        </a>
                    ),
                },
                {
                    key: '1',
                    label: (
                        <a rel="noopener noreferrer" href="#">
                            Dashboard
                        </a>
                    ),
                },
                {
                    key: '1',
                    label: (
                        <a onClick={handleLogout} rel="noopener noreferrer" href="#">
                            Logout
                        </a>
                    ),
                }
            ]}
        />
    );


    return (
        <div>
            <div>
                <Dropdown overlay={menu}>
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            {children}
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
    );
};

export default AuthDropdown;