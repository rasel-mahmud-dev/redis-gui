import React, {useState} from 'react';
import moment from "moment/moment";
import {useDispatch, useSelector} from "react-redux";
import {Badge, Popconfirm, Table} from "antd";
import {BiPen, BiPencil, BiTrash} from "react-icons/bi";
import ActionTypes from "../../store/actionTypes";
import {useRouter} from "next/router";
import axios from "axios";

const ListDatabase = ({isLoaded}) => {

    const router = useRouter()

    const {
        databases,
        filterDatabaseListText,
        filterDatabases,
        connectedDatabaseId
    } = useSelector(state => state.redisTools)

    const dispatch = useDispatch()

    const [selectionType, setSelectionType] = useState('checkbox');

    function handleDelete(id) {
        // delete from database
        axios.delete("databases/" + id).then(({status}) => {
            if (status === 201) {
                dispatch({
                    type: ActionTypes.DELETE_DATABASE,
                    payload: id
                })
            }
        }).catch(ex => {

        })
    }

    function handleSelectDatabase(databaseId) {
        let selected = databases.find(db => db._id === databaseId)
        if (selected) {
            dispatch({
                type: ActionTypes.SET_CURRENT_SELECTED_DB,
                payload: selected
            })

            router.push("/database/" + databaseId)
        }
    }

    function updateDatabaseOpenForm(dbId) {
        dispatch({
            type: ActionTypes.OPEN_ADD_DB_FORM,
        })
        dispatch({
            type: ActionTypes.SET_UPDATE_DATABASE_ID,
            payload: dbId
        })
    }

    const columns = [
        {
            title: 'Database Alias',
            dataIndex: 'alias',
            key: "alias",
            sorter: (a, b) => a.alias > b.alias ? 1 : a.alias < b.alias ? -1 : 0,
            render: (text, item) => <div>
                <Badge className="mr-2 badge-big" size="default"
                       status={(item._id === connectedDatabaseId && connectedDatabaseId) ? "processing" : "default"}/>
                <a onClick={() => handleSelectDatabase(item._id)}>{text}</a>
            </div>
            ,

        },
        {
            title: 'Host:Port',
            dataIndex: 'hostPost',
            sorter: (a, b) => a.hostPost > b.hostPost ? 1 : a.hostPost < b.hostPost ? -1 : 0,
        },
        {
            title: 'Connection Type',
            dataIndex: 'connectionType',
        },
        {
            title: 'Last connection',
            dataIndex: 'lastConnection',
            sorter: (a, b) => a.lastConnection > b.lastConnection ? 1 : a.lastConnection < b.lastConnection ? -1 : 0,
        },
        {
            title: 'Action',
            dataIndex: '',
            render: (_, item) => {

                return (
                    <div className="flex" style={{columnGap: "10px"}}>
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => handleDelete(item._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <BiTrash fontSize={18} className="pointer"/>

                        </Popconfirm>

                        <BiPencil onClick={() => updateDatabaseOpenForm(item._id)} fontSize={18} className="pointer"/>
                    </div>
                )
            }
        },
    ];
    let filterDbList = databases

    if (filterDatabaseListText) {
        filterDbList = filterDatabases
    }
    const data = filterDbList.map((item, idx) => ({
        _id: item._id,
        key: idx,
        alias: item.alias,
        port: item.port,
        hostPost: item.host + ":" + item.port,
        lastConnection: moment(item.lastConnection).fromNow(),
        connectionType: item.connectionType
    }))


    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };


    return (

        <div className="db-list w-full">
            <Table
                loading={!isLoaded}
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />

        </div>
    );
};

export default ListDatabase;