import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from '../../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../../translations/i18n"

export const SipdeviceTable = (props: any) => {
  const { onEditItem, tableData, haha } = props
  const { t } = useTranslation()
  const abc = t('edit')
  const def = t('delete')
  const refreshPage = () => {
    window.location.reload()
  }
  const confirmDeleteGroup = async (group: any) => {
    const { action, number, auth_username,  auth_password, endpoint_disallow} = group
    const deleterules = await ubusApi.config_media_number( "del", number, auth_username, auth_password, endpoint_disallow)
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
    { title: t('Register Number'), key: 'register_number', dataIndex: 'number' },
    { title: t('User Name'), key: 'user_name', dataIndex: 'auth_username' },
    { title: t('PassWord'), key: 'password', dataIndex: 'auth_password' },
    { title: t('Service'), key: 'service', dataIndex: 'endpoint_disallow' },

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