import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const RIP_table = (props: any) => {
    const { onEditItem, hihi } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = () => {
        window.location.reload()
    }
    const confirmDeleteGroup = async (group: any) => {
        // console.log("data1: ",))
        // const vlan = group.dev.map((item:any) => {item.toString()})
        const vlan = await ubusApi.config_network_rip("disable", group.mode, group.network, "false", "false", "false", "false", "false", "false")
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
        { title: t('mode'), key: 'mode', dataIndex: 'mode' },
        { title: t('network'), key: 'networks', dataIndex: 'networks' },
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