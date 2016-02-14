import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from '../components/Login';
import {Grid,Col,Row} from 'react-bootstrap';


class App extends Component {

	renderContent() {
		const {authed,username} = this.props.user;
		if(!authed){
			return <Login {...this.props}/>;
		}else{
			return <p>{username}</p>;
		}	
	}

	render() {
		return (<Grid fluid={true}>
					<Col xs={4} md={4} lg={4}>
						{this.renderContent()}
					</Col>
				</Grid>
				);
	}
}

function mapStateToProps(state) {
	const {user} = state;
	return {
		user: user
	};
}

export default connect(mapStateToProps)(App);