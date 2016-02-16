import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Jumbotron,Button,Row,Col,Input,Glyphicon,ButtonInput,Alert} from 'react-bootstrap';
import { loginUser,authUser } from '../actions/authed'
import {routeActions} from 'react-router-redux'

class Login extends Component {
	constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
                      username: "",
                      password: "",
                      status: undefined,
                    }
    }

    innerUserGly(){
    	return (<Glyphicon glyph="user"/>)
    }

    innerPwdGly(){
    	return (<Glyphicon glyph="lock"/>)
    }

    handleSubmit(e){
      e.preventDefault();
      const {dispatch} = this.props;
      let {username,password} = this.state;
      if(username === ""){
         this.setState({status:false,reason:"用户名不能为空!"})
         return;
      }
      if(password === ""){
         this.setState({status:false,reason:"密码不能为空!"})
         return;
      }
      let {status,user} = loginUser(username,password);
      if(status){
          dispatch(authUser(user));
          /*const {state} = this.props.location
          if(state && state.nextPathname){
              dispatch(routeActions.push(state.nextPathname))
          }else{
              dispatch(routeActions.push('/'))
          }*/
          
      }else{
          this.setState({status:false,reason:"用户名/密码错误!"})
      }
    }

    handleChange(e){
      e.preventDefault();
      let ele = e.target.id;
      this.state[ele] = e.target.value
      this.setState(this.state)
    }

    renderLoginResult() {
       let {status,reason} = this.state;
       if(status === undefined){
           return
       }else if(status === false){
          return (  <Alert bsStyle="danger">
                      {reason}
                    </Alert>)
       }
    }

	render() {
		return ( 
			<Row>
			<Col lg={3} lgOffset={4} md={3} mdOffset={4} xs={3} xsOffset={4}>
    		  <Jumbotron>
          {this.renderLoginResult()}
            <form onSubmit={this.handleSubmit}>
    		  		<Input id="username" type="text" placeholder="用户名" addonBefore={this.innerUserGly()} value={this.state.username} onChange={this.handleChange}/>
    		  		<Input id="password" type="password" placeholder="密码" addonBefore={this.innerPwdGly()} value={this.state.password} onChange={this.handleChange}/> 
              <ButtonInput type="submit" bsStyle="primary" bsSize="large" block>登录</ButtonInput>
            </form>

  			  </Jumbotron>
  			  </Col>
  			  </Row>
  		)
	}
}

function mapStateToProps(state) {
  const {user} = state;
  return {
    user: user
  };
}

export default connect(mapStateToProps)(Login);