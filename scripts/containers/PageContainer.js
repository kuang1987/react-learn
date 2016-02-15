import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainNav from '../components/MainNav'
import {Grid,Col,Row} from 'react-bootstrap'

class PageContainer extends Component {

    render() {
		return (
			<Grid fliud={true}>
				<MainNav {...this.props} />
				{this.props.children}
			</Grid>)
		//return (<p>456</p>)
	}
}

function mapStateToProps(state) {
	const {user} = state;
	return {
		user: user
	};
}

export default connect(mapStateToProps)(PageContainer);