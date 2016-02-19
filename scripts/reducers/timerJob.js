import * as types from '../constants/actionTypes';

const initialState = {
		   joblist: [],
		   fetchstage: "",
		   selectedJobId: undefined,
		   operation: "",
		   processingJobStatus: "",
		   result:undefined,
		   operateJobModalShow:false
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
        case types.OPEN_OPERATE_JOB_MODAL:
			return Object.assign({}, state, {
			   operateJobModalShow: action.operateJobModalShow,
			   selectedJobId: action.selectedJobId,
			   operation:action.operation
        	});
        case types.CLOSE_OPERATE_JOB_MODAL:
			return Object.assign({}, state, {
			   operateJobModalShow: action.operateJobModalShow,
			   selectedJobId: action.selectedJobId,
			   operation:action.operation
        	});
        case types.OPERATE_JOB:
			return Object.assign({}, state, {
			 operation: action.operation,
			 processingJobStatus:action.processingJobStatus,
			 result: action.result
        	});
        case types.PROCESSING_JOB:
			return Object.assign({}, state, {
             processingJobStatus: action.processingJobStatus
        	});
        case types.PROCESSING_JOB_SUCCESS:
			return Object.assign({}, state, {
			 result: action.result,
             processingJobStatus: action.processingJobStatus
        	});
        case types.PROCESSING_JOB_FAIL:
			return Object.assign({}, state, {
			 result: action.result,
             processingJobStatus: action.processingJobStatus
        	});        
		default:
			return state;
	}
}