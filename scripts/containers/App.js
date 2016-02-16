import React, {Component} from 'react';
import PageContainer from '../containers/PageContainer';
import {connect} from 'react-redux';
import ConfigJobContainer from '../containers/ConfigJobContainer';
import { Router, Route, browserHistory } from 'react-router'
import Login from '../components/Login';
import {requireAuthentication} from '../abstracts/AuthenticatedComponent'


class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(requireAuthentication(ConfigJobContainer));
		return (
			<Router history={browserHistory}>
				<Route path="/" component={PageContainer}>
					<Route path="/configJob" component={requireAuthentication(ConfigJobContainer)}/>
					<Route path="/login" component={Login}/>
				</Route>		
			</Router>
		);
			}
}


export default App;