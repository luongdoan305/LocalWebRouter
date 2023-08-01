import { Tabs } from 'antd'

import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import { PPTPclient } from './pptpclient';
import { PPTPserver } from './pptpserver';

const Page = () => {
    const { t } = useTranslation();
    const items = [
        { label: t("PPTP Server"), key: '1', children: <PPTPserver /> },
        { label: t("PPTP Client"), key: '2', children: <PPTPclient />},       
    ]
    return (
        <Tabs type="card" defaultActiveKey='1' items={items} />   
    )
}
export default Page