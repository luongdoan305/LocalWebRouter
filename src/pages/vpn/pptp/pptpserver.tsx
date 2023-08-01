import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { PptpserverEdit } from 'components/antd/vpn/pptp/editpptpserver'
import { PptpserverTable } from 'components/antd/vpn/pptp/tablepptpserver'
import ubusApi from 'service/api/ubus-api';
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

export const PPTPserver = () => {
    const { t } = useTranslation()
    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [reip, setremoteip] = React.useState(null)
    const [reip1, setremoteip1] = React.useState(null)
    const [username, setusername] = React.useState(null)
    const [password, setpassword] = React.useState(null)
    const [status, setenable] = React.useState("")

    const refreshData = async () => {
        const dataF = await ubusApi.show_pptp_server()
        setremoteip(dataF.values.pptpd.remoteip.split("-")[0])
        setremoteip1(dataF.values.pptpd.remoteip.split("-")[1])
        setusername(dataF.values.client.username)
        setpassword(dataF.values.client.password)
        setenable(dataF.values.pptpd.enabled)

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
                    <Card title={t('pptp_configure')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <PptpserverEdit item={item}
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
                <Card title={t("pptp_server_mode")} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <PptpserverTable
                            status={status}
                            remoteip={reip}
                            remoteip1={reip1}
                            username={username}
                            password={password}
                            onEditItem={onEditItem}
                        />
                    /</div>
                </Card>
                {showModalContent()}
            </Space>
        </>
    )
}

