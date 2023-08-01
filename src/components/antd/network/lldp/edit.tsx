import { message as antdMessage, Form, Input, Button, message, Select } from 'antd'
import { access } from 'fs'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const LldpEdit = (props: any) => {
    const {t} = useTranslation()
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
            <Form.Item label={t('mode')} name="run" rules={[{ required: true }]}
            >
                <Select
                    defaultValue="Select Mode"
                    onChange={handleChange}
                    value={value}
                    options={[
                        {
                            value: "none",
                            label: "None"
                        },
                        {
                            value: "true",
                            label: t('enable')
                        },
                        {
                            value: "false",
                            label: t('disable')
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

