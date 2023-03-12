import React, {useState} from "react";

function MySelect({optionRender, onChange, defaultValue}) {

    const [isOpen, setOpen] = useState(false)

    function handleChoose(item) {
        onChange && onChange(item)
        setOpen(false)
    }

    return (
        <div className="my_select">
            <div onClick={() => setOpen(!isOpen)}>
                {defaultValue()}
            </div>
            {isOpen ? <div className="options"> {optionRender(handleChoose)}</div> : null}
        </div>
    )
}

export default MySelect