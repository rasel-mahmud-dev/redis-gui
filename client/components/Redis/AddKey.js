import React from 'react';
import HashAdd from "./AddKey/HashAdd";
import StringAdd from "./AddKey/StringAdd";
import ListAdd from "./AddKey/ListAdd";



const AddKey = ({dataType, dataKeys, databaseId, setAllkeysData, doneAddKey}) => {

    function handleAddKeyData(keyName, value){

    }


    const mapAddKey = {
        string: StringAdd,
        hash: HashAdd,
        list: ListAdd,
    }

    const Component = mapAddKey[dataType]


    return (
        <div>
            <Component
                databaseId={databaseId}
                setAllkeysData={setAllkeysData}
                dataKeys={dataKeys}
                selectType={dataType}
                doneAddKey={doneAddKey}
                onAdd={handleAddKeyData}
            />

        </div>
    );
};

export default AddKey;