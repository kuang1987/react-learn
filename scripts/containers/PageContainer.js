import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainNav from '../components/MainNav'
import {Grid,Col,Row, Navbar} from 'react-bootstrap'

class PageContainer extends Component {

    render() {
		return (
			<Grid fluid={true}>
				<MainNav {...this.props} />
				{this.props.children}
			</Grid>)
		//return (<p>456</p>)
	}
}

function mapStateToProps(state) {
	const {user} = state.auth;
	return {
		user: user
	};
}

export default connect(mapStateToProps)(PageContainer);