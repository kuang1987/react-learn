import * as types from '../constants/actionTypes';

export function loginUser(username,password) {
	if(username === "kongxiangxiang" && password === "111111"){
		return {status:true,token:"123456",user:{username:username,authed:true}}
	}

	return {status:false}
}

export function authUser(user){
	return {
		type: types.USER_AUTHED,
		user
	}
}

export function loginSuccess(user,nextPathname){
	return (dispatch) => {
		dispatch(authUser(user));
	}
}