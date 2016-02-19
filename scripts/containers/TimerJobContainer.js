import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ButtonToolbar,Button,Row,Col,Input,Panel,Modal} from 'react-bootstrap';
import DataTable from '../components/DataTable';
import TimerJobEditModal from '../components/TimerJobEditModal'
import {fetchTimerJobs,openOperateJobModal} from '../actions/timerJobActions';

class TimerJobContainer extends Component {
	constructor(props) {
        super(props);
        this.state = {search:"",jobselected:false,jobrunning:false,querying:false,editModalStatus:false}
    }

    componentDidMount(){
    	const {dispatch} = this.props;
    	dispatch(fetchTimerJobs(""));
    }


    handleChange(e){
      e.preventDefault();
      let ele = e.target.id;
      this.state[ele] = e.target.value
      this.setState(this.state)
    }

    handleClick(e){
    	e.preventDefault();
    	const {dispatch} = this.props;
    	dispatch(fetchTimerJobs(this.state.search));
    }

    handleEditBtn(operation){
    	const {dispatch,selectedJobId} = this.props;
    	if(selectedJobId == ""){
    		return;
    	}
    	dispatch(openOperateJobModal(operation,selectedJobId))
    }

    /*jobSelected(){
    	const {selectedJobId} = this.props;
    	if(selectedJobId){
    		return true;
    	}
    	return false;
    }

    jobRunning(){
    	const {selectedJobId} = this.props;

    }*/
    componentWillReceiveProps(nextProps){
    	const {joblist,selectedJobId,dispatch,operateJobModalShow} = nextProps;
    	if(selectedJobId){
    		for(let row in joblist){
    			if(joblist[row].jobId == selectedJobId){
    				this.setState({jobselected:true,jobrunning:joblist[row].jobRunning});
    				break;
    			}

    		}
    	}

    	if(!operateJobModalShow && this.props.operateJobModalShow){
    		this.setState({jobselected:false});
    		dispatch(fetchTimerJobs(""));
    	}

    	if(nextProps.fetchstage == "fetching"){
    		this.setState({querying:true})
    	}

    	if(this.props.fetchstage != "success" && nextProps.fetchstage == "success"){
    		this.setState({search:"",jobselected:false,jobrunning:false,querying:false})
    	}

    }


    renderTableContent(){
    	const header = [["jobId","id"],
							 ["jobName","名称"],["jobRunning","任务状态"]];
		const fetchstage = this.props.fetchstage;
    	if(fetchstage==="" || fetchstage === "fail"){
    		return null
    	}else{
    		let joblist = this.props.joblist;
    		let selectedJobId = this.props.selectedJobId;
    		joblist = joblist.map((row)=>{
    			let style = ""
    			if(row.jobId == selectedJobId){
    				style = "info"
    			}
    			return Object.assign({},row,{style:style})
    		})
    		return (
    			<DataTable header={header} joblist={joblist} dispatch={this.props.dispatch}/>
    			//<p>{this.props.joblist[0].jobId}</p>
    		)
    	}
    }

    renderProcessingModal(){
    	const fetchstage = this.props.fetchstage;
    	if(fetchstage == "fetching"){
    		return (<Modal show={true}>加载中...</Modal>);
    	}

    	return null;
    }

    renderJobEditModal(){
    	const {operation,dispatch,selectedJobId,processingJobStatus,result,operateJobModalShow} = this.props;
    	if(operateJobModalShow){
    		let title = "";
    		switch(operation){
    			case "create":
    				title = "新建任务";
    				break;
    			case "update":
    				title = "更新任务";
    				break;
    			case "start":
    				title = "启动任务";
    				break;
    			case "stop":
    				title = "停止任务";
    				break;
    			case "delete":
    				title = "删除任务";
    				break;
    			default:
    			    return null;    				    				    				    			
    		}
    		return (<TimerJobEditModal 
    				title={title} 
    				dispatch={dispatch} 
    				selectedJobId={selectedJobId} 
    				operation={operation}
    				processingJobStatus={processingJobStatus}
    				result={result}/>)

    	}

    	return null;
   }
    

	render() {
		return (
			<div>
			   {this.renderProcessingModal()}
			   {this.renderJobEditModal()}
    		<Row>
    			<Col lg={2} md={2} xs={2}>
    					<Input id="search" type="text" value={this.state.search} onChange={this.handleChange.bind(this)} placehodler="请输入任务id或名称..."/>
    			</Col>
    			<Col lg={4} md={4} xs={4}>
    					<Button bsStyle="info" disabled={this.state.querying} onClick={this.handleClick.bind(this)}>查询</Button>
    			</Col>
    		</Row>
    		<Row>
    			<Col lg={12} md={12} xs={12}>
    				<ButtonToolbar>
    					<Button bsStyle="info" disabled={false} onClick={this.handleEditBtn.bind(this,"create")}>新建</Button>
    					<Button bsStyle="info" disabled={!this.state.jobselected} onClick={this.handleEditBtn.bind(this,"update")}>更新</Button>
    					<Button bsStyle="info" disabled={!this.state.jobselected || !this.state.jobrunning} onClick={this.handleEditBtn.bind(this,"start")}>开始</Button>
    					<Button bsStyle="info" disabled={!this.state.jobselected || this.state.jobrunning} onClick={this.handleEditBtn.bind(this,"stop")}>暂停</Button>
    					<Button bsStyle="info" disabled={!this.state.jobselected} onClick={this.handleEditBtn.bind(this,"delete")}>删除</Button>
    				</ButtonToolbar>
    			</Col>
    		</Row>
    		<Row>
    			<Col lg={12} md={12} xs={12}>
    				{this.renderTableContent()}
    			</Col>
    		</Row>
    		</div>
  		)
	}
}

function mapStateToProps(state) {
	const {joblist,selectedJobId,fetchstage,operation,processingJobStatus,result,operateJobModalShow} = state.timerjob;
	return {
		joblist: joblist,
		selectedJobId: selectedJobId,
		fetchstage: fetchstage,
		operation: operation,
		processingJobStatus:processingJobStatus,
		result:result,
		operateJobModalShow:operateJobModalShow
	};
}

export default connect(mapStateToProps)(TimerJobContainer);