import React, {Component} from 'react';
import {Modal,Input,Button} from 'react-bootstrap'
import {closeEditJobModal} from '../actions/timerJobActions'

class TimerJobEditModal extends Component {
	constructor(props) {
        super(props);
        this.state = {jobName:"",
    				  querydsl:"",
    				  queryparams:"",
    				  scripts:"",
    				  es_index:"",
    				  es_type:"",
    				  es_document_id:""}
    }

    handleSubmit(e){
    	e.preventDefault();
    	const {dispatch} = this.props;
    }

    back(e){
    	e.preventDefault();
    	const {dispatch} = this.props;
    	dispatch(closeEditJobModal());
    }

    componentDidMount(){
    	const {selectedJobId,dispatch} = this.props;
    	if(selectedJobId){
    		dispatch(fetchOne(selectedJobId));
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
          				<form>
          					<Input type="text" id="jobId" value={selectedJobId} hidden="true"/>
          					<Input type="text" id="jobName" value={this.state.jobName} label="任务名称"/>
          					<Input type="select" label="Select" placeholder="gw" label="选择数据源">
      							<option value="gw">关务数据库(Mysql)</option>
      							<option value="ecc">ECC数据库(SqlServer)</option>
      							<option value="es">数据仓库(ElasticSearch)</option>
    						</Input>
          					<Input type="textarea" id="querydsl" value={this.state.querydsl} label="查询语句"/>
          					<Input type="text" id="queryparams" value={this.state.queryparams} label="查询参数"/>
          					<Input type="textarea" id="scripts" value={this.state.scripts} label="转换脚本" help="可以进行简单的数据清洗"/>
          					<Input type="text" id="es_index" value={this.state.es_index} label="ES Index"/>
          					<Input type="text" id="es_type" value={this.state.es_type} label="ES Type"/>
          					<Input type="text" id="es_document_id" value={this.state.es_document_id} label="ES Document ID"/>
          				</form>
          			</Modal.Body>
          			<Modal.Footer>
          				<Button bsStyle={"info"} onClick={this.handleSubmit.bind(this)}>确定</Button>
          				<Button bsStyle={"info"} onClick={this.back.bind(this)}>返回</Button>
          			</Modal.Footer>
    			</Modal>
    		)
    }

}

export default TimerJobEditModal