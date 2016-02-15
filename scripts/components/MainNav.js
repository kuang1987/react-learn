import React, {Component} from 'react';
import {Row,Nav,Navbar,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import {Link} from 'react-router'


class MainNav extends Component {
	constructor(props) {
        super(props);
    }

    /*renderContent() {
    	const {authed,username} = this.props.user;
    	if(authed){
    		return ( 
    				<NavItem eventKey={1}><b>欢迎,{username}</b></NavItem>
    			)
    	}

    	return (<NavItem eventKey={1}><b>登录</b></NavItem>)
    }*/

    render() {
		return (                
				<Row>
                    <Navbar fluid={true} inverse>
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
                                    <MenuItem eventKey={4.1}>定时任务</MenuItem>
                                    <MenuItem eventKey={4.2}>报警任务</MenuItem>
                                    <MenuItem eventKey={4.3}>图表</MenuItem>
                                    <MenuItem eventKey={4.4}>权限</MenuItem>
                                </NavDropdown>
                            </Nav>
                            <Nav pullRight>
                                <NavItem eventKey={1}><b>登录</b></NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
              )
	}
}

export default MainNav;