import { Card } from "antd"
import AntdLayout from "components/antd/layout"
import { Ntp } from "components/antd/service/ntp/ntp"
import { useTranslation } from "react-i18next";
import "../../../translations/i18n"
const Page = () => {
  const { t } = useTranslation();
  return (
      <Card title={t("NTP Server Configuration")} type="inner" headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}}>
        <Ntp />
      </Card>
  )
}

export default Page