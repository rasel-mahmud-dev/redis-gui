import {useState} from "react";

function useHttpResponse(){

    const [status, _setStatus] = useState({
        isLoading: false,
        message: "",
        isSuccess: false
    })

    function setStatus(...args){
        _setStatus(prev=>({
            ...prev,
            isLoading: args[0] || prev.isLoading,
            message: args[1] || prev.message,
            isSuccess: args[2] || prev.isSuccess,
        }))
    }

    function resetStatus(){
        _setStatus({
            isLoading: false,
            message: "",
            isSuccess: false
        })
    }
    return [status, setStatus, resetStatus]
}

export default useHttpResponse