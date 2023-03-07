
const getTopParent = (items, parent) => {
    let item = null

    item = items?.find((x) => x._id == parent);

    if (item?.parent) {
        return getTopParent(items, item?.parent)
    }

    return item;
}


let init = {
   
    urlTabs: [{
        method: "GET",
        url: "",
        data: "",
        queryParams: [{}],
        headers: [{}],
        name: "",
        type: "request",
        isLoading: false,
        responseData: {
            data: "",
            time: 0,
            status: "",
            size: 0,
            headers: {}
        },
        tests: [],
        activeParamOption: "Body",
    }],
    active: 0,
    activeParamOption: "Body",
    apis: [],
    workspaces: [],
    selectedWorkspace: null,
    selectedEnvironment: null,
    sidebarTab: "API Testing",
    consoles: [],
    selectedSaveModal: null,


}

const apiReducer = (state = init, action) => {
    switch (action.type) {
        
        case "SET_URLTABS":
            return {
                ...state,
                urlTabs: action.payload,
            }
        case "SET_ACTIVE":
            return {
                ...state,
                active: action.payload,
            }
        case "SET_APIS":

            return {
                ...state,
                apis: action.payload,
                urlTabs: state.urlTabs?.map(tab => {

                    return { ...tab, ...action?.payload?.find(x => x._id === tab?._id) || {} }
                })
            }
        case "SET_WORKSPACES":


            return {
                ...state,
                workspaces: action.payload || []
            }
        case "SET_SELECT_WORKSPACE":

            return {
                ...state,
                selectedWorkspace: action.payload || null
            }
        case "UPDATE_WORKSPACE":

            let workspaceArray = [...state.workspaces]
            let indexWorkspace = workspaceArray.findIndex(x => x._id === action.payload?._id)
            workspaceArray[indexWorkspace] = { ...workspaceArray[indexWorkspace], ...action.payload }

            return {
                ...state,
                workspaces: workspaceArray,
            }


        case "ADD_API":
            return {
                ...state,
                apis: [...state.apis, action.payload],
            }
        case "UPDATE_API":
            let apiArray = [...state.apis]
            let indexApi = apiArray.findIndex(x => x._id === action.payload?._id)
            apiArray[indexApi] = { ...apiArray[indexApi], ...action.payload }
            return {
                ...state,
                apis: apiArray,
            }
        case "REPLACE_API":
            let apiArrayToReplace = [...state.urlTabs]
            let indexApiToReplace = apiArrayToReplace.findIndex(x => x.keyId === action.payload?.keyId)
            apiArrayToReplace[indexApiToReplace] = action.payload.api

            return {
                ...state,
                urlTabs: apiArrayToReplace,
            }
        case "SET_ACTIVE_PARAM":
            return {
                ...state,
                activeParamOption: action.payload,
            }
        case "UPDATE_TAB_URL":
            console.log(action.payload);

            let urlsTabArray = [...state.urlTabs]

            urlsTabArray[action?.payload?.active] = {
                ...urlsTabArray[action?.payload?.active],
                [action.payload.field]: action.payload.value
            }

            return {
                ...state,
                urlTabs: urlsTabArray,
            }

        case "UPDATE_TESTS":
            let urlsTest = [...state.urlTabs]
            console.log(action?.payload);

            urlsTest[action?.payload?.active] =
            {
                ...urlsTest[action?.payload?.active],
                tests: [
                    ...urlsTest[action?.payload?.active]?.tests || [],
                    action?.payload?.value
                ]

            }
            return {
                ...state,
                urlTabs: urlsTest,
            }

        case "REMOVE_TESTS":
            let urlsTestRemove = [...state.urlTabs]

            urlsTestRemove[action?.payload] = {
                ...urlsTestRemove[action?.payload],
                tests: []

            }
            return {
                ...state,
                urlTabs: urlsTestRemove,
            }
        case "SET_SIDEBAR_TAB":

            return {
                ...state,
                sidebarTab: action.payload
            }
        case "SET_ENV":

            return {
                ...state,
                selectedEnvironment: action.payload
            }
        case "SET_CONSOLE":

            return {
                ...state,
                consoles: [...state.consoles || [], action.payload]
            }
        case "CLEAR_COLSOLE":

            return {
                ...state,
                consoles: []
            }
        case "SET_SAVE_MODAL":

            return {
                ...state,
                selectedSaveModal: action.payload
            }
        case "CLOSE_TAB":
            console.log(action.payload);
            return {
                ...state,
                urlTabs: [...state.urlTabs]?.filter((x, i) => i !== action.payload),
                active: action.payload !== 0 ? action?.payload - 1 : 0
            }
        case "DELETE_ITEM":

            return {
                ...state,
                apis: state.apis?.filter(x => x._id !== action.payload),
                urlTabs: state.urlTabs?.filter(x => x._id !== action.payload),
                active: 0
            }


        default:
            return state;
    }
}

export default apiReducer