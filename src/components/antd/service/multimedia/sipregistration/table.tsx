import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from '../../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../../translations/i18n"

export const SipregistrationTable = (props: any) => {
  const { onEditItem, tableData, haha } = props
  const { t } = useTranslation()
  const abc = t('edit')
  const def = t('delete')
  const refreshPage = () => {
    window.location.reload()
  }
  const confirmDeleteGroup = async (group: any) => {
    const { name, type, src, dest, sport, dport, tcp_udp } = group
    const deleterules = await ubusApi.config_ip_filter(name, "del", type, src, dest, sport, dport, tcp_udp)
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
    { title: t('Server Name'), key: 'service_name', dataIndex: 'service_name' },
    { title: t('SIP Server Address'), key: 'sip_service_address', dataIndex: 'sip_service_address' },
    { title: t('SIP Server Port'), key: 'sip_server_port', dataIndex: 'sip_server_port' },
    { title: t('SIP Client Address'), key: 'sip_client_address', dataIndex: 'sip_client_address' },
    { title: t('SIP Client Port'), key: 'sip_client_port', dataIndex: 'sip_client_port' },
    { title: t('User Name'), key: 'user_name', dataIndex: 'user_name' },
    { title: t('Status'), key: 'status', dataIndex: 'status' },
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