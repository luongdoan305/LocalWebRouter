import { Table } from 'antd'
import { Line } from '@ant-design/plots';
import { useSelector } from 'react-redux'
import { sessionSelector } from '../../../redux/reducer/sessionSlice'
import type { ColumnsType } from 'antd/es/table';

import { useTranslation } from "react-i18next";
import "../../../translations/i18n";

export const ClientsConnected = (props:any) => {
    const { t } = useTranslation();

    interface DataType {
    mac: string;
    freq: string;
    tx: number;
    rx: number;
    signal: number;
    }

    const columns: ColumnsType<DataType> = [
    {
        title: t("mac_address"),
        dataIndex: 'mac',
        key: 'mac',
        render: (text) => <a>{text}</a>,
    },
    {
        title: t('frequency'),
        dataIndex: 'freq',
        key: 'freq',
    },
    {
        title: t('tx_bytes'),
        dataIndex: 'tx',
        key: 'tx',
    },
    {
        title: t('rx_bytes'),
        dataIndex: 'rx',
        key: 'rx',
    },
    {
        title: t('signal'),
        dataIndex: 'signal',
        key: 'signal',
    },
    ];

    const data: DataType[] = [];

    const { systemInfo } = useSelector(sessionSelector)
    const { wlan0_clients = {}, wlan1_clients = {} } = systemInfo?.data || {}  
    const  clients_24 = wlan0_clients.clients  
    const  clients_5 = wlan1_clients.clients 
    const freq24 = wlan0_clients.freq
    const freq5 = wlan1_clients.freq
    let i = 0 

    for (var client in clients_24) {
        // skip loop if the property is from prototype
        if (!clients_24.hasOwnProperty(client)) continue;

        data.push({
                mac: client,
                freq: freq24,
                tx: clients_24[client].bytes?.tx || 0,
                rx: clients_24[client].bytes?.rx || 0, 
                signal: clients_24[client]?.signal || 0
            })
    }

    for (var client in clients_5) {
        // skip loop if the property is from prototype
        if (!clients_5.hasOwnProperty(client)) continue;

        data.push({
                mac: client,
                freq: freq5,
                tx: clients_5[client].bytes?.tx || 0,
                rx: clients_5[client].bytes?.rx || 0,
                signal: clients_5[client]?.signal || 0
            })
    }

    return  <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }}/>
}

export const NetworkStatistic = (props:any) => {
    const { name } = props
    const { systemInfo } = useSelector(sessionSelector)
    const { wan = {}, lan1 = {}, lan2 = {}, lan3 = {}, lan4 ={}, wlan0 = {}, wlan1= {} } = systemInfo?.data || {}
    const data: { value: any; category: string, time: number }[] = [];

    if (name === "wan") {
        const rx_bytes = wan.statistics?.rx_bytes || []
        const tx_bytes = wan.statistics?.tx_bytes || []
        
        for (let i = 0; i < 120; i++) {
            data.push({
                value: rx_bytes[i]/1000,
                category: 'rx (KB/s)',
                time: i,
            });
        }

        for (let i = 0; i < 120; i++) {
            data.push({
                value: tx_bytes[i]/1000,
                category: 'tx (KB/s)',
                time: i,
            });
        }
    }
    else if (name === "lan") {
        const rx_bytes_lan1 = lan1.statistics?.rx_bytes || []
        const rx_bytes_lan2 = lan2.statistics?.rx_bytes || []
        const rx_bytes_lan3 = lan3.statistics?.rx_bytes || []
        const rx_bytes_lan4 = lan4.statistics?.rx_bytes || []

        const tx_bytes_lan1 = lan1.statistics?.tx_bytes || []
        const tx_bytes_lan2 = lan2.statistics?.tx_bytes || []
        const tx_bytes_lan3 = lan3.statistics?.tx_bytes || []
        const tx_bytes_lan4 = lan4.statistics?.tx_bytes || []
        
        for (let i = 0; i < 120; i++) {
            data.push({
                value: (rx_bytes_lan1[i] + rx_bytes_lan2[i] + rx_bytes_lan3[i] + rx_bytes_lan4[i])/1000,
                category: 'rx (KB/s)',
                time: i,
            });
        }

        for (let i = 0; i < 120; i++) {
            data.push({
                value: (tx_bytes_lan1[i] + tx_bytes_lan2[i] + tx_bytes_lan3[i] + tx_bytes_lan4[i])/1000,
                category: 'tx (KB/s)',
                time: i,
            });
        }
    }     
    else if (name === "wifi") {
        const rx_bytes_wlan1 = wlan1.statistics?.rx_bytes || []
        const rx_bytes_wlan0 = wlan0.statistics?.rx_bytes || []

        const tx_bytes_wlan1 = wlan1.statistics?.tx_bytes || []
        const tx_bytes_wlan0 = wlan0.statistics?.tx_bytes || []
  
        for (let i = 0; i < 120; i++) {
            data.push({
                value: (rx_bytes_wlan1[i] + rx_bytes_wlan0[i])/1000 > 0 ? (rx_bytes_wlan1[i] + rx_bytes_wlan0[i])/1000 : -(rx_bytes_wlan1[i] + rx_bytes_wlan0[i])/1000,
                category: 'rx (KB/s)',
                time: i,
            });
        }

        for (let i = 0; i < 120; i++) {
            data.push({
                value: (tx_bytes_wlan1[i] + tx_bytes_wlan0[i])/1000 > 0 ? (tx_bytes_wlan1[i] + tx_bytes_wlan0[i])/1000 : - (tx_bytes_wlan1[i] + tx_bytes_wlan0[i])/1000,
                category: 'tx (KB/s)',
                time: i,
            });
        }
    }
  
    const config = {
        data,
        xField: 'time',
        yField: 'value',
        seriesField: 'category',
        color: ['#1979C9', '#D62A0D', '#FAA219'],
        };

    return <Line {...config} />;
};

export default NetworkStatistic;
