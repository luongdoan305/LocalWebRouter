import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { SippeerEdit } from '../../../components/antd/service/multimedia/sippeer/edit'
import { SippeerTable } from '../../../components/antd/service/multimedia/sippeer/table'
import ubusApi from '../../../service/api/ubus-api';
import { config } from 'process'
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

export const Sippeer = () => {
    const { t } = useTranslation()
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [data, setData] = React.useState(null)
    const [name, setName] = React.useState(null)
    const [option, setOption] = React.useState(null)
    const [port, setPort] = React.useState(null)
    const [address, setAddress] = React.useState(null)
    const [digits, setDigits] = React.useState(null)

    const refreshData = async () => {
        const data1 = await ubusApi.show_media_trunk()
        // console.log("trunk:", data1.trunk_media_data.name)
        setName(data1.trunk_media_data.name)
        setOption(data1.trunk_media_data.endpoint_disallow)
        setPort(data1.trunk_media_data.port)
        setAddress(data1.trunk_media_data.address)
        setDigits(data1.trunk_media_data.trunk_id)
    }
    React.useEffect(() => {
        refreshData()
    }, [])

    const onEditItem = (group: any) => {
        setItem(Object.assign({}, group))
        setShowModal(true)
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
                    <Card title={t('Sip Peer Edit')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <SippeerEdit item={item} onDone={onDone} />
                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <Card title={t('SIP Peer List')} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <SippeerTable
                        haha={data}
                        name={name}
                        option={option}
                        port={port}
                        address={address}
                        digits={digits}
                        onEditItem={onEditItem}
                    />
                    {showModalContent()}
                </div>
            </Space>
        </Card>
    )
}

