import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { ConferenceEdit } from '../../../components/antd/service/multimedia/conference/edit'
import { ConferenceTable } from '../../../components/antd/service/multimedia/conference/table'
import ubusApi from '../../../service/api/ubus-api';
import { config } from 'process'
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

export const Conference = () => {
    const { t } = useTranslation()
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [data, setData] = React.useState(null)

    const refreshData = async () => {
        const data1 = await ubusApi.show_ip_filter()
        console.log("show_acl:", data1.rules[1].ip_filter)
        setData(data1.rules[1].ip_filter)
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
                    <Card type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <ConferenceEdit item={item} onDone={onDone} />
                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <Card title={t('Room List')} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <ConferenceTable
                        haha={data}
                        onEditItem={onEditItem}
                    />
                    {showModalContent()}
                </div>
                <Button type="primary" onClick={onCreateItem} >
                    {t('create')}
                </Button>
            </Space>
        </Card>
    )
}

