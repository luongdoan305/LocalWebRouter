import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm } from 'antd'
import React from 'react'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const LanTable = (props: any) => {
    const { onEditItem, onDeleteItem, data1 } = props
    // console.log(data1)
    const { t } = useTranslation()
    const confirmDeleteGroup = async (group: any) => {
        return onDeleteItem(group)
    }
    const columns = [

        { title: t('ip'), key: 'ipaddr', dataIndex: 'ipaddr' },
        { title: t('hostname'), key: 'hostname', dataIndex: 'hostname' },
        { title: t('macaddr'), key: 'macaddr', dataIndex: 'macaddr' },
        { title: t('expires'), key: 'expires', dataIndex: 'expires' },

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
