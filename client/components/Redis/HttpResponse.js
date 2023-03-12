import React from 'react';
import {Spin} from "antd";

const HttpResponse = ({status}) => {
    const {message, isLoading, isSuccess} = status
    return (
        <div>
            { isLoading ? (
                <div className="flex justify-center ">
                    <Spin />
                </div>
            ) : message ? (

                <div className={`http-response ${!isSuccess ? "error-message" : "success-message"}`}>
                    <p>{message}</p>
                </div>

            ) : null }
        </div>
    );
};

export default HttpResponse;