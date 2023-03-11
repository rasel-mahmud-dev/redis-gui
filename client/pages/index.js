import Head from 'next/head'
import Link from 'next/link'
import {Col, Row, Input } from 'antd';

import {BiPlus} from "react-icons/bi";
import AddDatabase from "../components/AddDatabase";
import {useDispatch, useSelector} from "react-redux";
import {fetchDatabases, toggleOpenDbForm} from "../actions/redisTools";

import ListDatabase from "../components/ListDatabase";

import RedisToolsLayout from "../layout/RedisToolsLayout"
import ActionTypes from "../store/actionTypes";
import {useEffect} from "react";

const {Search} = Input;

export default function Home() {

    const dispatch = useDispatch()


    const {isOpenAddDbForm} = useSelector(state => state.redisTools)

    useEffect(() => {
        dispatch(fetchDatabases())
    }, [])


    function onSearch(value) {
        dispatch({
            type: ActionTypes.CHANGE_SEARCH_DBLIST_TEXT,
            payload: value
        })
    }


    return (
        <RedisToolsLayout>
            <Head>
                <title>My Redis database</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div>

                <Row className="top-bar">
                    <Col span={12}>
                        <Link href="/">
                            <h3 className="page-title">
                                My Redis Databases</h3>
                        </Link>
                    </Col>
                    <Col span={12} className="flex-right">
                        <h3 className="page-title">Redis DB</h3>
                    </Col>
                </Row>

                <div className="content-root">
                    <div className="flex justify-between">
                        <div>
                            <button onClick={() => dispatch(toggleOpenDbForm())}
                                    className="flex items-center justify-center default_button">
                                <BiPlus/>
                                <h3 className="page-title">Add Database</h3>
                            </button>
                        </div>

                        <div>
                            <Search className="custom-input" placeholder="Database List Search" onSearch={onSearch}
                                    style={{width: 200}}/>
                        </div>
                    </div>


                    <div style={{marginTop: "12px"}} className="db-list-row">
                        <ListDatabase/>
                        <div className={`add-db-form ${isOpenAddDbForm ? "open" : "hide"}`}>
                            <AddDatabase isOpenAddDbForm={isOpenAddDbForm} />
                        </div>

                    </div>

                </div>
            </div>
        </RedisToolsLayout>
    )
}
