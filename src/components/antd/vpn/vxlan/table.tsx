import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const VxlanTable = (props: any) => {
  const { onEditItem, tableData, haha } = props
  const { t } = useTranslation()
  const abc = t('edit')
  const def = t('delete')
  const refreshPage = () => {
    window.location.reload()
  }
  const confirmDeleteGroup = async (group: any) => {
    const { name, peeraddr, ipaddr, netmask, port, mtu, vid  } = group
    const deleterules = await ubusApi.config_vxlan("disable", name, peeraddr,ipaddr, netmask, port,mtu,vid  )
    console.log("values: ", deleterules)
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
    { title: t('vxlan_name'), key: 'vxlan_name', dataIndex: 'name' },
    { title: t('remote_address'), key: 'remote_address', dataIndex: 'peeraddr' },
    { title: t('network'), key: 'network', dataIndex: 'ipaddr' },
    { title: t('netmask'), key: 'netmask', dataIndex: 'netmask' },
    { title: t('port'), key: 'port', dataIndex: 'port' },
    { title: t('mtu'), key: 'mtu', dataIndex: 'mtu' },
    { title: t('vlan'), key: 'vlan', dataIndex: 'vid' },
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
  if ( !haha ) {
    return(
      <Table columns={columns} dataSource={haha} loading style={{ minWidth: 400 }} /> 
    )
  } else {
    return(
      <Table columns={columns} dataSource={haha} style={{ minWidth: 400 }} /> 
    )
  }
}