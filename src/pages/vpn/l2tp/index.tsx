import { Button, Col, Row, Space, Table, Typography, Modal, Input, Select, message, Form, Card } from 'antd'
import { L2tpEdit } from 'components/antd/vpn/l2tp/edit';
import { L2tpTable } from 'components/antd/vpn/l2tp/table';
import React, { useState, useRef } from 'react';
import ubusApi from 'service/api/ubus-api';
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";

const Page = () => {
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [peeraddr, setpeeraddr] = React.useState()
    const [localaddr, setlocaladdr] = React.useState()
    const [ipaddr, setipaddr] = React.useState()

    const { t } = useTranslation();

    const refreshData = async () => {
        const dataF = await ubusApi.show_l2tp()
        console.log("show_l2tp:", dataF.values.localaddr)
        setlocaladdr(dataF.values.localaddr)
        setpeeraddr(dataF.values.peeraddr)
        setipaddr(dataF.values.ipaddr)
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
                    <Card title={t('l2tp_configuration')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <L2tpEdit item={item} onDone={onDone} />
                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <Card title={t("l2tp_mode")} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <L2tpTable
                        localaddr={localaddr}
                        peeraddr={peeraddr}
                        ipaddr={ipaddr}
                        onEditItem={onEditItem}
                    />
                    {showModalContent()}
                </div>
            </Space>
        </Card>
    )
}
export default Page
