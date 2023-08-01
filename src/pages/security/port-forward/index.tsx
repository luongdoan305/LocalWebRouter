import { Button, Col, Row, Space, Table, Typography, Modal, Input, Select, message, Form, Card } from 'antd'
import AntdLayout from 'components/antd/layout';
import { VlanTable, VlanTable1 } from 'components/antd/network/vlan/table';
import { PortForwardEdit } from 'components/antd/security/port-forward/edit';
import { PortForwardTable } from 'components/antd/security/port-forward/table';
import React, { useState, useRef } from 'react';
import ubusApi from 'service/api/ubus-api';
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";

const Page = () => {
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [tableData, settableData] = React.useState()
    const [data, setData] = React.useState()
    const { t } = useTranslation();

    const refreshData = async () => {
        const dataF = await ubusApi.show_network_nat()
        const keyData = Object.keys(dataF.values)
        console.log(keyData)
        const arrData: any = keyData.map(key => {
            const value = dataF.values[key]
            return value
        })
        console.log(arrData)
        settableData(arrData)
    }
    React.useEffect(() => {
        refreshData()
    }, [])

    const onEditItem = (group: any) => {
        if (group.name) {
            setItem(Object.assign({}, group))
            setShowModal(true)
        } else {
            setItem(Object.assign({}, group))
            setShowModal(true)
        }
    }
    const onCreateItem = (group: any) => {
        setItem({} as any)
        setShowModal(true)
    }
    const onModalCancel = () => {
        setShowModal(false)
        setItem(null)
    }
    const onModalOk = () => {
        setShowModal(false)
    }
    const onDone = () => {
        setShowModal(false)
        setItem(null)
    }

    const showModalContent = () => {
        if (!showModal) {
            return null
        }
        return (
            <Modal width={700} open={true} onCancel={onModalCancel} onOk={onModalOk} footer={null}>
                <Col span={23}>
                    <Card title={t("port_forward_configuration")} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <PortForwardEdit item={item}
                            onDone={onDone} />
                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <Card title={t("port_forward_list")} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <PortForwardTable
                        tableData={tableData}
                        onEditItem={onEditItem}
                    />
                    {showModalContent()}
                </div>
                <Button type="primary" onClick={onCreateItem} >
                    {t("create")}
                </Button>
            </Space>
        </Card>
    )
}
export default Page
