import { message as antdMessage, Form, Input, Button, message, Select, Switch, Upload, SelectProps, Row } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import { Options } from '@ant-design/charts'

export const Pimedit = (props: any) => {
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
            <Form.Item label={t('Rendevous Point')} name="rendevous_point"
            >
                <Select
                    onChange={handleChange}
                    options={[
                        {
                            value: "ipaddress",
                            label: t('IP address')
                        },
                        {
                            value: "keep_alive_timer",
                            label: t('Keep-alive-timer')
                        },
                        {
                            value: "none",
                            label: "None"
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
                        getFieldValue('rendevous_point') ==
                            "ipaddress" ? (
                            <>
                                <Form.Item label="IP Address" name="ip_address">
                                    <Input allowClear ></Input>
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
                        getFieldValue('rendevous_point') ==
                            "keep_alive_timer" ? (
                            <>
                                <Form.Item label="Keep Alive time" name="keepalivetime">
                                    <Input allowClear placeholder='1-65535'></Input>
                                </Form.Item>
                            </>
                        ) : null}
            </Form.Item>

            <Form.Item label="DR Priority" name="dr_priority">
                <Input allowClear placeholder='1-4294967295'></Input>
            </Form.Item>

            <Form.Item label={t('IGMP version')} name="igmp_version"
            >
                <Select
                    options={[
                        {
                            value: "igmpv1",
                            label: t('IGMPv1')
                        },
                        {
                            value: "igmpv2",
                            label: t('IGMPv2')
                        },
                        {
                            value: "none",
                            label: "None"
                        },
                    ]}
                ></Select>
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

            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {
                    ({ getFieldValue }) =>
                        getFieldValue('advanced') ==
                            "enable" ? (
                            <>
                                <Form.Item label="Join prune interval" name="joinpruneinterval_advanced">
                                    <Input allowClear placeholder='1-65535'></Input>
                                </Form.Item>
                                <Form.Item label="Keep Alive time-advanced" name="keepalivetime_advanced">
                                    <Input allowClear placeholder='1-65535'></Input>
                                </Form.Item>
                                <Form.Item label={t('Ecmp')} name="ecmp"
                                // rules={[{ required: true, message: abc }]}
                                >
                                    <Select
                                        defaultValue={t('disable')}
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
                                <Form.Item label={t('Rebalance')} name="rebalance"
                                // rules={[{ required: true, message: abc }]}
                                >
                                    <Select
                                        defaultValue={t('disable')}
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
                                <Form.Item label="Packets" name="packets">
                                    <Input allowClear placeholder='1-255'></Input>
                                </Form.Item>
                                <Form.Item label="Register accept list" name="register_accept_list">
                                    <Input allowClear ></Input>
                                </Form.Item>
                                <Form.Item label="Register suppress time" name="register_suppress_time">
                                    <Input allowClear placeholder='1-65535'></Input>
                                </Form.Item>
                                <Form.Item label={t('Send v6 secondary')} name="send_v6_secondary"
                                // rules={[{ required: true, message: abc }]}
                                >
                                    <Select
                                        defaultValue={t('disable')}
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
                                <Form.Item label="Stp switchover" name="stp_switchover">
                                    <Input allowClear ></Input>
                                </Form.Item>
                                <Form.Item label="Ssm" name="ssm">
                                    <Input allowClear ></Input>
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