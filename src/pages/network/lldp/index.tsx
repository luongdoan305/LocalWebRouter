import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space } from "antd"
import React from "react"
import { LldpEdit } from 'components/antd/network/lldp/edit'
import { LldpTable, LldpTable1 } from 'components/antd/network/lldp/table'
import ubusApi from 'service/api/ubus-api';
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

const Page = () => {
    const { t } = useTranslation()
    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => setValue(value)
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [tx, settx] = React.useState(null)
    const [rx, setrx] = React.useState(null)
    const [discar, setdiscar] = React.useState(null)
    const [unre, setunre] = React.useState(null)
    const [age, setage] = React.useState(null)
    const [insert, setinsert] = React.useState(null)
    const [delete_cnt, setdelete_cnt] = React.useState(null)
    const [run, setrun] = React.useState(null)

    const refreshData = async () => {
        const dataF = await ubusApi.show_network_lldp()
        console.log("gege", dataF.traffic[0].lldp.summary.tx.tx)
        settx(dataF.traffic[0].lldp.summary.tx.tx)
        setrx(dataF.traffic[0].lldp.summary.rx.rx)
        setdiscar(dataF.traffic[0].lldp.summary.rx_discarded_cnt.rx_discarded_cnt)
        setunre(dataF.traffic[0].lldp.summary.rx_unrecognized_cnt.rx_unrecognized_cnt)
        setage(dataF.traffic[0].lldp.summary.ageout_cnt.ageout_cnt)
        setinsert(dataF.traffic[0].lldp.summary.insert_cnt.insert_cnt)
        setdelete_cnt(dataF.traffic[0].lldp.summary.delete_cnt.delete_cnt)
        setrun(dataF.status)
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
                    <Card title={t('lldp_configure')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <LldpEdit item={item}
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
                <Card title={t('lldp_status')} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <LldpTable
                            run={run}
                            onEditItem={onEditItem}
                        />
                    </div>
                </Card>
                <Card title={t('lldp_global_statistic')} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <LldpTable1
                            tx={tx}
                            rx={rx}
                            discar={discar}
                            unre={unre}
                            age={age}
                            insert={insert}
                            delete_cnt={delete_cnt}
                            onEditItem={onEditItem}
                        />
                    </div>
                </Card>
                {showModalContent()}
            </Space>
        </>
    )
}
export default Page
