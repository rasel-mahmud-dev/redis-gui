import {combineReducers} from 'redux'
import authReducers from './authReducer'
import notificationReducer from './notificationReducer'
import projectReducer from './projectReducer'
import sprintReducer from './sprintReducer'
import apiReducer from './apiReducer'
import testPlanReducer from './testPlanReducer'
import currentValue from './currentValue'
import redisTools from "./redisTools";


const rootReducer = combineReducers({
    auth: authReducers,
    project: projectReducer,
    sprint: sprintReducer,
    notification:notificationReducer,
    api:apiReducer,
    testPlan:testPlanReducer,
    currentValue:currentValue,
    redisTools: redisTools,
})

export default rootReducer