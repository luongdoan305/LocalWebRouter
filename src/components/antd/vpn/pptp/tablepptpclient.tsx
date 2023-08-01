import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const PptpclientTable = (props: any) => {
    const { onEditItem, onDeleteItem, tableData, haha, server, username, password, defaultroute} = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = () => {
        window.location.reload()
    }
    const data = [
        {
            
            server :server,
            username:username,
            password:password,
            defaultroute:defaultroute,
        }

    ]
    const confirmDeleteGroup = async (group: any) => {
        const vlan = await ubusApi.config_pptp_client("disable", group.serverip, group.username, group.password, group.pptp_route)
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
        { title: t('server_ip'), key: 'serverip', dataIndex: 'server' },
        { title: t('username'), key: 'username', dataIndex: 'username' },
        { title: t('password'), key: 'password', dataIndex: 'password' },
        { title: t('PPTP Route'), key: 'pptp_route', dataIndex: 'defaultroute' },
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