import { Table } from "antd"


export const ButtonTable = (props: any) => {
    const { button } = props
    const columns = [
        { title: 'Number button', dataIndex: 'number_button', key: 'number_button' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Number', dataIndex: 'number', key: 'number' },
    ]

    return (
        <Table columns={columns} dataSource={button} style={{ minWidth: 400 }} />
    )

    // if (!data) {
    //     return (
    //         <Table columns={columns} dataSource={data} loading style={{ minWidth: 400 }} />
    //     )
    // } else {
    //     return (
    //         <Table columns={columns} dataSource={data} style={{ minWidth: 400 }} />
    //     )
    // }
}