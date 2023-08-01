import { message as antdMessage, Form, Input, Button, message, InputNumber, Checkbox, Select } from 'antd'
import React from 'react'
import ubusApi from '../../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../../translations/i18n"
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

export const SipdeviceEdit = (props: any) => {
    //console.log("value: ",props)
    const { t } = useTranslation()
    let pattern = /^[a-zA-Z0-9_.]+$/
    let patternIpv4 = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
    let check1: any
    let check2: any
    const { item, onDone } = props
    const [form] = Form.useForm()
    const abc = t('error_fill')
    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
      };
    const refreshData = async () => {
        if (item) {
            const { status, number,auth_username , auth_password, endpoint_disallow, } = item
            form.setFieldsValue({
                status, number, auth_username, auth_password, endpoint_disallow,
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
        await ubusApi.config_media_number( "add", values.number, values.auth_username, values.auth_password, values.endpoint_disallow)
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
            <Form.Item label={t('Register Number')} name="number"
            >
                <InputNumber min={1} max={10000} style={{ width: '100%' }}  ></InputNumber>
            </Form.Item>
            <Form.Item name="auth_username"
                label={t('username')}
                rules={[
                    { required: true, message: 'Please input username!' },
                    {
                        validator: (_, value) =>
                            pattern.test(value) ? Promise.resolve() : Promise.reject('White space and special characters are not valid')
                    }
                ]}
            >
                <Input allowClear></Input>
            </Form.Item>
            <Form.Item name="auth_password"
                label={t('password')} rules={[{ required: true, min: 6, message: "Password must be minimum 6 characters" }]}
            >
                <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item label={t('Service')} name="endpoint_disallow"
            >
                <Select
                    defaultValue={t('Service')}
                    options={[
                        {
                            value: "nat",
                            label: "NAT"
                        },
                        {
                            value: "follow me",
                            label: "Follow Me"
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
