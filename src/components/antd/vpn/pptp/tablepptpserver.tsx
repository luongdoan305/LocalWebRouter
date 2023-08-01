import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const PptpserverTable = (props: any) => {
    const { onEditItem, hihi, status, remoteip, remoteip1, username , password } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = () => {
        window.location.reload()
    }
    const data = [
        {
            status: (status === "1") ? "Enable" : "Disable",
            remoteip:remoteip,
            remoteip1:remoteip1,
            username:username,
            password:password,
        }
    ]
    const confirmDeleteGroup = async (group: any) => {
        // console.log("data1: ",))
        // const vlan = group.dev.map((item:any) => {item.toString()})
        const vlan = await ubusApi.config_pptp_server( group.status, group.range_from, group.range_to, group.username, group.password)
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
        { title: t('status'), key: 'status', dataIndex: 'status' },
        { title: 'Range From', key: 'range_from', dataIndex: 'remoteip' },
        { title: 'Range To', key: 'range_to', dataIndex: 'remoteip1' },
        { title: t('username'), key: 'username', dataIndex: 'username' },
        { title: t('password'), key: 'password', dataIndex: 'password' },
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
