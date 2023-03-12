import React, {useEffect, useState} from 'react';
import {Input} from "antd";
import {BiCheck} from "react-icons/bi";
import {TiTimes} from "react-icons/ti";


const InputWithValue = ({defaultValue, handleOk, handleCancel, minRows = 2, maxRows = 10}) => {

    const [inputVal, setInputVal] = useState("")
    const [isEditAble, setEditAble] = useState(false)

    function done(){
        setEditAble(false)
    }



    return (
        <div className="relative w-full">
            {isEditAble
                ? <div>
                    <Input.TextArea onChange={(e)=>setInputVal(e.target.value)}  className="custom-input pointer"
                           defaultValue={defaultValue}
                                    autoSize={{minRows, maxRows }}
                    />
                    <div className="absolute bottom-30 right-0 flex">
                        <div className="square-icon" onClick={()=>handleOk(inputVal, done)}><BiCheck/></div>
                        <div className="square-icon"
                             onClick={()=>setEditAble(false)}><TiTimes/>
                        </div>
                    </div>
                </div>
                : <div className="pointer pre-line break-all" onClick={() => setEditAble(true)}>{isEditAble ? inputVal : defaultValue }</div>}
        </div>
    );
};

export default InputWithValue;