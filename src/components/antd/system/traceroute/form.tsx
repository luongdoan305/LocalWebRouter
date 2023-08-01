
import { Form, Input, Button, Select, SelectProps } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { Alert, Spin, Result } from 'antd';

import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
}

export const TraceRoute = (props: any) => {

    const { item, value } = props
    const [hostname, setValue] = React.useState("");
    const [data, setData] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { t } = useTranslation();

    const [form] = Form.useForm()
    const refreshData = async () => {
        if (item) {
            const { name, vid, dev, } = item
            form.setFieldsValue({
                name, mode: value, interface: dev, vid
            })
        }
    }
    React.useEffect(() => {
        refreshData()
    }, [])

    const onFinish = async (values: any) => {
        setLoading(true)
        const param = {
            hostname: values.hostname, version: values.version, source: values.source,
            max: values.max, second: values.second,
            ttl: values.ttl,
        }
        const result = await ubusApi.config_system_traceroute(param)
        setLoading(false)
        console.log(result)
        setData(result.output)
    }

    const options: SelectProps['options'] = [];
    const ttl: SelectProps['options'] = [];

    for (let i = 1; i < 11; i++) {
        options.push({
            value: i,
            label: i,
        });
    }

    for (let i = 1; i < 255; i++) {
        ttl.push({
            value: i,
            label: i,
        });
    }

    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 10 }}
                onFinish={onFinish}
            >
                <Form.Item {...formItemLayout} label={t("hostname_system")} name="hostname" rules={[{ required: true, message: 'Please input hostname!' }]}
                >
                    <Input allowClear style={{ width: '40%' }} />
                </Form.Item>
                <Form.Item {...formItemLayout} label={t("ip_version")} name="version"
                >
                    <Select
                        style={{ width: '40%' }}
                        defaultValue='IPv4'
                        options={[
                            {
                                value: '4',
                                label: 'IPv4'
                            },
                            {
                                value: '6',
                                label: 'IPv6'
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item {...formItemLayout} label={t("src_ip")} name="source"
                >
                    <Input style={{ width: '40%' }} ></Input>
                </Form.Item>
                <Form.Item {...formItemLayout} label="TTL" name="ttl"
                >
                    <Select
                        style={{ width: '40%' }}
                        showSearch
                        defaultValue='255'
                        placeholder="Select TTL"
                        options={ttl}
                    />
                </Form.Item>
                <Form.Item {...formItemLayout} label={t("max_hops")} name="max"
                >
                    <Select
                        style={{ width: '40%' }}
                        defaultValue='3'
                        options={options}
                    ></Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type='primary'
                        htmlType="submit"
                    >
                        {t("submit_system")}
                    </Button>
                </Form.Item>
                <div>
                    <Result style={{ whiteSpace: 'pre-wrap' }} >
                        <Spin spinning={loading}>
                            <Alert
                                message={data}
                            />
                        </Spin>
                    </Result>
                </div>
            </Form>
        </>
    )
}
