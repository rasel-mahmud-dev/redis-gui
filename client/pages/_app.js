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


//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const configureAxiosHeader = () => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
    const token = Cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME);
    if (token) {
        axios.defaults.headers.common = {
            Authorization: token,
        };
    }

};

class MyApp extends App {

    componentDidMount() {
        configureAxiosHeader();
    }

    render() {
        const {Component, pageProps} = this.props
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}


// const makestore = () => store
// const wrapper = createWrapper(makestore)

export default MyApp
