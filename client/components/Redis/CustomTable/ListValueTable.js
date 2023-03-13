import React from 'react';
import {Input, Select} from "antd";
import {BiCheck, BiPencil, BiTrash} from "react-icons/bi";
import {TiTimes} from "react-icons/ti";

const ListValueTable = ({
        keyValue,
        editMode,
        setUpdateElementValue,
        handleUpdateElement,
        closeUpdateElementForm,
        handleDeleteElement,
        toggleEditModeForm,
        newElement,
        handleChangeOrder,
        setNewElement,
        handleAddElement
    }) => {
    return (
        <div>
            <div className="list-value-table">

                <div className="flex gap-x-5 items-center row row-head">
                    <label htmlFor="">Index</label>
                    <span>Element</span>
                </div>

                {keyValue.map((item, index) => (
                    <div className="flex  gap-x-5 items-center row">
                        <label htmlFor="">{index}</label>
                        <span className="flex justify-between items-center w-full">
                            <div className="w-full">
                                {(editMode !== null && editMode === index) ? (
                                    <>
                                        <Input onChange={(e) => setUpdateElementValue(e.target.value)}
                                               className="w-full" defaultValue={item} minRows={4} maxRows={6}
                                               handleCancel={() => {
                                               }} handleOk={handleUpdateElement}></Input>
                                        <div className="absolute action-ok-btn flex">
                                            <div className="square-icon" onClick={handleUpdateElement}><BiCheck/></div>
                                            <div className="square-icon"
                                                 onClick={closeUpdateElementForm}><TiTimes/>
                                            </div>
                                        </div>
                                    </>
                                ) : item
                                }

                            </div>
                            <div className="flex" style={{columnGap: "10px"}}>
                                <BiTrash onClick={() => handleDeleteElement(item)} fontSize={18} className="pointer"/>
                                <BiPencil onClick={() => toggleEditModeForm(index)} fontSize={18}
                                          className="pointer"/>
                            </div>
                        </span>
                    </div>
                ))}

                {newElement && newElement.active &&
                    <div className="flex  gap-x-5 items-center row add-new relative ">
                        <div className="flex  gap-x-5 items-center w-full  ">
                            <Select
                                labelInValue={true}
                                style={{width: '200px'}}
                                defaultValue="1"
                                onChange={handleChangeOrder}
                                options={[
                                    {
                                        value: '1',
                                        label: 'Pull to tail',
                                    },
                                    {
                                        value: '0',
                                        label: 'Push to head',
                                    }
                                ]}
                            />

                            <Input className="w-full" placeholder="Enter Element"
                                   onChange={(e) => setNewElement(prev => ({...prev, value: e.target.value}))}/>

                        </div>
                        <div className="absolute action-ok-btn flex">
                            <div className="square-icon" onClick={handleAddElement}><BiCheck/></div>
                            <div className="square-icon"
                                 onClick={() => setNewElement(prevState => ({...prevState, active: false}))}>
                                <TiTimes/>
                            </div>
                        </div>
                    </div>}

            </div>
        </div>
    );
};

export default ListValueTable;