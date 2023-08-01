import { message as antdMessage, Form, Input, Button, message, Select } from 'antd'
import React from 'react'
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const VxlanEdit = (props: any) => {
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
            const {status, name, peeraddr, ipaddr, netmask, port, mtu, vid ,  } = item
            form.setFieldsValue({ 
                status, name, peeraddr, ipaddr, netmask, port, mtu, vid,
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
        if (values.remote_address == null && values.network == null && values.netmask == null && values.port == null && values.mtu == null && values.vlan == null) {
            const key = 'fail';
            message.loading({ content: t('loading'), key });
            setTimeout(() => {
                message.error({ content: t('fail'), key, duration: 2 });
            }, 1000);
        } else {
            await ubusApi.config_vxlan( "enable", values.name, values.peeraddr, values.ipaddr, values.netmask, values.port, values.mtu, values.vid)
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
            <Form.Item label={t('vxlan_name')} name="name"
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

            <Form.Item label={t('remote_address')} name="peeraddr"
                rules={[
                    { required: true, message: 'Please input remote address!' },
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
            <Form.Item label="Networks">
            <Input.Group compact> 
            <Form.Item name="ipaddr" noStyle
                rules={[
                    { required: true, message: 'Please input network!' },
                    {
                    validator: (_, value) => {
                        check1 = value.split(".")
                        check2 = check1[check1.length - 1]
                        return (Number(check2) < 256 && patternIpv4.test(value)) ? Promise.resolve() : Promise.reject('Invalid Ip address entered')
                    }
                    }
                ]}
            >
                <Input style={{ width: '50%' }} allowClear  ></Input>
            </Form.Item>
            <Form.Item  name="netmask" noStyle
            >
                <Select
                    style={{ width: '50%' }}
                    defaultValue="netmask"
                    options={[
                        {
                            value: "255.255.255.0",
                            label: "255.255.255.0"
                        },
                        {
                            value: "255.255.0.0",
                            label: "255.255.0.0"
                        },
                    ]}
                ></Select>
            </Form.Item>
            </Input.Group>
            </Form.Item>
            <Form.Item name="port"  label={t('port')}
                rules={[{ required: true, message: 'Please input port!' },
                    {
                      validator: (_, values) =>
                        values > 65535 || values < 1 ? Promise.reject('Port could not be larger than 65535 ') : Promise.resolve()
                    }
                ]}
            >
                <Input allowClear placeholder="1-65535"></Input>
            </Form.Item>
            <Form.Item label={t('mtu')} name="mtu"
                rules={[
                    { required: true, message: 'Please input MTU!' },   
                ]}
            >
                <Input  allowClear></Input>
            </Form.Item>
            <Form.Item label={t("vlan")} name="vid"
                rules={[
                    { required: true },
                    {
                      validator: (_, values) =>
                        values > 4094 || values < 1 ? Promise.reject('vlanid could not be larger than 4094 ') : Promise.resolve()
                    }
                ]}
            >
            <Input></Input>
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
