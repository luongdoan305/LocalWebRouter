import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Row } from "antd"
import React from "react"
import { LanEdit } from 'components/antd/network/lan/edit'
import { LanTable } from 'components/antd/network/lan/table'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"
import { table } from 'console'

const PageTable = () => {
    const { t } = useTranslation()
    const [dhcpdata, SetDhcpData] = React.useState(null)
    const refreshData = async () => {
        const dataF = await ubusApi.show_network_dhcp_leases()
        SetDhcpData(dataF.leases)
    }
    React.useEffect(() => {
        refreshData()
    }, [])

    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
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
    return (
        <div >
            <Card title={t('allocated')} type='inner' headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }} bodyStyle={{ height: "950px" }}>
                <div style={{ overflowX: 'auto' }}>
                    <LanTable
                        data1={dhcpdata}
                    ></LanTable>
                </div>
            </Card>
        </div>
    )
}
export default PageTable