import ActionTypes from "../actionTypes";


let init = {
    isOpenAddDbForm: false,
    updateDatabaseId: 0,
    databases: [],
    filterDatabases: [],
    currentSelectedDb: null, // {}
    filterDatabaseListText: "",
    connectedDatabaseId: "",
    connectedDbMeta: {
        memoryUsage: 0,
        cpuUsage: 0,
        totalKeys: 0,
        connectedClients: 0,
    }
}

const redisTools = (state = init, action) => {

    let index = -1
    let updatedDatabase = []

    switch (action.type) {

        case ActionTypes.FETCH_DATABASES :
            return {
                ...state,
                databases: action.payload
            }


        case ActionTypes.TOGGLE_OPEN_ADD_DB_FORM :
            return {
                ...state,
                updateDatabaseId: 0,
                isOpenAddDbForm: !state.isOpenAddDbForm
            }

        case ActionTypes.OPEN_ADD_DB_FORM :
            return {
                ...state,
                isOpenAddDbForm: true
            }

        case ActionTypes.CLOSE_ADD_DB_FORM :
            return {
                ...state,
                isOpenAddDbForm: false
            }

        case ActionTypes.SET_UPDATE_DATABASE_ID :
            return {
                ...state,
                updateDatabaseId: action.payload
            }

        case ActionTypes.ADD_DATABASE :
            return {
                ...state,
                databases: [
                    ...state.databases,
                    action.payload
                ]
            }

        case ActionTypes.DELETE_DATABASE :
            return {
                ...state,
                databases: state.databases.filter(db => db._id !== action.payload)
            }

        case ActionTypes.UPDATE_DATABASE :
            index = state.databases.findIndex((db => db._id === action.payload._id))
            updatedDatabase = [...state.databases]
            console.log(index)

            if (index !== -1) {
                updatedDatabase[index] = {
                    ...updatedDatabase[index],
                    ...action.payload
                }
            }

            return {
                ...state,
                databases: updatedDatabase
            }


        case ActionTypes.SET_ACTIVE_DATABASE_CONNECTION :
            return {
                ...state,
                connectedDatabaseId: action.payload.databaseId,
                connectedDbMeta: action.payload.connectedDbMeta
                    ? action.payload.connectedDbMeta
                    : state.connectedDbMeta
            }


        case ActionTypes.SET_CURRENT_SELECTED_DB :
            return {
                ...state,
                currentSelectedDb: action.payload
            }

        case ActionTypes.SET_DATABASE_META :
            return {
                ...state,
                connectedDbMeta: {
                    ...state.connectedDbMeta,
                    ...action.payload
                }
            }

        case ActionTypes.CHANGE_SEARCH_DBLIST_TEXT :
            return {
                ...state,
                filterDatabases: action.payload
                    ? state.databases.filter(db => db.alias.toLowerCase().includes(action.payload.toLowerCase()))
                    : state.databases,
                filterDatabaseListText: action.payload
            }


        default:
            return state;
    }
}

export default redisTools