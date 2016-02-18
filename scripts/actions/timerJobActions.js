import * as types from '../constants/actionTypes';

export function fetchTimerJobs(search=""){
	return (dispatch) =>{
		const fetchstage = 'fetching';
		dispatch(timerJobUnselected());
		dispatch(beginFetchingTimerJobs(fetchstage));
		dispatch(doFetchTimerJobs(search));
	}
}

export function timerJobUnselected(){
	return {
		type: types.TIMER_JOB_SELECTED,
		selectedJobId: undefined
	}	
}

export function timerJobSelected(jobId){
	return {
		type: types.TIMER_JOB_SELECTED,
		selectedJobId: jobId
	}
}

export function editJob(type){
	return {
		type: types.EDIT_JOB,
		editJob: type
	}
}

export function closeEditJobModal(){
	return {
		type: types.EDIT_JOB,
		editJob: ""
	}
}

function doFetchTimerJobs(search){
	return (dispatch) =>{
		const joblist = [{"jobId":"123","jobName":"first Job","jobRunning":true},{"jobId":"456","jobName":"second Job","jobRunning":false}];
		let searchJobList = [];
		if(search!=""){
			for(let row in joblist){
				if(joblist[row].jobId == search || joblist[row].jobName == search){
					searchJobList.push(joblist[row]);
				}
			}
		}else{
			searchJobList = joblist;
		}
		setTimeout(()=>dispatch(fetchTimerJobsSuccess(searchJobList)),2000);
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