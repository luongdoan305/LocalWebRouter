import { message as antdMessage, Form, Input, Button, message, Select, Switch} from 'antd'
import { access } from 'fs'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const PptpserverEdit = (props: any) => {
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
            const { status, remoteip, remoteip1, username, password} = item
            if (status === "enable") {
                form.setFieldsValue({ status: "enable", remoteip: remoteip, remoteip1: remoteip1, username: username, password: password })
            } else {
                form.setFieldsValue({ status: "disable" })
            }
        }
    }
    React.useEffect(() => {
        refreshData()
    }, [])
    const refreshPage = () => {
        window.location.reload()
    }
    const onFinish = async (values: any) => {

        await ubusApi.config_pptp_server( values.status, values.remoteip, values.remoteip1, values.username, values.password)
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
            <Form.Item label={t('status')} name="status"
                        >
                            <Select
                                defaultValue={t('enable')}
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
            <Form.Item label="Range From" name="remoteip"
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
                <Input allowClear ></Input>
            </Form.Item>
            <Form.Item label="Range To" name="remoteip1"
            >
                <Input allowClear></Input>
            </Form.Item>
            <Form.Item name="username" label={t('username')}
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
            <Form.Item name="password" label={t('password')}
                rules={[{ required: true, min: 8, message: "Password must be minimum 8 characters" }]}
            >
                <Input.Password></Input.Password>
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