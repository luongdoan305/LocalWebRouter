import { message as antdMessage, Form, InputNumber,Input, Button, message, Select } from 'antd'
import { access } from 'fs'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const LagEdit = (props: any) => {
    const {t} = useTranslation()
    let pattern = /^[a-zA-Z0-9_.]+$/
    let patternIpv4 = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
    let check1: any
    let check2: any
    const { item, onDone, value, handleChange,optionsParentInterface } = props
    console.log(value)
    const [form] = Form.useForm()
    const refreshData = async () => {
        if (item) {
            const { run } = item
            form.setFieldsValue({
                run,
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
            run: values.run,
        }
            const lldp = await ubusApi.config_network_lldp(values.run)
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
            <Form.Item label={t('Interface Number')} name="interface_number"
                rules={[
                    { required: true, type:'number' },
                ]}
            >
                <InputNumber min={1} max={100}  style={{ width: '100%' }}></InputNumber>
            </Form.Item>
            <Form.Item label={t('IPV4 Address')} name="ipv4_address"
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
            <Form.Item label={t('IPV6 Address')} name="ipv6_address"
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
            <Form.Item label={t('Interface')} name="interface"
                >
                        <Select
                            defaultValue={"eth0"}
                            options={optionsParentInterface}
                        ></Select>
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

