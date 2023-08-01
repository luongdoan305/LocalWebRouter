import { message as antdMessage, Form, Input, Button, message, Select } from 'antd'
import React from 'react'
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import { type } from 'os'

export const BondingEdit = (props: any) => {
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
            const { name, ipaddr, mask } = item
            const str = item.name
            let a = "";
            for (let i = 0; i < str.length; i++) {
                const char = str.charAt(i);
                if (!isNaN(char)) {
                    a += char;
                }
            }
            var id = parseInt(a)
            form.setFieldsValue({
                id, ipaddr, mask
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
        const data1 = await ubusApi.show_network_bonding()
        var count = data1.data.length
        if (count < 5) {
            if (values.id == null && values.ipaddr == null && values.mask == null) {
                const key = 'fail';
                message.loading({ content: t('loading'), key });
                setTimeout(() => {
                    message.error({ content: t('fail'), key, duration: 2 });
                }, 1000);
            }
            else {
                await ubusApi.config_network_bonding("add", values.id, values.ipaddr, values.mask)
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
        else {
            const key = 'fail';
            message.loading({ content: t('loading'), key });
            setTimeout(() => {
                message.error({ content: t('fail'), key, duration: 2 });
            }, 1000);
        }
    }
    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label={t('Bond')} name="id"
            >
                <Input type='number' min='0' max='100' placeholder='Insert number ID'></Input>
            </Form.Item>

            <Form.Item label={t('ip_adress')} name="ipaddr"
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
                <Input placeholder=''></Input>
            </Form.Item>
            <Form.Item label={t('netmask')} name="mask"
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
                <Input placeholder=''></Input>
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