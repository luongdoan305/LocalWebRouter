import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { OpenVpnEdit } from 'components/antd/internet/openvpn/edit'
import { OpenVpnClientTable, ListCertificate } from 'components/antd/internet/openvpn/table'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

const Page = () => {
    const { t } = useTranslation()
    const [hihi, setHihi] = React.useState(null)
    const refreshData = async () => {
        const dataF = await ubusApi.show_network_openvpn()
        const keyData = Object.keys(dataF.values)
        console.log(keyData)
        const arrData: any = keyData.map(key => {
            const value = dataF.values[key]
            return value
        })
        // console.log(arrData)
        setHihi(arrData)
    }
    React.useEffect(() => {
        refreshData()
    }, [])

    //Fake call Api

    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [showCrt, setShowCrt] = React.useState(false)
    const [isModalOpen, setIsModalOpen] = React.useState(true)

    const onEditItem = (group: any) => {
        if (group.key) {
            setItem(Object.assign({}, group))
            setShowModal(true)
            setValue('controller')
        } else {
            setItem(Object.assign({}, group))
            setShowModal(true)
            setValue('agent')
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

    const onShowCert = (name: any) => {
        setShowCrt(name);
    };

    const onCertCancel = () => {
        setShowCrt(false)
        setItem(null)
    }
    const onCertOk = () => {
        setShowCrt(false)
    }
    const onCertDone = () => {
        setShowCrt(false)
        setItem(null)
    }

    const onEditNetwork = (params: any) => {
        setItem(Object.assign({}, params))
        setIsModalOpen(params);
    }

    const showModalContent = () => {
        if (!showModal) {
            return null
        }
        return (
            <Modal width={700} open={true} onCancel={onModalCancel} onOk={onModalOk} footer={null}>
                <Col span={23}>
                    <Card title={t('openvpn_configure')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <OpenVpnEdit item={item}
                            onDone={onDone} value={value} handleChange={handleChange} />

                    </Card>
                </Col>
            </Modal>
        )
    }

    const showModalCert = () => {
        if (!showCrt) {
            return null
        }
        return (
            <Modal open={true} onCancel={onCertCancel} onOk={onCertOk} footer={null} width={1000}>
                <Col span={23}>vity-check.ubuntu.com./
                    <Card title="Certificates Management" type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <ListCertificate dataTable={hihi}
                            onDone={onCertDone} value={value} handleChange={handleChange} />

                    </Card>
                </Col>
            </Modal>
        )
    }

    return (
        <Card title={t('openvpn_list')} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
            <div style={{ overflowX: 'auto' }}>
                <OpenVpnClientTable
                    dataTable={hihi}
                    onEditItem={onEditItem} />
                {showModalContent()}
            </div>
            <Space>
                <Button type="primary" onClick={onCreateItem} >
                    {t('create')}
                </Button>

                {showModalCert()}
                <Button htmlType="button" type="default" style={{ "background": "coral", "color": "white" }} onClick={onShowCert}>
                    {t('certificate_list')}
                </Button>
            </Space>
        </Card>
    )
}
export default Page
