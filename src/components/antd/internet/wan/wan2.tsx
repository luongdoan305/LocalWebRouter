
import { Button, Col, Row, Space, Table, Typography, Modal, Input, Select, message, Form, Checkbox, Switch, Card } from 'antd'
import React, { useState, useRef } from 'react'
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import { current } from '@reduxjs/toolkit'

export const WanSettings2 = (props: any) => {
    const { t } = useTranslation()
    let pattern = /^[a-zA-Z0-9_.]+$/
    let patternIpv4 = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
    let check1: any
    let check2: any
    const [form] = Form.useForm()
    const [loading, setLoading] = React.useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000);
    const [status, setStatus] = React.useState("")
    // const [protov6, setProtov6] = React.useState("")
    // const [ipaddrv4, setIpaddrv4] = React.useState("")
    // const [netmaskv4, setNetmaskv4] = React.useState(null)
    // const [gtwv4, setGtwv4] = React.useState(null)
    // const [ipaddrv6, setIpaddrv6] = React.useState(null)
    // const [gtwv6, setGtwv6] = React.useState(null)


    const optionStatusWan = useRef([
        {
            label: t('enable'),
            value: "enable"
        },
        {
            label: t('disable'),
            value: "disable"
        },
    ]).current;

    const optionProtoWanv4 = useRef([
        {
            label: t('none'),
            value: "none"
        },
        {
            label: "DHCP",
            value: "dhcp"
        },
        {
            label: "Static",
            value: "static"
        },
        {
            label: "pppoe",
            value: "pppoe"
        },
    ]).current;

    const optionProtoWanv7 = useRef([
        {
            label: "LTE",
            value: "lte"
        },
        {
            label: "Ethernet",
            value: "eth"
        },
        {
            label: "MPLS",
            value: "mpls"
        },
    ]).current;
    const optionstatus = useRef([
        {
            label: "Enable",
            value: "enable"
        },
        {
            label: "Disable",
            value: "disable"
        },
    ]).current;

    const optionProtoWanv6 = useRef([
        {
            label: t('none'),
            value: "none"
        },
        {
            label: "DHCP",
            value: "dhcp"
        },
        {
            label: "Static",
            value: "static"
        },
        {
            label: "pppoe",
            value: "pppoe"
        },
    ]).current;

    const optionProtoWanv5 = useRef([
        {
            value: "eth0",
            label: "Fast Ethernet0",
        },
        {
            value: "eth1",
            label: "Fast Ethernet1",
        },
        {
            value: "eth2",
            label: "Fast Ethernet2",
        },
        {
            value: "eth3",
            label: "Fast Ethernet3",
        },
        {
            value: "eth4",
            label: "Fast Ethernet4",
        },
        {
            value: "eth5",
            label: "Fast Ethernet5",
        },
    ]).current;

    const refreshData = async () => {
        const result = await ubusApi.show_network_wan_congfig()
        const {ifname, link_type, gateway, ipaddr, netmask, proto, username, password, timeout } = result['wan2'][0]['values']
        const { ip6addr, protov6, ip6gw } = result['wan_6'][0]['values']

        if (proto == "static") {
            if (ipaddr == null) {
                // setProtov4("none")
                if (protov6 == "static") {
                    if (ip6addr == null) {
                        if (proto == "pppoe") {
                            form.setFieldsValue({ status: (ifname == undefined) ? "disable" : "enable", ifname: ifname,link_type: link_type, protov4: "pppoe", protov6: "none", username: username, password: password, timeout: timeout })
                        } else {
                            // setProtov6("none")
                            form.setFieldsValue({status: (ifname == undefined) ? "disable" : "enable", ifname: ifname, link_type: link_type, protov4: "none", protov6: "none" })
                        }
                    } else {
                        // setProtov6("static")
                        // form.setFieldsValue({ gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: protov4, protov6: "none", ipaddrv6: ip6addr, gtwv6: ip6gw })
                        form.setFieldsValue({status: (ifname == undefined) ? "disable" : "enable", ifname: ifname, link_type: link_type, protov4: "none", protov6: "static", ipaddrv6: ip6addr, gtwv6: ip6gw })
                    }
                } else {
                    // setProtov6(protov6)
                    form.setFieldsValue({status: (ifname == undefined) ? "disable" : "enable", ifname: ifname, link_type: link_type, protov4: "none", protov6: protov6 })
                }
            } else {
                // setProtov4(proto)
                if (protov6 == "static") {
                    if (ip6addr == null) {
                        // setProtov6("none")
                        if (proto == "pppoe") {
                            form.setFieldsValue({ status: (ifname == undefined) ? "disable" : "enable",ifname: ifname, link_type: link_type, gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: "pppoe", username: username, password: password, timeout: timeout, protov6: "none" })
                        }
                        else {
                            form.setFieldsValue({status: (ifname == undefined) ? "disable" : "enable", ifname: ifname, link_type: link_type, gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: proto, protov6: "none" })
                        }
                        //form.setFieldsValue({ gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: proto, protov6: "none" })
                    } else {
                        if (proto == "pppoe") {
                            form.setFieldsValue({ status: (ifname == undefined) ? "disable" : "enable",ifname: ifname, link_type: link_type, gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: "pppoe", username: username, password: password, timeout: timeout, protov6: "static", ipaddrv6: ip6addr, gtwv6: ip6gw })
                        }
                        else {
                            // setProtov6(protov6)
                            form.setFieldsValue({status: (ifname == undefined) ? "disable" : "enable", ifname: ifname, link_type: link_type,  gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: proto, protov6: "static", ipaddrv6: ip6addr, gtwv6: ip6gw })
                        }
                    }
                } else {
                    if (proto == "pppoe") {
                        // setProtov6(protov6)
                        form.setFieldsValue({ status: (ifname == undefined) ? "disable" : "enable", ifname: ifname, link_type: link_type, gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: "pppoe", username: username, password: password, timeout: timeout, protov6: protov6, ipaddrv6: ip6addr, gtwv6: ip6gw })
                    } else {
                        form.setFieldsValue({ status: (ifname == undefined) ? "disable" : "enable", ifname: ifname, link_type: link_type, gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: proto, protov6: protov6, ipaddrv6: ip6addr, gtwv6: ip6gw })
                    }
                }
            }
        } else {
            // setProtov4(proto)
            if (protov6 == "static") {
                if (ip6addr == null) {
                    // setProtov6("none")
                    if (proto == "pppoe") {
                        form.setFieldsValue({status: (ifname == undefined) ? "disable" : "enable", ifname: ifname, link_type: link_type, protov4: "pppoe", username: username, password: password, timeout: timeout, protov6: "none" })
                    }
                    form.setFieldsValue({status: (ifname == undefined) ? "disable" : "enable", ifname: ifname,link_type: link_type, protov4: proto, username: username, password: password, timeout: timeout, protov6: "none" })
                } else {
                    // setProtov6("static")
                    // form.setFieldsValue({ gtwv4: gateway, ipaddrv4: ipaddr, netmaskv4: netmask, protov4: protov4, protov6: "none", ipaddrv6: ip6addr, gtwv6: ip6gw })
                    if (proto == "pppoe") {
                        form.setFieldsValue({ status: (ifname == undefined) ? "disable" : "enable",ifname: ifname, link_type: link_type,  protov4: "pppoe", username: username, password: password, timeout: timeout, protov6: "static", ipaddrv6: ip6addr, gtwv6: ip6gw })
                    } else {
                        form.setFieldsValue({ status: (ifname == undefined) ? "disable" : "enable",ifname : ifname, link_type: link_type, protov4: proto, protov6: "static", ipaddrv6: ip6addr, gtwv6: ip6gw })
                    }
                }
            } else {
                // setProtov6(protov6)
                if (proto == "pppoe") {
                    form.setFieldsValue({status: (ifname == undefined) ? "disable" : "enable", ifname:ifname, link_type: link_type, protov4: "pppoe", username: username, password: password, timeout: timeout, protov6: protov6 })
                } else {
                    form.setFieldsValue({status: (ifname == undefined) ? "disable" : "enable", ifname: ifname, link_type: link_type, protov4: proto, protov6: protov6 })
                }
            }
        }
    }
    React.useEffect(() => { refreshData() }, [])

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
    const handleSubmit = async (values: any) => {
        if (values.protov6 == "DHCP"){
            values.protov6="dhcpv6"
        }
        const result = await ubusApi.config_network_wan(values.status, values.ifname, "wan2", values.link_type, values.protov4, values.username, values.password, values.timeout, values.ipaddrv4, values.netmaskv4, values.gtwv4, values.protov6, values.ipaddrv6, values.gtwv6)     
        console.log("result: ", result)
        values.protov6=""
        const key = 'updatable';
        message.loading({ content: t('loading'), key });
        setTimeout(() => {
            message.success({ content: t('success'), key, duration: 2 });
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }
    const [valuev4, setValuev4] = React.useState('')
    const handleChangev4 = (value: any) => setValuev4(value)
    const [valuev5, setValuev5] = React.useState('')
    const handleChangev5 = (value: any) => setValuev5(value)
    const [valuev6, setValuev6] = React.useState('')
    const handleChangev6 = (value: any) => setValuev6(value)
    const [valuev7, setValuev7] = React.useState('')
    const handleChangev7 = (value: any) => setValuev7(value)
    const [valuev8, setValuev8] = React.useState('')
    const handleChangev8 = (value: any) => setValuev8(value)
    // console.log("valuev4: ", valuev4)

    return (
        // <>
        <Form form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleSubmit}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
            <Card title="Config WAN2 Settings" loading={loading} headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}} >
                <Card title="IPV4" loading={loading}>
                    <Form.Item name="status" label={t('status')}
                    >
                        <Select
                            onChange={handleChangev8}
                            options={optionstatus}
                        />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {
                            ({ getFieldValue }) =>
                                getFieldValue('status') ==
                                    'enable' ? (
                                <>
                                       
                                    
                                <Form.Item name="protov4" label={t('protocol')}
                                >
                                    <Select
                                        onChange={handleChangev4}
                                        options={optionProtoWanv4}
                                    />
                                </Form.Item>
                                <Form.Item name="ifname" label={t('interface_name')}
                                >
                                    <Select
                                        onChange={handleChangev5}
                                        options={optionProtoWanv5}
                                    />
                                </Form.Item>
                                <Form.Item name="link_type" label={t('Link Type')}
                                >
                                    <Select
                                        onChange={handleChangev7}
                                        options={optionProtoWanv7}
                                    />
                                </Form.Item>
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                                >
                                    {
                                        ({ getFieldValue }) =>
                                            getFieldValue('protov4') ==
                                                'pppoe' ? (
                                                <>
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
                                                    <Form.Item name="timeout"
                                                        label={t('timeout')} 
                                                    >   
                                                    <Input></Input>
                                                    </Form.Item>
                                                </>
                                            ) : null
                                    }
                                </Form.Item>
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                                >
                                    {
                                        ({ getFieldValue }) =>
                                            getFieldValue('protov4') ==
                                                'static' ? (
                                                <>
                                                    <Form.Item name="ipaddrv4"
                                                        label={t('ip')} 
                                                        rules={[
                                                            { required: true, message: 'Please input target ip!' },
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
                                                    <Form.Item name="netmaskv4"
                                                        label="Netmask"
                                                        rules={[
                                                            { required: true, message: 'Please input target ip!' },
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
                                                    <Form.Item name="gtwv4"
                                                        label="Gateway"
                                                        rules={[
                                                            { required: true, message: 'Please input target ip!' },
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
                                                </>
                                            ) : null
                                    }
                                    </Form.Item>
                                    </>
                                ) : null
                        }
                    
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {
                            ({ getFieldValue }) =>
                                getFieldValue('status') ==
                                    'disable' ? (
                                <>
                                </>
                            ) : null
                        }
                        
                    </Form.Item>   

                </Card>
                <Card title="IPV6" loading={loading}>
                    <Form.Item name="protov6"
                        label={t('protocol')}
                    >
                        <Select
                            onChange={handleChangev6}
                            options={optionProtoWanv6}
                        />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {
                            ({ getFieldValue }) =>
                                getFieldValue('protov6') ==
                                    'static' ? (
                                    <>
                                        <Form.Item name="ipaddrv6"
                                            label={t('ip')}
                                        >
                                            <Input></Input>
                                        </Form.Item>
                                        <Form.Item name="gtwv6"
                                            label="Gateway"
                                        >
                                            <Input></Input>
                                        </Form.Item>
                                    </>
                                ) : null}
                    </Form.Item>
                </Card>   
                <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                    <Button
                        type='primary'
                        htmlType="submit"
                    >
                        {t('submit')}
                    </Button>
                </Form.Item>

                </Card>   
        </Space>
    </Form>
        // </>
    )
}

