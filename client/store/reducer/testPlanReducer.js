
let init = {
    testCaseTemplates: [],
    testConfigs: [],
    testVariables: [],
    parameters: [],
    testRuns: [],
    testResults: []
}

const testPlanReducer = (state = init, action) => {
    switch (action.type) {
        case "SET_TESTCASE_TEMPLATES":
            return {
                ...state,
                testCaseTemplates: action.payload
            }
        case "ADD_TEMPLATE":
            return {
                ...state,
                testCaseTemplates: [action.payload, ...state.testCaseTemplates]
            }
        case "UPDATE_TEMPLATE":
            let arr = [...state.testCaseTemplates]
            let index = arr.findIndex(i => i._id === action.payload._id)
            arr[index] = { ...arr[index], ...action.payload }
            return {
                ...state,
                testCaseTemplates: arr,
            }
        case "DELETE_TEMPLATE":
            return {
                ...state,
                testCaseTemplates: state.testCaseTemplates.filter(x => x._id !== action.payload),
            }

        //test configs
        case "SET_TEST_CONFIGS":
            return {
                ...state,
                testConfigs: action.payload
            }
        case "ADD_CONFIG":
            return {
                ...state,
                testConfigs: [action.payload, ...state.testConfigs]
            }
        case "UPDATE_CONFIG":
            let arrConfig = [...state.testConfigs]
            let indexConfig = arrConfig.findIndex(i => i._id === action.payload._id)
            arrConfig[indexConfig] = { ...arrConfig[indexConfig], ...action.payload }
            return {
                ...state,
                testConfigs: arrConfig,
            }
        case "DELETE_CONFIG":
            return {
                ...state,
                testConfigs: state.testConfigs.filter(x => x._id !== action.payload),
            }

        //test variables
        case "SET_TEST_VARIABLES":
            return {
                ...state,
                testVariables: action.payload
            }
        case "ADD_VARIABLE":
            return {
                ...state,
                testVariables: [action.payload, ...state.testVariables]
            }
        case "UPDATE_VARIABLE":
            let arrVars = [...state.testVariables]
            let indexVar = arrVars.findIndex(i => i._id === action.payload._id)
            arrVars[indexVar] = { ...arrVars[indexVar], ...action.payload }
            return {
                ...state,
                testVariables: arrVars,
            }
        case "DELETE_VARIABLE":
            return {
                ...state,
                testVariables: state.testVariables.filter(x => x._id !== action.payload),
            }

        //parameters
        case "SET_PARAMETERS":
            return {
                ...state,
                parameters: action.payload
            }
        case "ADD_PARAMETER":
            return {
                ...state,
                parameters: [action.payload, ...state.parameters]
            }
        case "UPDATE_PARAMETER":
            let arrPramas = [...state.parameters]
            let indexParam = arrPramas.findIndex(i => i._id === action.payload._id)
            arrPramas[indexParam] = { ...arrPramas[indexParam], ...action.payload }
            return {
                ...state,
                parameters: arrPramas,
            }
        case "DELETE_PARAMETER":
            return {
                ...state,
                parameters: state.parameters.filter(x => x._id !== action.payload),
            }


        //test runs
        case "SET_RUNS":
            return {
                ...state,
                testRuns: action.payload
            }
        case "ADD_RUN":
            return {
                ...state,
                testRuns: [action.payload, ...state.testRuns]
            }
        //test results
        case "SET_RESULTS":
            return {
                ...state,
                testResults: action.payload
            }
        case "ADD_RESULT":
            return {
                ...state,
                testResults: [action.payload, ...state.testResults]
            }



        default:
            return state;
    }
}

export default testPlanReducer