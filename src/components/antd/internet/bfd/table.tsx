import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const Bfd_peer = (props: any) => {
    const { onEditItem1, onDeleteItem1, tableData, haha } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = () => {
        window.location.reload()
    }
    const confirmDeleteGroup1 = async (group: any) => {
        // console.log("data1: ",))
        // const vlan = group.dev.map((item:any) => {item.toString()})
        const vlan = await ubusApi.config_network_vlan("access", "del", group.name, group.vid, group.dev)
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
        { title: 'Address', key: 'address', dataIndex: 'address' },
        { title: 'Interface', key: 'interface', dataIndex: 'interface' },
        { title: 'Local-address', key: 'local-address', dataIndex: 'local-address' },
        { title: 'Multihop', key: 'multihop', dataIndex: 'multihop' },
        {
            title: t('action'),
            key: 'action',
            render: (_: string, record: any) => {
                if (record.admin_id <= 0) {
                    return null
                }
                return (
                    <Space>
                        <Button icon={<EditOutlined />} title={abc} onClick={() => onEditItem1(record)} />
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

export const Bfd_interface = (props: any) => {
    const { onEditItem1, onDeleteItem1, tableData, haha } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = () => {
        window.location.reload()
    }
    const confirmDeleteGroup1 = async (group: any) => {
        // console.log("data1: ",))
        // const vlan = group.dev.map((item:any) => {item.toString()})
        const vlan = await ubusApi.config_network_vlan("access", "del", group.name, group.vid, group.dev)
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
        { title: 'Interface', key: 'interface', dataIndex: 'interface' },
        { title: 'Protocol', key: 'protocol', dataIndex: 'protocol' },
        {
            title: t('action'),
            key: 'action',
            render: (_: string, record: any) => {
                if (record.admin_id <= 0) {
                    return null
                }
                return (
                    <Space>
                        <Button icon={<EditOutlined />} title={abc} onClick={() => onEditItem1(record)} />
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