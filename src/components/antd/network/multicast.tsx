import ubusApi from 'service/api/ubus-api'
import React from 'react';
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;

export const Multicast_table = () => {
  const [data, setData] = React.useState()

  const refreshData = async () => {
    const data1 = await ubusApi.show_network_multicast()

    setData(data1.mdb)
    console.log(data1.mdb)
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
    </div >
  )
}


export const GetTable = (props: any) => {
  const { haha } = props
  const columns = [
    { title: 'Vlans', key: 'vlans', dataIndex: 'vlans' },
    { title: 'Group', key: 'group', dataIndex: 'group' },
    { title: 'Type', key: 'type', dataIndex: 'type' },
    { title: 'Ports', key: 'ports', dataIndex: 'ports' },
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

export default Multicast_table;