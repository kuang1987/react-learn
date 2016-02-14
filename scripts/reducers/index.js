import {combineReducers} from 'redux';
import * as types from '../constants/actionTypes';

const initialState = {
	user: {
		   authed: false,
		   username: ""
		  }
}

const rootReducer = function(state=initialState,action){
	switch(action.type){
		case types.USER_AUTHED:
			return Object.assign({}, state, {
            user: action.user
        	});
		default:
			return state;
	}
}

export default rootReducer;