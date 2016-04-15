import React, {Component} from 'react';
import PageContainer from '../containers/PageContainer';
import TimerJobContainer from '../containers/TimerJobContainer';
import RealTimeContainer from '../containers/RealTimeContainer';
import {connect} from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import Login from '../components/Login';
import NotFound from '../components/NotFound'
import {requireAuthentication} from '../abstracts/AuthenticatedComponent'


class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={PageContainer}>
					<Route path="/realTime" component={RealTimeContainer}/>
					<Route path="/configJob" component={requireAuthentication(TimerJobContainer)}/>
					<Route path="/login" component={Login}/>
					<Route path="/*" component={NotFound}/>
				</Route>		
			</Router>
		);
			}
}


export default App;