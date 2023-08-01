import { message as antdMessage, Form, Input, Button, message, InputNumber, Space, Select } from 'antd'
import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ubusApi from '../../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../../translations/i18n"
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

export const IvrEdit = (props: any) => {
    //console.log("value: ",props)
    const { t } = useTranslation()
    let pattern = /^[a-zA-Z0-9_.]+$/
    let patternIpv4 = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
    let check1: any
    let check2: any
    const { item, onDone,haha, hihi} = props
    const [form] = Form.useForm()
    const abc = t('error_fill')
    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const [button_num1, setButton_num1] = React.useState(null)
    const [button_num2, setButton_num2] = React.useState(null)
    const [button_num3, setButton_num3] = React.useState(null)
    const [button_num4, setButton_num4] = React.useState(null)
    const [button_num5, setButton_num5] = React.useState(null)
    const [button_num6, setButton_num6] = React.useState(null)
    const [button_num7, setButton_num7] = React.useState(null)
    const [button_num8, setButton_num8] = React.useState(null)


    const refreshData = async () => {   
        const data = await ubusApi.show_media_ivr()
        setButton_num1(data.ivr_data.button[0].number_button)
        if (item) {
            const {button_ivr, music, button, name, number, number_button} = item
            form.setFieldsValue({
                button_ivr, music, button, name, number,number_button
            })
        }
    }
    console.log(button_num1)
    React.useEffect(() => {
        refreshData()
    }, [])
    
    const refreshPage = () => {
        window.location.reload()
    }

    const onFinish = async (values: any) => {
        await ubusApi.config_media_ivr( "enable", values.button_ivr, values.music, values.button, values.number, values.name)
        await ubusApi.config_media_ivr( "enable", values.button_ivr, values.music, "1", values.number1, values.name1)
        await ubusApi.config_media_ivr( "enable", values.button_ivr, values.music, "2", values.number2, values.name2)
        await ubusApi.config_media_ivr( "enable", values.button_ivr, values.music, "3", values.number3, values.name3)
        await ubusApi.config_media_ivr( "enable", values.button_ivr, values.music, "4", values.number4, values.name4)
        await ubusApi.config_media_ivr( "enable", values.button_ivr, values.music, "5", values.number5, values.name5)
        await ubusApi.config_media_ivr( "enable", values.button_ivr, values.music, "6", values.number6, values.name6)
        await ubusApi.config_media_ivr( "enable", values.button_ivr, values.music, "7", values.number7, values.name7)
        await ubusApi.config_media_ivr( "enable", values.button_ivr, values.music, "8", values.number8, values.name8)
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
             <Form.Item label={t('Number IVR')} name="button_ivr" 
                rules={[
                    { required: true, type:'number' },
                ]}
            >
                <InputNumber min={1} max={1000000000} style={{ width: '100%' }}  ></InputNumber>
            </Form.Item>
            <Form.Item label={t('Music')} name="music"
            >
                <Select
                    defaultValue={t('Status')}
                    options={[
                        {
                            value: "none",
                            label: "None"
                        },
                        {
                            value: "music",
                            label: "TongDai"
                        },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item label="Button 1" style={{ marginBottom: 0 }}>
                <Form.Item
                    name="button1"
                    style={{ display: 'inline-block', width: 'calc(10% - 8px)' }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="number1"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)' }}
                >
                    <Input placeholder="sip_phone" />
                </Form.Item>
                <Form.Item
                    name="name1"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)', margin: '0 8px' }}
                >
                    <Input placeholder="user" />
                </Form.Item>
            </Form.Item>
            <Form.Item label="Button 2" style={{ marginBottom: 0 }}>
                <Form.Item
                    name="button2"
                    style={{ display: 'inline-block', width: 'calc(10% - 8px)' }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="number2"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)' }}
                >
                    <Input placeholder="sip_phone" />
                </Form.Item>
                <Form.Item
                    name="name2"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)', margin: '0 8px' }}
                >
                    <Input placeholder="user" />
                </Form.Item>
            </Form.Item>
            <Form.Item label="Button 3" style={{ marginBottom: 0 }}>
                <Form.Item
                    name="button3"
                    style={{ display: 'inline-block', width: 'calc(10% - 8px)' }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="number3"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)' }}
                >
                    <Input placeholder="sip_phone" />
                </Form.Item>
                <Form.Item
                    name="name3"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)', margin: '0 8px' }}
                >
                    <Input placeholder="user" />
                </Form.Item>
            </Form.Item>
            <Form.Item label="Button 4" style={{ marginBottom: 0 }}>
                <Form.Item
                    name="button4"
                    style={{ display: 'inline-block', width: 'calc(10% - 8px)' }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="number4"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)' }}
                >
                    <Input placeholder="sip_phone" />
                </Form.Item>
                <Form.Item
                    name="name5"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)', margin: '0 8px' }}
                >
                    <Input placeholder="user" />
                </Form.Item>
            </Form.Item>
            <Form.Item label="Button 6" style={{ marginBottom: 0 }}>
                <Form.Item
                    name="button6"
                    style={{ display: 'inline-block', width: 'calc(10% - 8px)' }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="number6"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)' }}
                >
                    <Input placeholder="sip_phone" />
                </Form.Item>
                <Form.Item
                    name="name6"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)', margin: '0 8px' }}
                >
                    <Input placeholder="user" />
                </Form.Item>
            </Form.Item>
            <Form.Item label="Button 7" style={{ marginBottom: 0 }}>
                <Form.Item
                    name="button7"
                    style={{ display: 'inline-block', width: 'calc(10% - 8px)' }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="number7"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)' }}
                >
                    <Input placeholder="sip_phone" />
                </Form.Item>
                <Form.Item
                    name="name7"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)', margin: '0 8px' }}
                >
                    <Input placeholder="user" />
                </Form.Item>
            </Form.Item>
            <Form.Item label="Button 8" style={{ marginBottom: 0 }}>
                <Form.Item
                    name="button8"
                    style={{ display: 'inline-block', width: 'calc(10% - 8px)' }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="number8"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)' }}
                >
                    <Input placeholder="sip_phone" />
                </Form.Item>
                <Form.Item
                    name="name8"
                    style={{ display: 'inline-block', width: 'calc(45% - 8px)', margin: '0 8px' }}
                >
                    <Input placeholder="user" />
                </Form.Item>
            </Form.Item>
            
            {/* <Form.List name="button"  >
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field) => (
                            <Space key={field.key} align="baseline"
                                direction="vertical"
                            >
                                <Input.Group compact>
                                    <Form.Item
                                        {...field}
                                        label="Button"
                                        name={[field.name, 'button']}
                                        style={{ width: '100%' }}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        label="Number"
                                        name={[field.name, 'number']}
                                        style={{ width: '45%' }}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        label="Name"
                                        name={[field.name, 'name']}
                                        style={{ width: '45%' }}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Input.Group>
                            </Space>
                        ))}
                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                button
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List> */}
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
