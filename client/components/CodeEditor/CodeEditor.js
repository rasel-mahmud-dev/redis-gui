import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';




function CodeEditor({data,setData, editable = true}) {

    const onChange = (value, viewUpdate) => {
        setData(value)
    };



    return (
        <div>
            <CodeMirror
                editable={editable}
                value={data}
                height="200px"
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
                className="codeeditor"
            />
        </div>
    )
}

export default CodeEditor