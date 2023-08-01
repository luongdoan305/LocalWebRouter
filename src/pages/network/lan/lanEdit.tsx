import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Row, Form } from "antd"
import React from "react"
import { LanEdit } from 'components/antd/network/lan/edit'
import { LanTable } from 'components/antd/network/lan/table'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"
import { table } from 'console'

const PageEdit = () => {
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


    const showModalContent = () => {
        if (!showModal) {
            return null
        }
        return (
            <Modal open={true} onCancel={onModalCancel} onOk={onModalOk} footer={null}>
                <Col>
                    <LanEdit item={item}
                        onDone={onDone} value={value} handleChange={handleChange} />
                </Col>
            </Modal>
        )
    }
    return (
        <Form>
            <Col className="table-column">
                <LanEdit item={item}
                    onDone={onDone} value={value} handleChange={handleChange} />
            </Col>

            {showModalContent()}
        </Form>

    )
}
export default PageEdit
