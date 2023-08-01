import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const BondingTable = (props: any) => {
  const { onEditItem, tableData, haha } = props
  const { t } = useTranslation()
  const abc = t('edit')
  const def = t('delete')
  const refreshPage = () => {
    window.location.reload()
  }
  const confirmDeleteGroup = async (group: any) => {
    const str = group.name
    let id = "";

    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      if (!isNaN(char)) {
        id += char;
      }
    }
    const deletedata = await ubusApi.config_network_bonding("del", id, group.ipaddr, group.mask)
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
    { title: t('name'), key: 'name', dataIndex: 'name' },
    { title: t('ip_adress'), key: 'ipaddr', dataIndex: 'ipaddr' },
    { title: t('netmask'), key: 'mask', dataIndex: 'mask' },
    {
      title: t('action'),
      key: 'action',
      render: (_: string, record: any) => {
        if (record.admin_id <= 0) {
          return null
        }
        return (
          <Space>
            <Button title={abc} icon={<EditOutlined />} onClick={() => onEditItem(record)} />
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