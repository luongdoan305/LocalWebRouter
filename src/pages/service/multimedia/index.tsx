import { Tabs } from 'antd'
import { Digits } from './numbermulti';
import { Sipdevice } from './sipdevice';
import { Sippeer } from './sippeer';
import { Sipregistration } from './sipregistration';
import { Ivr } from './ivr';
import { Conference } from './conference';
import { Setting } from './setting';
import { Logs } from './logs';
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";

const Page = () => {
    const { t } = useTranslation();
    const items = [
        { label: t("Number Digits"), key: '1', children: <Digits /> },
        { label: t("Sip Device"), key: '2', children: <Sipdevice />},
        { label: t("Sip Peer"), key: '3', children: <Sippeer />},
        { label: t("Sip Registration"), key: '4', children: <Sipregistration />},
        { label: t("IVR"), key: '5', children: <Ivr />},
        { label: t("Conference Call"), key: '6', children: <Conference />},
        { label: t("Setting"), key: '7', children: <Setting />},
        { label: t("Logs"), key: '8', children: <Logs />}
    ]
    return (
        <Tabs type="card" defaultActiveKey='1' items={items} />   
    )
}
export default Page