import { message as antdMessage, Form, InputNumber, Button, message, Select } from 'antd'
import { access } from 'fs'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const PortEdit = (props: any) => {
    const { t } = useTranslation()
    const { item, onDone, value, handleChange, optionsParentInterface } = props
    console.log(value)
    const [form] = Form.useForm()
    const refreshData = async () => {
        if (item) {
            const { src, dest, direct } = item
            form.setFieldsValue({
                src, dest, direct
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
        if (values.src == null && values.dest == null && values.direct == null) {
            const key = 'fail';
            message.loading({ content: t('loading'), key });
            setTimeout(() => {
                message.error({ content: t('fail'), key, duration: 2 });
            }, 1000);
        } else {
            console.log("values: ", values.src, values.dest, values.direct)
            await ubusApi.config_network_mirror("add", values.src, values.dest, values.direct)
            const key = 'success';
            message.loading({ content: t('loading'), key });
            setTimeout(() => {
                message.success({ content: t('success'), key, duration: 2 });
            }, 1000);
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }
    }

    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label={t('source_interface')} name="src"
            >
                <Select
                    options={[
                        { value: "eth0", label: "eth0" },
                        { value: "eth1", label: "eth1" },
                        { value: "eth2", label: "eth2" },
                        { value: "eth3", label: "eth3" },
                        { value: "eth4", label: "eth4" },
                        { value: "eth5", label: "eth5" },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item label={t('destination_interface')} name="dest"
            >
                <Select
                    options={optionsParentInterface}
                ></Select>
            </Form.Item>
            <Form.Item label={t('direct')} name="direct" rules={[{ required: true }]}
            >
                <Select
                    defaultValue={t('tx')}
                    options={[
                        {
                            value: "tx",
                            label: "Tx"
                        },
                        {
                            value: "egress",
                            label: "Rx"
                        },
                        {
                            value: "both",
                            label: "Both(Tx + Rx)"
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

