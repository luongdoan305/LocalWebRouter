import { message as antdMessage, Form, Input, Button, message, Select, SelectProps } from 'antd'
import React from 'react'
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const VtiEdit = (props: any) => {
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
            const { status, gre_name, local_address, remote_address, network, netmask } = item
            form.setFieldsValue({
                status, gre_name, local_address, remote_address, network, netmask,
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
        if (values.local_address == null && values.remote_address == null && values.network == null && values.netmask == null) {
            const key = 'fail';
            message.loading({ content: t('loading'), key });
            setTimeout(() => {
                message.error({ content: t('fail'), key, duration: 2 });
            }, 1000);
        } else {
            await ubusApi.config_gre("enable", values.gre_name, values.local_address, values.remote_address, values.network, values.netmask)
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
    const slectport: SelectProps['options'] = [];
    for (let i = 1; i < 129; i++) {
        slectport.push({
            value: i,
            label: i,
        });
    }
    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
            <Form.Item label={t('Interface Name')} name="name"
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

            <Form.Item label={t('Remote Address')} name="remote_address"
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
            <Form.Item label={t('Advanced')} name="advanced"
                rules={[{ required: true, message: abc }]}
            >
                <Select
                    defaultValue={t('disable')}
                    onChange={handleChange}
                    options={[
                        {
                            value: "enable",
                            label: t('enable')
                        },
                        {
                            value: "disable",
                            label: t('disable')
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
                        getFieldValue('advanced') ==
                            "enable" ? (
                            <>
                                <Form.Item label="Inbound" name="inbound">
                                    <Input allowClear ></Input>
                                </Form.Item>
                                <Form.Item label="Outbound" name="outbound">
                                    <Input allowClear></Input>
                                </Form.Item>
                            </>
                        ) : null}
            </Form.Item>
            <Form.Item label={t('Network')}>
                <Input.Group compact>
                    <Form.Item name="network"
                        rules={[
                            { required: true, message: 'Please input network!' },
                            {
                                validator: (_, value) => {
                                    check1 = value.split(".")
                                    check2 = check1[check1.length - 1]
                                    return (Number(check2) < 256 && patternIpv4.test(value)) ? Promise.resolve() : Promise.reject('Invalid Ip address entered')
                                }
                            }
                        ]}
                    >
                        <Input allowClear placeholder="10.10.10.0/24" ></Input>
                    </Form.Item>
                    <Input
                        // className="site-input-split"
                        style={{
                            width: 40,
                            textAlign: 'center',
                            pointerEvents: 'none',
                            //marginLeft: 10
                        }}
                        placeholder="/"
                        disabled
                    />
                    <Form.Item name="subnets_value_c" style={{ width: "17% " }}
                    >  <Select
                            //showSearch
                            options={slectport}
                        />
                    </Form.Item>
                </Input.Group>
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
