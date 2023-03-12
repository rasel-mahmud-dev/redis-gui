import React, {useState} from 'react';
import Link from "next/link";
import {BiBell, BiEdit, BiKey, BiNotification} from "react-icons/bi";
import {MdOutlineAnalytics} from "react-icons/md";
import {GiBigGear} from "react-icons/gi";
import {useRouter} from "next/router";
import {Modal} from "antd";


const Aside = ({currentSelectedDb}) => {

    const router = useRouter()

    const [isError, setError] = useState("")


    function handleNavigate(href, page) {
        if (href === "/") return router.push(href)

        if (currentSelectedDb) {
            router.push(href)
        } else {
            router.push("/")
            setError("Before Go to " + page )
        }
    }

    return (
        <>
            <Modal className="add-database-modal" open={!!isError} footer={null} title={null} onCancel={()=>setError("")}>
                <h3>Please select a database {isError} page</h3>
            </Modal>

            <aside className="flex flex-column justify-between">
                <div>
                    <li>
                        <span onClick={() => handleNavigate("/")}><img src="/images/redis.png" alt=""/></span>
                    </li>
                    <li>
                        <span onClick={() => handleNavigate(`/database/${currentSelectedDb?._id}`, "Browser")}><BiKey
                            size={24}/></span>
                    </li>
                    <li>
                        <span onClick={() => handleNavigate(`/workbench/${currentSelectedDb?._id}`, "Workbench")}><BiEdit size={20}/></span>
                    </li>
                    <li>
                        <span><MdOutlineAnalytics size={20}/></span>
                    </li>
                </div>


                <div>
                    <li>
                        <BiBell size={24}/>
                        {/*Browser*/}
                    </li>
                    <li>
                        <BiNotification size={20}/>
                        {/*Workbench*/}
                    </li>
                    <li>
                        <GiBigGear size={20}/>
                        {/*Workbench*/}
                    </li>
                </div>

            </aside>
        </>
    );
};

export default Aside;