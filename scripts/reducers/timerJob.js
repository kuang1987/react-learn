import * as types from '../constants/actionTypes';

const initialState = {
		   joblist: [],
		   fetchstage: "",
		   selectedJobId: undefined
}

export default function(state=initialState,action){
	switch(action.type){
		case types.FETCHING_TIMER_JOBS:
			return Object.assign({}, state, {
             fetchstage: action.fetchstage
        	});
		case types.FETCH_TIMER_JOBS_SUCCESS:
			return Object.assign({}, state, {
			 joblist:action.joblist,
             fetchstage: action.fetchstage
        	});
        case types.TIMER_JOB_SELECTED:
			return Object.assign({}, state, {
			 selectedJobId: action.selectedJobId
        	});
		default:
			return state;
	}
}