import { message as antdMessage, Form, Input, Button, message, Select } from 'antd'
import React from 'react'
import ubusApi from '../../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../../translations/i18n"

export const SipregistrationEdit = (props: any) => {
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
            const { name, type, src, dest, sport, dport, tcp_udp, } = item
            form.setFieldsValue({
                name, type, src, dest, sport, dport, tcp_udp,
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
        if (values.src == null && values.dest == null && values.sport == null && values.dport == null && values.tcp_udp == null) {
            const key = 'fail';
            message.loading({ content: t('loading'), key });
            setTimeout(() => {
                message.error({ content: t('fail'), key, duration: 2 });
            }, 1000);
        } else {
            await ubusApi.config_ip_filter(values.name, "add", values.type, values.src, values.dest, values.sport, values.dport, values.tcp_udp)
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
             <Form.Item label={t('Status')} name="status"
            >
                <Select
                    defaultValue={t('Status')}
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
            <Form.Item label={t('Server Name')} name="server_name"
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
            <Form.Item label={t('SIP Server Address')} name="sip_service_address"
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
            <Form.Item name="sip_server_port"
                label={t('SIP Server Port')}
                rules={[
                    {
                      validator: (_, values) =>
                        values > 65535 || values < 1 ? Promise.reject('Port could not be larger than 65535 ') : Promise.resolve()
                    }
                ]}
            >
                <Input allowClear placeholder="1-65535"></Input>
            </Form.Item>
            <Form.Item label={t('SIP Client Address')} name="sip_client_address"
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
            <Form.Item name="sip_client_port"
                label={t('SIP Client Port')}
                rules={[
                    {
                      validator: (_, values) =>
                        values > 65535 || values < 1 ? Promise.reject('Port could not be larger than 65535 ') : Promise.resolve()
                    }
                ]}
            >
                <Input allowClear placeholder="1-65535"></Input>
            </Form.Item>
            <Form.Item name="username"
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
            <Form.Item name="password"
                label={t('password')} rules={[{ required: true , min: 8, message: "Password must be minimum 8 characters"}]}
            >
            <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item name="confim_password" label={t("Confirm Password")}>
                <Input.Password></Input.Password>
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
