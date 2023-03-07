import React from 'react';
import HashAdd from "./AddKey/HashAdd";
import StringAdd from "./AddKey/StringAdd";
import ListAdd from "./AddKey/ListAdd";

const AddKey = ({dataType}) => {


    const mapAddKey = {
        string: StringAdd,
        hash: HashAdd,
        list: ListAdd,
    }

    const Component = mapAddKey[dataType]


    return (
        <div>
            <Component selectType={dataType} />

        </div>
    );
};

export default AddKey;