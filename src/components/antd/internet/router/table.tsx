import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from 'service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const RouterTable = (props: any) => {
  const { onEditItem, onDeleteItem, tableData, hihi } = props
  const { t } = useTranslation()
  const abc = t('edit')
  const def = t('delete')
  const confirmDeleteGroup = async (group: any) => {
    const { target, nexthop, metric, device } = group
    const deleteRoute = await ubusApi.config_network_static("del", target, nexthop, metric, device)
    // console.log("values: ",deleteRoute)
    const key = 'updatable';
    message.loading({ content: t('loading'), key });
    setTimeout(() => {
      message.success({ content: t('success'), key, duration: 2 });
    }, 1000);
    setTimeout(() => {
      window.location.reload()
    }, 1500);
    return onDeleteItem(group)
  }
  const columns = [
    { title: 'Metric', key: 'metric', dataIndex: 'metric' },
    { title: 'GateWay', key: 'nexthop', dataIndex: 'nexthop' },
    { title: t('dest_network'), key: 'target', dataIndex: 'target' },
    { title: t('Device'), key: 'device', dataIndex: 'device' },
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
