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
	if(operation != "update"){
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

export function processJob(params,operation){
	return (dispatch) => {
		dispatch(beginProcessJob());
		dispatch(doProcessJob(params,operation));
	}
}

function doProcessJob(params,operation){
	return (dispatch) => {
		let method = "";
		let url = "";
		let baseJobUrl = "http://localhost:8081/jobs/"
		if(!params.jobId && operation != "create"){
			dispatch(processJobFail("jobId不能为空!"));
			return;
		}
		switch(operation){
			case "create":
			    method = "POST";
			    url = baseJobUrl;
			    break;
			case "get":
				method = "GET";
				url = baseJobUrl + params.jobId;
				break;
			case "update":
			case "start":
			case "stop":
			    method = "PATCH";
			    url = baseJobUrl + params.jobId;
				break;
			case "delete":
				method = "DELETE";
				url = baseJobUrl + params.jobId;
				break;
			default:
			    dispatch(processJobFail("非法操作!"));
			    break;
		}

		setTimeout(()=>dispatch(callApi(url,method,params)),2000);
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


//mock function
function callApi(url,method,params){
	return (dispatch)=>{
			console.log(method);
			if(method == "GET"){
				let result = {jobId:"123",
						 jobName:"first Job",
						 jobType:"ecc",
						 jobScheType:"in",
						 jobScheParams:"60",
						 querydsl:"select * from 123",
						 queryparams:"",
						 scrpits:"",
						 es_index:"order",
						 es_type:"order",
						 es_document_id:"merchant_order_id"};
				dispatch(processJobSuccess(result));
			}else if(method== "PATCH"){
				let result = "操作成功!";
				dispatch(processJobSuccess(result));
			}else if(method == "DELETE"){
				let result = "操作成功!";
				dispatch(processJobSuccess(result));
			}else{
				dispatch(processJobFail("操作失败！"));
			}
			
	}
					/**/
}