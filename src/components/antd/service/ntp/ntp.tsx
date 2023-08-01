import React from 'react'
import { message, Form, Input, Button, Typography, Select, Switch, Card, Checkbox } from 'antd'
import ubusApi from '../../../../service/api/ubus-api';
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import { t } from 'i18next';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        lg: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        lg: { span: 16 },
    },
}
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 4 },
    },
}

export const Ntp = () => {
    const { t } = useTranslation()
    const [enabled, setEnabled] = React.useState(false)
    const [enable_server, setEnableserver] = React.useState(false)
    const [server, setServer] = React.useState(null)

    const loadPWD = async () => {
        const result = await ubusApi.show_network_ntp()
        setEnabled(result.enabled)
        setEnableserver(result.enable_server)
        setServer(result.server)
    }
    React.useEffect(() => { loadPWD() }, [])

    return (
        <NTPConfig
            enabled={enabled}
            enable_server={enable_server}
            server={server}
        ></NTPConfig>
    )
}

export const NTPConfig = (props: any) => {
    const { enabled, enable_server, server } = props
    const [form] = Form.useForm()
    const [loading, setLoading] = React.useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000);
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    }

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    }
    form.setFieldsValue({ enabled: enabled, enable_server: enable_server, server: server })

    const handleSubmit = async (values: any) => {
        const result = await ubusApi.config_network_ntp(values.enabled, values.enable_server, values.server, values.name)
        const key = 'updatable';
        message.loading({ content: t('loading'), key });
        setTimeout(() => {
            message.success({ content: t('success'), key, duration: 2 });
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            form={form} onFinish={handleSubmit}>
            <Card loading={loading}>

            <Form.Item label="Enabled" name="enabled">
                <Select
                    defaultValue="Select Status"
                    options={[
                        {
                            value: "true",
                            label: t('True')
                        },
                        {
                            value: "false",
                            label: t('False')
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item label="Enable Server" name="enable_server" >
                <Select
                    defaultValue="Select Status"
                    options={[
                        {
                            value: "true",
                            label: t('True')
                        },
                        {
                            value: "false",
                            label: t('False')
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item name="server" label={t('Server')}>
                <Input></Input>
            </Form.Item>
            <Form.Item {...formItemLayoutWithOutLabel} wrapperCol={{ offset: 6, span: 16 }}>
                    <Button
                        type='primary'
                        htmlType="submit"
                    >
                        {t("submit")}
                    </Button>
                </Form.Item>
            </Card>
        </Form>
    )
}
