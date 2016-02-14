import * as types from '../constants/actionTypes';

export function loginUser() {
	return dispatch => {
		var user = {
			"authed": true,
			"username": "kong.xiangxiang"
		}
		dispatch(authUser(user));
	}
}

export function authUser(user){
	return {
		type: types.USER_AUTHED,
		user
	}
}