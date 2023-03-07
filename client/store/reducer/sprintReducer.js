
let init = {
    sprints: [],
    dragItem: null,
    dropTarget: null
}

const sprintReducer = (state = init, action) => {
    switch (action.type) {
        case "SET_SPRINTS":
            return {
                ...state,
                sprints: action.payload,
            }
        case "ADD_SPRINT":
            return {
                ...state,
                sprints: [action.payload, ...state.sprints]
            }
        case "UPDATE_SPRINT":
            let arr = [...state.sprints]
            let index = arr.findIndex(i => i._id === action.payload._id)
            arr[index] = {...arr[index],...action.payload}
            return {
                ...state,
                sprints: arr,
            }
        case "DELETE_SPRINT":
            return {
                ...state,
                sprints: state.sprints.filter(x => x._id !== action.payload),
            }
        case "ADD_DRAG":
            return {
                ...state,
                dragItem: action.payload
            }
        case "REMOVE_DRAG":
            return {
                ...state,
                dragItem: null
            }
        case "ADD_DROP":
            return {
                ...state,
                dropTarget: action.payload
            }
        case "REMOVE_DROP":
            return {
                ...state,
                dropTarget: null
            }
        default:
            return state;
    }
}

export default sprintReducer