import ActionTypes from "../store/actionTypes";
import axios from "axios";

export function toggleOpenDbForm(){
    return {
        type: ActionTypes.TOGGLE_OPEN_ADD_DB_FORM
    }
}


export const fetchDatabases  = () => async (dispatch)=>{
    try{
        let {data, status}  = await axios.get("/databases")
        if(status === 200){
            dispatch({
                type: ActionTypes.FETCH_DATABASES,
                payload: data
            })
        }
    } catch (ex){

    }

}