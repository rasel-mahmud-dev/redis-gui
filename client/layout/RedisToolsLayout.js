import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import ActionTypes from "../store/actionTypes";

import Aside from "../components/Redis/Aside";

function RedisToolsLayout(props) {

    const {databases, currentSelectedDb, connectedDatabaseId} = useSelector(state => state.redisTools)

    const dispatch = useDispatch()

    useEffect(() => {
        let connectedDb = currentSelectedDb
        if (!currentSelectedDb) {
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

                <Aside currentSelectedDb={currentSelectedDb} connectedDatabaseId={connectedDatabaseId} />

                <div className="w-full">
                    {props.children}
                </div>
            </div>

        </div>
    )
}

export default RedisToolsLayout