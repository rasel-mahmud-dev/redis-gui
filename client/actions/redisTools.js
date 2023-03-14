import ActionTypes from "../store/actionTypes";
import axios from "axios";
import store from "../store";

export function toggleOpenDbForm() {
    return {
        type: ActionTypes.TOGGLE_OPEN_ADD_DB_FORM
    }
}

export const fetchDatabases = (cb) => async (dispatch) => {
    try {
        let {data, status} = await axios.get("/databases")
        if (status === 200) {
            dispatch({
                type: ActionTypes.FETCH_DATABASES,
                payload: data
            })

            cb(null)
        }
    } catch (ex) {
        cb(ex)
    }
}

export const incrementKeys = () => {
    let {redisTools} = store.getState()
    if(redisTools && redisTools.connectedDbMeta){
        let totalKeys = (redisTools.connectedDbMeta?.totalKeys || 1) + 1
        return {
            type: ActionTypes.SET_DATABASE_META,
            payload: {
                totalKeys
            }
        }
    }
}

export const decrementKeys = () => {
    let {redisTools} = store.getState()
    if(redisTools && redisTools.connectedDbMeta){
        let totalKeys = (redisTools.connectedDbMeta?.totalKeys || 0) - 1
        return {
            type: ActionTypes.SET_DATABASE_META,
            payload: {
                totalKeys
            }
        }
    }
}

export function handleDeleteKey(databaseId, keyName, done){
    axios.post(`/databases/${databaseId}/keys/delete`, {keys: [keyName]}).then(({data, status}) => {
        if (status === 201) {
            done(keyName)
        }
    }).catch(ex => {
        let msg = ex;
    })
}