import ubusApi from 'service/api/ubus-api'
import React from 'react';
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;

export const Dnstable = () => {
  const [data, setData] = React.useState()
  const [primary, setprimary] = React.useState()
  const [secondary, setsecondary] = React.useState()
  
  const refreshData = async () => {
      const data1 = await ubusApi.show_network_dns_config()
      setprimary(data1.values.dns.primary)
      setsecondary(data1.values.dns.secondary)
  }
  React.useEffect(() => {
    refreshData()},[])
//   console.log(primary)
  return (
      <GetTable
          primary={primary}
          secondary={secondary}
      />
  )
}    
  

export const GetTable = (props: any) => {
  const { primary,secondary } = props
  const data = [
    {
        primary:primary,
        secondary:secondary
    }

]
  const columns = [
    { title: 'Primary', key: 'primary', dataIndex: 'primary' },
    { title: 'Secondary' , key: 'secondary' , dataIndex: 'secondary' },
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

export default Dnstable;