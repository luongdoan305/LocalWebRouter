import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { message as antdMessage, Form, Input, Button, message, Select, Switch, Checkbox, Card } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useRef, useState } from 'react'
import ubusApi from 'service/api/ubus-api';
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";


export const Dnsedit = () => {
    const [form] = Form.useForm()
    let pattern = /^[a-zA-Z0-9_.]+$/
    const { t } = useTranslation()
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const onEditItem = (group: any) => {
        setItem(Object.assign({}, group))
        setShowModal(true)
    }
    const [loading, setLoading] = React.useState(true)
    const refreshData = async () => {
        if (item) {
            const {primary, secondary,  } = item
            form.setFieldsValue({
                primary, secondary,
            })
        }
    }
    React.useEffect(() => {
        refreshData()
    }, [])
    const onFinish = async (values: any) => {
        if (values.primary == null && values.secondary == null) {
            const key = 'fail';
            message.loading({ content: t('loading'), key });
            setTimeout(() => {
                message.error({ content: t('fail'), key, duration: 2 });
            }, 1000);
        } else {
            await ubusApi.config_dns(values.primary,values.secondary)
            const key = 'success';
            message.loading({ content: t('loading'), key });
            setTimeout(() => {
                message.success({ content: t('success'), key, duration: 2 });
            }, 1000);
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }
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
        
            <Form.Item name="primary" label={t('primary')}>
            <Input />
            </Form.Item>
            <Form.Item name="secondary" label={t('secondary')}>
            <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button
                type='primary'
                htmlType="submit"
                >
                {t("submit")}
            </Button>
            </Form.Item>
            
        </Form>
    )
}
