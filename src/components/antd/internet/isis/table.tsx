import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const Isis_generalconfig = (props: any) => {
    const { onEditItem, onDeleteItem1, tableData, hihi } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = () => {
        window.location.reload()
    }
    const confirmDeleteGroup1 = async (group: any) => {
        // console.log("data1: ",))
        // const vlan = group.dev.map((item:any) => {item.toString()})
        const vlan = await ubusApi.config_network_isis("disable", group.router_id, group.type, group.net, group.log)
        // console.log("data1: ",group)
        const key = 'updatable';
        message.loading({ content: t('loading'), key });
        setTimeout(() => {
            message.success({ content: t('success'), key, duration: 2 });
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }

    const columns = [
        { title: t('router_id'), key: 'router_id', dataIndex: 'router_id' },
        { title: t('type'), key: 'type', dataIndex: 'type' },
        { title: t('net'), key: 'net', dataIndex: 'net' },
        { title: t('log_adjacency_changes'), key: 'log', dataIndex: 'log' },
        {
            title: t('action'),
            key: 'action',
            render: (_: string, record: any) => {
                if (record.admin_id <= 0) {
                    return null
                }
                return (
                    <Space>
                        <Button icon={<EditOutlined />} title={abc} onClick={() => onEditItem(record)} />
                        <Popconfirm
                            placement="top"
                            title={t('delete_cf')}
                            onConfirm={() => confirmDeleteGroup1(record)}
                            okText={t('yes')}
                            cancelText={t('no')}
                        >
                            <Button icon={<DeleteOutlined />} title={def} />
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ]
    if (!hihi) {
        return (
            <Table columns={columns} dataSource={hihi} loading style={{ minWidth: 400 }} />
        )
    } else {
        return (
            <Table columns={columns} dataSource={hihi} style={{ minWidth: 400 }} />
        )
    }
}

export const Isis_interfaceconfig = (props: any) => {
    const { onEditItem, onDeleteItem1, tableData, haha } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = () => {
        window.location.reload()
    }
    const confirmDeleteGroup = async (group: any) => {
        // console.log("data1: ",))
        // const vlan = group.dev.map((item:any) => {item.toString()})
        const vlan = await ubusApi.config_network_isis_interface("disable", group.m_interface, group.router_id, group.circurit_type, group.priority, group.priority_type)
        // console.log("data1: ",group)
        const key = 'updatable';
        message.loading({ content: t('loading'), key });
        setTimeout(() => {
            message.success({ content: t('success'), key, duration: 2 });
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }

    const columns = [
        { title: t('router_id'), key: 'router_id', dataIndex: 'router_id' },
        { title: t('interface'), key: 'm_interface', dataIndex: 'm_interface' },
        { title: t('circuit_type'), key: 'circurit_type', dataIndex: 'circurit_type' },
        { title: t('priority'), key: 'priority', dataIndex: 'priority' },
        { title: t('Priority Type'), key: 'priority_type', dataIndex: 'priority_type' },
        {
            title: t('action'),
            key: 'action',
            render: (_: string, record: any) => {
                if (record.admin_id <= 0) {
                    return null
                }
                return (
                    <Space>
                        <Button icon={<EditOutlined />} title={abc} onClick={() => onEditItem(record)} />
                        <Popconfirm
                            placement="top"
                            title={t('delete_cf')}
                            onConfirm={() => confirmDeleteGroup(record)}
                            okText={t('yes')}
                            cancelText={t('no')}
                        >
                            <Button icon={<DeleteOutlined />} title={def} />
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ]
    if (!haha) {
        return (
            <Table columns={columns} dataSource={haha} loading style={{ minWidth: 400 }} />
        )
    } else {
        return (
            <Table columns={columns} dataSource={haha} style={{ minWidth: 400 }} />
        )
    }
}