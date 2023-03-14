import React, {useState} from 'react';
import {BiBell, BiEdit, BiKey, BiNotification} from "react-icons/bi";
import {MdOutlineAnalytics} from "react-icons/md";
import {GiBigGear} from "react-icons/gi";
import {useRouter} from "next/router";
import {Modal, Popover} from "antd";


const Aside = ({currentSelectedDb}) => {

    const router = useRouter()

    const [isError, setError] = useState("")


    function handleNavigate(href, page) {
        if (href === "/") return router.push(href)

        if (currentSelectedDb) {
            router.push(href)
        } else {
            router.push("/")
            setError(page)
        }
    }

    return (
        <section className="sidebar-root">
            <Modal className="add-database-modal" open={!!isError} footer={null} title={null}
                   onCancel={() => setError("")}>
                <h3>Please select a database before Go to <span style={{color: "text-primary"}}>{isError}</span> page
                </h3>
            </Modal>

            <aside className="flex flex-column justify-between h-full">
                <div>
                    <li className="pointer">
                        <Popover placement="left" content={"Home"}>
                            <span onClick={() => handleNavigate("/")}><img src="/images/redis.png" alt=""/></span>
                        </Popover>
                    </li>
                    <li className="pointer">
                        <Popover placement="left" content={"Browser"}>
                        <span onClick={() => handleNavigate(`/database/${currentSelectedDb?._id}`, "Browser")}><BiKey
                            size={24}/></span>
                        </Popover>
                    </li>
                    <li className="pointer">
                        <Popover placement="left" content={"Workbench"}>
                            <span
                                onClick={() => handleNavigate(`/workbench/${currentSelectedDb?._id}`, "Workbench")}><BiEdit
                                size={20}/></span>
                        </Popover>
                    </li>
                    <li className="pointer">
                        <Popover placement="left" content={"Analysis Tools"}>
                            <span><MdOutlineAnalytics size={20}/></span>
                        </Popover>
                    </li>
                </div>


                <div>
                    <li className="pointer">
                        <Popover placement="left" content={"Notifications"}>
                            <BiBell size={24}/>
                        </Popover>
                    </li>

                    <li className="pointer">
                        <Popover placement="left" content={"Settings"}>
                            <GiBigGear size={20}/>
                        </Popover>
                    </li>
                </div>

            </aside>
        </section>
    );
};

export default Aside;