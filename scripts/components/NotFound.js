import React, {Component} from 'react';
import {Link} from 'react-router';
import {Alert,Row,Col} from 'react-bootstrap';

class NotFound extends Component {

	render() {
		return (
				<Row>
					<Col lg={4} md={4} xs={4} lgOffset={4} mdOffset={4} xsOffset={4}>
						<Alert bsStyle="danger">您访问的页面不存在! <Link to="/">返回主页</Link></Alert>
					</Col>
				</Row>
			)
	}
}

export default NotFound;