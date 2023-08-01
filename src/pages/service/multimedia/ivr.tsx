import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal, Space, Table } from "antd"
import React from "react"
import { IvrEdit } from '../../../components/antd/service/multimedia/ivr/edit'
import { IvrTable } from '../../../components/antd/service/multimedia/ivr/table'
import ubusApi from '../../../service/api/ubus-api';
import { ButtonTable } from '../../../components/antd/service/multimedia/ivr/buttonTable'
import { config } from 'process'
import { useTranslation } from "react-i18next"
import "../../../translations/i18n"

export const Ivr = () => {
    const { t } = useTranslation()
    const [item, setItem] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [show, setShow] = React.useState(false)

    const [data, setData] = React.useState(null)

    const [name, setName] = React.useState(null)
    const [number, setNumber] = React.useState(null)

    const [fake, setFake] = React.useState<string | null>(null);

    const data1 = [
        {
                "button_ivr": "19001999",
                "music": "music",
                "button1": [
                        {
                                "number_button": "1",
                                "name": "lancs1",
                                "number": "1003"
                        },
                        {
                                "number_button": "2",
                                "name": "user2",
                                "number": "1002"
                        }
                ]
        },
        {
                "button_ivr": "19002000",
                "music": "music",
                "button2": [
                        {
                                "number_button": "1",
                                "name": "user2",
                                "number": "1002"
                        },
                        {
                                "number_button": "2",
                                "name": "user1",
                                "number": "1001"
                        },
                        {
                                "number_button": "3",
                                "name": "user2",
                                "number": "1002"
                        }
                ]
        },
    ]
    // const nameValue = ivr_data1[0]?.button1?.[0]?.name;

    // if (nameValue !== undefined) {
    //     setFake(nameValue);
    // }
    
    // console.log(fake)

    const refreshData = async () => {
        //const data1 = await ubusApi.show_media_ivr()
        //setData(data1.ivr_data)
        setFake(data1)
        // setName(data1.ivr_data[1].button[1].name)
        // setNumber(data1.ivr_data[1].button[1].number)
        //console.log("show_ivr:", data1.ivr_data)
        
        // for (let i = 0; i < data1.ivr_data.length; i++) {
        //     for(let j = 0; j < data1.ivr_data.button.length; j++){
        //         setName(data1.ivr_data[i].button[j].name)
        //         setNumber(data1.ivr_data[i].button[j].number)
        //         console.log(data1.ivr_data.length)
        //     }
        // }
        
        
    }

    

    React.useEffect(() => {
        refreshData()
    }, [])

    const onEditItem = (group: any) => {
        setItem(Object.assign({}, group))
        setShowModal(true)
    }
    const onCreateItem = (group: any) => {
        setItem({} as any)
        //setShowModal(true)
        setShow(true)
    }
    const onModalCancel = () => {
        setShowModal(false)
        setShow(false)
        setItem(null)
    }
    const onModalOk = () => {
        setShowModal(false)
        setShow(false)
    }
    const onDone = () => {
        setShowModal(false)
        setShow(false)
        setItem(null)
    }


    const showModalContent = () => {
        if (!showModal) {
            return null
        }
        return (
            <Modal width={700} open={true} onCancel={onModalCancel} onOk={onModalOk} footer={null}>
                <Col span={23}>
                    <Card title={t('Number IVR Edit')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <ButtonTable 
                            
                        />
                    </Card>
                </Col>
            </Modal>
        )

    }

    const showCreate = () => {
        if (!show) {
            return null
        }
        return (
            <Modal width={700} open={true} onCancel={onModalCancel} onOk={onModalOk} footer={null}>
                <Col span={23}>
                    <Card title={t('Number IVR Create')} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
                        <IvrEdit 
                            item={item}
                            haha={name}
                            hihi={number}
                            onDone={onDone} />
                    </Card>
                </Col>
            </Modal>
        )
    }

    return (
        <Card title={t('Number Digits List')} headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <IvrTable
                        haha={data}
                        onEditItem={onEditItem}
                    />
                    {showModalContent()}
                    {showCreate()}
                </div>
                <Button type="primary" onClick={onCreateItem} >
                    {t('create')}
                </Button>
            </Space>
        </Card>
    )
}

