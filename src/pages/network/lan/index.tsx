import { Tabs } from 'antd'
import PageEdit from 'pages/network/lan/lanEdit';
import  PageTable  from 'pages/network/lan/lanTable'

const Page = () => {
    const items = [
        { label: "Edit Lan", key: '1', children: <PageEdit />},
        { label: "Table Lan", key: '2', children: <PageTable />},
    ]
    return (
        <Tabs type="card" defaultActiveKey='1' items={items} />
    )
}
export default Page