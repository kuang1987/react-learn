import React, {Component} from 'react';
//import Login from '../components/Login';
import PageContainer from '../containers/PageContainer';
import { Router, Route, browserHistory } from 'react-router'

class App extends Component {

	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={PageContainer}>
				</Route>
			</Router>
		);
			}
}

/*function mapStateToProps(state) {
	const {user} = state;
	return {
		user: user
	};
}*/

export default App;