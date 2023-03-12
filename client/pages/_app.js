import '../styles/main.scss'
import {Provider} from 'react-redux';
import App from 'next/app'
import {createWrapper} from 'next-redux-wrapper'
import store from '../store'

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress


import Cookies from "js-cookie"

import axios from "axios"
import withAuth from "./HOC/withAuth";


//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function AppWrapper(props){
    return props.children
}


let AuthWithAppWrapper = withAuth(AppWrapper)




class MyApp extends App {

    render() {
        const {Component, pageProps} = this.props
        return (
            <Provider store={store}>
                <AuthWithAppWrapper>
                    <Component {...pageProps} />
                </AuthWithAppWrapper>
            </Provider>
        )
    }
}


// const makestore = () => store
// const wrapper = createWrapper(makestore)

export default MyApp
