import { Tabs } from 'antd'
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import { ISIS } from './isis';
import { ISISinterface } from './isis_interface';

const Page = () => {
    const { t } = useTranslation();
    const items = [
        { label: t("ISIS"), key: '1', children: <ISIS /> },
        { label: t("ISIS Interface"), key: '2', children: <ISISinterface />},       
    ]
    return (
        <Tabs type="card" defaultActiveKey='1' items={items} />   
    )
}
export default Page
