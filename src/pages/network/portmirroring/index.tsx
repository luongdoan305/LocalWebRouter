import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { PortEdit } from 'components/antd/network/portmirroring/edit'
import { PortTable } from 'components/antd/network/portmirroring/table'
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
    const [eth0, setEth0] = React.useState(null)
    const [eth1, setEth1] = React.useState(null)
    const [eth2, setEth2] = React.useState(null)
    const [eth3, setEth3] = React.useState(null)
    const [eth4, setEth4] = React.useState(null)
    const [eth5, setEth5] = React.useState(null)
    const [data, setData] = React.useState<any[]>([]);
    //let data 
    const refreshData = async () => {
        const dataF = await ubusApi.show_network_mirror()
        setEth0(dataF.eth0)
        setEth1(dataF.eth1)
        setEth2(dataF.eth2)
        setEth3(dataF.eth3)
        setEth4(dataF.eth4)
        setEth5(dataF.eth5)
        // console.log("hehe1",dataF.eth0)
        // console.log("hehe2",dataF.eth4)
        // console.log("hehe3",dataF.eth5)
        //const newData = [...dataF.eth0,...dataF.eth1,...dataF.eth2,...dataF.eth3,...dataF.eth4,...dataF.eth5]
        const newData = []
        if (dataF.eth0 != null) {
            newData.push(...dataF.eth0)
        }
        if (dataF.eth1 != null) {
            newData.push(...dataF.eth1)
        }
        if (dataF.eth2 != null) {
            newData.push(...dataF.eth2)
        }
        if (dataF.eth3 != null) {
            newData.push(...dataF.eth3)
        }
        if (dataF.eth4 != null) {
            newData.push(...dataF.eth4)
        }
        if (dataF.eth5 != null) {
            newData.push(...dataF.eth5)
        }
        setData(newData)
        // console.log("data", data)
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
                    <Card title={t('portmirroring_configure')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <PortEdit item={item} optionsParentInterface={optionsParentInterface}
                            onDone={onDone} value={value} handleChange={handleChange} />
                    </Card>
                </Col>
            </Modal>
        )
    }
    // 
    return (
        <>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <Card title={t("port_mirroring_status")} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <PortTable
                            data={data}
                            onEditItem={onEditItem}
                        />
                    </div>
                </Card>
                <Button type="primary" onClick={onCreateItem} >
                    {t('create')}
                </Button>
                {showModalContent()}
            </Space>
        </>
    )
}
export default Page
