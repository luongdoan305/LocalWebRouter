
import { message as antdMessage, Form, Input, Button, message, Select } from 'antd'
import { access } from 'fs'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const PortForwardEdit = (props: any) => {
    let pattern = /^[a-zA-Z0-9_.]+$/
    let patternIpv4 = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
    let check1: any
    let check2: any
    const { item, onDone, value, handleChange, optionsParentInterface } = props
    console.log(value)
    const [form] = Form.useForm()
    const {t} = useTranslation()
    const abc = t('error_fill')
    const refreshData = async () => {
        if (item) {
            const {
                anonymous,
                name,
                proto,
                wanip,
                wanport,
                lanip,
                lanport,
            } = item
            form.setFieldsValue({
                name,
                status: "enable",
                protocol: proto,
                wan_ip: wanip,
                wan_port: wanport,
                lan_ip: lanip,
                lan_port: lanport,
            })
        }
    }

    React.useEffect(() => {
        refreshData()
    }, [])
    const refreshPage = ()=>{
        window.location.reload()
    }
    const onFinish = async (values: any) => {
        const param = {

            name: values.name, status: values.status, protocol: values.protocol, wan_ip: values.wan_ip,
            wan_port: values.wan_port, lan_ip: values.lan_ip, lan_port: values.lan_port,

        }
        const nat = await ubusApi.config_network_nat(values.status, values.name, values.protocol, values.wan_ip, values.wan_port, values.lan_ip, values.lan_port)
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
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label={t('name')} name="name" 
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
            <Form.Item wrapperCol={{ offset: 6 }}>{t('help_name')}  </Form.Item>
            
            <Form.Item label={t('status')} name="status" rules={[{ required: true, message: abc }]}
            >
                <Select
                    defaultValue="Select Status"
                    options={[
                        {
                            value: "enable",
                            label: t('enable')
                        },
                        {
                            value: "disable",
                            label: t('disable')
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item label={t('protocol')} name="protocol" rules={[{ required: true, message: abc }]}
            >
                <Select
                    defaultValue={t('select_proto')}
                    options={[
                        {
                            value: "tcp",
                            label: "TCP"
                        },
                        {
                            value: "udp",
                            label: "UDP"
                        },
                    ]}
                ></Select>
            </Form.Item>

            <Form.Item style={{ height: 30 }} label="Wan">
                <Input.Group compact >
                    <Form.Item style={{ width: "50%" }} label={t('ip')} name="wan_ip" 
                        rules={[
                            { required: true, message: 'Please input target ip!' },
                            {
                              validator: (_, value) => {
                                check1 = value.split(".")
                                check2 = check1[check1.length - 1]
                                return (Number(check2) < 256 && patternIpv4.test(value)) ? Promise.resolve() : Promise.reject('Error Ip address')
                              }
                            }
                          ]} 
                    >
                        <Input  placeholder="192.168.1.1" allowClear ></Input>
                    </Form.Item>
                    <Form.Item style={{ width: "50%" }} label={t('port')} name="wan_port" 
                        rules={[
                            { required: true, message: 'Please input port number!' },
                            {
                                validator: (_, values) =>
                                values > 65535 || values < 1 ? Promise.reject('between 1 and 65535') : Promise.resolve()
                              }
                        
                        ]}
                    >
                        <Input placeholder="1-65535" allowClear ></Input>
                    </Form.Item>
                </Input.Group>
            </Form.Item>
            <Form.Item style={{ height: 30 }} label="Lan">
                <Input.Group compact >
                    <Form.Item style={{ width: "50%" }} label={t('ip')} name="lan_ip" 
                        rules={[
                            { required: true, message: 'Please input target ip!' },
                            {
                              validator: (_, value) => {
                                check1 = value.split(".")
                                check2 = check1[check1.length - 1]
                                return (Number(check2) < 256 && patternIpv4.test(value)) ? Promise.resolve() : Promise.reject('Error Ip address')
                              }
                            }
                          ]} 
                    
                    >
                        <Input placeholder="192.168.1.1" allowClear></Input>
                    </Form.Item>

                    <Form.Item style={{ width: "50%" }} label={t('port')} name="lan_port" 
                        rules={[
                            { required: true, message: 'Please input port number!' },
                            {
                                validator: (_, values) =>
                                values > 65535 || values < 1 ? Promise.reject('between 1 and 65535') : Promise.resolve()
                              }
                        
                        ]}
                    >
                        <Input placeholder="1-65535" allowClear ></Input>
                    </Form.Item>
                </Input.Group>
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
