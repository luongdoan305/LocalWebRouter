import { message as antdMessage, Form, Input, Button, message, Select, Switch, Upload, SelectProps, Row } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import { Options } from '@ant-design/charts'

export const Isisedit = (props: any) => {
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
            const { router_id, net, log, type  } = item
            form.setFieldsValue({
                router_id, type, net, log
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
        const nat = await ubusApi.config_network_isis("enable", values.router_id, values.type, values.net, values.log)
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
    const slectport: SelectProps['options'] = [];
    for (let i = 1; i < 129; i++) {
        slectport.push({
            value: i,
            label: i,
        });
    }

    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label={t("router_id")} name="router_id" required={true}>
                <Input allowClear required={true}></Input>
            </Form.Item>
            <Form.Item label={t('type')} name="type">
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
                            value: "level-2-Only",
                            label: "Level-2-Only"
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item label={t("net")} name="net" required={true}>
                <Input allowClear placeholder='XX.XXXX. ... .XXX.XX' required={true}></Input>
            </Form.Item>
            <Form.Item label={t('Log')} name="log" >
                <Select
                    options={[
                        {
                            value: "enable",
                            label: "Enable"
                        },
                        {
                            value: "disable",
                            label: "Disable"
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