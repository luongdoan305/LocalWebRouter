import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from "service/api/ubus-api"
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const LagTable = (props: any) => {
    const { onEditItem, onDeleteItem, haha } = props
    const {t} = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = ()=>{
        window.location.reload()
    }
    const confirmDeleteGroup = async (group: any) => {

        console.log("delete success: ", group)
        const {status,local_address, remode_address, network} = group
        const result = await ubusApi.config_l2tp("disable", local_address, remode_address, network)
        // console.log("name: ",name)
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
        { title: 'Interface Number', key: 'interface_number', dataIndex: 'interface_number' },
        { title: 'IPv4 Address', key: 'ipv4_address', dataIndex: 'ipv4_address' },
        { title: 'IPv6 Address', key: 'ipv6_address', dataIndex: 'ipv6_address' },
        { title: 'Interface', key: 'interface', dataIndex: 'interface' },
        {
            title: t('action'),
            key: 'action',
            render: (_: string, record: any) => {
                if (record.admin_id <= 0) {
                    return null
                }
                return (
                    <Space>
                        <Button title={abc}  icon={<EditOutlined />} onClick={() => onEditItem(record)} />
                        <Popconfirm
                            placement="top"
                            title={t('delete_cf')}
                            onConfirm={() => confirmDeleteGroup(record)}
                            okText={t('yes')}
                            cancelText={t('no')}
                        >
                            <Button icon={<DeleteOutlined />} title={def}/>
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