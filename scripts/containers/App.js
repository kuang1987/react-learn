import React, {Component} from 'react';
import PageContainer from '../containers/PageContainer';
import {connect} from 'react-redux';
import ConfigJobContainer from '../containers/ConfigJobContainer';
import { Router, Route, browserHistory } from 'react-router'
import Login from '../components/Login';


class App extends Component {
	constructor(props) {
		super(props);
		this.requireAuth = this.requireAuth.bind(this);
	}

	requireAuth(nextState,replace){
		console.log(this.props.authed);
		if(!this.props.authed){
			replace({
				pathname:'/login',
				state: {nextPathname: nextState.location.pathname}
			})
		}
	}

	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={PageContainer}>
					<Route path="/configJob" component={ConfigJobContainer} onEnter={this.requireAuth}/>
					<Route path="/login" component={Login}/>
				</Route>		
			</Router>
		);
			}
}

function mapStateToProps(state) {
	const {authed} = state.auth.user;
	console.log(authed)
	return {
		authed: authed
	};
}

export default connect(mapStateToProps)(App);