import { Button, Card, Col, Modal } from "antd"
import { RouterEdit } from "components/antd/internet/router/edit"
import { RouterTable } from "components/antd/internet/router/table"
import AntdLayout from "components/antd/layout"
import React from "react"
import ubusApi from "service/api/ubus-api"
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

const Page = () => {
    const { t } = useTranslation()
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [data, setData] = React.useState(null)

    const refreshData = async () => {
        const data = await ubusApi.show_network_routing()
        setData(data.routes)
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
                    <Card title={t('route_configure')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <RouterEdit item={item} onDone={onDone} />
                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <Card title={t('route_list')} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
            <div style={{ overflowX: 'auto' }}>
                <RouterTable
                    hihi={data}
                    onEditItem={onEditItem}
                />
                {showModalContent()}
            </div>
            <Button type="primary" onClick={onCreateItem} >
                {t('create')}
            </Button>
        </Card>
    )
}
export default Page
