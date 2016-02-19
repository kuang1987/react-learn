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

export function openOperateJobModal(operation,jobId){
	let processingJobStatus = undefined;
	if(operation == "create"){
		processingJobStatus = "success";
	}
	return {
		type: types.OPEN_OPERATE_JOB_MODAL,
		operateJobModalShow: true,
		operation: operation,
		selectedJobId: jobId,
		processingJobStatus: processingJobStatus
	}
}

/*export function operateJob(type){
	return {
		type: types.OPERATE_JOB,
		operation: type
	}
}*/

export function closeOperateJobModal(){
	return {
		type: types.CLOSE_OPERATE_JOB_MODAL,
		operation: "",
		processingJobStatus: "",
		operateJobModalShow: false,
		result: undefined,
		selectedJobId: undefined
	}
}

/*export function fetchOne(jobId){
	return (dispatch) => {
		dispatch(beginFetchOne());
		dispatch(doFetchOneJob(jobId));
	}
}*/

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

export function processJob(jobId,operation){
	return (dispatch) => {
		dispatch(beginProcessJob());
		dispatch(doProcessJob(jobId,operation));
	}
}

function doProcessJob(jobId){
	return (dispatch) => {
		const result = {jobId:jobId,
						 jobName:"first Job",
						 jobType:"ecc",
						 jobScheType:"in",
						 jobScheParams:"60",
						 querydsl:"select * from 123",
						 queryparams:"",
						 scrpits:"",
						 es_index:"order",
						 es_type:"order",
						 es_document_id:"merchant_order_id"}
		setTimeout(()=>dispatch(processJobSuccess(result)),2000);
		//setTimeout(()=>dispatch(processJobFail("获取任务配置信息失败！")),2000);
	}
}

function beginFetchingTimerJobs(fetchstage){
	return {
		type: types.FETCHING_TIMER_JOBS,
		fetchstage: fetchstage
	}
}

function beginProcessJob(){
	return {
		type:types.PROCESSING_JOB,
		processingJobStatus:"processing"}
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

function processJobSuccess(result){
	return {
		type: types.PROCESSING_JOB_SUCCESS,
		result:result,
		processingJobStatus: 'success'
	}
}

function processJobFail(result){
	return {
		type: types.PROCESSING_JOB_FAIL,
		result: result,
		processingJobStatus: 'fail'
	}
}