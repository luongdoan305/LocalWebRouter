import { message as antdMessage, Form, Input, Button, message, Select } from 'antd'
import React from 'react'
import ubusApi from '../../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../../translations/i18n"

export const SippeerEdit = (props: any) => {
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
            const { status, digits, name, address,  port, option} = item
            form.setFieldsValue({
                status, digits, name, address, port, option,
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
        await ubusApi.config_media_trunk( "add", values.digits, values.name, values.address, values.port, values.option)
        const key = 'success';
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
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label={t('Number Digit')} name="digits"
                rules={[
                    { required: true, message: 'Please input name!' },
                    {
                        validator: (_, value) =>
                            pattern.test(value) ? Promise.resolve() : Promise.reject('White space and special characters are not valid')
                    }
                ]}
            >
                <Input defaultValue=""></Input>
            </Form.Item>
            <Form.Item label={t('Peer Name')} name="name"
                rules={[
                    { required: true, message: 'Please input name!' },
                    {
                        validator: (_, value) =>
                            pattern.test(value) ? Promise.resolve() : Promise.reject('White space and special characters are not valid')
                    }
                ]}
            >
                <Input defaultValue=""></Input>
            </Form.Item>
            <Form.Item label={t('SIP Peer Address')} name="address"
                rules={[
                    {
                        validator: (_, value) => {
                            check1 = value.split(".")
                            check2 = check1[check1.length - 1]
                            return (Number(check2) < 256 && patternIpv4.test(value)) ? Promise.resolve() : Promise.reject('Invalid Ip address entered')
                        }
                    }
                ]}
            >
                <Input allowClear placeholder="xxx.xxx.xxx.xxx" ></Input>
            </Form.Item>
            <Form.Item name="port"
                label={t('SIP Peer Port')}
                rules={[
                    {
                        validator: (_, values) =>
                            values > 65535 || values < 1 ? Promise.reject('Port could not be larger than 65535 ') : Promise.resolve()
                    }
                ]}
            >
                <Input allowClear placeholder="1-65535"></Input>
            </Form.Item>
            <Form.Item label={t('Service')} name="option"
            >
                <Select
                    defaultValue={t('service')}
                    options={[
                        {
                            value: "nat",
                            label: "NAT"
                        },
                        {
                            value: "message",
                            label: "Message"
                        },
                        {
                            value: "all",
                            label: "ALL"
                        },
                    ]}
                ></Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button
                    type='primary'
                    htmlType="submit"
                //onClick={() => refreshPage()}
                >
                    {t('submit')}
                </Button>
            </Form.Item>

        </Form>
    )
}
