


let init = {
    allValues: []
}

const ApiCurrentValueReducer = (state = init, action) => {
    switch (action.type) {
        case "SET_CURRENT_VALUES":

            let values = [...state.allValues]
            let index = values.findIndex(x => x.id === action.payload.id)
            if (index === -1) {
                values = [...values, { id: action.payload.id, value: action.payload.value }]
            } else {
                values[index] = { ...values[index], value: action.payload.value }
            }


            return {
                ...state,
                allValues: values
            }
        case "REMOVE_CURRENT_VALUES":

            let valuesAll = [...state.allValues]
            


            return {
                ...state,
                allValues: valuesAll?.filter(x=>x.id !== action?.payload)
            }






        default:
            return state;
    }
}

export default ApiCurrentValueReducer