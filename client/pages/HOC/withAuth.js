import React, {Component, useEffect, useState} from "react";
import {Spin} from 'antd';
import axios from "axios";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";

const configureAxiosHeader = () => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
    let token = localStorage.getItem("token") || ""
    axios.defaults.headers.common["token"] = token

};


const withAuth = (AuthComponent) => {

    return function Authenticated(props) {

        const [isLoading, setAuthLoading] = useState(true)
        const {isAuthenticated} = useSelector(state=>state.auth)

        const router = useRouter()
        const dispatch = useDispatch()

        useEffect(() => {

            configureAxiosHeader()

            let token = localStorage.getItem("token")

            if (token) {
                axios.get("/auth/verify").then(({data, status}) => {
                    if (status === 201) {
                        router.push("/")
                        dispatch({
                            type: "SET_USER",
                            payload: data
                        })
                    }
                }).catch(err => {
                    setAuthLoading(false)
                    router.push("/login")

                }).finally(() => {
                    setAuthLoading(false)
                })
            } else {
                router.push("/login")
                setAuthLoading(false)
            }

        }, [isAuthenticated])


        return (<div>
                {isLoading ? (
                    <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Spin size={'large'}/></div>) : (<AuthComponent {...props}/>)}
            </div>);

    };


};
export default withAuth;
