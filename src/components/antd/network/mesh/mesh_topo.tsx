import ubusApi from 'service/api/ubus-api'
import React, { Component, useReducer } from 'react';
import { message, Space, Table, Tag } from 'antd';
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";
import { render } from '@testing-library/react';
import { DecompositionTreeGraph, RadialTreeGraph } from '@ant-design/graphs';
import { t } from 'i18next';
export const MeshTopo = () => {   
    const [data, setData] = React.useState({ hits: [] });
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await ubusApi.show_mesh_topology()
            setData(result);
        };
        const interval = setInterval(() => {
            fetchData();
        }, 5000);
        return () => clearInterval(interval);
    },[]);
    const config: any = {
        data,
        width: 1500,
        height: 750,
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        layout: {
            type: 'indented',
            direction: 'LR',
            dropCap: false,
            indent: 500,
            getHeight: () => {
                return 200;
            },
            getWidth: () => {   
                return 500;
            },
        },
        nodeCfg: {
            autoWidth: true,
            size: [150, 40],
            title: {
                containerStyle: {
                    fill: '#00CC99',
                },
                style: (cfg: any) => {
                    return {
                        fill: cfg?.value?.title === '青年' ? 'yellow' : '#fff',
                    };
                },
            },
            items: {    
                containerStyle: {
                    fill: '#fff',
                },
                style: (cfg: any, group: any, type: any) => {
                    const styles: any = {
                        value: {
                            fill: '#000',
                        },
                        text: {
                            fill: '#000',
                        },
                        icon: {
                            width: 20,
                            height: 20,
                        },
                    };
                    return styles[type];
                },
            },
            nodeStateStyles: {
                hover: {
                    stroke: '#1890ff',
                    lineWidth: 2,
                },
            },
            style: {
                radius: [5, 5, 5, 5],
            },
        },
        markerCfg: (cfg: any) => {
            const { children } = cfg;
            return {
                show: children?.length,
            };
        },
    };

    return <DecompositionTreeGraph {...config} />;
}

export default MeshTopo;