import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { VlanEdit } from 'components/antd/network/vlan/edit'
import { VlanTable, VlanTable1 } from 'components/antd/network/vlan/table'
import ubusApi from 'service/api/ubus-api';
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

const Page = () => {
    const { t } = useTranslation()
    const optionsParentInterface = [
        { value: "eth0", label: "eth0", },
        { value: "eth1", label: "eth1", },
        { value: "eth3", label: "eth3", },
        { value: "eth4", label: "eth4", },
        { value: "eth5", label: "eth5", },
    ]

    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [hihi, setHihi] = React.useState(null)
    const [haha, setHaha] = React.useState(null)

    const refreshData = async () => {
        const dataF = await ubusApi.show_network_vlan()
        setHihi(dataF.access)
        setHaha(dataF.trunk)
    }
    React.useEffect(() => {
        refreshData()
    }, [])

    const onEditItem = (group: any) => {
        if (group.name) {
            setItem(Object.assign({}, group))
            setShowModal(true)
            setValue('access')
        } else {
            setItem(Object.assign({}, group))
            setShowModal(true)
            setValue('trunk')
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
                    <Card title={t('vlan_configure')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <VlanEdit optionsParentInterface={optionsParentInterface} item={item}
                            onDone={onDone} value={value} handleChange={handleChange} />

                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <Card title="Vlan Access" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <VlanTable
                            hihi={hihi}
                            onEditItem={onEditItem}
                        />
                    </div>
                </Card>
                <Card title="Vlan Trunk" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <VlanTable1
                            haha={haha}
                            onEditItem={onEditItem}
                        />
                    </div>
                </Card>
                {showModalContent()}
                <Button type="primary" onClick={onCreateItem} >
                    {t('create')}
                </Button>
            </Space>
        </>
    )
}
export default Page
