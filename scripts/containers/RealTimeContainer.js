import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row,Col,PageHeader,Label,small,Panel,Thumbnail} from 'react-bootstrap';
import Metrics from '../components/charts/Metrics'

class RealTimeContainer extends Component {
	constructor(props) {
        super(props);

    }

    render() {
    	return (
    		<div>
                <Row>
                <Col lg={6} md={6} xs={6}>
                    <Thumbnail>
                        <h4>待出库总计</h4>
                        <Row>
                            <Col lg={4} md={4} xs={4}>
                                <Metrics title={"订单总数"} refresh={500}/>
                            </Col>
                            <Col lg={4} md={4} xs={4}>
                                <Metrics title={"已物流申报订单总数"} />
                            </Col>
                            <Col lg={4} md={4} xs={4}>
                                <Metrics title={"物流申报放行订单总数"} />
                            </Col>
                            <Col lg={4} md={4} xs={4}>
                                <Metrics title={"已商检申报订单总数"} />
                            </Col>
                            <Col lg={4} md={4} xs={4}>
                                <Metrics title={"商检核销订单总数"} />
                            </Col>             
                        </Row>

                    </Thumbnail>
                </Col>
                <Col lg={6} md={6} xs={6}>
                <Thumbnail>
                    <h4>异常总计</h4>
                    <Row>
                        <Col lg={3} md={3} xs={3}>
                            <Metrics title={"接收订单异常"} refresh={500}/>
                        </Col>
                        <Col lg={3} md={3} xs={3}>
                            <Metrics title={"物流申报异常"} refresh={500}/>
                        </Col>
                        <Col lg={3} md={3} xs={3}>
                            <Metrics title={"物流回执异常"} refresh={500}/>
                        </Col>
                        <Col lg={3} md={3} xs={3}>
                            <Metrics title={"商检出库异常"} />
                        </Col>
                        <Col lg={3} md={3} xs={3}>
                            <Metrics title={"商检申报异常"} />
                        </Col>
                        <Col lg={3} md={3} xs={3}>
                            <Metrics title={"商检回执异常"} />
                        </Col>
                        <Col lg={3} md={3} xs={3}>
                            <Metrics title={"出库通知异常"} refresh={500}/>
                        </Col>
                    </Row>
                </Thumbnail>
                </Col>
                </Row>
                <h3>实时处理<small>(5分钟)</small></h3>
                <Row>
                    <Col lg={6} md={6} xs={6}>
                    </Col>
                    <Col lg={6} md={6} xs={6}>
                    </Col>                    
                </Row>
    		</div>
    	)
    }
}

export default RealTimeContainer;