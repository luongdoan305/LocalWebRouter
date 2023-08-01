import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { PptpclientEdit } from 'components/antd/vpn/pptp/editpptpclient'
import { PptpclientTable } from 'components/antd/vpn/pptp/tablepptpclient'
import ubusApi from 'service/api/ubus-api';
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

export const PPTPclient = () => {
    const { t } = useTranslation()
    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [server, setserver] = React.useState(null)
    const [username, setusername] = React.useState(null)
    const [password, setpassword] = React.useState(null)
    const [defaultroute, setdefaultroute] = React.useState(null)

    const refreshData = async () => {
        const dataF = await ubusApi.show_pptp_client()
        setserver(dataF.pptp_client.server)
        setusername(dataF.pptp_client.username)
        setpassword(dataF.pptp_client.password)
        setdefaultroute(dataF.pptp_client.defaultroute)
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
                        <PptpclientEdit item={item}
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
                <Card title={t("pptp_client_mode")} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <PptpclientTable
                            server={server}
                            username={username}
                            password={password}
                            defaultroute={defaultroute}
                            onEditItem={onEditItem}
                        />
                    </div>
                </Card>
                {showModalContent()}
            </Space>
        </>
    )
}

