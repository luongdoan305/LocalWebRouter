import { message as antdMessage, Form, Input, Button, message, Select, Switch, Upload, SelectProps, Row } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const Gen_certificate = (props: any) => {
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
            const { status, local_address, remote_address, network } = item
            form.setFieldsValue({
                status, local_address, remote_address, network,
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

        const nat = await ubusApi.config_l2tp(values.status, values.local_address, values.remote_address, values.network)
        const key = 'updatable';
        message.loading({ content: t('loading'), key });
        setTimeout(() => {
            message.success({ content: t('success'), key, duration: 2 });
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }
    const [value, setValue] = React.useState('')
    const handleChange = (value: any) => {
        setValue(value)
        console.log("value: ", value);
    }
    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label={t('Config mode')} name="config_mode">
                <Select
                    onChange={handleChange}
                    options={[
                        {
                            value: "create_ca",
                            label: "Create CA"
                        },
                        {
                            value: "generate_certificate",
                            label: "Generate Cetificate"
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {
                    ({ getFieldValue }) =>
                        getFieldValue('config_mode') ==
                            "create_ca" ? (
                            <>
                                <Form.Item label="Name" name="ca_name">
                                    <Input allowClear ></Input>
                                </Form.Item>
                            </>
                        ) : null}
            </Form.Item>

            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {
                    ({ getFieldValue }) =>
                        getFieldValue('config_mode') ==
                            "generate_certificate" ? (
                            <>
                                <Form.Item label={t('Name CA')} name="name_list_ca"
                                    rules={[{ required: true, message: "You must to create a CA File before" }]}
                                >
                                    <Select
                                    // options={listca}
                                    ></Select>
                                </Form.Item>                                
                                <Form.Item label={t('File Mode')} name="file_mode">
                                    <Select
                                        options={[
                                            {
                                                value: "pfx",
                                                label: "PFX"
                                            },
                                            {
                                                value: "p12",
                                                label: "P12"
                                            },
                                            {
                                                value: "crt",
                                                label: "CRT"
                                            },
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label={t('Password')} name="pass"
                                    rules={[{ required: true, min: 6, message: "Password must be minimum 6 characters" }]}
                                >
                                    <Input.Password></Input.Password>
                                </Form.Item>
                                <Form.Item label="Country" name="country"
                                >
                                    <Input allowClear placeholder='VN,EX,...'></Input>
                                </Form.Item>
                                <Form.Item label="Locality" name="locality"
                                >
                                    <Input allowClear placeholder='Hanoi,HoChiMinh,...'></Input>
                                </Form.Item>
                                <Form.Item label="Organization" name="organization"
                                >
                                    <Input allowClear placeholder='Lancsnet,...'></Input>
                                </Form.Item>
                                <Form.Item label="Name" name="name_p"
                                >
                                    <Input allowClear placeholder='Nguyen Van A'></Input>
                                </Form.Item>
                                <Form.Item label="Email" name="email_p"
                                >
                                    <Input allowClear placeholder='Nguyenvana@lancsnet.com'></Input>
                                </Form.Item>
                                <Form.Item label="IP address Peer" name="Ipaddr_peer"
                                >
                                    <Input allowClear></Input>
                                </Form.Item>
                            </>
                        ) : null}
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