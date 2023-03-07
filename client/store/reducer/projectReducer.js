
let init = {
    project: null,
    items: [],
    users: [],
    groups: [],
    organizationMember: null,
    isFullScreen: false,
    isLoading: false,
    itemModal: {
        selected: null,
        isVisible: false,
        // fields:[{
        //     key:"",
        //     value:""
        // }]
    }
}

const projectReducer = (state = init, action) => {
    switch (action.type) {
        case "SET_PROJECT":
            return {
                ...state,
                project: action.payload,
            }
        case "UPDATE_PROJECT":
            return {
                ...state,
                project: { ...state.project, ...action.payload },
            }
        case "SET_ORG_MEMBER":
            return {
                ...state,
                organizationMember: action.payload,
            }
        case "SET_ITEMS":
            return {
                ...state,
                items: action.payload,
            }
        case "ADD_ITEM":
            return {
                ...state,
                items: [action.payload, ...state.items],
            }
        case "UPDATE_ITEM":
            let arr = [...state.items]
            let index = arr.findIndex(i => i._id === action.payload._id)
            arr[index] = { ...arr[index], ...action.payload }
            return {
                ...state,
                items: arr,
            }
        case "DELETE_ITEM":
            // console.log(action.payload);
            return {
                ...state,
                items: state.items.filter(x => x._id !== action.payload),
            }
        case "SET_USERS":
            return {
                ...state,
                users: action.payload,
            }
        case "SET_GROUPS":
            return {
                ...state,
                groups: action.payload,
            }
        case "ADD_GROUP":
            return {
                ...state,
                groups: [...state.groups, action.payload],
            }
        case "UPDATE_GROUP":
            let groupArr = [...state.groups]
            let indexGroup = groupArr.findIndex(i => i._id === action.payload._id)
            groupArr[indexGroup] = { ...groupArr[indexGroup], ...action.payload }
            return {
                ...state,
                groups: groupArr,
            }
        case "DELETE_GROUP":
            // console.log(action.payload);
            return {
                ...state,
                groups: state.groups.filter(x => x._id !== action.payload),
            }
        case "SET_LOADING":

            return {
                ...state,
                isLoading: action.payload
            }
        case "SET_FULLSCREEN":

            return {
                ...state,
                isFullScreen: !state.isFullScreen
            }
        case "SET_MODAL":
            return {
                ...state,
                itemModal: action?.payload
            }
        case "RESET_MODAL":
            return {
                ...state,
                itemModal: {
                    selected: null,
                    isVisible: false,
                    // fields:[{
                    //     key:"",
                    //     value:""
                    // }]
                }

            }

        default:
            return state;
    }
}

export default projectReducer