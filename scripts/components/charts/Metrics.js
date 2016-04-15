import React, {Component} from 'react';
import {Panel} from 'react-bootstrap'

class Metrics extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Panel header={this.props.title} bsStyle="primary">
				<h2>10000</h2>
			</Panel>
		);
	}
}


export default Metrics;