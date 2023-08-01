import { message as antdMessage, Form, Input, Button, message, Select } from 'antd'
import { access } from 'fs'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const VlanEdit = (props: any) => {
    const {t} = useTranslation()
    const { item, onDone, value, handleChange,optionsParentInterface } = props
    console.log(value)
    const [form] = Form.useForm()
    const refreshData = async () => {
        if (item) {
            const { name, vid,dev, } = item
            form.setFieldsValue({
                name:name, mode:value, interface:dev, vid:vid
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

            interface: values.interface, vid: values.vid, name: values.name,
        }
        if (values.mode == "access") {
            // const hihi = { "access": param }
            // console.log("hihi1", hihi)
            const vlan = await ubusApi.config_network_vlan(values.mode, "add", values.name, values.vid, values.interface)

        } else {
            const vlan = await ubusApi.config_network_vlan(values.mode, "add", values.name, values.vid, values.interface)
            // const hihi = { "trunk": param }
            // console.log("hihi2", hihi)
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
            <Form.Item label={t('mode')} name="mode" rules={[{ required: true }]}
            >
                <Select
                    defaultValue="Select Mode"
                    onChange={handleChange}
                    value={value}
                    options={[
                        {
                            value: "access",
                            label: "Access"
                        },
                        {
                            value: "trunk",
                            label: "Trunk"
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
                            "access" ? (
                            <>
                                <Form.Item label={t('interface')} name="interface" rules={[{ required: true }]}
                                >
                                    <Select
                                        mode="tags"
                                        options={optionsParentInterface}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label="VLAN ID" name="vid"
                                    rules={[
                                        { required: true },
                                        {
                                          validator: (_, values) =>
                                            values > 4094 || values < 1 ? Promise.reject('vlanid could not be larger than 4094 ') : Promise.resolve()
                                        }
                                    ]}
                                >
                                    <Input></Input>
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
                            "trunk" ? (
                            <>
                                <Form.Item label={t('interface')} name="interface" rules={[{ required: true }]}
                                >
                                    <Select
                                        options={optionsParentInterface}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label="VLAN ID" name="vid"
                                    rules={[
                                        { required: true },
                                        {
                                          validator: (_, values) =>
                                            values > 4094 || values < 1 ? Promise.reject('vlanid could not be larger than 4094 ') : Promise.resolve()
                                        }
                                    ]}
                                >
                                    {/* <Select
                                        mode="tags"
                                    ></Select> */}
                                    <Input></Input>
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

