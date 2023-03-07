import {BiBell, BiEdit, BiKey, BiNotification} from "react-icons/bi";
import {MdOutlineAnalytics} from "react-icons/md";
import {GiBigGear} from "react-icons/gi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import ActionTypes from "../store/actionTypes";
import Link from "next/link";

function RedisToolsLayout(props){

    const { databases, currentSelectedDb } = useSelector(state=>state.redisTools)

    const dispatch = useDispatch()

    useEffect(()=>{
        let connectedDb = currentSelectedDb
        if(!currentSelectedDb){
            connectedDb = databases[0]
        }

        dispatch({
            type: ActionTypes.SET_CURRENT_SELECTED_DB,
            payload: connectedDb
        })

    }, [currentSelectedDb, databases])

    return (
        <div className="frame">
                <div className="frame_root">
                    <aside className="flex flex-column justify-between" >
                        <div>
                            <li>
                                <Link href={`/`}><img src="/images/redis.png" alt=""/></Link>
                            </li>
                            <li>
                                <Link href={`/database/${currentSelectedDb?._id}`}><BiKey size={24} /></Link>
                            </li>
                            <li>
                                <Link href={`/database/${currentSelectedDb?._id}`}><BiEdit size={20} /></Link>
                                {/*Workbench*/}
                            </li>
                            <li>
                                <Link href={`/database/${currentSelectedDb?._id}`}><MdOutlineAnalytics size={20} /></Link>
                                {/*Workbench*/}
                            </li>
                        </div>

                        <div>
                            <li>
                                <BiBell size={24} />
                                {/*Browser*/}
                            </li>
                            <li>
                                <BiNotification size={20} />
                                {/*Workbench*/}
                            </li>
                            <li>
                                <GiBigGear size={20} />
                                {/*Workbench*/}
                            </li>
                        </div>
                    </aside>

                    <div className="w-full">
                        {props.children}
                    </div>
                </div>

        </div>
    )
}

export default RedisToolsLayout