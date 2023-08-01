import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const StpTable1 = (props: any) => {
    const { onEditItem, onDeleteItem, tableData, haha } = props
    const { t } = useTranslation()
    const abc = t('edit')
    const def = t('delete')

    const columns = [
        { title: t('port'), key: 'dev', dataIndex: 'dev' },
        { title: t('Path Cost'), key: 'path_cost', dataIndex: 'path_cost' },
        { title: t('status'), key: 'state', dataIndex: 'state' },
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