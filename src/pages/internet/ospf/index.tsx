import { Tabs } from 'antd'
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import { Ospf } from './ospf';
import { Ospfv6 } from './ospfv6';

const Page = () => {
    const { t } = useTranslation();
    const items = [
        { label: t("OSPFV4"), key: '1', children: <Ospf /> },
        { label: t("OSPFV6"), key: '2', children: <Ospfv6 />},       
    ]
    return (
        <Tabs type="card" defaultActiveKey='1' items={items} />   
    )
}
export default Page
