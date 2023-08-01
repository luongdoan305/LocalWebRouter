import { message as antdMessage, Form, Input, Button, message, Select, Switch, Upload, SelectProps, Row } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import { Options } from '@ant-design/charts'

export const Isisinterface_edit = (props: any) => {
    //console.log("value: ",props)
    const { t } = useTranslation()
    let pattern = /^[a-zA-Z0-9_.]+$/
    let patternIpv4 = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
    let check1: any
    let check2: any
    const { item, onDone } = props
    const [form] = Form.useForm()
    const abc = t('error_fill')
    const refreshData = async () => {
        if (item) {
            const { m_interface, router_id, circurit_type, priority, priority_type } = item
            form.setFieldsValue({
                m_interface, router_id, circurit_type, priority, priority_type
            })
        }
    }
    React.useEffect(() => {
        refreshData()
    }, [])

    const refreshPage = () => {
        window.location.reload()
    }

    const onFinish = async (values: any) => {
        const nat = await ubusApi.config_network_isis_interface("enable", values.m_interface, values.router_id, values.circurit_type, values.priority, values.priority_type)
        const key = 'updatable';
        message.loading({ content: t('loading'), key });
        setTimeout(() => {
            message.success({ content: t('success'), key, duration: 2 });
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }
    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => {
        setValue(value)
        console.log("value: ", value);
    }

    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label={t("router_id")} name="router_id">
                <Input allowClear ></Input>
            </Form.Item>
            <Form.Item label={t('interface')} name="m_interface" required={true}
            // rules={[{ required: true, message: abc }]}
            >
                <Select
                    options={[
                        {
                            value: "eth0",
                            label: t('eth0')
                        },
                        {
                            value: "eth1",
                            label: t('eth1')
                        },
                        {
                            value: "eth2",
                            label: t('eth2')
                        },
                        {
                            value: "eth3",
                            label: t('eth3')
                        },
                        {
                            value: "eth4",
                            label: t('eth4')
                        },
                        {
                            value: "eth5",
                            label: t('eth5')
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item label={t('circuit_type')} name="circurit_type">
                <Select
                    options={[
                        {
                            value: "level-1",
                            label: "Level-1"
                        },
                        {
                            value: "level-1-2",
                            label: "Level-1-2"
                        },
                        {
                            value: "level-2-only",
                            label: "Level-2-only"
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item label={t("priority")} name="priority">
                <Input allowClear ></Input>
            </Form.Item>
            <Form.Item label={t('priority_type')} name="priority_type">
                <Select
                    options={[
                        {
                            value: "level-1",
                            label: "Level-1"
                        },
                        {
                            value: "level-2",
                            label: "Level-2"
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button
                    type='primary'
                    htmlType="submit"
                >
                    {t('submit')}
                </Button>
            </Form.Item>
        </Form>
    )
}