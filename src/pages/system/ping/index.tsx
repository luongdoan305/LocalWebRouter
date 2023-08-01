import { Button, Col, Row, Space, Table, Typography, Modal, Input, Select, message, Form, Card } from 'antd'
import AntdLayout from 'components/antd/layout';
import { PingSystem } from 'components/antd/system/ping/form';

import { UploadFirmware } from 'components/antd/system/upfirmware/upload';
import React, { useState, useRef } from 'react';
import ubusApi from '../../../service/api/ubus-api';

const Page = () => {
    return (
            <Row>
            <Col span={4}></Col>
            <Col span={16}>
            <Card title="Ping" type="inner" headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}}>
                <br></br>
                <PingSystem />
            </Card>
            </Col>
            </Row>
    )
}
export default Page
