import { Tabs } from 'antd'
import { Wan } from './wan';
import { Wan1} from './wan1';
import { Wan2} from './wan2';
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";

const Page = () => {
    const { t } = useTranslation();
    const items = [
        { label: t("WAN"), key: '1', children: <Wan /> },
        { label: t("WAN1"), key: '2', children: <Wan1 />},
        { label: t("WAN2"), key: '3', children: <Wan2 />},
    ]
    return (
        <Tabs type="card" defaultActiveKey='1' items={items} />   
    )
}
export default Page