import { Tabs } from 'antd'
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import { Configtunnel } from './Configtunnel';
import { Configca } from './Configca';

const Page = () => {
    const { t } = useTranslation();

    const items = [
        { label: t("Tunnel"), key: '1', children: <Configtunnel />},
        { label: t("CA"), key: '2', children: <Configca />}
    ]
    return (
        <Tabs type="card" defaultActiveKey='1' items={items} />
    )
}
export default Page
