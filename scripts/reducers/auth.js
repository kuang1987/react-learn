import * as types from '../constants/actionTypes';

const initialState = {
	user: {
		   authed: false,
		   username: ""
		  }
}

export default function(state=initialState,action){
	switch(action.type){
		case types.USER_AUTHED:
			return Object.assign({}, state, {
            user: action.user
        	});
		default:
			return state;
	}
}