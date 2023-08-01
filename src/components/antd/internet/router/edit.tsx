import { message as antdMessage, Form, Input, Button, message, Select, InputNumber } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const RouterEdit = (props: any) => {
    const {t} = useTranslation()
    console.log("value: ",props)
    const { item, onDone } = props
    const [form] = Form.useForm()
    const refreshData = async () => {
        if (item) {
            const { target, nexthop, metric, device,  } = item
            form.setFieldsValue({
                target, nexthop, metric, device, 
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

        const param = await ubusApi.config_network_static("add",values.target, values.nexthop, values.metric, values.device)
        // console.log(param)
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
            <Form.Item name="id"
                label="Interface" hidden
            >
                <Input defaultValue="WAN" disabled ></Input>
            </Form.Item>
            <Form.Item label={t('dest_network')} name="target" rules={[{ required: true, message: "" }]}
            >
                <Input></Input>
            </Form.Item>
            <Form.Item label="Gateway" name="nexthop"

            >
                <Input ></Input>
            </Form.Item>
            <Form.Item label="Metric" name="metric"
            >
                <Input type='number'></Input>
            </Form.Item>

            <Form.Item label={t('interface')} name="device" rules={[{ required: true, message: "" }]}
            >
                <Select
                    options={[
                        {
                            value: 0,
                            label: t('none')
                        },
                        {
                            label: "WAN",
                            value: "br-wan"
                        },
                        {
                            label: "LAN",
                            value: "br-lan"
                        },
                    ]}
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
