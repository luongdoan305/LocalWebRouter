import { message as antdMessage, Form, Input, Button, message, Select, InputNumber } from 'antd'
import React, { useState, useRef } from 'react'
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const MacEdit = (props: any) => {
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
            const { mac, ifname, vlan}= item
            form.setFieldsValue({
                mac, ifname, vlan
            })
        }   
    }
    const optionProtoWanv5 = useRef([
        {
            value: "eth0",
            label: "eth0",
        },
        {
            value: "eth1",
            label: "eth1",
        },
        {
            value: "eth2",
            label: "eth2",
        },
        {
            value: "eth3",
            label: "eth3",
        },
        {
            value: "eth4",
            label: "eth4",
        },
        {
            value: "eth5",
            label: "eth5",
        },
    ]).current;

    React.useEffect(() => {
        refreshData()
    }, [])
    const refreshPage = () => {
        window.location.reload()
    }
    const onFinish = async (values: any) => {
        await ubusApi.config_network_mac("add", values.vlan, values.mac, values.ifname)
        const key = 'success';
        message.loading({ content: t('loading'), key });
        setTimeout(() => {
            message.success({ content: t('success'), key, duration: 2 });
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }
    const [valuev5, setValuev5] = React.useState('')
    const handleChangev5 = (value: any) => setValuev5(value)
    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label={t('mac_address')} name="mac"
            >
                <Input></Input>
            </Form.Item>
            <Form.Item label={t('Vlan')} name="vlan"
            >
                <InputNumber min={1} max={3094} style={{ width: '100%' }} ></InputNumber>
            </Form.Item>
            <Form.Item label={t('ifname')} name="ifname"
            ><Select
                    onChange={handleChangev5}
                    options={optionProtoWanv5}
                />
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