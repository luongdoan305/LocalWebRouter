import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from '../../../../service/api/ubus-api'
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const Nat64Table = (props: any) => {
  const { onEditItem, tableData, haha } = props
  const { t } = useTranslation()
  const abc = t('edit')
  const def = t('delete')
  const refreshPage = () => {
    window.location.reload()
  }
  const confirmDeleteGroup = async (group: any) => {
    const {status, interfacee, instance_name, ipv6_address   } = group
    const deleterules = await ubusApi.config_network_nat64( "disable", interfacee, instance_name, ipv6_address)
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
    { title: t('Instance Name'), key: 'instance_name', dataIndex: 'instance_name' },
    { title: t('Interface'), key: 'interfacee', dataIndex: 'interfacee' },
    { title: t('Ipv6 Address'), key: 'ipv6_address', dataIndex: 'ipv6_address' },
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