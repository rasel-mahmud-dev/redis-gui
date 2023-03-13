import React from 'react';
import {Input, Select} from "antd";
import {BiCheck, BiPencil, BiTrash} from "react-icons/bi";
import {TiTimes} from "react-icons/ti";

const HashValueTable = ({
                            hashValues,
                            editHashKey,
                            setEditHashKey,
                            setUpdateElementValue,
                            handleDeleteElement,
                            onUpdateHashValue,
                            setNewHashElementForm,
                            newHashElementForm,
                            onToggleNewHashKeyForm,

                            handleAddNewHashKey
                        }) => {


    function closeValueUpdateInput() {
        setEditHashKey(null);
        setNewHashElementForm(prev => ({
            ...prev,
            active: false,
            value: ""
        }))
    }

    function openEditValueForm(key, prevValue) {
        setEditHashKey(prev => setEditHashKey === prev ? null : key)
        setNewHashElementForm(prev=>({
            ...prev,
            active: false,
            value: prevValue
        }))
    }

    return (
        <div>
            <div className="list-value-table">

                <div className="flex gap-x-5 items-center row row-head">
                    <label htmlFor="">Key</label>
                    <span>Value</span>
                </div>

                {Object.keys(hashValues).map((key, index) => (
                    <div className="flex  gap-x-5 items-center row">
                        <label htmlFor="">{key}</label>
                        <span className="flex justify-between items-center w-full">
                            <div className="w-full">
                                {(editHashKey !== null && editHashKey === key) ? (
                                    <>
                                        <Input
                                            onChange={(e) => setNewHashElementForm(prev => ({
                                                ...prev,
                                                value: e.target.value
                                            }))}
                                            className="w-full"
                                             value={newHashElementForm.value}
                                            minRows={2} maxRows={6}
                                            placeholder="Enter value">
                                        </Input>

                                        <div className="absolute action-ok-btn flex">
                                            <div className="square-icon" onClick={onUpdateHashValue}><BiCheck/></div>
                                            <div className="square-icon"
                                                 onClick={closeValueUpdateInput}><TiTimes/>
                                            </div>
                                        </div>
                                    </>
                                ) : hashValues[key]
                                }

                            </div>
                            <div className="flex" style={{columnGap: "10px"}}>
                                <BiTrash onClick={() => handleDeleteElement(key)} fontSize={18} className="pointer"/>
                                <BiPencil
                                    onClick={()=>openEditValueForm(key, hashValues[key])}
                                    fontSize={18} className="pointer"/>
                            </div>
                        </span>
                    </div>
                ))}


                {newHashElementForm && newHashElementForm.active &&
                    <div className="flex  gap-x-5 items-center row add-new relative ">
                        <div className="flex  gap-x-5 items-center w-full  ">
                            <Input
                                className="w-full custom-input"
                                placeholder="Hash Key"
                                onChange={(e) => setNewHashElementForm(prev => ({...prev, hashKey: e.target.value}))}/>

                            <Input
                                className="w-full custom-input"
                                placeholder="Hash Value"
                                onChange={(e) => setNewHashElementForm(prev => ({...prev, value: e.target.value}))}/>

                        </div>
                        <div className="absolute action-ok-btn flex">
                            <div className="square-icon" onClick={handleAddNewHashKey}><BiCheck/></div>
                            <div className="square-icon"
                                 onClick={onToggleNewHashKeyForm}>
                                <TiTimes/>
                            </div>
                        </div>
                    </div>}

            </div>
        </div>
    );
};

export default HashValueTable;