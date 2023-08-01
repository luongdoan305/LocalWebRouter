import { Col, Row, Card } from 'antd'
import { TraceRoute } from 'components/antd/system/traceroute/form';
import React from 'react';

const Page = () => {
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)

    return (
        <Row>
        <Col span={4}></Col>
        <Col span={16}>
        <Card title="Traceroute" type="inner" headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}}>
                <TraceRoute />
        </Card>
        </Col>
        </Row>
    )
}
export default Page
