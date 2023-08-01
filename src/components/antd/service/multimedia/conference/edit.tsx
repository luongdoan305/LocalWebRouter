import { message as antdMessage, Form, Input, Button, message, InputNumber, Checkbox, Select, Col, Card } from 'antd'
import React from 'react'
import ubusApi from '../../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../../translations/i18n"
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

export const ConferenceEdit = (props: any) => {
    //console.log("value: ",props)
    const { t } = useTranslation()
    let pattern = /^[a-zA-Z0-9_.]+$/
    let patternIpv4 = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
    let check1: any
    let check2: any
    const { item, onDone } = props
    const [form] = Form.useForm()
    const abc = t('error_fill')
    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
      };
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

    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        >
        <Col>
            <Card title="Number Room Edit" headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}} >
                <Form.Item label={t('Number IVR')} name="number_ivr" 
                    rules={[
                        { required: true, type:'number' },
                    ]}
                    >
                    <InputNumber min={1} max={10} style={{ width: '100%' }}  ></InputNumber>
                </Form.Item>
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
            </Card>
            <Card title="Setting Room" headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}} >
                <Form.Item label={t('Max members')} name="number_ivr" 
                    rules={[
                        { required: true, type:'number' },
                    ]}
                    >
                    <InputNumber min={1} max={10} style={{ width: '100%' }}  placeholder="1-100"></InputNumber>
                </Form.Item>
                <Form.Item label={t('Mixing interval')} name="mixi_interval"
                >
                    <Select
                        defaultValue={t('10')}
                        options={[
                            {
                                value: "10",
                                label: "10"
                            },
                            {
                                value: "20",
                                label: "20"
                            },
                            {
                                value: "40",
                                label: "40"
                            },
                            {
                                value: "80",
                                label: "80"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Internal sample rate')} name="sample_rate"
                >
                    <Select
                        defaultValue={t('auto')}
                        options={[
                            {
                                value: "auto",
                                label: "auto"
                            },
                            {
                                value: "8000",
                                label: "8000"
                            },
                            {
                                value: "12000",
                                label: "12000"
                            },
                            {
                                value: "24000",
                                label: "24000"
                            },
                            {
                                value: "32000",
                                label: "32000"
                            },
                            {
                                value: "44100",
                                label: "44100"
                            },
                            {
                                value: "48000",
                                label: "48000"
                            },
                            {
                                value: "96000",
                                label: "96000"
                            },
                            {
                                value: "192000",
                                label: "192000"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Record conference')} name="record_conference"
                >
                    <Select
                        defaultValue={t('None')}
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
                <Form.Item label={t('Video mode')} name="video_mode"
                >
                    <Select
                        defaultValue={t('None')}
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
            </Card>
            <Card title="Setting Admin" headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}} >
                <Form.Item label="Number Admin" style={{ marginBottom: 0 }}>
                    <Form.Item
                    name="number_admin"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <InputNumber min={1} max={10} style={{ width: '100%' }}  placeholder="Number Admin"></InputNumber>
                </Form.Item>
                    <Form.Item
                        name="password"
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                    >
                        <InputNumber min={1} max={100} style={{ width: '100%' }}  placeholder="password"></InputNumber>
                    </Form.Item>
                </Form.Item>
                <Form.Item label={t('Number IVR')} name="number_ivr" 
                    rules={[
                        { required: true, type:'number' },
                    ]}
                    >
                    <InputNumber min={1} max={100} style={{ width: '100%' }}  ></InputNumber>
                </Form.Item>
                <Form.Item label={t('Announce user ')} name="count"
                >
                    <Select
                        defaultValue={t('None')}
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
                <Form.Item label={t('Denoise')} name="denoise"
                >
                    <Select
                        defaultValue={t('None')}
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
                <Form.Item label={t('Dsp drop silence')} name="silence"
                >
                    <Select
                        defaultValue={t('None')}
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
                <Form.Item label={t('Marked')} name="marked"
                >
                    <Select
                        defaultValue={t('None')}
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
                <Form.Item label={t('Music on hold')} name="empty"
                >
                    <Select
                        defaultValue={t('None')}
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
                <Form.Item label={t('Timeout')} name="timeout" 
                    rules={[
                        { required: true, type:'number' },
                    ]}
                    >
                    <InputNumber min={1} max={9999} style={{ width: '100%' }}  placeholder="1-9999"></InputNumber>
                </Form.Item>
                <Form.Item label={t('Button *')} name="button"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 1')} name="button1"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 2')} name="button2"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 3')} name="button3"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 4')} name="button4"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 5')} name="button5"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 6')} name="button6"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 7')} name="button7"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 8')} name="button8"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 9')} name="button9"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
            </Card>
            <Card title="Setting User" headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}} >
                <Form.Item label="Number Admin" style={{ marginBottom: 0 }}>
                    <Form.Item
                    name="number_admin1"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <InputNumber min={1} max={10} style={{ width: '100%' }}  placeholder="Number Admin"></InputNumber>
                </Form.Item>
                    <Form.Item
                        name="password1"
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                    >
                        <InputNumber min={1} max={100} style={{ width: '100%' }}  placeholder="password"></InputNumber>
                    </Form.Item>
                </Form.Item>
                <Form.Item label={t('Number IVR')} name="number_ivr1" 
                    rules={[
                        { required: true, type:'number' },
                    ]}
                    >
                    <InputNumber min={1} max={100} style={{ width: '100%' }}  ></InputNumber>
                </Form.Item>
                <Form.Item label={t('Announce user ')} name="count1"
                >
                    <Select
                        defaultValue={t('None')}
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
                <Form.Item label={t('Denoise')} name="denoise1"
                >
                    <Select
                        defaultValue={t('None')}
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
                <Form.Item label={t('Dsp drop silence')} name="silence1"
                >
                    <Select
                        defaultValue={t('None')}
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
                <Form.Item label={t('Marked')} name="marked1"
                >
                    <Select
                        defaultValue={t('None')}
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
                <Form.Item label={t('Music on hold')} name="empty1"
                >
                    <Select
                        defaultValue={t('None')}
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
                <Form.Item label={t('Timeout')} name="timeout1" 
                    >
                    <InputNumber min={1} max={9999} style={{ width: '100%' }}  placeholder="1-9999"></InputNumber>
                </Form.Item>
                <Form.Item label={t('Button *')} name="button01"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 1')} name="button11"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 2')} name="button21"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 3')} name="button31"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 4')} name="button41"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 5')} name="button51"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 6')} name="button61"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 7')} name="button71"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 8')} name="button81"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "admin toggle conference lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item label={t('Button 9')} name="button91"
                >
                    <Select
                        defaultValue={t('None')}
                        options={[
                            {
                                value: "none",
                                label: "None"
                            },
                            {
                                value: "playback_and_continue(conf-adminmenu)",
                                label: "Playback and continue (conf adminmenu)"
                            },
                            {
                                value: "toggle_mute",
                                label: "Toggle mute"
                            },
                            {
                                value: "decrease_listening_volume",
                                label: "Decrease listening volume"
                            },
                            {
                                value: "reset_listening_volume",
                                label: "Reset listening volume"
                            },
                            {
                                value: "increase_listening_volume",
                                label: "Increase listening volume"
                            },
                            {
                                value: "decrease_talking_volume",
                                label: "Decrease talking volume"
                            },
                            {
                                value: "leave_conference",
                                label: "Leave conference"
                            },
                            {
                                value: "increase_talking_volume",
                                label: "Increase talking volume"
                            },
                            {
                                value: "admin_toggle_conference_lock",
                                label: "Admin Toggle Conference Lock"
                            },
                            {
                                value: "admin_kick_last",
                                label: "Admin kick last"
                            },
                            {
                                value: "admin_toggle_mute_participants",
                                label: "Admin toggle mute participants"
                            },
                        ]}
                    ></Select>
                </Form.Item>
            </Card>
        </Col> 

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
