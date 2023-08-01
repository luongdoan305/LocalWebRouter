import { Button, Modal, Card, Space, Col } from 'antd'
import React from 'react';
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";

export const RebootSystem = (props: any) => {
    const { t } = useTranslation();

    const [showModal, setShowModal] = React.useState(false)

    const onShowModal = (group: any) => {
        setShowModal(true)
    }

    const onModalCancel = () => {
        setShowModal(false)
    }
    const onModalOk = () => {
        setShowModal(false)
    }

    const onFinish = async () => {
        const reboot = await ubusApi.config_system_reboot()
        setShowModal(false)
    }

    const onConfirm = () => {
        if (!showModal) {
            return null
        }
        return (
            <Modal width={500} open={true} onCancel={onModalCancel} onOk={onModalOk} footer={null}>
                <Col md={23}>
                    <Card title={t('title_reboot')} type="inner" headStyle={{ background: "#faad14"}}>
                        <Space size='large' >
                            <Button onClick={onModalCancel} >
                                {t("cancel")}
                            </Button>
                            <Button type="primary" danger onClick={onFinish} >
                                {t("reboot")}
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Modal>
        )
    }
    return (
        <Card title={t("reboot")} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white', }}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                {/* <span>{t("help_reset")}</span> */}
                {onConfirm()}
                <Button type="primary" danger onClick={onShowModal} >
                    {t("reboot")}
                </Button>
            </Space>
        </Card>
    )
}
