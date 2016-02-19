import React, {Component} from 'react';
import {Modal,Input,Button,Alert,Panel,Accordion,PanelGroup} from 'react-bootstrap'
import {closeOperateJobModal,processJob} from '../actions/timerJobActions'

class TimerJobEditModal extends Component {
	constructor(props) {
        super(props);
        this.state = {jobName:"",
        			  jobType: "gw",
        			  jobScheType: "in",
    				  querydsl:"",
    				  queryparams:"",
    				  scripts:"",
    				  es_index:"",
    				  es_type:"",
    				  es_document_id:"",
    				  disabled:false}
    	this.jobTypeOptions = [{optionValue:"gw",optionName:"关务数据库(Mysql)"},
        			  		   {optionValue:"ecc",optionName:"ECC数据库(SqlServer)"},
        			  		   {optionValue:"es",optionName:"数据仓库(ElasticSearch)"}]

    	this.jobScheTypeOptions = [{optionValue:"in",optionName:"间隔(internal)"},
    							   {optionValue:"cr",optionName:"Cron"}]
    }

    handleSubmit(e){
    	e.preventDefault();
    	const {dispatch,operation,selectedJobId} = this.props;
    	dispatch(processJob(selectedJobId,operation));
    }

    back(e){
    	e.preventDefault();
    	const {dispatch} = this.props;
    	dispatch(closeOperateJobModal());
    }

    componentWillMount(){

    	const {selectedJobId,operation,dispatch} = this.props;
    	if(selectedJobId && operation=="update"){
    		dispatch(processJob(selectedJobId,"get"));
    	}
    }

    handleChange(e){
      e.preventDefault();
      let ele = e.target.id;
      this.state[ele] = e.target.value
      this.setState(this.state)
    }

    componentWillReceiveProps(nextProps){
    	if(nextProps.processingJobStatus=="success" && this.props.processingJobStatus != "success"){
    		this.setState(Object.assign({},this.getState,nextProps.result));
    		this.setState({disabled:false})
    	}
    	if(nextProps.processingJobStatus=="fail" || nextProps.processingJobStatus=="processing"){
    		this.setState({disabled:true})
    	}
    }

    renderOptions(realValueKey,optionsList){
    	const value = this.state[realValueKey];
    	return optionsList.map((row)=>{
    		if(row.optionValue == value){
    			return (<option value={row.optionValue} selected={true}>{row.optionName}</option>)
    		}
    		return (<option value={row.optionValue}>{row.optionName}</option>)
    	})
    }

    renderEditForm(){
    	const {operation,processingJobStatus} = this.props;
    	console.log(operation)
    	console.log(processingJobStatus)
    	if(processingJobStatus == "processing"){
    		return (<p>加载中...</p>)
    	}else if(processingJobStatus == "success"){
    		switch(operation){
    			case "create":
    			case "update":
    				let {selectedJobId} = this.props;
    				if(operation == "new") {selectedJobId=""}
    				return (    <form>
    						<PanelGroup defaultActiveKey="1" accordion>
    						<Panel header="基本信息" eventKey="1">
          						<Input type="text" id="jobId" value={selectedJobId} hidden="true" onChange={this.handleChange.bind(this)}/>
          						<Input type="text" id="jobName" value={this.state.jobName} label="任务名称" disabled={this.state.disabled} onChange={this.handleChange.bind(this)} />
          						<Input type="select" label="任务调度方式" disabled={this.state.disabled} onChange={this.handleChange.bind(this)}>
          							{this.renderOptions(this.state.jobScheType,this.jobScheTypeOptions)}
          						</Input>
          						<Input type="text" id="jobScheParams" value={this.state.jobScheParams} label="任务调度参数" disabled={this.state.disabled} onChange={this.handleChange.bind(this)} />
          					</Panel>
          					
          					<Panel header="数据源" eventKey="2">
          						<Input type="select" label="选择数据库" placeholder={this.state.jobType} disabled={this.state.disabled} onChange={this.handleChange.bind(this)}>
          							{this.renderOptions(this.state.jobType,this.jobTypeOptions)}
    							</Input>
          						<Input type="textarea" id="querydsl" value={this.state.querydsl} label="查询语句" disabled={this.state.disabled} onChange={this.handleChange.bind(this)}/>
          						<Input type="text" id="queryparams" value={this.state.queryparams} label="查询参数" disabled={this.state.disabled} onChange={this.handleChange.bind(this)} />
          					</Panel>
          					<Panel header="数据转换" eventKey="3">
          						<Input type="textarea" id="scripts" value={this.state.scripts} label="转换脚本" help="可以进行简单的数据清洗" disabled={this.state.disabled} onChange={this.handleChange.bind(this)}/>
          					</Panel>
          					<Panel header="数据目标" eventKey="4">
          						<Input type="text" id="es_index" value={this.state.es_index} label="ES Index" disabled={this.state.disabled} onChange={this.handleChange.bind(this)}/>
          						<Input type="text" id="es_type" value={this.state.es_type} label="ES Type" disabled={this.state.disabled} onChange={this.handleChange.bind(this)}/>
          						<Input type="text" id="es_document_id" value={this.state.es_document_id} label="ES Document ID" disabled={this.state.disabled} onChange={this.handleChange.bind(this)}/>
          					</Panel>
          					</PanelGroup>
          				</form>

    				)
				case "start":
					return (<h4>确认启动该任务么?</h4>)
				case "stop":
					return (<h4>确认停止该任务么?</h4>)
				case "delete":
					return (<h4>确认删除该任务么?</h4>)
    		}

    	}else if(processingJobStatus == "fail"){
    		const {result} = this.props;
    		return (<Alert bsStyle="danger">{result}</Alert>);
    	}
    }

    render(){
    	const {title,selectedJobId} = this.props
    	return (
    			<Modal bsSize={"lg"} show={true}>
    				<Modal.Header>
            			<Modal.Title>{title}</Modal.Title>
          			</Modal.Header>
          			<Modal.Body>
          				{this.renderEditForm()}
          			</Modal.Body>
          			<Modal.Footer>
          				<Button bsStyle={"info"} onClick={this.handleSubmit.bind(this)} disabled={this.state.disabled}>确定</Button>
          				<Button bsStyle={"info"} onClick={this.back.bind(this)}>返回</Button>
          			</Modal.Footer>
    			</Modal>
    		)
    }

}

export default TimerJobEditModal