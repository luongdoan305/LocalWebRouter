import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { IpsecEdit, } from 'components/antd/vpn/ipsec/edit'
import { IpsecTable, } from 'components/antd/vpn/ipsec/table'
import ubusApi from 'service/api/ubus-api';
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

export const Configtunnel = () => {
    const { t } = useTranslation()
    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [key, setKey] = React.useState(null)
    const [local_id, setLocal_id] = React.useState(null)
    const [remote_id, setRemote_id] = React.useState(null)
    const [local_address, setLocal_address] = React.useState(null)
    const [remote_address, setRemote_address] = React.useState(null)
    const [remote_subnet, setremote_subnet] = React.useState(null)
    const [local_subnet, setlocal_subnet] = React.useState(null)
    const [ike_encrypt, setike_encrypt] = React.useState(null)
    const [ike_hash, setike_hash] = React.useState(null)
    const [ike_dh, setike_dh] = React.useState(null)
    const [esp_encrypt, setesp_encrypt] = React.useState(null)
    const [esp_hash, setesp_hash] = React.useState(null)
    const [esp_dh, setesp_dh] = React.useState(null)

    const refreshData = async () => {
        const dataF = await ubusApi.show_ipsec()
        console.log("ipsec", dataF.values.IPSEC.pre_shared_key)
        setKey(dataF.values.IPSEC.pre_shared_key)
        setLocal_id(dataF.values.IPSEC.local_identifier)
        setRemote_id(dataF.values.IPSEC.remote_identifier)
        setLocal_address(dataF.values.IPSEC_tunnel.local_leftip)
        setRemote_address(dataF.values.IPSEC.gateway)
        setremote_subnet(dataF.values.IPSEC_tunnel.remote_subnet)
        setlocal_subnet(dataF.values.IPSEC_tunnel.local_subnet)
        setike_encrypt(dataF.values.IPSEC_ike.encryption_algorithm)
        setike_hash(dataF.values.IPSEC_ike.dh_group.split("-")[0])
        setike_dh(dataF.values.IPSEC_ike.dh_group.split("-")[1])
        setesp_encrypt(dataF.values.IPSEC_esp.encryption_algorithm)
        setesp_hash(dataF.values.IPSEC_esp.dh_group.split("-")[0])
        setesp_dh(dataF.values.IPSEC_esp.dh_group.split("-")[1])
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
                    <Card title={t('Ipsec Config')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <IpsecEdit item={item}
                            datakey={key}
                            local_id={local_id}
                            remote_id={remote_id}
                            local_address={local_address}
                            remote_address={remote_address}
                            remote_subnet={remote_subnet}
                            local_subnet={local_subnet}
                            ike_encrypt={ike_encrypt}
                            ike_hash={ike_hash}
                            ike_dh={ike_dh}
                            esp_encrypt={esp_encrypt}
                            esp_hash={esp_hash}
                            esp_dh={esp_dh}
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
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        display: 'flex',
                    }}>
                    <Card title="Ipsec Config List" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <IpsecTable
                                key={key}
                                local_id={local_id}
                                remote_id={remote_id}
                                local_address={local_address}
                                remote_address={remote_address}
                                remote_subnet={remote_subnet}
                                local_subnet={local_subnet}
                                ike_encrypt={ike_encrypt}
                                ike_hash={ike_hash}
                                ike_dh={ike_dh}
                                esp_encrypt={esp_encrypt}
                                esp_hash={esp_hash}
                                esp_dh={esp_dh}
                                onEditItem={onEditItem}
                            />
                        </div>
                    </Card>
                    {showModalContent()}
                    {/* <Button type="primary" onClick={onCreateItem} >
                        {t('create')}
                    </Button> */}
                </Space>
            </Space>
        </>
    )
}