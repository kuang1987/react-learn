import {combineReducers} from 'redux';

const initialState = {
	user:null
}

const rootReducer = function(state=initialState,action){
	switch(action.type){
		default:
			return state;
	}
}

export default rootReducer;