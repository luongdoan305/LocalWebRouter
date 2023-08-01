import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from '../../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../../translations/i18n"

export const SettingTable = (props: any) => {
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
    { title: t('Blindxfer'), key: 'blindxfer', dataIndex: 'blindxfer' },
    { title: t('Atxfer'), key: 'atxfer', dataIndex: 'axtfer' },
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
export const Setting1Table = (props: any) => {
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
      { title: t('Number voicemail'), key: 'number', dataIndex: 'number' },
      { title: t('Max logins'), key: 'max_logins', dataIndex: 'max_logins' },
      { title: t('Max message'), key: 'max_message', dataIndex: 'Max message' },
      { title: t('Max second'), key: 'max_second', dataIndex: 'max_second' },
      { title: t('Min second'), key: 'min_second', dataIndex: 'min_second' },
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