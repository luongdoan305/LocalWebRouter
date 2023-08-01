import { message as antdMessage, Form, Input, Button, message, Select, Switch, Upload, SelectProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import { Group } from 'antd/es/avatar';

export const IpsecEdit = (props: any) => {
    const { t } = useTranslation()
    let pattern = /^[a-zA-Z0-9_.]+$/
    let patternIpv4 = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
    let check1: any
    let check2: any
    const { item, datakey ,local_id, remote_id, local_address,remote_address,remote_subnet,local_subnet,ike_encrypt,ike_hash,ike_dh,esp_encrypt,esp_hash,esp_dh } = props
    const [form] = Form.useForm()
    const abc = t('error_fill')
    const refreshData = async () => { 
        form.setFieldsValue({
            key:datakey, local_id, remote_id, local_address, authentication_method: (ike_dh === undefined) ?  "signature" : "pre_shared_key", template_type: (remote_subnet === undefined) ? "remote_access" : "site_to_site", remote_address, local_subnet, remote_subnet, ike_encrypt, ike_hash, ike_dh, esp_encrypt, esp_hash, esp_dh,
        })
    }
    React.useEffect(() => {
        refreshData()
    }, [])

    const refreshPage = () => {
        window.location.reload()
    }

    const onFinish = async (values: any) => {

        const nat = await ubusApi.config_ipsec("IPSEC", values.key, values.local_id, values.remote_id, values.local_address, values.remote_address, values.local_subnet, values.remote_subnet, values.ike_encrypt, values.ike_hash, values.ike_dh, values.esp_encrypt, values.esp_hash, values.esp_dh)
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
    const slectport: SelectProps['options'] = [];
    for (let i = 1; i < 33; i++) {
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
            <Form.Item label={t('Local Id')} name="local_id">
                <Input allowClear></Input>
            </Form.Item>
            <Form.Item label={t('Remote Id')} name="remote_id">
                <Input allowClear></Input>
            </Form.Item>
            <Form.Item label={t('Local Address')} name="local_address">
                <Input allowClear></Input>
            </Form.Item>
            <Form.Item label={t('Remote Address')} name="remote_address">
                <Input allowClear></Input>
            </Form.Item>
            <Form.Item label={t('Authentication method')} name="authentication_method">
                <Select
                    onChange={handleChange}
                    options={[
                        {
                            value: "none",
                            label: "None"
                        },
                        {
                            value: "pre_shared_key",
                            label: "Pre-shared Key"
                        },
                        {
                            value: "signature",
                            label: "Signature"
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
                        getFieldValue('authentication_method') ==
                            "pre_shared_key" ? (
                            <>
                                <Form.Item label={t('Pre-shared Key')} name="key"
                                    rules={[{ required: true, min: 6, message: "Password must be minimum 6 characters" }]}
                                >
                                    <Input.Password></Input.Password>
                                </Form.Item>

                                <Form.Item label={t('IKE')} >
                                    <Input.Group compact>
                                        <Form.Item label={t('')} name="ike_encrypt" style={{ width: "30%" }}>
                                            <Select
                                                options={[
                                                    {
                                                        value: "aes128",
                                                        label: "aes128"
                                                    },
                                                    {
                                                        value: "aes128ctr",
                                                        label: "aes128ctr"
                                                    },
                                                    {
                                                        value: "aes128gmac",
                                                        label: "aes128gmac"
                                                    },
                                                    {
                                                        value: "aes192",
                                                        label: "aes192"
                                                    },
                                                    {
                                                        value: "aes192ctr",
                                                        label: "aes192ctr"
                                                    },
                                                    {
                                                        value: "aes192gmac",
                                                        label: "aes192gmac"
                                                    },
                                                    {
                                                        value: "aes256",
                                                        label: "aes256"
                                                    },
                                                    {
                                                        value: "aes256gcm16",
                                                        label: "aes256gcm16"
                                                    },
                                                    {
                                                        value: "aes256gmac",
                                                        label: "aes256gmac"
                                                    },
                                                    {
                                                        value: "3des",
                                                        label: "3des"
                                                    },
                                                ]}
                                            ></Select>
                                        </Form.Item>
                                        <Form.Item label={t('')} name="ike_hash" style={{ width: "30%", marginLeft: 10, }}>
                                            <Select
                                                options={[
                                                    {
                                                        value: "none",
                                                        label: "none"
                                                    },
                                                    {
                                                        value: "md5",
                                                        label: "md5"
                                                    },
                                                    {
                                                        value: "md5_128",
                                                        label: "md5_128"
                                                    },
                                                    {
                                                        value: "sha1",
                                                        label: "sha1"
                                                    },
                                                    {
                                                        value: "aesxcbc",
                                                        label: "aesxcbc"
                                                    },
                                                    {
                                                        value: "aescmac",
                                                        label: "aescmac"
                                                    },
                                                    {
                                                        value: "aes128gmac",
                                                        label: "aes128gmac"
                                                    },
                                                    {
                                                        value: "aes192gmac",
                                                        label: "aes192gmac"
                                                    },
                                                    {
                                                        value: "aes256gmac",
                                                        label: "aes256gmac"
                                                    },
                                                    {
                                                        value: "sha256",
                                                        label: "sha256"
                                                    },
                                                    {
                                                        value: "sha384",
                                                        label: "sha384"
                                                    },
                                                    {
                                                        value: "sha512",
                                                        label: "sha512"
                                                    },
                                                    {
                                                        value: "sha256_96",
                                                        label: "sha256_96"
                                                    },
                                                ]}
                                            ></Select>
                                        </Form.Item>
                                        <Form.Item label={t('')} name="ike_dh" style={{ width: "30%", marginLeft: 10 }}>
                                            <Select
                                                options={[
                                                    {
                                                        value: "none",
                                                        label: "none"
                                                    },
                                                    {
                                                        value: "modp768",
                                                        label: "modp768"
                                                    },
                                                    {
                                                        value: "modp1024",
                                                        label: "modp1024"
                                                    },
                                                    {
                                                        value: "modp1536",
                                                        label: "modp1536"
                                                    },
                                                    {
                                                        value: "modp2048",
                                                        label: "modp2048"
                                                    },
                                                    {
                                                        value: "modp3072",
                                                        label: "modp3072"
                                                    },
                                                    {
                                                        value: "modp4096",
                                                        label: "modp4096"
                                                    },
                                                    {
                                                        value: "modp6144",
                                                        label: "modp6144"
                                                    },
                                                    {
                                                        value: "modp8192",
                                                        label: "modp8192"
                                                    },
                                                ]}
                                            ></Select>
                                        </Form.Item>
                                    </Input.Group>
                                </Form.Item>

                                <Form.Item label={t('ESP')} >
                                    <Input.Group compact>
                                        <Form.Item label={t('')} name="esp_encrypt" style={{ width: "30%" }}>
                                            <Select
                                                options={[
                                                    {
                                                        value: "aes128",
                                                        label: "aes128"
                                                    },
                                                    {
                                                        value: "aes128ctr",
                                                        label: "aes128ctr"
                                                    },
                                                    {
                                                        value: "aes128gmac",
                                                        label: "aes128gmac"
                                                    },
                                                    {
                                                        value: "aes192",
                                                        label: "aes192"
                                                    },
                                                    {
                                                        value: "aes192ctr",
                                                        label: "aes192ctr"
                                                    },
                                                    {
                                                        value: "aes192gmac",
                                                        label: "aes192gmac"
                                                    },
                                                    {
                                                        value: "aes256",
                                                        label: "aes256"
                                                    },
                                                    {
                                                        value: "aes256gcm16",
                                                        label: "aes256gcm16"
                                                    },
                                                    {
                                                        value: "aes256gmac",
                                                        label: "aes256gmac"
                                                    },
                                                    {
                                                        value: "3des",
                                                        label: "3des"
                                                    },
                                                ]}
                                            ></Select>
                                        </Form.Item>
                                        <Form.Item label={t('')} name="esp_hash" style={{ width: "30%", marginLeft: 10, }}>
                                            <Select
                                                options={[
                                                    {
                                                        value: "none",
                                                        label: "none"
                                                    },
                                                    {
                                                        value: "md5",
                                                        label: "md5"
                                                    },
                                                    {
                                                        value: "md5_128",
                                                        label: "md5_128"
                                                    },
                                                    {
                                                        value: "sha1",
                                                        label: "sha1"
                                                    },
                                                    {
                                                        value: "aesxcbc",
                                                        label: "aesxcbc"
                                                    },
                                                    {
                                                        value: "aescmac",
                                                        label: "aescmac"
                                                    },
                                                    {
                                                        value: "aes128gmac",
                                                        label: "aes128gmac"
                                                    },
                                                    {
                                                        value: "aes192gmac",
                                                        label: "aes192gmac"
                                                    },
                                                    {
                                                        value: "aes256gmac",
                                                        label: "aes256gmac"
                                                    },
                                                    {
                                                        value: "sha256",
                                                        label: "sha256"
                                                    },
                                                    {
                                                        value: "sha384",
                                                        label: "sha384"
                                                    },
                                                    {
                                                        value: "sha512",
                                                        label: "sha512"
                                                    },
                                                    {
                                                        value: "sha256_96",
                                                        label: "sha256_96"
                                                    },
                                                ]}
                                            ></Select>
                                        </Form.Item>
                                        <Form.Item label={t('')} name="esp_dh" style={{ width: "30%", marginLeft: 10 }}>
                                            <Select
                                                options={[
                                                    {
                                                        value: "none",
                                                        label: "none"
                                                    },
                                                    {
                                                        value: "modp768",
                                                        label: "modp768"
                                                    },
                                                    {
                                                        value: "modp1024",
                                                        label: "modp1024"
                                                    },
                                                    {
                                                        value: "modp1536",
                                                        label: "modp1536"
                                                    },
                                                    {
                                                        value: "modp2048",
                                                        label: "modp2048"
                                                    },
                                                    {
                                                        value: "modp3072",
                                                        label: "modp3072"
                                                    },
                                                    {
                                                        value: "modp4096",
                                                        label: "modp4096"
                                                    },
                                                    {
                                                        value: "modp6144",
                                                        label: "modp6144"
                                                    },
                                                    {
                                                        value: "modp8192",
                                                        label: "modp8192"
                                                    },
                                                ]}
                                            ></Select>
                                        </Form.Item>
                                    </Input.Group>
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
                        getFieldValue('authentication_method') ==
                            "signature" ? (
                            <>
                                <Form.Item>
                                    <Input.Group compact>
                                        <Form.Item style={{ width: "60% " }} label="Certificate File" name="crt">
                                            <Upload
                                                maxCount={1}
                                            >
                                                <Button icon={<UploadOutlined />} >{t('upload')}</Button>
                                            </Upload>
                                        </Form.Item>
                                        <Form.Item name="crt_local" style={{ width: "40% " }} label="" >
                                            <Select
                                                onChange={handleChange}
                                                value={value}
                                            //options={crtlist}
                                            ></Select>
                                        </Form.Item>
                                    </Input.Group>
                                </Form.Item>
                                <Form.Item>
                                    <Input.Group compact>
                                        <Form.Item style={{ width: "60% " }} label="Key File" name="key">
                                            <Upload
                                                maxCount={1}
                                            >
                                                <Button icon={<UploadOutlined />} >{t('upload')}</Button>
                                            </Upload>
                                        </Form.Item>
                                        <Form.Item name="key_local" style={{ width: "40% " }} label="" >
                                            <Select
                                                onChange={handleChange}
                                                value={value}
                                            //options={keylist}
                                            ></Select>
                                        </Form.Item>
                                    </Input.Group>
                                </Form.Item>
                                <Form.Item>
                                    <Input.Group compact>
                                        <Form.Item label="Certificate CA File" name="ca">
                                            <Upload
                                                maxCount={1}
                                            >
                                                <Button icon={<UploadOutlined />} >{t('upload')}</Button>
                                            </Upload>
                                        </Form.Item>
                                        <Form.Item name="ca_local" style={{ width: "40% " }}>
                                            <Select
                                                onChange={handleChange}
                                                value={value}
                                            //options={calist}
                                            ></Select>
                                        </Form.Item>
                                    </Input.Group>
                                </Form.Item>
                            </>
                        ) : null}
            </Form.Item>
            <Form.Item label={t('Template type')} name="template_type" rules={[{ required: true, message: "" }]}
            >
                <Select
                    onChange={handleChange}
                    // value={value}
                    options={[
                        {
                            value: "site_to_site",
                            label: t('Site to Site')
                        },
                        {
                            value: "remote_access",
                            label: t('Remote Access')
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
                        getFieldValue('template_type') ==
                            "site_to_site" ? (
                            <>
                                <Form.Item label={t('Remote subnets')}>
                                    <Input.Group compact>
                                        <Form.Item name="remote_subnet">
                                            <Input allowClear></Input>
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
                                        <Form.Item name="subnets_value_r" style={{ width: "17% " }}
                                        >  <Select
                                                //showSearch
                                                options={slectport}
                                            />
                                        </Form.Item>
                                    </Input.Group>
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
                        getFieldValue('template_type') ==
                            "remote_access" ? (
                            <>
                                <Form.Item label={t('Client Address Range')}>
                                    <Input.Group compact>
                                        <Form.Item name="local_subnet">
                                            <Input allowClear></Input>
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

