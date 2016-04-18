import React, {Component} from 'react';
import {Panel} from 'react-bootstrap'

class Metrics extends Component {
	constructor(props) {
		super(props);
		this.state = {data:0};	
	}

	componentDidMount(){
		const {refresh} = this.props || 0;
		let _ref = this;
		if(refresh){
			setInterval(function(){
				_ref.setState({data:_ref.state.data + 1});
			},refresh);			
		}
	}

	/*shouldComponentUpdate(nextProps, nextState) {
		if(nextState.needRefresh && !this.state.needRefresh){
			this.data = this.data + 1;
			return true;
		}
		return false;
	}*/

	render() {
		return (
			<Panel header={this.props.title} bsStyle="default">
				<h2>{this.state.data}</h2>
			</Panel>
		);
	}
}


export default Metrics;