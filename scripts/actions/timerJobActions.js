import * as types from '../constants/actionTypes';

export function fetchTimerJobs(search=""){
	return (dispatch) =>{
		const fetchstage = 'fetching';
		dispatch(beginFetchingTimerJobs(fetchstage));
		dispatch(doFetchTimerJobs(search));
	}
}

export function timerJobSelected(jobId){
	return {
		type: types.TIMER_JOB_SELECTED,
		selectedJobId: jobId
	}
}

function doFetchTimerJobs(search){
	return (dispatch) =>{
		const joblist = [{"jobId":"123","jobName":"first Job","jobRunning":true},{"jobId":"456","jobName":"second Job","jobRunning":false}];
		setTimeout(()=>dispatch(fetchTimerJobsSuccess(joblist)),2000);
	}
}

function beginFetchingTimerJobs(fetchstage){
	return {
		type: types.FETCHING_TIMER_JOBS,
		fetchstage: fetchstage
	}
}

function fetchTimerJobsSuccess(joblist){
	return {
		type: types.FETCH_TIMER_JOBS_SUCCESS,
		joblist:joblist,
		fetchstage: 'success'
	}
}

function fetchTimerJobsFail(){
	return {
		type: types.FETCH_TIMER_JOBS_FAIL,
		joblist:[],
		fetchstage: 'fail'
	}
}