import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row,Col} from 'react-bootstrap';
import Metrics from '../components/charts/Metrics'

class RealTimeContainer extends Component {
	constructor(props) {
        super(props);

    }

    render() {
    	return (
    		<div>
    			<Row>
    				<Col lg={2} md={2} xs={2} lgOffset={1} mdOffset={1} xsOffset={1}>
    					<Metrics title={"待出库订单总数"} />
    				</Col>
    			</Row>
    		</div>
    	)
    }
}

export default RealTimeContainer;