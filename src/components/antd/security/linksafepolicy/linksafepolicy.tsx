import ubusApi from 'service/api/ubus-api'
import React from 'react';
import { Space, Table, Tag, Card } from 'antd';
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"

export const Linksafe_table = () => {
  const [data, setData] = React.useState()
  const [app, setApp] = React.useState()
  const [time_start, settime_start] = React.useState()
  const [time_stop, settime_stop] = React.useState()
  const [type, setType] = React.useState()
  const [user, setUser] = React.useState()

  const { t } = useTranslation()
  const refreshData = async () => {
    const data1 = await ubusApi.show_policy()
    if (data1.rules.app == null) {
      setApp(data1.rules.url)
    }

    setData(data1.rules)
    console.log(data1.rules)
  }

  React.useEffect(() => {
    refreshData()
  }, [])
  console.log(data)
  return (
    <Card title={t("Policy List")} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
      <div style={{ overflowX: 'auto' }}>
        <GetTable
          haha={data}
        />
      </div>
    </Card>
  )
}

export const GetTable = (props: any) => {
  const { haha } = props
  const columns = [
    { title: 'Policy Action	', key: 'policy_action', dataIndex: 'type' },
    { title: 'Source Name', key: 'user', dataIndex: 'user' },
    { title: 'Destination Type', key: 'app', dataIndex: 'app' },
    { title: 'Time Start', key: 'time_start', dataIndex: 'time_start' },
    { title: 'Time Stop', key: 'time_stop', dataIndex: 'time_stop' },
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

export default Linksafe_table;