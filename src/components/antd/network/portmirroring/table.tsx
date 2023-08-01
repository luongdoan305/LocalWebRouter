import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from "service/api/ubus-api"
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"


export const PortTable = (props: any) => {
    const { onEditItem, onDeleteItem, hihi, data } = props
    const {t} = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = ()=>{
        window.location.reload()
    }
    const confirmDeleteGroup = async (group: any) => {

        console.log("delete success: ", group)
        const {src, dest, direct} = group
        const result = await ubusApi.config_network_mirror("del", src, dest, direct)
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
        { title: t('source_interface'), key: 'src', dataIndex: 'src' },
        { title: t('destination_interface'), key: 'dest', dataIndex: 'dest' },
        { title: t('direct'), key: 'direct', dataIndex: 'direct' },
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
    if (!data) {
        console.log(data)
        return(
          <Table columns={columns} dataSource={data} loading style={{ minWidth: 400 }} /> 

        )
      } else {
        return(
          <Table columns={columns} dataSource={data} style={{ minWidth: 400 }} /> 
        )
    }

}