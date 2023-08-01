import { message as antdMessage, Form, Input, Button, message, Select, Switch, Upload, SelectProps, Row } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import { Options } from '@ant-design/charts'

export const Ospfedit = (props: any) => {
    //console.log("value: ",props)
    const { t } = useTranslation()
    // let pattern = /^[a-zA-Z0-9_.]+$/
    // let patternIpv4 = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
    // let check1: any
    // let check2: any
    const { item, onDone } = props
    const [form] = Form.useForm()
    const abc = t('error_fill')
    const refreshData = async () => {
        if (item) {
            const { area, network, subnet } = item
            form.setFieldsValue({
                area, network, subnet
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
        const network_conf = values.network + "/" + values.subnet
        const nat = await ubusApi.config_network_ospf("enable", values.area, network_conf, "false", "false", "false", "false", "fasle", "fasle")
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
            <Form.Item label={t("area")} name="area" required={true}>
                <Input allowClear required={true}></Input>
            </Form.Item>
            <Form.Item label={t('Advanced')} name="advanced"
            // rules={[{ required: true, message: abc }]}
            >
                <Select
                    defaultValue={t('disable')}
                    onChange={handleChange}
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
            <Form.Item label={t('network')} required={true}>
                <Input.Group compact>
                    <Form.Item name="network">
                        <Input allowClear required={true} placeholder='Ex: xxx.xxx.xxx.xxx for Ipv4'></Input>
                    </Form.Item>
                    <Input
                        // className="site-input-split"
                        style={{
                            width: 40,
                            textAlign: 'center',
                            pointerEvents: 'none',
                            // marginLeft: 10
                        }}
                        placeholder="/"
                        disabled
                    />
                    <Form.Item name="subnet" style={{ width: "20% " }}>
                        <Input allowClear required={true} placeholder='1-128'></Input>
                    </Form.Item>
                </Input.Group>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {
                    ({ getFieldValue }) =>
                        getFieldValue('advanced') ==
                            "enable" ? (
                            <>
                                <Form.Item label={t('Bgp')} name="bgp">
                                    <Select
                                        defaultValue={"enable"}
                                        options={[
                                            {
                                                value: "enable",
                                                label: "Enable BGP Redistribute"
                                            },
                                            {
                                                value: "disable",
                                                label: "Disable"
                                            },
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label={t('Connected')} name="connected">
                                    <Select
                                        defaultValue={"enable"}
                                        options={[
                                            {
                                                value: "enable",
                                                label: "Enable Connected Redistribute"
                                            },
                                            {
                                                value: "disable",
                                                label: "Disable"
                                            },
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label={t('EIGRP')} name="eigrp">
                                    <Select
                                        defaultValue={"enable"}
                                        options={[
                                            {
                                                value: "enable",
                                                label: "Enable EIGRP Redistribute"
                                            },
                                            {
                                                value: "disable",
                                                label: "Disable"
                                            },
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label={t('ISIS')} name="isis">
                                    <Select
                                        defaultValue={"enable"}
                                        options={[
                                            {
                                                value: "enable",
                                                label: "Enable ISIS Redistribute"
                                            },
                                            {
                                                value: "disable",
                                                label: "Disable"
                                            },
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label={t('OSPF')} name="ospf">
                                    <Select
                                        defaultValue={"enable"}
                                        options={[
                                            {
                                                value: "enable",
                                                label: "Enable OSPF Redistribute"
                                            },
                                            {
                                                value: "disable",
                                                label: "Disable"
                                            },
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label={t('RIP')} name="rip">
                                    <Select
                                        defaultValue={"enable"}
                                        options={[
                                            {
                                                value: "enable",
                                                label: "Enable RIP Redistribute"
                                            },
                                            {
                                                value: "disable",
                                                label: "Disable"
                                            },
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label={t('Static')} name="static">
                                    <Select
                                        defaultValue={"enable"}
                                        options={[
                                            {
                                                value: "enable",
                                                label: "Enable Static Redistribute"
                                            },
                                            {
                                                value: "disable",
                                                label: "Disable"
                                            },
                                        ]}
                                    ></Select>
                                </Form.Item>
                            </>
                        ) : null}
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