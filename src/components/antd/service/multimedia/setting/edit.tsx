import { message as antdMessage, Form, Input, Button,InputNumber, message, Select } from 'antd'
import React from 'react'
import ubusApi from '../../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../../translations/i18n"

export const SettingEdit = (props: any) => {
    //console.log("value: ",props)
    const { t } = useTranslation()
    let pattern = /^[a-zA-Z0-9_.]+$/
    const { item, onDone } = props
    const [form] = Form.useForm()
    const abc = t('error_fill')
    const refreshData = async () => {
        if (item) {
            const { name, type, src, dest, sport, dport, tcp_udp, } = item
            form.setFieldsValue({
                name, type, src, dest, sport, dport, tcp_udp,
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
        if (values.src == null && values.dest == null && values.sport == null && values.dport == null && values.tcp_udp == null) {
            const key = 'fail';
            message.loading({ content: t('loading'), key });
            setTimeout(() => {
                message.error({ content: t('fail'), key, duration: 2 });
            }, 1000);
        } else {
            await ubusApi.config_ip_filter(values.name, "add", values.type, values.src, values.dest, values.sport, values.dport, values.tcp_udp)
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
            <Form.Item label={t('mode')} name="mode" rules={[{ required: true, message: "" }]}
            >
                <Select
                    onChange={handleChange}
                    // value={value}
                    options={[
                        {
                            value: "Tranfer_call",
                            label: t('Tranfer Call')
                        },
                        {
                            value: "mailboxes_config",
                            label: t('Mailboxes Config')
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
                        getFieldValue('mode') ==
                            "mailboxes_config" ? (
                            <>
                                <Form.Item label={t('Status')} name="status"
                                >
                                    <Select
                                        defaultValue={t('Status')}
                                        options={[
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
                                <Form.Item label={t('Number Voicemail')} name="voicemail" 
                                    // rules={[
                                    //     { required: true, type:'number' },
                                    // ]}
                                >
                                    <InputNumber min={1} max={9999} style={{ width: '100%' }}  placeholder="1-9999" ></InputNumber>
                                </Form.Item>
                                <Form.Item label={t('Max logins')} name="logins" 
                                    // rules={[
                                    //     { required: true, type:'number' },
                                    // ]}
                                >
                                    <InputNumber min={1} max={9999} style={{ width: '100%' }}  placeholder="1-9999" ></InputNumber>
                                </Form.Item>
                                <Form.Item label={t('Max message')} name="message" 
                                    // rules={[
                                    //     { required: true, type:'number' },
                                    // ]}
                                >
                                    <InputNumber min={1} max={9999} style={{ width: '100%' }}  placeholder="1-9999" ></InputNumber>
                                </Form.Item>
                                <Form.Item label={t('Max second')} name="second" 
                                    // rules={[
                                    //     { required: true, type:'number' },
                                    // ]}
                                >
                                    <InputNumber min={1} max={9999} style={{ width: '100%' }}  placeholder="1-9999" ></InputNumber>
                                </Form.Item>
                                <Form.Item label={t('Min second')} name="second" 
                                    // rules={[
                                    //     { required: true, type:'number' },
                                    // ]}
                                >
                                    <InputNumber min={1} max={9999} style={{ width: '100%' }}  placeholder="1-9999" ></InputNumber>
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
                        getFieldValue('mode') ==
                            "Tranfer_call" ? (
                            <>
                            <Form.Item name="blindxfer"  label={t('Blindxfer')}>
                            <Input allowClear></Input>
                            </Form.Item>
                            <Form.Item name="atxfer"  label={t('Atxfer')}>
                            <Input allowClear></Input>
                            </Form.Item>                                   
                            </>
                        ) : null}
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
