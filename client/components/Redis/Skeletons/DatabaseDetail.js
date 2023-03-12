import React from 'react';
import {Skeleton} from "antd";

const DatabaseDetail = () => {
    return (
        <div>
            <Skeleton  paragraph={{ rows: 10 }} />
        </div>
    );
};

export default DatabaseDetail;