import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { VxlanEdit } from '../../../components/antd/vpn/vxlan/edit'
import { VxlanTable } from '../../../components/antd/vpn/vxlan/table'
import ubusApi from '../../../service/api/ubus-api';
import { config } from 'process'
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

const Page = () => {
    const { t } = useTranslation()
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [data, setData] = React.useState(null)

    const refreshData = async () => {
        const data1 = await ubusApi.show_vxlan()
        console.log("show_acl:", data1.vlxan_data)
        setData(data1.vlxan_data)
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
                    <Card title={t('vxlan_Configuration')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <VxlanEdit item={item} onDone={onDone} />
                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <Card title={t('vxlan_mode')} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <VxlanTable
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
export default Page
