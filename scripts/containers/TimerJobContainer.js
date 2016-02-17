import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ButtonToolbar,Button,Row,Col,Input} from 'react-bootstrap';
import DataTable from '../components/DataTable';
import {fetchTimerJobs} from '../actions/timerJobActions';

class TimerJobContainer extends Component {
	constructor(props) {
        super(props);
        this.state = {search:"",jobselected:false,jobrunning:false,querying:false}
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
    	const {joblist,selectedJobId} = nextProps;
    	if(selectedJobId){
    		for(let row in joblist){
    			if(joblist[row].jobId == selectedJobId){
    				this.setState({jobselected:true,jobrunning:joblist[row].jobRunning});
    				break;
    			}

    		}
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
    			let style = "active"
    			if(row.jobId == selectedJobId){
    				style = "warning"
    			}
    			return Object.assign({},row,{style:style})
    		})
    		return (
    			<DataTable header={header} joblist={joblist} dispatch={this.props.dispatch}/>
    			//<p>{this.props.joblist[0].jobId}</p>
    		)
    	}
    }

	render() {
		return ( 
			<div>
    		<Row>
    			<Col lg={2} md={2} xs={2}>
    					<Input id="search" type="text" value={this.state.search} onChange={this.handleChange.bind(this)} placehodler="请输入任务id或名称..."/>
    			</Col>
    			<Col lg={4} md={4} xs={4}>
    					<Button bsStyle="primary" disabled={this.state.querying}>查询</Button>
    			</Col>
    		</Row>
    		<Row>
    			<Col lg={12} md={12} xs={12}>
    				<ButtonToolbar>
    					<Button bsStyle="primary" disabled={false}>新建</Button>
    					<Button bsStyle="primary" disabled={!this.state.jobselected}>更新</Button>
    					<Button bsStyle="primary" disabled={!this.state.jobselected || !this.state.jobrunning}>开始</Button>
    					<Button bsStyle="primary" disabled={!this.state.jobselected || this.state.jobrunning}>暂停</Button>
    					<Button bsStyle="primary" disabled={!this.state.jobselected}>删除</Button>
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
	const {joblist,selectedJobId,fetchstage} = state.timerjob;
	return {
		joblist: joblist,
		selectedJobId: selectedJobId,
		fetchstage: fetchstage
	};
}

export default connect(mapStateToProps)(TimerJobContainer);