import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const IpsecTable = (props: any) => {
    const { onEditItem, key,local_id, remote_id, local_address,remote_address,remote_subnet,local_subnet,ike_encrypt,ike_hash,ike_dh,esp_encrypt,esp_hash,esp_dh,} = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = () => {
        window.location.reload()
    }
    const data = [
        {
            type: (remote_subnet === undefined) ? "Remote Access" : "Site to Site",
            method:(ike_dh === undefined) ?  "Signature" : "Pre shared Key",
        }
    ]
    const confirmDeleteGroup = async (group: any) => {
        const vlan = await ubusApi.config_ipsec_del("IPSEC")
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
        { title: 'Type', key: 'type', dataIndex: 'type' },
        { title: 'Method', key: 'method', dataIndex: 'method' },
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

