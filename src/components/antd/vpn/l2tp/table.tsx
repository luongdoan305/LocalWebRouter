import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React from 'react'
import ubusApi from "service/api/ubus-api"
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const L2tpTable = (props: any) => {
    const { onEditItem, onDeleteItem, haha, localaddr,peeraddr,ipaddr } = props
    const {t} = useTranslation()
    const abc = t('edit')
    const def = t('delete')
    const refreshPage = ()=>{
        window.location.reload()
    }
    const data = [
        {
            localaddr:localaddr,
            peeraddr:peeraddr,
            ipaddr:ipaddr,
        }

    ]
    const confirmDeleteGroup = async (group: any) => {

        console.log("delete success: ", group)
        const {status,localaddr, peeraddr, ipaddr} = group
        const result = await ubusApi.config_l2tp("disable", localaddr, peeraddr, ipaddr)
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
        { title: t("local_address"), key: 'local_address', dataIndex: 'localaddr' },
        { title: t("remote_address"), key: 'remote_address', dataIndex: 'peeraddr' },
        { title: t('network'), key: 'network', dataIndex: 'ipaddr' },
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