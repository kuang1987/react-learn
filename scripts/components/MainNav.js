import React, {Component} from 'react';
import {Row,Col,Nav,Navbar,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import {Link} from 'react-router'
import {routeActions} from 'react-router-redux'


class MainNav extends Component {
	constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.selectItem = this.selectItem.bind(this);
        //this.logout = this.logout.bind(this);
    }

    login(e){
        e.preventDefault()
    	const {dispatch} = this.props
    	dispatch(routeActions.push('/login'))
    }

    selectItem(eventKey,href){
    	const {dispatch} = this.props
    	dispatch(routeActions.push(href));
    }

    renderContent() {
    	const {authed,username} = this.props.user;
    	if(authed){
    		return ( 
    				<NavItem eventKey={1}><b>欢迎,{username}</b></NavItem>
    			)
    	}

    	return (<NavItem eventKey={1} onClick={this.login}><b>登录</b></NavItem>)
    }

    render() {
		return (                
				<Row>
					<Col lg={12} md={12} xs={12}>
                    <Navbar inverse fluid={true}>
                        <Navbar.Header>
                            <Navbar.Brand>
                              <Link to="/"><b>跨境通订单监控中心</b></Link>
                            </Navbar.Brand>
                        <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <NavItem eventKey={1} href="#">实时</NavItem>
                                <NavItem eventKey={2} href="#">历史</NavItem>
                                <NavItem eventKey={3} href="#">报警</NavItem>
                                <NavDropdown eventKey={4} title="配置" id="config">
                                    <MenuItem eventKey={4.1} href="/configJob" onSelect={this.selectItem}>定时任务</MenuItem>
                                    <MenuItem eventKey={4.2}>报警任务</MenuItem>
                                    <MenuItem eventKey={4.3}>图表</MenuItem>
                                    <MenuItem eventKey={4.4}>权限</MenuItem>
                                </NavDropdown>
                            </Nav>
                            <Nav pullRight={true}>
                                {this.renderContent()}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    </Col>
                </Row>
              )
	}
}

export default MainNav;