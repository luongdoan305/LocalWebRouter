import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { StpTable1 } from 'components/antd/network/stp/table'
import ubusApi from 'service/api/ubus-api';
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

const Page = () => {
    const { t } = useTranslation()
    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [hihi, setHihi] = React.useState(null)


    const refreshData = async () => {
        const dataF = await ubusApi.show_network_stp()
        console.log("stp", dataF.data)
        setHihi(dataF.data)
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


    return (
        <>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <Card title={t("stp_interface_statistic")} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <StpTable1
                            haha={hihi}
                            onEditItem={onEditItem}
                        />
                    </div>
                </Card>
            </Space>
        </>
    )
}
export default Page
