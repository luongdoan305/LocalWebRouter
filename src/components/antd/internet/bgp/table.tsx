import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const Bgp_configlist = (props: any) => {
    const { onEditItem, onDeleteItem1, tableData, data } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = () => {
        window.location.reload()
    }
    const confirmDeleteGroup = async (group: any) => {
        const vlan = await ubusApi.config_network_bgp("disable", group.router_id, group.as_number, group.neighbor_ip, group.log, "false", "false", "false", "false", "false", "fasle")
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
        { title: t('neighbor_id'), key: 'neighbor_ip', dataIndex: 'neighbor_ip' },
        { title: t('as_number'), key: 'as_number', dataIndex: 'as_number' },
        { title: t('log_neighbor_changes'), key: 'log_neighbor_changes', dataIndex: 'log' },
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
    if (!data) {
        return (
            <Table columns={columns} dataSource={data} loading style={{ minWidth: 400 }} />
        )
    } else {
        return (
            <Table columns={columns} dataSource={data} style={{ minWidth: 400 }} />
        )
    }
}
