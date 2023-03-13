import React from 'react';
import {Avatar, Tooltip} from "antd";
import {MdMemory} from "react-icons/md";
import {BiKey, BiUser} from "react-icons/bi";
import {FaEllipsisV} from "react-icons/fa";
import AuthDropdown from "../AuthDropdown";

const DatabaseSlats = ({meta, username}) => {

    const {
        memoryUsage,
        cpuUsage,
        totalKeys,
        connectedClients,
    }  = meta

    return (

        <ul className="flex items-center link-item" style={{columnGap: "30px"}}>
            <li className="">
                <Tooltip title={`${cpuUsage} % CPU Used`} className="flex items-center gap-x-2">
                    <MdMemory/>
                    <span>{cpuUsage} %</span>
                </Tooltip>
            </li>

            <li className="">
                <Tooltip title={`${memoryUsage}KB MEMORY Used`} className="flex items-center gap-x-2">
                    <MdMemory/>
                    <span>{(Number(memoryUsage) / 1024).toFixed(2)}  MB</span>
                </Tooltip>
            </li>

            <li className="">
                <Tooltip title={`Keys ${totalKeys}`} className="flex items-center gap-x-2">
                    <BiKey/>
                    <span>{totalKeys}</span>
                </Tooltip>
            </li>


            <li>
                <Tooltip title={`Client connected ${connectedClients}`} className="flex items-center gap-x-2">
                    <BiUser/>
                    <span>{connectedClients || '0'}</span>
                </Tooltip>
            </li>

            <li className="flex items-center gap-x-2">
                <FaEllipsisV/>
            </li>
            <li className="">
                <AuthDropdown username={username}>
                    <Avatar/>
                </AuthDropdown>
            </li>
        </ul>

    );
};

export default DatabaseSlats;