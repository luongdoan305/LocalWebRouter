import { message as antdMessage, Form, Input, Button, message, Select } from 'antd'
import React from 'react'
import ubusApi from '../../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../../translations/i18n"

export const NumberEdit = (props: any) => {
    //console.log("value: ",props)
    const { t } = useTranslation()
    let pattern = /^[a-zA-Z0-9_.]+$/
    const { item, onDone } = props
    const [form] = Form.useForm()
    const abc = t('error_fill')
    const refreshData = async () => {
        if (item) {
            const { status,id } = item
            form.setFieldsValue({
                status , id,
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
        await ubusApi.config_media_digits("add", values.id)
        const key = 'success';
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
            <Form.Item label={t('Number Digits')} name="id"
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
            <Form.Item label={t('Status')} name="status"
            >
                <Select
                    options={[
                        {
                            value: "none",
                            label: "None"
                        },
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
