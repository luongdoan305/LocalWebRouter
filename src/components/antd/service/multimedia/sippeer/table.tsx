import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from '../../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../../translations/i18n"

export const SippeerTable = (props: any) => {
  const { onEditItem, tableData, haha, name, option, port, address, digits } = props
  const { t } = useTranslation()
  const abc = t('edit')
  const def = t('delete')
  const refreshPage = () => {
    window.location.reload()
  }

  const data = [
    {
        digits:digits,
        name: name,
        option:option,
        port:port,
        address:address,
    }
]
  const confirmDeleteGroup = async (group: any) => {
    const { action, digits,name,address, port,option } = group
    const deleterules = await ubusApi.config_media_trunk( "del", digits , name, address ,port , option)
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
    { title: t('Number'), key: 'number', dataIndex: 'digits' },
    { title: t('Peer Name'), key: 'peer_name', dataIndex: 'name' },
    { title: t('SIP Peer Address'), key: 'sip_peer_address', dataIndex: 'address' },
    { title: t('SIP Peer Port'), key: 'sip_peer_port', dataIndex: 'port' },
    { title: t('Service'), key: 'service', dataIndex: 'option' },
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
  if ( !data ) {
    return(
      <Table columns={columns} dataSource={data} loading style={{ minWidth: 400 }} /> 
    )
  } else {
    return(
      <Table columns={columns} dataSource={data} style={{ minWidth: 400 }} /> 
    )
  }
}