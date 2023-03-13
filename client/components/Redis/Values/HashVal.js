import React, {useEffect, useState} from 'react';
import axios from "axios";
import moment from "moment";
import {BiCheck, BiPencil, BiPlus, BiRefresh, BiTrash} from "react-icons/bi";
import {Input, Select, Spin} from "antd";
import {TiTimes} from "react-icons/ti";
import HashValueTable from "../CustomTable/HashValueTable";

const HashVal = ({databaseId, keyName}) => {

    const [hashValues, setHashValues] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [lastSyncDate, setLastSyncDate] = useState(new Date())
    const [size, setSize] = useState(200)


    const [newHashElementForm, setNewHashElementForm] = useState({
        value: "",
        hashKey: "",
        active: false
    })

    const [editHashKey, setEditHashKey] = useState(null)


    useEffect(() => {
        getValueForKey(keyName)
    }, [keyName])

    function getValueForKey(key) {
        setLoading(true)
        axios.get(`/databases/${databaseId}/hash?key=` + key,).then(({status, data}) => {
            if (status === 200) {
                setHashValues(data)
                setLastSyncDate(new Date())
            }
        }).catch(ex => {
            console.log(ex)
        }).finally(() => {
            setLoading(false)
        })
    }

    function handleAddNewHashKey() {

        axios.post(`/databases/${databaseId}/hash/set`, {
            key: keyName,
            value: newHashElementForm.value,
            hashKey: newHashElementForm.hashKey

        }).then(({data, status}) => {

            if (status === 201) {
                setHashValues(prevState => ({
                    ...prevState,
                    [newHashElementForm.hashKey]: newHashElementForm["value"]
                }))
            }
            // close input element
            setNewHashElementForm({
                hashKey: "",
                value: "",
                active: false
            })
        }).catch(ex => {
            // console.log(ex)
        })
    }


    function handleToggleNewHashKeyForm() {
        setEditHashKey(null)
        setNewHashElementForm(prev => ({
            ...prev,
            active: !prev.active
        }))
    }


    function handleDeleteElement(hashKey) {
        axios.post(`/databases/${databaseId}/hash/delete`, {
            key: keyName,
            hashKey: keyName,

        }).then(({data, status}) => {
            if (status === 201) {
                let updatedHashItems = {...hashValues}
                delete updatedHashItems[hashKey]
                setHashValues(updatedHashItems)
            }

        }).catch(ex => {
            console.log(ex)
        })
    }

    function toggleEditKeyModeForm(hashKey) {
        setEditHashKey(hashKey)
    }

    function handleReSyncData() {
        setHashValues({})
        getValueForKey(keyName)
    }


    function handleUpdateHashValue() {

        axios.post(`/databases/${databaseId}/hash/set`, {
            key: keyName,
            value: newHashElementForm.value,
            hashKey: editHashKey

        }).then(({data, status}) => {

            if (status === 201) {
                setHashValues(prevState => ({
                    ...prevState,
                    [editHashKey]: newHashElementForm["value"]
                }))
                setEditHashKey(null)
                setNewHashElementForm(prev=>({
                    ...prev,
                    value: "",
                    active: false
                }))
            }

        }).catch(ex => {
            // console.log(ex)
        })
    }


    return (
        <div>
            {/**** list values meta ****/}
            {!isLoading ? (
                <>
                    <div className="flex justify-between gap-x-5 mb-4">
                        <div className="flex items-center gap-x-5">
                            <div className=" outline">
                                {size} B
                            </div>
                            <div className=" outline">
                                Length: {Object.keys(hashValues).length}
                            </div>
                        </div>

                        <div className="flex items-center gap-x-2">

                            <div className="flex items-center gap-x-2">
                                <h4 style={{fontWeight: "600"}}>{moment().fromNow(lastSyncDate)}</h4>
                                <button type="button" className="square-icon outline"
                                        onClick={handleReSyncData}>
                                    <BiRefresh fontSize={16}/>
                                </button>
                            </div>

                            <button type="button" className="square-icon outline"
                                    onClick={handleToggleNewHashKeyForm}>
                                <BiPlus/>
                            </button>
                        </div>

                    </div>
                    <HashValueTable
                        hashValues={hashValues}
                        setNewHashElementForm={setNewHashElementForm}
                        newHashElementForm={newHashElementForm}
                        editHashKey={editHashKey}
                        setEditHashKey={setEditHashKey}
                        onUpdateHashValue={handleUpdateHashValue}
                        handleDeleteElement={handleDeleteElement}
                        toggleEditKeyForm={toggleEditKeyModeForm}
                        onToggleNewHashKeyForm={handleToggleNewHashKeyForm}
                        handleAddNewHashKey={handleAddNewHashKey}
                    />
                </>
            ) : (
                <div className="flex justify-center items-center" style={{marginTop: "100px"}}>
                    <Spin/>
                </div>
            )}
        </div>
    );
};

export default HashVal;