import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import auth from './auth'
import timerjob from './timerJob'

const rootReducer = combineReducers({
	auth,
	timerjob,
	routing: routeReducer
})

export default rootReducer;