import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {loginUser} from '../actions/authed'

class Login extends Component {
	constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

	login(e) {
		e.preventDefault();
		const {dispatch} = this.props;
		dispatch(loginUser());
	}

	render() {
		return (<Button bsStyle="primary" onClick={this.login}>Login</Button>)
	}
}

export default Login;