import { message as antdMessage, Form, Input, Button, message, Select } from 'antd'
import { access } from 'fs'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const L2tpEdit = (props: any) => {
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
            const { status, localaddr, peeraddr, ipaddr } = item
            form.setFieldsValue({
                status, localaddr, peeraddr, ipaddr,
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

        const nat = await ubusApi.config_l2tp("enable", values.localaddr, values.peeraddr, values.ipaddr)
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
            <Form.Item label={t('local_address')} name="localaddr"
                rules={[
                    { required: true, message: 'Please input local address!' },
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
            <Form.Item label={t('remote_address')} name="peeraddr"
                rules={[
                    { required: true, message: 'Please input remode address!' },
                    {
                      validator: (_, values) =>
                        values > 65535 || values < 1 ? Promise.reject('Port could not be larger than 65535 ') : Promise.resolve()
                    }
                ]}
            >
                <Input  allowClear ></Input>
            </Form.Item>
            <Form.Item label={t('network')} name="ipaddr"
                rules={[
                    { required: true, message: 'Please input network!' },
                ]}
            >
                <Input  allowClear placeholder="10.10.10.0/24" ></Input>
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