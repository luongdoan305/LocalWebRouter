import { message as antdMessage, Form, Input, Button, message, Select, Switch, Upload, SelectProps, Row } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import { Options } from '@ant-design/charts'

export const Bfdedit = (props: any) => {
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
            const { status, local_address, remote_address, network } = item
            form.setFieldsValue({
                status, local_address, remote_address, network,
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
        const nat = await ubusApi.config_l2tp(values.status, values.local_address, values.remote_address, values.network)
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
            <Form.Item label={t('Config mode')} name="config_mode">
                <Select
                    onChange={handleChange}
                    options={[
                        {
                            value: "bfd_peer",
                            label: "BFD Peer Configure"
                        },
                        {
                            value: "bfd_interface",
                            label: "BFD Interface Configure"
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {
                    ({ getFieldValue }) =>
                        getFieldValue('config_mode') ==
                            "bfd_peer" ? (
                            <>
                                <Form.Item label="Peer Address" name="peer_address">
                                    <Input allowClear ></Input>
                                </Form.Item>
                                <Form.Item label={t('Interface')} name="interface"
                                // rules={[{ required: true, message: abc }]}
                                >
                                    <Select
                                        defaultValue={'none'}
                                        options={[
                                            {
                                                value: "none",
                                                label: t('None')
                                            },
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
                                <Form.Item label="Local Address" name="local_address">
                                    <Input allowClear ></Input>
                                </Form.Item>
                                <Form.Item label={t('Multihop')} name="multihop"
                                // rules={[{ required: true, message: abc }]}
                                >
                                    <Select
                                        defaultValue={'disable'}
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

                            </>
                        ) : null}
            </Form.Item>


            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {
                    ({ getFieldValue }) =>
                        getFieldValue('config_mode') ==
                            "bfd_interface" ? (
                            <>
                                <Form.Item label={t('Interface')} name="interface"
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
                                <Form.Item label={t('Protocol')} name="protocol"
                                // rules={[{ required: true, message: abc }]}
                                >
                                    <Select
                                        options={[
                                            {
                                                value: "isis",
                                                label: "IS-IS"
                                            },
                                            {
                                                value: "ospf",
                                                label: "OSPF"
                                            },
                                            {
                                                value: "pim",
                                                label: "PIM"
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