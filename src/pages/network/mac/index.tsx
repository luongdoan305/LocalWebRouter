import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { MacEdit } from 'components/antd/network/mac/edit'
import { MacTable } from 'components/antd/network/mac/table'
import ubusApi from '../../../service/api/ubus-api';
import { config } from 'process'
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

const Page = () => {
    const { t } = useTranslation()
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [data_mac, setData_mac] = React.useState(null)

    const refreshData = async () => {
        const data1 = await ubusApi.show_network_mac()
        //console.log("show_network_mac:", data1.data)
        setData_mac(data1.data)
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
                    <Card title={t('mac_configuration')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <MacEdit item={item} onDone={onDone} />
                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <Card title={t('mac_list')} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <MacTable
                        haha={data_mac}
                        onEditItem={onEditItem}
                    />
                </div>
            {showModalContent()}
            <Button type="primary" onClick={onCreateItem} >
                {t('create')}
            </Button>
        </Space>
        </Card >
    )
}
export default Page