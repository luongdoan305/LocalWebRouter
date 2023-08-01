import ubusApi from 'service/api/ubus-api'
import React from 'react';
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;

export const Arp_table = () => {
  const [data, setData] = React.useState()

  const refreshData = async () => {
    const data1 = await ubusApi.show_network_arp()

    setData(data1.entries)
    console.log(data1.entries)
  }

  React.useEffect(() => {
    refreshData()
  }, [])
  console.log(data)
  return (
    <div style={{ overflowX: 'auto' }}>
      <GetTable
        haha={data}
      />
    </div>
  )
}


export const GetTable = (props: any) => {
  const { haha } = props
  const columns = [
    { title: 'Ipaddr', key: 'ipaddr', dataIndex: 'ipaddr' },
    { title: 'Macaddr', key: 'macaddr', dataIndex: 'macaddr' },
    { title: 'Device', key: 'device', dataIndex: 'device' },
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

export default Arp_table;