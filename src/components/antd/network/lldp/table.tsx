import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const LldpTable = (props: any) => {
    const { onEditItem, onDeleteItem, tableData, hihi, run } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = () => {
        window.location.reload()
    }
    const data1 = [
        {
            run:run,
        }

    ]
    const confirmDeleteGroup = async (group: any) => {
        const vlan = await ubusApi.config_network_lldp(group.run)
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
        { title: t('status'), key: 'run', dataIndex: 'run' },
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
                    </Space>
                )
            },
        },
    ]
    if (!data1) {
        return (
            <Table columns={columns} dataSource={data1} loading style={{ minWidth: 400 }} />
        )
    } else {
        return (
            <Table columns={columns} dataSource={data1} style={{ minWidth: 400 }} />
        )
    }
}
export const LldpTable1 = (props: any) => {
    const { onEditItem, onDeleteItem, tableData, tx, rx, discar, unre, age, insert, delete_cnt } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = () => {
        window.location.reload()
    }
    const data = [
        {
            tx:tx,
            rx:rx,
            rx_discarded_cnt:discar,
            rx_unrecognized_cnt:unre,
            ageout_cnt:age,
            insert_cnt:insert,
            delete_cnt:delete_cnt,
        }

    ]
    const confirmDeleteGroup = async (group: any) => {
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
        { title: t('transmitted'), key: 'tx', dataIndex: 'tx' },
        { title: t('received'), key: 'rx', dataIndex: 'rx' },
        { title: t('discarded'), key: 'rx_discarded_cnt', dataIndex: 'rx_discarded_cnt' },
        { title: t('unrecognized'), key: 'rx_unrecognized_cnt', dataIndex: 'rx_unrecognized_cnt' },
        { title: t('ageout'), key: 'ageout_cnt', dataIndex: 'ageout_cnt' },
        { title: t('inserted'), key: 'insert_cnt', dataIndex: 'insert_cnt' },
        { title: t('deleted'), key: 'delete_cnt', dataIndex: 'delete_cnt' },
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