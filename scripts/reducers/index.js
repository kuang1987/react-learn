import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import auth from './auth'

const rootReducer = combineReducers({
	auth,
	routing: routeReducer
})

export default rootReducer;