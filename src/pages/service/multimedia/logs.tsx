import { Tabs } from 'antd'
import { useTranslation } from "react-i18next"
import { EditPassword } from 'components/antd/system/settings/authen';
import "../../../translations/i18n";

export const Logs = () => {
    const { t } = useTranslation();
    const items = [
        { label: t("Endpoints"), key: '1', children: <EditPassword />},
        { label: t("Mailboxes"), key: '2', children: <EditPassword />},
        { label: t("Features"), key: '3', children: <EditPassword />},
        { label: t("Voicemail"), key: '4', children: <EditPassword />},
    ]
    return (
        <Tabs type="card" defaultActiveKey='1' items={items} />   
    )
}
